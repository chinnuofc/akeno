import React, { useRef, useEffect } from 'react';
import { Message } from '../types';
import MessageComponent from './Message';
import BotIcon from './icons/BotIcon';

interface ChatWindowProps {
    messages: Message[];
    isLoading: boolean;
}

const LoadingIndicator: React.FC = () => (
    <div className="flex items-start gap-3 my-4 justify-start">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center">
            <BotIcon className="w-5 h-5 text-white" />
        </div>
        <div className="max-w-md lg:max-w-xl px-4 py-3 rounded-xl shadow bg-slate-700 text-slate-200 rounded-tl-none">
            <div className="flex items-baseline space-x-2">
                <span className="text-slate-400 text-sm sm:text-base">Typing</span>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.32s]"></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.16s]"></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
            </div>
        </div>
    </div>
);


const ChatWindow: React.FC<ChatWindowProps> = ({ messages, isLoading }) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages, isLoading]);

    return (
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {messages.map((msg, index) => (
                <MessageComponent key={index} message={msg} />
            ))}
            {isLoading && <LoadingIndicator />}
            <div ref={messagesEndRef} />
        </div>
    );
};

export default ChatWindow;