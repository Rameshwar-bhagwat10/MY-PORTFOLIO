// Projects data - easily manageable and updatable
export const projectsData = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with advanced features like real-time inventory, payment integration, and comprehensive admin dashboard.",
    category: "Full-Stack",
    image: "/assets/ecommerce.jpg",
    screenshots: [
      "/assets/ecommerce1.png",
      "/assets/ecommerce2.png",
      "/assets/ecommerce.jpg"
    ],
    techStack: ["React", "Next.js", "Node.js", "MongoDB", "Express"],
    features: [
      "Real-time inventory management",
      "Secure payment integration with Stripe",
      "Advanced search & filtering system",
      "Admin dashboard with analytics",
      "Responsive design for all devices",
      "User authentication & authorization",
      "Shopping cart & wishlist functionality"
    ],
    liveDemo: "https://your-ecommerce-demo.com",
    github: "https://github.com/yourusername/ecommerce-platform",
    videoDemo: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: 2,
    title: "AI ChatBot Assistant",
    description: "Intelligent chatbot with natural language processing, real-time messaging, and AI-powered responses using modern AI technologies.",
    category: "AI",
    image: "/assets/chatbot.png",
    screenshots: [
      "/assets/chatbot1.png",
      "/assets/chatbot2.png",
      "/assets/chatbot.png"
    ],
    techStack: ["React", "Python", "Node.js", "MongoDB", "Express"],
    features: [
      "Natural language processing with OpenAI",
      "Real-time messaging system",
      "Context-aware AI responses",
      "User authentication & chat history",
      "Voice recognition support",
      "Multi-language support",
      "Custom training capabilities"
    ],
    liveDemo: "https://your-chatbot-demo.com",
    github: "https://github.com/yourusername/ai-chatbot"
  },
  {
    id: 3,
    title: "Portfolio Website",
    description: "Modern, responsive portfolio with 3D animations, dark mode toggle, and interactive components showcasing professional work.",
    category: "Web",
    image: "/assets/portfolio.png",
    screenshots: [
      "/assets/portfolio1.png",
      "/assets/portfolio2.png",
      "/assets/portfolio.png"
    ],
    techStack: ["Next.js", "React", "JavaScript", "Tailwind", "TypeScript"],
    features: [
      "3D animations with Three.js & React Three Fiber",
      "Dark/Light mode toggle with smooth transitions",
      "Fully responsive design",
      "Interactive components & animations",
      "SEO optimized with Next.js",
      "Contact form with email integration",
      "Performance optimized"
    ],
    liveDemo: "https://your-portfolio-demo.com",
    github: "https://github.com/yourusername/portfolio-website"
  },
  {
    id: 4,
    title: "Attendance Management ",
    description: "Comprehensive attendance tracking system with real-time updates, analytics, and automated reporting for educational institutions.",
    category: "Full-Stack",
    image: "/assets/Attendance.png",
    screenshots: [
      "/assets/Attendance1.png",
      "/assets/Attendance2.png",
      "/assets/Attendance.png"
    ],
    techStack: ["React", "Node.js", "MongoDB", "Express", "JavaScript"],
    features: [
      "Real-time attendance tracking",
      "Student & teacher dashboards",
      "Automated report generation",
      "Analytics & insights",
      "QR code based check-in/out",
      "Email notifications",
      "Export data to Excel/PDF"
    ],
    liveDemo: "https://your-attendance-demo.com",
    github: "https://github.com/yourusername/attendance-system"
  }
];

export const categories = ["All", "Full-Stack", "Web", "AI"];

// Tech stack icons mapping for easy maintenance
export const techIcons = {
  'React': 'SiReact',
  'Next.js': 'SiNextdotjs', 
  'Node.js': 'SiNodedotjs',
  'MongoDB': 'SiMongodb',
  'Python': 'SiPython',
  'JavaScript': 'SiJavascript',
  'TypeScript': 'SiTypescript',
  'Tailwind': 'SiTailwindcss',
  'Express': 'SiExpress',
  'PostgreSQL': 'SiPostgresql',
};