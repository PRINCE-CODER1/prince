// ─── Site Constants & Content Data ─────────────────────────────────────────

export const SITE = {
  name: "Prince Kumar",
  title: "Prince Kumar — Creative Developer & Digital Architect",
  description:
    "Creative developer crafting ultra-premium, cinematic digital experiences with cutting-edge web technologies.",
  url: "https://princekumar.dev",
  email: "hello@princekumar.dev",
  location: "India",
  availability: "Available for Freelance",
} as const;

export const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Tech", href: "#tech" },
  { label: "Contact", href: "#contact" },
] as const;

export const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com/princekumar", icon: "github" },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/princekumar",
    icon: "linkedin",
  },
  { label: "Twitter", href: "https://twitter.com/princekumar", icon: "twitter" },
  {
    label: "Dribbble",
    href: "https://dribbble.com/princekumar",
    icon: "dribbble",
  },
] as const;

export const HERO_STATS = [
  { value: 50, suffix: "+", label: "Projects Delivered" },
  { value: 30, suffix: "+", label: "Happy Clients" },
  { value: 5, suffix: "+", label: "Years Experience" },
] as const;

export const ABOUT_STATS = [
  { value: 50, suffix: "+", label: "Projects Completed" },
  { value: 30, suffix: "+", label: "Happy Clients" },
  { value: 5, suffix: "+", label: "Years Experience" },
  { value: 10, suffix: "+", label: "Awards Won" },
] as const;

export interface TimelineItem {
  year: string;
  title: string;
  company: string;
  description: string;
}

export const TIMELINE: TimelineItem[] = [
  {
    year: "2024 — Present",
    title: "Senior Creative Developer",
    company: "Freelance",
    description:
      "Crafting premium digital experiences for global brands with cinematic web technologies.",
  },
  {
    year: "2022 — 2024",
    title: "Lead Frontend Engineer",
    company: "Digital Agency",
    description:
      "Led a team building award-winning interactive websites with Three.js, GSAP, and React.",
  },
  {
    year: "2020 — 2022",
    title: "Creative Developer",
    company: "Tech Studio",
    description:
      "Developed immersive web experiences combining design thinking with performance engineering.",
  },
  {
    year: "2019 — 2020",
    title: "Frontend Developer",
    company: "Startup",
    description:
      "Built responsive, high-performance applications and established design systems.",
  },
];

export const SKILLS = [
  { name: "React / Next.js", level: 95 },
  { name: "TypeScript", level: 92 },
  { name: "Three.js / WebGL", level: 88 },
  { name: "GSAP Animation", level: 90 },
  { name: "UI / UX Design", level: 85 },
  { name: "Node.js", level: 82 },
] as const;

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: string;
  tags: string[];
  image: string;
  color: string;
  year: string;
}

export const PROJECTS: Project[] = [
  {
    id: "nocturne-studio",
    title: "Nocturne Studio",
    description:
      "Luxury landing page with cinematic scroll reveals and a spatial Three.js centerpiece.",
    longDescription:
      "A premium studio website featuring custom WebGL shaders, orchestrated scroll animations, and editorial typography that creates an unforgettable first impression.",
    category: "Web Design",
    tags: ["WebGL", "GSAP", "Editorial", "Three.js"],
    image: "/images/project-1.jpg",
    color: "#00D4FF",
    year: "2024",
  },
  {
    id: "orbit-archive",
    title: "Orbit Archive",
    description:
      "Editorial portfolio grid with fast filtering, magnetic CTAs, and generous whitespace.",
    longDescription:
      "A curated portfolio platform with advanced filtering, smooth layout transitions, and a minimal design language that lets the work speak for itself.",
    category: "Portfolio",
    tags: ["React", "Framer Motion", "CSS Grid", "Minimal"],
    image: "/images/project-2.jpg",
    color: "#8B5CF6",
    year: "2024",
  },
  {
    id: "signal-house",
    title: "Signal House",
    description:
      "Conversion-focused brand website tuned for motion, clarity, and measurable speed.",
    longDescription:
      "A performance-first brand website that balances visual richness with sub-second load times, achieving 98+ Lighthouse scores without sacrificing animation quality.",
    category: "Branding",
    tags: ["Performance", "SVG Animation", "Optimization", "Next.js"],
    image: "/images/project-3.jpg",
    color: "#10B981",
    year: "2023",
  },
  {
    id: "quantum-dash",
    title: "Quantum Dashboard",
    description:
      "Real-time analytics dashboard with fluid data visualizations and dark mode.",
    longDescription:
      "An enterprise-grade dashboard featuring real-time data streams, interactive charts with smooth transitions, and a pixel-perfect dark interface.",
    category: "Web App",
    tags: ["React", "D3.js", "WebSocket", "TypeScript"],
    image: "/images/project-4.jpg",
    color: "#F59E0B",
    year: "2023",
  },
  {
    id: "aurora-mobile",
    title: "Aurora Mobile",
    description:
      "Cross-platform mobile app with gesture-driven UI and premium animations.",
    longDescription:
      "A React Native application featuring physics-based animations, haptic feedback integration, and a design system that feels native on both iOS and Android.",
    category: "Mobile",
    tags: ["React Native", "Reanimated", "Gesture Handler"],
    image: "/images/project-5.jpg",
    color: "#EC4899",
    year: "2023",
  },
  {
    id: "velvet-ecommerce",
    title: "Velvet Commerce",
    description:
      "Luxury e-commerce experience with immersive product showcases and smooth checkout.",
    longDescription:
      "A high-end e-commerce platform featuring 3D product viewers, cinematic page transitions, and a frictionless checkout flow that increased conversions by 40%.",
    category: "E-Commerce",
    tags: ["Next.js", "Three.js", "Stripe", "Headless CMS"],
    image: "/images/project-6.jpg",
    color: "#06B6D4",
    year: "2022",
  },
];

export const PROJECT_CATEGORIES = [
  "All",
  "Web Design",
  "Portfolio",
  "Branding",
  "Web App",
  "Mobile",
  "E-Commerce",
] as const;

export interface Service {
  title: string;
  description: string;
  features: string[];
  icon: string;
  price: string;
  popular?: boolean;
}

export const SERVICES: Service[] = [
  {
    title: "Creative Development",
    description:
      "Custom-built websites with premium animations, 3D effects, and cinematic experiences.",
    features: [
      "Custom WebGL & Three.js",
      "GSAP Scroll Animations",
      "Responsive & Accessible",
      "Performance Optimized",
      "SEO Best Practices",
    ],
    icon: "code",
    price: "From $5,000",
  },
  {
    title: "UI/UX Design",
    description:
      "Pixel-perfect interfaces with obsessive attention to typography, spacing, and motion.",
    features: [
      "User Research & Strategy",
      "Wireframes & Prototypes",
      "Design Systems",
      "Motion Design",
      "Figma Deliverables",
    ],
    icon: "palette",
    price: "From $3,000",
    popular: true,
  },
  {
    title: "Full-Stack Solutions",
    description:
      "End-to-end development from database architecture to polished frontend experiences.",
    features: [
      "Next.js & React",
      "API Development",
      "Database Design",
      "Authentication & Security",
      "Cloud Deployment",
    ],
    icon: "layers",
    price: "From $8,000",
  },
  {
    title: "Consulting & Audit",
    description:
      "Expert review of your digital products with actionable performance and UX improvements.",
    features: [
      "Performance Audit",
      "UX Review",
      "Code Quality Assessment",
      "Accessibility Compliance",
      "Strategic Recommendations",
    ],
    icon: "search",
    price: "From $1,500",
  },
];

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Sarah Mitchell",
    role: "CEO",
    company: "Nocturne Studio",
    content:
      "Prince transformed our digital presence completely. The attention to detail and animation quality is unlike anything we've seen. Our engagement increased by 300%.",
    rating: 5,
    avatar: "/images/avatar-1.jpg",
  },
  {
    name: "James Chen",
    role: "CTO",
    company: "TechVault",
    content:
      "Working with Prince was a revelation. He brought a level of craft and performance optimization that exceeded all expectations. Truly world-class work.",
    rating: 5,
    avatar: "/images/avatar-2.jpg",
  },
  {
    name: "Elena Rodriguez",
    role: "Creative Director",
    company: "Orbit Agency",
    content:
      "The portfolio Prince built for us won an Awwwards honorable mention. His understanding of motion design and web performance is unparalleled.",
    rating: 5,
    avatar: "/images/avatar-3.jpg",
  },
  {
    name: "David Park",
    role: "Founder",
    company: "Signal House",
    content:
      "Prince doesn't just build websites — he crafts experiences. Every micro-interaction feels intentional and premium. Highly recommend.",
    rating: 5,
    avatar: "/images/avatar-4.jpg",
  },
  {
    name: "Aria Thompson",
    role: "Product Manager",
    company: "Quantum Labs",
    content:
      "Exceptional work on our dashboard. Prince's ability to make complex data feel intuitive and beautiful is a rare talent.",
    rating: 5,
    avatar: "/images/avatar-5.jpg",
  },
  {
    name: "Marcus Wei",
    role: "Design Lead",
    company: "Velvet Co",
    content:
      "The e-commerce experience Prince created drove a 40% conversion increase. His technical skills paired with design sensibility make him truly unique.",
    rating: 5,
    avatar: "/images/avatar-6.jpg",
  },
];

export interface TechItem {
  name: string;
  icon: string;
  category: string;
  color: string;
}

export const TECH_STACK: TechItem[] = [
  { name: "React", icon: "react", category: "Frontend", color: "#61DAFB" },
  { name: "Next.js", icon: "nextjs", category: "Frontend", color: "#ffffff" },
  {
    name: "TypeScript",
    icon: "typescript",
    category: "Frontend",
    color: "#3178C6",
  },
  {
    name: "Three.js",
    icon: "threejs",
    category: "Frontend",
    color: "#ffffff",
  },
  {
    name: "Tailwind CSS",
    icon: "tailwind",
    category: "Frontend",
    color: "#06B6D4",
  },
  {
    name: "Framer Motion",
    icon: "framer",
    category: "Frontend",
    color: "#BB4BFF",
  },
  { name: "GSAP", icon: "gsap", category: "Frontend", color: "#88CE02" },
  { name: "Node.js", icon: "nodejs", category: "Backend", color: "#339933" },
  { name: "Python", icon: "python", category: "Backend", color: "#3776AB" },
  {
    name: "PostgreSQL",
    icon: "postgresql",
    category: "Backend",
    color: "#4169E1",
  },
  { name: "MongoDB", icon: "mongodb", category: "Backend", color: "#47A248" },
  { name: "GraphQL", icon: "graphql", category: "Backend", color: "#E10098" },
  { name: "Figma", icon: "figma", category: "Design", color: "#F24E1E" },
  { name: "Blender", icon: "blender", category: "Design", color: "#E87D0D" },
  { name: "Docker", icon: "docker", category: "Tools", color: "#2496ED" },
  { name: "AWS", icon: "aws", category: "Tools", color: "#FF9900" },
  { name: "Vercel", icon: "vercel", category: "Tools", color: "#ffffff" },
  { name: "Git", icon: "git", category: "Tools", color: "#F05032" },
];

export const TECH_CATEGORIES = [
  "All",
  "Frontend",
  "Backend",
  "Design",
  "Tools",
] as const;

export const ACHIEVEMENTS = [
  { value: 50, suffix: "+", label: "Projects Completed" },
  { value: 30, suffix: "+", label: "Happy Clients" },
  { value: 10, suffix: "+", label: "Awards Won" },
  { value: 99, suffix: "%", label: "Client Satisfaction" },
] as const;
