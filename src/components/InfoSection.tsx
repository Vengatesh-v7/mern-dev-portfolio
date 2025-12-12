import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { 
  Eye, 
  Users, 
  Gamepad2, 
  Trophy, 
  TrendingUp, 
  Calendar,
  BarChart3,
  Clock
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { CountUpNumber } from "./CountUpNumber";

interface AnalyticsData {
  totalViews: number;
  todayViews: number;
  totalQuizSessions: number;
  totalQuizQuestions: number;
  totalCorrectAnswers: number;
  averageScore: number;
  topCategories: { category: string; count: number }[];
  recentQuizzes: { player_name: string; correct_answers: number; total_questions: number; category: string }[];
}

export const InfoSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalViews: 0,
    todayViews: 0,
    totalQuizSessions: 0,
    totalQuizQuestions: 0,
    totalCorrectAnswers: 0,
    averageScore: 0,
    topCategories: [],
    recentQuizzes: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();

    // Set up realtime subscription for page views
    const pageViewsChannel = supabase
      .channel('page-views-changes')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'page_views' },
        () => fetchAnalytics()
      )
      .subscribe();

    const quizChannel = supabase
      .channel('quiz-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'quiz_sessions' },
        () => fetchAnalytics()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(pageViewsChannel);
      supabase.removeChannel(quizChannel);
    };
  }, []);

  const fetchAnalytics = async () => {
    try {
      // Fetch total page views
      const { count: totalViews } = await supabase
        .from('page_views')
        .select('*', { count: 'exact', head: true });

      // Fetch today's views
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const { count: todayViews } = await supabase
        .from('page_views')
        .select('*', { count: 'exact', head: true })
        .gte('viewed_at', today.toISOString());

      // Fetch quiz statistics
      const { data: quizData } = await supabase
        .from('quiz_sessions')
        .select('*');

      const totalQuizSessions = quizData?.length || 0;
      const totalQuizQuestions = quizData?.reduce((sum, q) => sum + (q.total_questions || 0), 0) || 0;
      const totalCorrectAnswers = quizData?.reduce((sum, q) => sum + (q.correct_answers || 0), 0) || 0;
      const averageScore = totalQuizQuestions > 0 
        ? Math.round((totalCorrectAnswers / totalQuizQuestions) * 100) 
        : 0;

      // Top categories
      const categoryCount: Record<string, number> = {};
      quizData?.forEach(q => {
        if (q.category) {
          categoryCount[q.category] = (categoryCount[q.category] || 0) + 1;
        }
      });
      const topCategories = Object.entries(categoryCount)
        .map(([category, count]) => ({ category, count }))
        .sort((a, b) => b.count - a.count);

      // Recent quizzes
      const recentQuizzes = quizData
        ?.filter(q => q.player_name && q.ended_at)
        .sort((a, b) => new Date(b.ended_at!).getTime() - new Date(a.ended_at!).getTime())
        .slice(0, 5)
        .map(q => ({
          player_name: q.player_name,
          correct_answers: q.correct_answers,
          total_questions: q.total_questions,
          category: q.category
        })) || [];

      setAnalytics({
        totalViews: totalViews || 0,
        todayViews: todayViews || 0,
        totalQuizSessions,
        totalQuizQuestions,
        totalCorrectAnswers,
        averageScore,
        topCategories,
        recentQuizzes
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { 
      icon: Eye, 
      label: "Total Page Views", 
      value: analytics.totalViews,
      color: "from-blue-500 to-cyan-500"
    },
    { 
      icon: Calendar, 
      label: "Views Today", 
      value: analytics.todayViews,
      color: "from-green-500 to-emerald-500"
    },
    { 
      icon: Gamepad2, 
      label: "Quiz Sessions", 
      value: analytics.totalQuizSessions,
      color: "from-purple-500 to-pink-500"
    },
    { 
      icon: Trophy, 
      label: "Avg Quiz Score", 
      value: analytics.averageScore,
      suffix: "%",
      color: "from-orange-500 to-amber-500"
    },
  ];

  return (
    <section
      id="info"
      ref={ref}
      className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 relative bg-muted/30"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <BarChart3 className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Site Analytics
            </h2>
          </div>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
            Real-time statistics and visitor insights
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-12"
        >
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              className="relative group"
            >
              <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 h-full">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3 sm:mb-4`}>
                  <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-1">
                  {loading ? (
                    <span className="animate-pulse">...</span>
                  ) : (
                    <CountUpNumber value={`${stat.value}${stat.suffix || ''}`} />
                  )}
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Detailed Stats */}
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
          {/* Quiz Performance */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-card border border-border/50"
          >
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h3 className="text-base sm:text-lg font-semibold text-foreground">Quiz Performance</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total Questions Answered</span>
                <span className="font-semibold text-foreground">{analytics.totalQuizQuestions}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Correct Answers</span>
                <span className="font-semibold text-green-500">{analytics.totalCorrectAnswers}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Success Rate</span>
                <span className="font-semibold text-primary">{analytics.averageScore}%</span>
              </div>
              
              {/* Category Distribution */}
              {analytics.topCategories.length > 0 && (
                <div className="pt-4 border-t border-border/50">
                  <p className="text-xs text-muted-foreground mb-3">Category Distribution</p>
                  <div className="space-y-2">
                    {analytics.topCategories.map((cat) => (
                      <div key={cat.category} className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-primary to-purple-500 rounded-full"
                            style={{ 
                              width: `${(cat.count / analytics.totalQuizSessions) * 100}%` 
                            }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground min-w-[80px]">
                          {cat.category} ({cat.count})
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Recent Quiz Players */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-card border border-border/50"
          >
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <Users className="w-5 h-5 text-primary" />
              <h3 className="text-base sm:text-lg font-semibold text-foreground">Recent Quiz Players</h3>
            </div>
            
            {analytics.recentQuizzes.length > 0 ? (
              <div className="space-y-3">
                {analytics.recentQuizzes.map((quiz, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                        {quiz.player_name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{quiz.player_name}</p>
                        <p className="text-xs text-muted-foreground">{quiz.category}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-foreground">
                        {quiz.correct_answers}/{quiz.total_questions}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {Math.round((quiz.correct_answers / quiz.total_questions) * 100)}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Gamepad2 className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p className="text-sm">No quiz sessions yet</p>
                <p className="text-xs">Be the first to play!</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
