# Projects Section - Portfolio Component

A modern, interactive Projects section built with Next.js, featuring advanced animations, filtering, search functionality, and a beautiful carousel layout.

## 🚀 Features

### Core Features
- **Interactive Carousel**: Smooth Swiper.js carousel with 3D coverflow effect
- **Advanced Filtering**: Filter projects by category (All, Full-Stack, Web, AI)
- **Real-time Search**: Search projects by title, description, or tech stack
- **Responsive Design**: Fully responsive across all devices
- **Dark/Light Mode**: Seamless theme switching support

### Animations & Effects
- **Framer Motion**: Smooth entrance animations and hover effects
- **3D Tilt Effects**: React Parallax Tilt for interactive card tilting
- **Glassmorphism**: Modern glass-like card designs with backdrop blur
- **Hover Animations**: Smooth transitions and micro-interactions

### Interactive Elements
- **Project Modals**: Detailed project view with screenshots and videos
- **Tech Stack Tooltips**: Hover tooltips for technology badges
- **Image Galleries**: Screenshot galleries with hover effects
- **Action Buttons**: Live demo and GitHub links with animations

## 📁 File Structure

```
components/
├── Projects.js          # Main Projects component
data/
├── projects.js          # Projects data and configuration
styles/
├── projects.module.css  # Complete styling with responsive design
public/assets/
├── ecommerce.jpg        # Project images
├── chatbot.png
├── portfolio.png
└── Attendance.png
```

## 🛠️ Installation & Setup

### Prerequisites
Make sure you have these dependencies installed:

```bash
npm install swiper framer-motion react-intersection-observer react-tooltip react-parallax-tilt react-modal react-icons
```

### Usage
1. Import the Projects component in your main page:

```javascript
import Projects from '../components/Projects';

export default function Home() {
  return (
    <div>
      {/* Other sections */}
      <Projects />
      {/* Other sections */}
    </div>
  );
}
```

## 📊 Customizing Projects Data

Edit `data/projects.js` to add your own projects:

```javascript
export const projectsData = [
  {
    id: 1,
    title: "Your Project Title",
    description: "Brief description of your project",
    category: "Full-Stack", // "Full-Stack", "Web", "AI", or add new categories
    image: "/assets/your-project-image.jpg",
    screenshots: [
      "/assets/screenshot1.jpg",
      "/assets/screenshot2.jpg"
    ],
    techStack: ["React", "Next.js", "Node.js"], // Add your tech stack
    features: [
      "Feature 1",
      "Feature 2",
      "Feature 3"
    ],
    liveDemo: "https://your-demo-url.com",
    github: "https://github.com/yourusername/project-repo",
    videoDemo: "https://www.youtube.com/embed/your-video-id" // Optional
  }
];
```

### Adding New Categories
1. Update the `categories` array in `data/projects.js`:
```javascript
export const categories = ["All", "Full-Stack", "Web", "AI", "Mobile", "Desktop"];
```

2. Add corresponding category values to your projects.

### Adding New Tech Stack Icons
1. Install the icon library (if not already installed):
```bash
npm install react-icons
```

2. Update the `techIcons` object in `components/Projects.js`:
```javascript
import { SiYourNewTech } from 'react-icons/si';

const techIcons = {
  'Your Tech': SiYourNewTech,
  // ... other icons
};
```

## 🎨 Styling Customization

### Color Scheme
The component uses CSS custom properties. Update these in your global CSS:

```css
:root {
  --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --card-background: rgba(255, 255, 255, 0.95);
  --text-primary: #1e293b;
  --text-secondary: #64748b;
}

[data-theme="dark"] {
  --card-background: rgba(30, 41, 59, 0.95);
  --text-primary: #e2e8f0;
  --text-secondary: #94a3b8;
}
```

### Layout Modifications
- **Card Size**: Modify `.card` height and width in `projects.module.css`
- **Carousel Settings**: Update Swiper breakpoints in `Projects.js`
- **Animation Timing**: Adjust Framer Motion transition durations

## 📱 Responsive Breakpoints

- **Desktop**: 1024px+ (3 cards visible)
- **Tablet**: 768px-1023px (2 cards visible)
- **Mobile**: <768px (1 card visible)

## 🔧 Advanced Configuration

### Carousel Settings
Modify Swiper configuration in `Projects.js`:

```javascript
<Swiper
  modules={[Navigation, Pagination, EffectCoverflow, Autoplay]}
  spaceBetween={30}
  slidesPerView={1}
  autoplay={{
    delay: 4000, // Change autoplay delay
    disableOnInteraction: false,
  }}
  // ... other settings
>
```

### Animation Variants
Customize Framer Motion animations:

```javascript
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Adjust stagger timing
      delayChildren: 0.2    // Adjust initial delay
    }
  }
};
```

## 🚀 Performance Optimization

The component includes several performance optimizations:

1. **Memoized Filtering**: Uses `useMemo` for efficient project filtering
2. **Lazy Loading**: Next.js Image component with lazy loading
3. **Intersection Observer**: Animations trigger only when in view
4. **Optimized Re-renders**: Minimal state updates and efficient event handling

## 🎯 Best Practices

1. **Image Optimization**: Use Next.js optimized images (WebP format recommended)
2. **Accessibility**: All interactive elements include proper ARIA labels
3. **SEO**: Semantic HTML structure for better search engine indexing
4. **Performance**: Lazy loading and efficient state management

## 🐛 Troubleshooting

### Common Issues

1. **Images not loading**: Ensure images are in `public/assets/` directory
2. **Swiper not working**: Check if Swiper CSS is properly imported
3. **Animations not triggering**: Verify Framer Motion and Intersection Observer setup
4. **Modal not opening**: Ensure React Modal is properly configured

### Debug Mode
Add console logs to track component state:

```javascript
console.log('Filtered Projects:', filteredProjects);
console.log('Selected Category:', selectedCategory);
```

## 📄 License

This component is part of your portfolio project. Feel free to customize and use as needed.

---

**Need help?** Check the component code comments or create an issue in your repository.