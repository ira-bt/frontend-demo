# Professional Portfolio Website

A fully responsive, professional portfolio website built with pure HTML, CSS, and JavaScript.

## Features

### Pages
- **Home** (`index.html`) - Extended landing page with hero, features, stats, testimonials, and CTA
- **About** (`about.html`) - Skills with animated progress bars, education timeline, and projects showcase
- **Contact** (`contact.html`) - Contact form with validation and FAQ section
- **Logout** - Links to login.html

### Key Features

#### Navigation
- Sticky navigation bar
- Responsive hamburger menu for mobile devices
- Active page indicator
- Smooth transitions

#### Home Page
- Hero section with call-to-action buttons
- Features grid showcasing services
- Animated statistics counter (triggered on scroll)
- Testimonial carousel with auto-play
- Call-to-action section

#### About Page
- Personal introduction with image
- Skill bars with animated progress (triggered on scroll)
- Education timeline with professional styling
- Featured projects grid with hover effects

#### Contact Page
- Fully validated contact form
- Real-time form validation
- Success message on submission
- Contact information display
- FAQ section

### Technical Details

**Technologies Used:**
- Pure HTML5 (semantic markup)
- CSS3 (custom properties, flexbox, grid, animations)
- Vanilla JavaScript (no frameworks or libraries)

**CSS Features:**
- CSS Custom Properties for theming
- Flexbox and Grid layouts
- Responsive design (mobile-first approach)
- Smooth transitions and animations
- Media queries for all screen sizes

**JavaScript Features:**
- Mobile navigation toggle
- Animated counter with Intersection Observer
- Testimonial carousel with auto-play
- Smooth scrolling
- Form validation
- Skill bar animations on scroll

### File Structure
```
├── index.html           # Home page
├── about.html           # About page
├── contact.html         # Contact page
├── css/
│   ├── base.css        # Base styles and CSS variables
│   └── portfolio.css   # Main portfolio styles
├── js/
│   ├── portfolio.js    # Main portfolio functionality
│   └── contact.js      # Contact form validation
└── assets/
    └── images/         # Image assets
```

### Responsive Breakpoints
- Desktop: > 968px
- Tablet: 768px - 968px
- Mobile: < 768px
- Small Mobile: < 480px

### Color Scheme
- Primary: Emerald Green (#10b981)
- Secondary: Teal (#14b8a6)
- Background: Light gray (#f9fafb)
- Text: Dark gray (#1f2937)
- Muted: Medium gray (#6b7280)

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- IE11+ (with some limitations)

## Performance Features
- Intersection Observer for efficient scroll animations
- CSS-only animations where possible
- Optimized images
- Minimal JavaScript for better performance

## Customization
- Edit CSS variables in `css/base.css` to change colors and fonts
- Modify content directly in HTML files
- Adjust animations and timings in `js/portfolio.js`
