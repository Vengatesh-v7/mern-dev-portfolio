import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Portfolio data for "About Me" questions
const portfolioContext = `
Name: Vengatesh K
Title: Full Stack Developer (MERN) with 3+ years of experience
Location: Cuddalore, India
Email: vengateshkv123@gmail.com

Experience:
1. Support Studio Technologies (June 2025 - Sep 2025) - Full Stack Developer
   - Developed ERP modules using Next.js, TypeScript, Tailwind CSS
   - Mentored junior developers
   - Implemented CRUD operations improving efficiency by 30%

2. AgileSoftLabs (Nov 2024 - May 2025) - Full Stack Developer
   - Built production-ready apps with Next.js, Node.js, MongoDB
   - Achieved 85%+ test coverage with Jest
   - Automated CI/CD with GitHub Actions

3. Redblox Technologies (Oct 2022 - Nov 2024) - Full Stack Developer
   - Built apps with React Native and Laravel
   - Learned NFTs and blockchain concepts

Projects:
1. Next Street - Platform for entrepreneurs (React, Nest.js, Redux, Jest)
2. Workspace 360 - ERP suite (Next.js, Node.js, Express, TypeScript)
3. Spryntz - Food ordering app (React Native, Laravel, Stripe)
4. Producer Bazaar - NFT marketplace for movie rights (Next.js, MongoDB)

Skills:
- Frontend: React, Next.js, React Native, TypeScript, Redux, Tailwind, MUI, Antd
- Backend: Node.js, Express, Nest.js, Laravel, PHP, Python
- Databases: MongoDB, PostgreSQL, MySQL, Redis, Mongoose, TypeORM
- Tools: Git, GitHub, GitLab, Jira, VS Code, Postman, Figma

Certifications:
- MERN Stack Development (Guvi, 2024)
- Soft Skill Development (TCS ION, 2024)
- Web Designing (Nextgen Solutions, 2022)
- Crash Course on Python (Coursera by Google, 2023)

Education:
- B.Sc Mathematics (2019) - St. Joseph's College, Cuddalore
- B.Ed Mathematics (2021) - TVR College of Education, Puducherry

Attributes: Leadership, Creativity, Collaborative, SmartWorker, ProblemSolving, Calmness, Adjustability
`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { category, previousQuestions = [] } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log(`Generating ${category} question. Previous questions count: ${previousQuestions.length}`);

    let systemPrompt = "";
    let userPrompt = "";

    if (category === "about_me") {
      systemPrompt = `You are a quiz question generator for a portfolio website. Generate questions about the portfolio owner based on the provided context. Questions should be factual and verifiable from the portfolio data.

IMPORTANT: Return ONLY a valid JSON object with this exact structure:
{
  "question": "The question text",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correctIndex": 0
}

Where correctIndex is 0-3 indicating which option is correct.`;

      userPrompt = `Portfolio Context:
${portfolioContext}

Previously asked questions (avoid these):
${previousQuestions.slice(-10).join(', ')}

Generate a new, unique multiple-choice question about Vengatesh's career, skills, experience, projects, education, or certifications. Make it interesting and varied. Return only the JSON object.`;
    } else {
      systemPrompt = `You are a technical quiz question generator specializing in MERN stack development. Generate simple to medium difficulty MCQ questions covering:
- JavaScript fundamentals (ES6+, closures, promises, async/await)
- React concepts (hooks, state, props, lifecycle, virtual DOM)
- Node.js and Express (middleware, routing, REST APIs)
- MongoDB (queries, aggregation, indexing, Mongoose)
- TypeScript basics
- Web security (XSS, CSRF, authentication)
- Current interview questions for MERN developers

IMPORTANT: Return ONLY a valid JSON object with this exact structure:
{
  "question": "The question text",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correctIndex": 0
}

Where correctIndex is 0-3 indicating which option is correct.`;

      userPrompt = `Previously asked questions (avoid these):
${previousQuestions.slice(-10).join(', ')}

Generate a new, unique MERN stack development question. Mix between theory, code snippets, and practical scenarios. Difficulty: Simple to Medium. Return only the JSON object.`;
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required. Please add credits." }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    
    console.log("AI Response:", content);

    // Parse the JSON response
    let questionData;
    try {
      // Try to extract JSON from the response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        questionData = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("No JSON found in response");
      }
    } catch (parseError) {
      console.error("JSON parse error:", parseError, "Content:", content);
      // Return a fallback question
      questionData = category === "about_me" 
        ? {
            question: "What is Vengatesh's primary role?",
            options: ["Full Stack Developer", "Data Scientist", "DevOps Engineer", "UI Designer"],
            correctIndex: 0
          }
        : {
            question: "Which hook is used for side effects in React?",
            options: ["useState", "useEffect", "useContext", "useReducer"],
            correctIndex: 1
          };
    }

    // Validate the response structure
    if (!questionData.question || !Array.isArray(questionData.options) || questionData.options.length !== 4 || typeof questionData.correctIndex !== 'number') {
      throw new Error("Invalid question structure");
    }

    return new Response(JSON.stringify(questionData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: unknown) {
    console.error('Error generating quiz question:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
