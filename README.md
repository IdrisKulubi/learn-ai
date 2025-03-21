# Personalized Educational App

Welcome to the **Learn AI** repository! This project aims to create an engaging and interactive learning platform where students can learn topics from their favorite characters or heroes. The app leverages AI, 3D avatars, and real-time interaction to provide a unique educational experience 

---

## Features

- **User Registration and Authentication**: Sign up and log in using email or social media accounts.
- **Topic Selection**: Choose from a variety of topics categorized by grade level or difficulty.
- **Character Selection and Avatar Generation**: Upload an image of your favorite character and generate a 3D avatar.
- **AI-Powered Teaching**: Learn topics through AI-generated explanations and voice.might use azure tools ,not sure
- **Voice Cloning and Text-to-Speech**: Mimic the character's voice for a personalized experience.
- **Lip-Syncing**: Sync the avatar's lip movements with the generated audio.
- **Real-Time Interaction**: Chat with the avatar and receive real-time responses with gestures and facial expressions.
- **Chat History**: Save conversations and lessons for later review.
- **Gamification**: Engage with quizzes, rewards, and progress tracking nd points tht cn be redemmed

---

## Technologies Used

### Frontend
- **Framework**: Next.js (for web) or React Native (for mobile).
- **UI Library**: Shadcn-UI and  Tailwind CSS.
- **3D Rendering**: Three.js or Unity.

### Backend
- **Framework**: Node.js with Express.js.
- **Database**: Neon Db.
- **API Integration**: SSR.

### AI/ML Tools
- **Conversational AI**: LLaMA 2, Vicuna, or Hugging Face Transformers.
- **Voice Cloning**: Coqui TTS or Tortoise TTS.
- **Text-to-Image**: Stable Diffusion or DeepFloyd IF.
- **Lip-Syncing**: Wav2Lip or SadTalker.

### Cloud and Hosting
- **Frontend Hosting**: Vercel (Next.js) or Expo (React Native).
- **Backend Hosting**: Render, Heroku, or AWS.
- **Storage**: Cloudeflare R2.

---

## Getting Started

### Prerequisites
- Node.js (v16)
- npm or yarn
- MongoDB or Firebase account
- API keys for AI/ML tools (if required)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/IdrisKulubi/learn-ai.git
   cd learn-ai
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.example .env
   ```
   Fill in your environment variables in the `.env` file.

4. **Run the development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**:
   Navigate to `http://localhost:3000` to see the app running.

