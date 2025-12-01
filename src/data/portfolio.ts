export const portfolioData = {
  personal: {
    name: "Vengatesh K",
    title: "Full Stack Developer (MERN)",
    email: "vengateshkv123@gmail.com",
    phone: "+91 9003638125",
    linkedin: "www.linkedin.com/in/vengateshk/",
    location: "Cuddalore, India",
    resumeUrl: "/Vengatesh_K_Resume.pdf",
  },

  summary:
    "Accomplished Full Stack Developer with over 3 years of experience building and maintaining robust web and mobile applications. Proficient in both front-end and back-end technologies, consistently delivering high-quality software solutions. Known for effective teamwork and technical leadership.",

  experience: [
    {
      id: 1,
      company: "Support Studio Technologies",
      role: "Full Stack Developer",
      period: "June 2025 - Sep 2025",
      current: true,
      description:
        "Led full-stack development projects using MERN stack, architecting scalable solutions and implementing best practices across multiple enterprise applications.",
      highlights: [
        "Architected and deployed production-ready web applications with React, Node.js, and MongoDB",
        "Implemented comprehensive testing strategies achieving 85%+ code coverage using Jest",
        "Automated CI/CD pipelines using GitHub Actions for streamlined deployments",
        "Mentored junior developers on code quality and best practices",
      ],
    },
    {
      id: 2,
      company: "AgileSoftLabs",
      role: "Full Stack Developer",
      period: "Nov 2024 - May 2025",
      current: false,
      description:
        "Developed and maintained full-stack web applications, collaborating with cross-functional teams to deliver high-quality software solutions on time.",
      highlights: [
        "Built responsive web applications using React Native and Laravel",
        "Developed core features including payment integration, order management, and user authentication",
        "Integrated third-party APIs and services for enhanced functionality",
        "Participated in agile ceremonies and code reviews to maintain code quality",
      ],
    },
    {
      id: 3,
      company: "Redblox Technologies",
      role: "Full Stack Developer",
      period: "Oct 2022 - Nov 2024",
      current: false,
      description:
        "Contributed to frontend and backend development for various projects, learning industry best practices and modern development workflows in a collaborative environment.",
      highlights: [
        "Developed the front-end UI for ERP modules using Next.js, TypeScript, and Tailwind CSS",
        "Streamlined codebase by standardizing folder structure and naming conventions",
        "Implemented CRUD operations improving data handling efficiency by 30%",
        "Configured Husky, ESLint, and Prettier reducing code review time significantly",
        "Built responsive interfaces ensuring seamless user experience across devices",
      ],
    },
  ],

  projects: [
    {
      id: 1,
      title: "Next Street",
      description:
        "A platform connecting entrepreneurs and small business owners with the right resources, from place-based small business strategies to capital transactions.",
      technologies: ["React JS", "Nest JS", "TypeScript", "Redux", "Jest"],
      highlights: [
        "Developed front-end UI using React and Redux",
        "Implemented key business logic for backend services",
        "Achieved 85%+ test coverage with Jest.js",
        "Automated CI/CD via GitHub Actions",
      ],
    },
    {
      id: 2,
      title: "Workspace 360",
      description:
        "A comprehensive ERP suite integrating multiple business management functions including Timesheet, Leave Management, Ticketing, Payroll, CRM, and Onboarding.",
      technologies: [
        "Next JS",
        "Node JS",
        "Express JS",
        "TypeScript",
        "Tailwind",
        "Antd",
      ],
      highlights: [
        "Led front-end development for multiple modules",
        "Standardized codebase folder structure",
        "Implemented Husky, lint, and prettier configurations",
        "Reduced code review time significantly",
      ],
    },
    {
      id: 3,
      title: "Spryntz",
      description:
        "A food ordering and dispatch app connecting consumers with local restaurants for convenient doorstep delivery.",
      technologies: ["React Native", "React JS", "Laravel"],
      highlights: [
        "Developed core features for Android and iOS",
        "Implemented onboarding, UI cards, order booking",
        "Contributed to Laravel backend development",
      ],
    },
    {
      id: 4,
      title: "Producer Bazaar",
      description:
        "An online marketplace for producers to showcase and trade movie rights with NFTs, albums, and more.",
      technologies: ["Next JS", "Node JS", "Express JS", "MongoDB"],
      highlights: [
        "Developed structured interface with smooth navigation",
        "Implemented responsive design",
        "Optimized layout for effortless browsing",
      ],
    },
  ],

  skills: {
    frontend: [
      "React JS",
      "Next JS",
      "React Native",
      "HTML",
      "CSS",
      "JavaScript",
      "Redux",
      "jQuery",
      "Bootstrap",
      "Tailwind",
      "Antd",
      "MUI",
    ],
    backend: ["Node JS", "Express JS", "Nest JS", "TypeScript", "Laravel"],
    databases: ["MongoDB", "PostgreSQL", "MySQL"],
    tools: [
      "VS Code",
      "Git",
      "GitHub",
      "GitLab",
      "Jira",
      "Postman",
      "Figma",
      "FileZilla",
    ],
  },

  certificates: [
    {
      title: "MERN Stack Development",
      issuer: "Guvi",
      year: "2024",
      image: "/src/assets/certificates/guvi.png",
    },
    {
      title: "Soft Skill Development",
      issuer: "TCS ION",
      year: "2024",
      image: "/src/assets/certificates/tcs_ion.png",
    },
    {
      title: "Web Designing",
      issuer: "Nextgen Solutions",
      year: "2022",
      image: "/src/assets/certificates/nextgen.png",
    },
    {
      title: "Crash Course on Python",
      issuer: "Coursera by Google",
      year: "2023",
      image: "/src/assets/certificates/coursera.png",
    },
  ],

  education: [
    {
      degree: "Bachelor of Science (Mathematics)",
      year: "2019",
      institution: "St. Joseph's College of Arts and Science, Cuddalore",
    },
    {
      degree: "Bachelor of Education (Mathematics)",
      year: "2021",
      institution: "TVR College of Education, Puducherry",
    },
  ],

  attributes: [
    "Leadership",
    "Creativity ",
    "Collaborative",
    "SmartWorker",
    "ProblemSolving",
    "Calmness",
    "Adjustability",
  ],
};
