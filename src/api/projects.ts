export interface Project {
  title: string;
  description: string;
  skills: string[];
  difficulty: string;
  estimatedTime: string;
}

export async function generateProjects({
  course,
  level,
}: {
  course: string;
  level: string;
}): Promise<Project[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const projectTemplates: Record<string, Project[]> = {
    "Frontend Developer": [
      {
        title: "Personal Portfolio Website",
        description: "Build a stunning portfolio showcasing your skills and projects with modern animations and responsive design.",
        skills: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
        difficulty: "Intermediate",
        estimatedTime: "2-3 weeks",
      },
      {
        title: "Task Management Dashboard",
        description: "Create a full-featured task management app with drag-and-drop, filters, and real-time updates.",
        skills: ["React", "State Management", "REST API", "UI/UX"],
        difficulty: "Intermediate",
        estimatedTime: "3-4 weeks",
      },
      {
        title: "E-Commerce Product Catalog",
        description: "Design an elegant product catalog with search, filtering, cart functionality, and checkout flow.",
        skills: ["React", "E-commerce", "Payment Integration"],
        difficulty: "Advanced",
        estimatedTime: "4-6 weeks",
      },
    ],


    "Backend Developer": [
      {
        title: "REST API for Course Platform",
        description: "Develop secure REST APIs for managing users, courses, and enrollments.",
        skills: ["Node.js", "Express", "REST API", "JWT"],
        difficulty: "Intermediate",
        estimatedTime: "3-4 weeks",
      },
      {
        title: "Authentication & Authorization Service",
        description: "Build a backend service handling login, roles, permissions, and token-based authentication.",
        skills: ["Authentication", "Security", "Databases"],
        difficulty: "Intermediate",
        estimatedTime: "2-3 weeks",
      },
      {
        title: "Scalable Backend System",
        description: "Design a scalable backend with caching, pagination, and performance optimization.",
        skills: ["System Design", "Caching", "Databases"],
        difficulty: "Advanced",
        estimatedTime: "4-6 weeks",
      },
    ],


    "Full Stack Developer": [
      {
        title: "Learning Management System",
        description: "Build a complete LMS with user authentication, course enrollment, progress tracking, and dashboards.",
        skills: ["React", "Node.js", "Express", "Database"],
        difficulty: "Intermediate",
        estimatedTime: "4-6 weeks",
      },
      {
        title: "E-Commerce Web Application",
        description: "Create a full-stack e-commerce app with product management, cart, orders, and payment integration.",
        skills: ["Frontend", "Backend", "Stripe", "MongoDB"],
        difficulty: "Advanced",
        estimatedTime: "6-8 weeks",
      },
      {
        title: "Job Portal Platform",
        description: "Develop a job portal where recruiters post jobs and candidates apply with role-based access.",
        skills: ["React", "APIs", "Authentication", "Database"],
        difficulty: "Intermediate",
        estimatedTime: "4-5 weeks",
      },
    ],
    "Java Developer": [
      {
        title: "Student Management System",
        description: "Create a Java-based application to manage students, courses, and grades using OOP principles.",
        skills: ["Java", "OOP", "Collections", "JDBC"],
        difficulty: "Beginner",
        estimatedTime: "2-3 weeks",
      },
      {
        title: "Spring Boot REST API",
        description: "Build RESTful APIs using Spring Boot with validation and database integration.",
        skills: ["Java", "Spring Boot", "REST", "Hibernate"],
        difficulty: "Intermediate",
        estimatedTime: "3-4 weeks",
      },
      {
        title: "Online Banking Backend",
        description: "Develop a secure backend system for transactions, accounts, and user management.",
        skills: ["Java", "Security", "System Design"],
        difficulty: "Advanced",
        estimatedTime: "4-6 weeks",
      },
    ],

    "Python Developer": [
      {
        title: "Automation Tool",
        description: "Build Python scripts to automate repetitive tasks like file handling and data processing.",
        skills: ["Python", "Automation", "Scripting"],
        difficulty: "Beginner",
        estimatedTime: "1-2 weeks",
      },
      {
        title: "REST API with FastAPI",
        description: "Create a backend API using FastAPI with database connectivity and validation.",
        skills: ["Python", "FastAPI", "SQL"],
        difficulty: "Intermediate",
        estimatedTime: "3-4 weeks",
      },
      {
        title: "Web Scraping & Analysis Tool",
        description: "Develop a tool to scrape data from websites and perform basic analysis.",
        skills: ["Python", "Web Scraping", "Data Processing"],
        difficulty: "Advanced",
        estimatedTime: "3-5 weeks",
      },
    ],

    "Data Analyst": [
      {
        title: "Sales Data Analysis",
        description: "Analyze sales data to identify trends and generate business insights.",
        skills: ["Excel", "SQL", "Data Analysis"],
        difficulty: "Beginner",
        estimatedTime: "2-3 weeks",
      },
      {
        title: "Interactive Dashboard",
        description: "Build dashboards to visualize KPIs and performance metrics.",
        skills: ["Python", "Pandas", "Data Visualization"],
        difficulty: "Intermediate",
        estimatedTime: "3-4 weeks",
      },
      {
        title: "Customer Segmentation Analysis",
        description: "Perform clustering and segmentation to understand customer behavior.",
        skills: ["EDA", "Statistics", "Python"],
        difficulty: "Advanced",
        estimatedTime: "4-5 weeks",
      },
    ],


    "AI Engineer": [
      {
        title: "AI Chatbot",
        description: "Build an AI-powered chatbot capable of answering user questions using NLP.",
        skills: ["Python", "NLP", "Transformers"],
        difficulty: "Intermediate",
        estimatedTime: "4-5 weeks",
      },
      {
        title: "Recommendation System",
        description: "Develop a recommendation engine based on user behavior and preferences.",
        skills: ["Machine Learning", "Python", "Data Processing"],
        difficulty: "Advanced",
        estimatedTime: "5-6 weeks",
      },
      {
        title: "Text Classification System",
        description: "Create a model to classify text into categories using deep learning.",
        skills: ["Deep Learning", "NLP", "Model Training"],
        difficulty: "Advanced",
        estimatedTime: "4-6 weeks",
      },
    ],


    "Cloud Engineer": [
      {
        title: "Cloud-Deployed Web App",
        description: "Deploy a web application on cloud infrastructure with monitoring enabled.",
        skills: ["AWS", "EC2", "Cloud Deployment"],
        difficulty: "Intermediate",
        estimatedTime: "3-4 weeks",
      },
      {
        title: "Serverless Backend",
        description: "Build a serverless backend using cloud functions and managed services.",
        skills: ["AWS Lambda", "API Gateway"],
        difficulty: "Advanced",
        estimatedTime: "4-5 weeks",
      },
      {
        title: "Cloud Cost Optimization Tool",
        description: "Create a system to monitor and optimize cloud resource usage.",
        skills: ["Cloud Architecture", "Monitoring"],
        difficulty: "Advanced",
        estimatedTime: "4-6 weeks",
      },
    ],


    "DevOps Engineer": [
      {
        title: "CI/CD Pipeline",
        description: "Set up automated build, test, and deployment pipelines.",
        skills: ["CI/CD", "GitHub Actions", "Docker"],
        difficulty: "Intermediate",
        estimatedTime: "2-3 weeks",
      },
      {
        title: "Containerized Application",
        description: "Containerize applications and manage deployments using Docker.",
        skills: ["Docker", "Containers"],
        difficulty: "Intermediate",
        estimatedTime: "3-4 weeks",
      },
      {
        title: "Kubernetes Deployment",
        description: "Deploy and scale applications using Kubernetes clusters.",
        skills: ["Kubernetes", "Monitoring"],
        difficulty: "Advanced",
        estimatedTime: "4-6 weeks",
      },
    ],

    "Cybersecurity": [
      {
        title: "Vulnerability Scanner",
        description: "Build a tool to scan applications for common security vulnerabilities.",
        skills: ["OWASP", "Security Basics", "Networking"],
        difficulty: "Intermediate",
        estimatedTime: "3-4 weeks",
      },
      {
        title: "Secure Authentication System",
        description: "Implement secure login mechanisms with encryption and access control.",
        skills: ["Authentication", "Encryption"],
        difficulty: "Intermediate",
        estimatedTime: "3-4 weeks",
      },
      {
        title: "Security Monitoring Dashboard",
        description: "Create a dashboard to monitor and analyze security events.",
        skills: ["SIEM", "Threat Detection"],
        difficulty: "Advanced",
        estimatedTime: "4-6 weeks",
      },
    ],

    "Software Development Engineer (SDE)": [
      {
        title: "DSA Practice Platform",
        description: "Build a platform for practicing data structures and algorithms with problem tracking.",
        skills: ["DSA", "Problem Solving", "APIs"],
        difficulty: "Intermediate",
        estimatedTime: "4-5 weeks",
      },
      {
        title: "Scalable Backend System",
        description: "Design a scalable system focusing on performance and reliability.",
        skills: ["System Design", "Databases", "Caching"],
        difficulty: "Advanced",
        estimatedTime: "5-6 weeks",
      },
      {
        title: "Code Evaluation Engine",
        description: "Create a system to evaluate and execute code submissions securely.",
        skills: ["System Design", "Security"],
        difficulty: "Advanced",
        estimatedTime: "6-8 weeks",
      },
    ],

  };

  return projectTemplates[course] || [];
}
