# Digital Wardrobe & Outfit Planner

### AI-powered web app to manage your wardrobe and get stylish outfit recommendations based on weather, occasion, and personal taste.

---

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation & Setup](#installation--setup)
- [Usage](#usage)
- [Architecture](#architecture)
- [AI & Recommendation Engine](#ai--recommendation-engine)
- [API Integrations](#api-integrations)
- [Security & Privacy](#security--privacy)
- [Contribution Guidelines](#contribution-guidelines)
- [Roadmap](#roadmap)
- [Acknowledgements](#acknowledgements)
- [License](#license)

---

## Overview

Digital Wardrobe & Outfit Planner is a modern web application designed to empower users to organize their clothing digitally and receive intelligent outfit recommendations powered by AI. Combining seamless photo uploads, weather-aware styling, and occasion-based suggestions, the app simplifies daily outfit choices while encouraging sustainable fashion habits.

---

## Features

- **User Authentication**: Secure sign-up/sign-in with JWT and password encryption.  
- **Clothing Upload & Categorization**: Upload photos, auto-classify garments using AI, and assign tags like color, style, and season.  
- **AI-powered Outfit Recommendations**: Context-aware suggestions that factor in weather (temperature, precipitation), event types (formal, casual), and user preferences.  
- **Calendar Integration**: Schedule and plan outfits for upcoming events.  
- **Favorites & Mix & Match**: Save preferred outfits and receive suggestions to mix existing wardrobe items creatively.  
- **Responsive & Accessible UI**: Optimized for all devices with accessibility best practices.  
- **Progressive Web App (PWA)**: Offline capability and app-like experience on mobile devices.  

---

## Tech Stack

| Layer               | Technology                              | Purpose                                      |
|---------------------|---------------------------------------|----------------------------------------------|
| Frontend            | Next.js 14, React 18, TypeScript      | UI rendering, PWA, user experience           |
| Styling             | Tailwind CSS, Radix UI                 | Responsive & accessible design system        |
| Backend             | NestJS, GraphQL (Apollo Server)       | Modular server architecture, GraphQL API     |
| AI/ML               | TensorFlow.js, PyTorch (custom model) | Image recognition & outfit recommendation    |
| Storage             | AWS S3                               | Image storage and serving                     |
| Database            | PostgreSQL with Prisma ORM             | Data storage and management                    |
| Serverless          | Vercel Serverless / AWS Lambda        | Scalable backend functions                     |
| External APIs       | OpenWeather API, Google Cloud Vision  | Weather and image tagging                      |
| DevOps & Monitoring | Vercel, GitHub Actions, Sentry        | Deployment pipeline and error tracking       |

---

## Installation & Setup

1. Clone this repository:  
git clone https://github.com/Marvellousabio/wardrobe-.git
cd wardrobe-
2. Install dependencies:  npm install
3. Create a `.env` file with your environment variables for database, APIs, and storage keys:
DATABASE_URL=your_postgresql_connection_string
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
OPENWEATHER_API_KEY=your_openweather_key
GOOGLE_CLOUD_VISION_KEY=your_google_cloud_vision_key
4. Run database migrations:  npx prisma migrate deploy
5. Start backend and AI services:  npm run start:backend
npm run start:ai-recommendation
6. Start frontend in development mode:  npm run dev
7. Visit `http://localhost:3000` in your browser.

---

## Usage

- Register a new account or log in.  
- Upload clothing photos via the wardrobe page; AI will assist in tagging and classification.  
- Let the AI recommend outfits based on your location’s weather and selected occasion.  
- Plan future outfits with the calendar integration and save your preferred combinations.  
- Access the app with offline support and enjoy a seamless UI across devices.

---

## Architecture

The app follows a modular architecture: Next.js handles frontend UI and PWA capabilities; NestJS exposes a GraphQL API for managing user data and wardrobe items; AI recommendation server implements outfit suggestion using PyTorch models; AWS S3 manages image storage efficiently with CDN support; the entire pipeline is deployed serverlessly for scale and cost-efficiency.

---

## AI & Recommendation Engine

- Clothing images are analyzed client-side with TensorFlow.js for real-time feedback on categories and tags.  
- Server-side PyTorch models run recommendation algorithms combining collaborative filtering and contextual features (weather, occasion).  
- Recommendations are dynamically updated based on user feedback and wardrobe changes.

---

## API Integrations

- **OpenWeather API**: Fetches real-time, location-based weather data to customize outfit recommendations.  
- **Google Cloud Vision API**: Provides supplemental image analysis for accurate clothing tagging.

---

## Security & Privacy

- Passwords are hashed using bcrypt.  
- JWT tokens secure sessions with proper expiration and refresh mechanisms.  
- User data, images, and preferences are encrypted at rest and in transit.  
- Users retain full control over their wardrobe data.

---

## Contribution Guidelines

Contributions are highly welcome! Please follow these steps:  
- Fork the repository and clone your fork.  
- Work on feature branches with clear commit messages.  
- Submit pull requests against the `main` branch with a detailed description.  
- Adhere to coding standards and write tests for new features.

---

## Roadmap

- Multilingual support  
- AI-powered smart closet insights (e.g., unused clothing alerts)  
- Social sharing of outfits  
- Integration with online shopping platforms  
- Enhanced AI styling tips based on trends  

---

## Acknowledgements

Special thanks to ML and web communities for tooling and inspiration, open-source contributors, and hackathon mentors for guidance.

---

## License

MIT License © Your Name or Organization  
