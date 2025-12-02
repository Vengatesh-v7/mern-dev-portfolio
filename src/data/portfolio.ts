export const portfolioData = {
  personal: {
    name: "Vengatesh K",
    title: "Full Stack Developer (MERN)",
    email: "vengateshkv123@gmail.com",
    phone: "+91 9003638125",
    linkedin: "www.linkedin.com/in/vengateshk/",
    github: "https://github.com/Vengatesh-v7",
    // github: "https://github.com/Vengatesh-K",
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
      location: "Puducherry",
      current: true,
      description:
        "Led full-stack development projects using MERN stack, architecting scalable solutions and implementing best practices across multiple enterprise applications.",
      highlights: [
        "Developed the front-end UI for ERP modules using Next.js, TypeScript, and Tailwind CSS",
        "Mentored junior developers on code quality and best practices",
        "Streamlined codebase by standardizing folder structure and naming conventions",
        "Implemented CRUD operations improving data handling efficiency by 30%",
        "Configured Husky, ESLint, and Prettier reducing code review time",
      ],
      // logo: "/src/assets/exprience/sst.png",
      logo: "@/assets/exprience/sst.png",
    },
    {
      id: 2,
      company: "AgileSoftLabs",
      role: "Full Stack Developer",
      location: "Puducherry",
      period: "Nov 2024 - May 2025",
      current: false,
      description:
        "Developed and maintained full-stack web applications, collaborating with cross-functional teams to deliver high-quality software solutions on time.",
      highlights: [
        "Architected and deployed production-ready web applications with Next.js, Node.js, and MongoDB",
        "Implemented comprehensive testing strategies achieving 85%+ code coverage using Jest",
        "Developed core features including payment integration, order management, and user authentication",
        "Automated CI/CD pipelines using GitHub Actions for streamlined deployments",
      ],
      logo: "/src/assets/exprience/ags.png",
    },
    {
      id: 3,
      company: "Redblox Technologies",
      role: "Full Stack Developer",
      location: "Puducherry",
      period: "Oct 2022 - Nov 2024",
      current: false,
      description:
        "Contributed to frontend and backend development for various projects, learning industry best practices and modern development workflows in a collaborative environment.",
      highlights: [
        "Built responsive web applications using React Native and Laravel",
        "Integrated third-party APIs and services for enhanced functionality",
        "Participated in agile ceremonies and code reviews to maintain code quality",
        "Learned the NFTs and blockchain concepts and implemented them in the project",
      ],
      logo: "/src/assets/exprience/redblox.png",
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
        "Implemented key business logic for backend services using Nest.js",
        "Achieved 85%+ test coverage with Jest.js",
        "Automated CI/CD via GitHub Actions",
      ],
      url: "https://demo-scale.com/",
      logo: "/src/assets/projects/nextstreet.avif",
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
        "Led front-end and backend development for multiple modules",
        "Standardized codebase folder structure",
        "Implemented Husky, lint, and prettier configurations",
        "Reduced code review time significantly",
      ],
      url: "https://app.workspace360.io/login",
      logo: "/src/assets/projects/workspace360.webp",
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
        "Integrated payment gateway for secure transactions using Stripe",
        "Contributed to Laravel backend development",
      ],
      url: "https://spryntz.com/",
      logo: "/src/assets/projects/spryntz.png",
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
        "Learned the fundamentals of NFTs and blockchain",
        "Optimized layout for effortless browsing",
      ],
      url: "https://www.producerbazaar.com/",
      logo: "/src/assets/projects/producer_bazaar.png",
    },
  ],

  skills: {
    frontend: [
      {
        name: "React JS",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      },
      {
        name: "Next JS",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
      },
      {
        name: "React Native",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      },
      {
        name: "HTML",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
      },
      {
        name: "CSS",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
      },
      {
        name: "JavaScript",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      },
      {
        name: "Redux",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
      },
      {
        name: "jQuery",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jquery/jquery-original.svg",
      },
      {
        name: "Bootstrap",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
      },
      {
        name: "Tailwind",
        logo: "https://static.cdnlogo.com/logos/t/58/tailwindcss.svg",
      },
      {
        name: "Antd",
        logo: "https://cdn.worldvectorlogo.com/logos/ant-design-2.svg",
      },
      {
        name: "MUI",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg",
      },
    ],
    backend: [
      {
        name: "Node JS",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      },
      {
        name: "Express JS",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
      },
      {
        name: "Nest JS",
        logo: "https://static.cdnlogo.com/logos/n/57/nestjs.svg",
      },
      {
        name: "TypeScript",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      },
      {
        name: "Laravel",
        logo: "https://static.cdnlogo.com/logos/l/23/laravel.svg",
      },
    ],
    databases: [
      {
        name: "MongoDB",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
      },
      {
        name: "PostgreSQL",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
      },
      {
        name: "MySQL",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
      },
    ],
    tools: [
      {
        name: "VS Code",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
      },
      {
        name: "Git",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
      },
      {
        name: "GitHub",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
      },
      {
        name: "GitLab",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg",
      },
      {
        name: "Jira",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg",
      },
      {
        name: "Postman",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-plain.svg",
      },
      {
        name: "Figma",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-plain.svg",
      },
      {
        name: "FileZilla",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/filezilla/filezilla-plain.svg",
      },
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
