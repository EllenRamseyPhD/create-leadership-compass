# CREATE Leadership Compass™ Design Guidelines

## Design Approach
**System:** Fluent Design with influences from premium consulting platforms (McKinsey, Bain) - prioritizing credibility, clarity, and executive-grade sophistication. The interface should feel like a private consulting session, not a consumer app.

**Core Principle:** Calm confidence. Every element reinforces Dr. Ramsey's expertise and the CREATE™ model's strategic value.

## Typography System
- **Primary Font:** Inter or SF Pro Display (via Google Fonts CDN)
- **Hierarchy:**
  - H1: 3xl to 5xl, font-semibold - for section titles and leadership compass branding
  - H2: 2xl to 3xl, font-medium - for pillar names and question headers
  - Body: base to lg, font-normal, text-gray-700 - for questions and explanatory text
  - Small: sm, font-medium, text-gray-500 - for progress indicators and metadata
- **Line Height:** Generous (leading-relaxed to leading-loose) for executive readability

## Layout & Spacing System
**Spacing Primitives:** Tailwind units of 4, 6, 8, 12, 16, 24 (p-4, mb-8, py-12, gap-6, etc.)

**Structure:**
- Single-column centered layout: max-w-3xl for assessment flow
- Wider max-w-6xl for summary/results dashboard
- Generous vertical spacing: py-16 to py-24 between major sections
- Card-based progression: each question in its own contained card with p-8 to p-12 padding

## Component Library

### Hero Section
- Sophisticated introduction with Dr. Ramsey's credibility
- H1: "CREATE Leadership Compass™"
- Subheading explaining AI reflection partner concept
- Subtle tagline: "Powered by Dr. Ellen Ramsey's CREATE Leadership Model™"
- CTA: "Begin Your Assessment" button (primary, large)
- Background: Professional executive imagery - thoughtful leader in modern office environment, slightly desaturated, with subtle overlay

### Assessment Flow Components
- **Progress Tracker:** Linear 6-step indicator showing current pillar (1/6, 2/6, etc.) - fixed at top or floating card
- **Question Cards:** Elevated cards (shadow-lg) with pillar icon, pillar name, question text, and radio/button options
- **Response Options:** Large clickable cards (not just radio buttons) with hover states, organized vertically with mb-4 spacing
- **Navigation:** "Continue" button appears after selection, "Back" link subtle and secondary

### Summary Dashboard
- **Visual Profile Chart:** Radar/spider chart or horizontal bar visualization showing scores across 6 CREATE™ pillars
- **Insight Cards:** 2-column grid showcasing strengths and growth opportunities
- **Personalized Summary:** Narrative text block with AI-generated leadership profile
- **CTA Section:** Two-option choice - "Request Confidential Debrief" (primary) or "Email My Report" (secondary)

### Footer
- Dr. Ramsey branding, credentials (Ph.D.), contact link
- Privacy statement and CREATE™ trademark notice
- LinkedIn/professional profile links

## Images
**Hero Image:** Professional executive in consultation/reflection mode - modern office, natural light, conveying trust and strategic thinking. Image should be 16:9 aspect ratio, placed as full-width background with subtle dark overlay (opacity 40-50%) for text legibility.

**Supporting Imagery:** Abstract leadership visuals (connected nodes, ascending paths) for pillar introduction screens - use sparingly, only where they add conceptual clarity.

## Design Details
- **Buttons on Images:** Blurred background (backdrop-blur-sm with bg-white/20) for hero CTAs
- **Micro-interactions:** Minimal - gentle scale on card selection, smooth progress bar transitions
- **Shadows:** Layered depth - cards use shadow-md to shadow-xl to convey elevation and focus
- **Borders:** Subtle border-gray-200 for card separation, bolder border-gray-300 for selected states
- **Icons:** Use Heroicons - outline style for navigation, solid for selected/completed states

## Accessibility
- High contrast text ratios (WCAG AAA where possible)
- Clear focus states on all interactive elements
- Keyboard navigation for entire assessment flow
- Aria labels for progress indicators and chart visualizations

## Responsive Behavior
- Mobile: Stack all elements, full-width cards, larger touch targets (min 44x44px)
- Tablet: Maintain single-column flow, increase padding
- Desktop: Centered content with generous margins, optimal reading width maintained

**Visual Tone:** Restrained elegance. Think executive briefing room, not startup pitch deck. Trust through clarity, authority through simplicity.