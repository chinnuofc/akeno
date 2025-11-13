
# Multi-Domain AI Chatbot powered by Gemini

This is a sophisticated, multi-domain chatbot designed to provide detailed information across various topics including automobiles, anime, manga, and bikes. It features a modern, user-friendly interface that allows users to seamlessly switch between different conversational contexts, powered by the Google Gemini API for fast, accurate, and natural-sounding responses.

![Chatbot Demo](https://storage.googleapis.com/aistudio-ux-team/prompts/65842_2.gif)

## ✨ Key Features

- **Multi-Domain Conversation**: Easily switch between specialized topics like Cars, Anime, Manga, and Bikes.
- **Dynamic Context Switching**: The chatbot's personality and knowledge base adapt instantly to the selected domain.
- **Real-Time Streaming Responses**: Messages appear word-by-word, providing an interactive and fast user experience.
- **Topic-Specific Quick Replies**: Get conversation starters and common questions tailored to the active domain.
- **Modern & Responsive UI**: A clean, minimalist interface built with Tailwind CSS that works beautifully on all screen sizes.
- **Conversation History**: The full chat history is always visible for easy reference.
- **Copy-to-Clipboard**: Easily copy the bot's responses with a single click.

## 🚀 Technology Stack

- **Frontend**: [React](https://reactjs.org/) with [TypeScript](https://www.typescriptlang.org/)
- **AI Model**: [Google Gemini API](https://ai.google.dev/) (`@google/genai`)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)

## 🔧 How It Works

The application is a single-page React app that interacts directly with the Google Gemini API.

1.  **Domain Selection**: The user chooses a domain (e.g., Cars). This selection updates the application's state.
2.  **System Instruction**: Based on the selected domain, a specific `systemInstruction` is pulled from `constants.ts`. This instruction primes the Gemini model to act as a casual expert for that topic (e.g., "You are a car expert chatting with a friend.").
3.  **Sending a Message**: The user's message, along with the recent chat history and the system instruction, is sent to the Gemini API via the `geminiService.ts`.
4.  **Streaming Response**: The service uses the `chat.sendMessageStream()` method to receive the response as a stream of text chunks.
5.  **UI Update**: The `App.tsx` component receives these chunks and appends them to the last message in the chat window, creating a "typing" effect and delivering a near-instantaneous response.

### Core Components

-   `App.tsx`: The main component that manages state (active domain, messages, loading status) and orchestrates the interactions between other components.
-   `DomainSelector.tsx`: Renders the buttons for switching between different domains.
-   `ChatWindow.tsx`: Displays the conversation history and the "Typing..." indicator.
-   `InputBar.tsx`: Contains the text input, send button, and domain-specific quick replies.
-   `geminiService.ts`: A dedicated service module to handle all API calls to the Google Gemini API.

## 📁 File Structure

```
/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── icons/
│   │   │   ├── BotIcon.tsx
│   │   │   ├── DomainIcons.tsx
│   │   │   └── ... (other icons)
│   │   ├── ChatWindow.tsx
│   │   ├── DomainSelector.tsx
│   │   ├── InputBar.tsx
│   │   └── Message.tsx
│   ├── services/
│   │   └── geminiService.ts
│   ├── App.tsx
│   ├── constants.ts
│   ├── index.css
│   ├── index.tsx
│   └── types.ts
├── index.html
├── package.json
└── README.md
```

## ⚙️ Setup

This project is designed to run in a self-contained web environment. No local installation or dependency management is required. The API key for the Gemini API is managed securely by the environment and is automatically available as `process.env.API_KEY`.

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: [https://ai.studio/apps/drive/1nzFiTnQN6VsFUa6gwrJS8S_UjpYBwnfu
](https://ai.studio/apps/drive/1-bzOSb8g9CCd329Tq8R-C0S5ju5lPoh4)
## 🎨 Customization & Extensibility

It's easy to add more domains or customize the existing ones.

### How to Add a New Domain:

1.  **`types.ts`**: Add a new domain ID to the `DomainID` enum.
    ```typescript
    export enum DomainID {
        // ... existing domains
        MOVIES = 'movies',
    }
    ```
2.  **`components/icons/DomainIcons.tsx`**: Create a new SVG icon component for your domain.
3.  **`constants.ts`**: Update the `DOMAINS`, `SYSTEM_INSTRUCTIONS`, and `QUICK_REPLIES` constants:
    -   Add the new domain object to the `DOMAINS` array.
    -   Add a new system instruction entry in `SYSTEM_INSTRUCTIONS`.
    -   Add a list of quick replies in `QUICK_REPLIES`.

That's it! The application will automatically render the new domain and use the corresponding context for its conversations.
