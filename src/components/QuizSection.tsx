import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { Brain, User, Sparkles, Trophy, Timer, ChevronRight, X, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Question {
  question: string;
  options: string[];
  correctIndex: number;
}

type Category = "about_me" | "tech";

export const QuizSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Quiz state
  const [playerName, setPlayerName] = useState("");
  const [showNameModal, setShowNameModal] = useState(false);
  const [category, setCategory] = useState<Category>("about_me");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [questionCount, setQuestionCount] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [previousQuestions, setPreviousQuestions] = useState<string[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [sessionStart, setSessionStart] = useState<Date | null>(null);
  const [autoAdvanceTimer, setAutoAdvanceTimer] = useState<number>(0);

  // Auto-advance after answer
  useEffect(() => {
    if (selectedAnswer !== null && autoAdvanceTimer > 0) {
      const timer = setInterval(() => {
        setAutoAdvanceTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            loadNextQuestion();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [selectedAnswer, autoAdvanceTimer]);

  const startQuiz = async () => {
    if (!playerName.trim()) {
      toast.error("Please enter your name");
      return;
    }

    setShowNameModal(false);
    setIsPlaying(true);
    setQuestionCount(0);
    setCorrectCount(0);
    setPreviousQuestions([]);
    setSessionStart(new Date());

    // Create session in database
    try {
      const { data, error } = await supabase
        .from("quiz_sessions")
        .insert({
          player_name: playerName.trim(),
          category: category,
          total_questions: 0,
          correct_answers: 0,
        })
        .select()
        .single();

      if (error) throw error;
      setSessionId(data.id);
    } catch (err) {
      console.error("Error creating session:", err);
    }

    loadNextQuestion();
  };

  const loadNextQuestion = async () => {
    setIsLoading(true);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setAutoAdvanceTimer(0);

    try {
      const { data, error } = await supabase.functions.invoke("generate-quiz-question", {
        body: { category, previousQuestions },
      });

      if (error) throw error;
      if (data.error) throw new Error(data.error);

      setCurrentQuestion(data);
      setPreviousQuestions((prev) => [...prev, data.question]);
    } catch (err: any) {
      console.error("Error loading question:", err);
      toast.error(err.message || "Failed to load question");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswer = async (index: number) => {
    if (selectedAnswer !== null || !currentQuestion) return;

    setSelectedAnswer(index);
    const correct = index === currentQuestion.correctIndex;
    setIsCorrect(correct);

    const newQuestionCount = questionCount + 1;
    const newCorrectCount = correct ? correctCount + 1 : correctCount;

    setQuestionCount(newQuestionCount);
    if (correct) setCorrectCount(newCorrectCount);

    // Update session in database
    if (sessionId) {
      try {
        await supabase
          .from("quiz_sessions")
          .update({
            total_questions: newQuestionCount,
            correct_answers: newCorrectCount,
          })
          .eq("id", sessionId);
      } catch (err) {
        console.error("Error updating session:", err);
      }
    }

    // Start auto-advance timer
    setAutoAdvanceTimer(3);
  };

  const endQuiz = async () => {
    if (sessionId && sessionStart) {
      const duration = Math.floor((new Date().getTime() - sessionStart.getTime()) / 1000);
      try {
        await supabase
          .from("quiz_sessions")
          .update({
            ended_at: new Date().toISOString(),
            session_duration_seconds: duration,
          })
          .eq("id", sessionId);
      } catch (err) {
        console.error("Error ending session:", err);
      }
    }

    setIsPlaying(false);
    setCurrentQuestion(null);
    setSessionId(null);
    setSessionStart(null);
    toast.success(`Quiz ended! Score: ${correctCount}/${questionCount}`);
  };

  const getOptionClassName = (index: number) => {
    const base =
      "w-full p-4 rounded-xl border-2 text-left transition-all duration-300 font-medium";

    if (selectedAnswer === null) {
      return `${base} border-border/50 bg-card/50 hover:border-primary/50 hover:bg-primary/5 cursor-pointer`;
    }

    if (index === currentQuestion?.correctIndex) {
      return `${base} border-green-500 bg-green-500/20 text-green-700 dark:text-green-300 shadow-[0_0_20px_rgba(34,197,94,0.4)]`;
    }

    if (index === selectedAnswer && !isCorrect) {
      return `${base} border-red-500 bg-red-500/20 text-red-700 dark:text-red-300 shadow-[0_0_20px_rgba(239,68,68,0.4)]`;
    }

    return `${base} border-border/30 bg-card/30 opacity-50`;
  };

  return (
    <section
      id="quiz"
      ref={ref}
      className="py-20 md:py-32 px-4 md:px-8 relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Interactive Quiz</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Test Your Knowledge
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Challenge yourself with questions about my profile or test your MERN
            stack skills!
          </p>
        </motion.div>

        {/* Quiz Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-purple-500/20 to-primary/20 rounded-3xl blur-xl opacity-50" />

          <div className="relative bg-card/80 backdrop-blur-xl border border-border/50 rounded-3xl p-6 md:p-8 shadow-2xl">
            {!isPlaying ? (
              /* Start Screen */
              <div className="text-center space-y-8">
                {/* Category Toggle */}
                <div className="flex justify-center">
                  <div className="inline-flex p-1 bg-muted/50 rounded-xl">
                    <button
                      onClick={() => setCategory("about_me")}
                      className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                        category === "about_me"
                          ? "bg-primary text-primary-foreground shadow-lg"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <User className="w-4 h-4" />
                      About Me
                    </button>
                    <button
                      onClick={() => setCategory("tech")}
                      className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                        category === "tech"
                          ? "bg-primary text-primary-foreground shadow-lg"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Brain className="w-4 h-4" />
                      Tech
                    </button>
                  </div>
                </div>

                {/* Description */}
                <div className="max-w-md mx-auto">
                  <p className="text-muted-foreground">
                    {category === "about_me"
                      ? "Test how well you know about my career, skills, projects, and certifications!"
                      : "Challenge yourself with MERN stack questions - JavaScript, React, Node.js, MongoDB & more!"}
                  </p>
                </div>

                {/* Start Button */}
                <Button
                  size="lg"
                  onClick={() => setShowNameModal(true)}
                  className="group px-8 py-6 text-lg rounded-xl"
                >
                  <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Start Quiz
                </Button>
              </div>
            ) : (
              /* Quiz Playing */
              <div className="space-y-6">
                {/* Header Stats */}
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-lg">
                      <Trophy className="w-4 h-4 text-primary" />
                      <span className="font-bold text-primary">
                        {correctCount}/{questionCount}
                      </span>
                    </div>
                    <div className="px-4 py-2 bg-muted/50 rounded-lg">
                      <span className="text-sm text-muted-foreground">
                        Q#{questionCount + 1}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {autoAdvanceTimer > 0 && (
                      <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 rounded-lg animate-pulse">
                        <Timer className="w-4 h-4 text-blue-500" />
                        <span className="font-medium text-blue-500">
                          Next in {autoAdvanceTimer}s
                        </span>
                      </div>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={endQuiz}
                      className="text-destructive hover:text-destructive"
                    >
                      <X className="w-4 h-4 mr-1" />
                      End
                    </Button>
                  </div>
                </div>

                {/* Question */}
                <AnimatePresence mode="wait">
                  {isLoading ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center py-16 space-y-4"
                    >
                      <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                      <p className="text-muted-foreground">
                        Generating question...
                      </p>
                    </motion.div>
                  ) : currentQuestion ? (
                    <motion.div
                      key={currentQuestion.question}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      {/* Question Text */}
                      <div className="bg-gradient-to-r from-primary/5 to-purple-500/5 rounded-xl p-6 border border-border/30">
                        <h3 className="text-lg md:text-xl font-semibold leading-relaxed">
                          {currentQuestion.question}
                        </h3>
                      </div>

                      {/* Options */}
                      <div className="grid gap-3">
                        {currentQuestion.options.map((option, index) => (
                          <motion.button
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => handleAnswer(index)}
                            disabled={selectedAnswer !== null}
                            className={getOptionClassName(index)}
                          >
                            <span className="flex items-center gap-3">
                              <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-muted/50 text-sm font-bold">
                                {String.fromCharCode(65 + index)}
                              </span>
                              {option}
                            </span>
                          </motion.button>
                        ))}
                      </div>

                      {/* Skip Button */}
                      {selectedAnswer === null && (
                        <div className="text-center">
                          <Button
                            variant="ghost"
                            onClick={loadNextQuestion}
                            className="text-muted-foreground"
                          >
                            Skip Question
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </Button>
                        </div>
                      )}
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Name Entry Modal */}
      <AnimatePresence>
        {showNameModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-md bg-card border border-border rounded-2xl p-6 shadow-2xl"
            >
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Enter Your Name</h3>
                <p className="text-muted-foreground text-sm">
                  Your name will be used to track your quiz progress
                </p>
                <Input
                  placeholder="Your name"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && startQuiz()}
                  className="text-center text-lg"
                  autoFocus
                />
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowNameModal(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button onClick={startQuiz} className="flex-1">
                    Start
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default QuizSection;
