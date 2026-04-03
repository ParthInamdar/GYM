# FORGED - AI-Powered Workout Planner

A modern, responsive web application that creates personalized workout plans based on your fitness goals, experience level, and available equipment.

## Features

- **Personalized Plans**: AI-generated workout plans tailored to your specific goals
- **Multi-Goal Support**: Weight loss, muscle gain, endurance, flexibility, athletic performance, and general fitness
- **Equipment Adaptation**: Plans adapt to your available equipment (from bodyweight to full gym)
- **Progress Tracking**: Monitor your workout completion and stay motivated
- **Nutrition Guidance**: Get nutrition tips and meal planning advice
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, dark-themed interface with smooth animations

## Quick Start

1. Clone or download this repository
2. Open `index (3).html` in your web browser
3. Or run a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   ```
4. Navigate to `http://localhost:8000`

## Usage

1. **Start Planning**: Click "Build My Plan" on the landing page
2. **Personal Info**: Enter your basic information (name, age, weight, height)
3. **Select Goal**: Choose your primary fitness goal
4. **Fitness Level**: Indicate your experience level and available equipment
5. **Schedule**: Set your training days and preferred workout duration
6. **Get Your Plan**: Receive a customized 8-week workout program
7. **Track Progress**: Mark workouts complete and monitor your journey

## Technical Details

### Technologies Used
- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern styling with CSS Grid, Flexbox, and custom properties
- **Vanilla JavaScript**: No framework dependencies for maximum performance
- **Google Fonts**: Bebas Neue, DM Sans, and Space Mono for typography

### Performance Features
- **Optimized Animations**: Hardware-accelerated CSS transforms
- **Reduced Motion Support**: Respects user's motion preferences
- **Local Storage**: Saves workout progress between sessions
- **Mobile-First Design**: Responsive breakpoints for all screen sizes

### Accessibility
- **Semantic HTML**: Proper heading hierarchy and landmark elements
- **ARIA Labels**: Screen reader friendly interface
- **Keyboard Navigation**: Full keyboard support with ESC key navigation
- **Focus Management**: Clear focus indicators for interactive elements
- **Color Contrast**: WCAG compliant color scheme

## File Structure

```
GYM/
├── index (3).html          # Main application file
├── styles.css             # Complete styling
├── app.js                 # Application logic
├── package.json           # Project metadata
└── README.md              # This file
```

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Contributing

This is a frontend-only application. To contribute:
1. Fork the repository
2. Make your changes
3. Test thoroughly across different browsers
4. Submit a pull request

## License

MIT License - feel free to use this project for personal or commercial purposes.

---

**FORGED** - Stop guessing. Start training.
