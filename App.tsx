import React, { useState, useEffect, useCallback } from 'react';
import ChatWindow from './components/ChatWindow';
import InputBar from './components/InputBar';
import DomainSelector from './components/DomainSelector';
import { Message, Role, DomainID } from './types';
import { DOMAINS, SYSTEM_INSTRUCTIONS, QUICK_REPLIES } from './constants';
import { getBotResponse } from './services/geminiService';

const App: React.FC = () => {
    const [activeDomain, setActiveDomain] = useState<DomainID>(DomainID.CARS);
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const initializeChat = useCallback(() => {
        const domainName = DOMAINS.find(d => d.id === activeDomain)?.name || 'the current topic';
        setMessages([
            {
                role: Role.MODEL,
                content: `Hey there! I'm ready to chat about ${domainName}. What's on your mind?`
            }
        ]);
    }, [activeDomain]);

    useEffect(() => {
        initializeChat();
    }, [initializeChat]);

    const handleDomainChange = (domainId: DomainID) => {
        setActiveDomain(domainId);
        const domainName = DOMAINS.find(d => d.id === domainId)?.name || 'the new topic';
        setMessages([
            {
                role: Role.MODEL,
                content: `Alright, let's talk about ${domainName}! Ask me anything.`
            }
        ]);
    };

    const handleSendMessage = async (userMessage: string) => {
        if (!userMessage.trim()) return;

        const userMessageObj: Message = { role: Role.USER, content: userMessage };
        const newMessages: Message[] = [...messages, userMessageObj];
        setMessages(newMessages);
        setIsLoading(true);
        
        // Add a placeholder for the streaming response
        setMessages(prev => [...prev, { role: Role.MODEL, content: '' }]);

        const history = newMessages.filter(msg => msg.role !== Role.MODEL || (!msg.content.startsWith('Hey there!') && !msg.content.startsWith('Alright, let\'s talk')));
        
        try {
            const responseStream = await getBotResponse(
                userMessage,
                history,
                SYSTEM_INSTRUCTIONS[activeDomain]
            );
            
            for await (const chunk of responseStream) {
                const chunkText = chunk.text;
                setMessages(prev => {
                    const lastMessage = prev[prev.length - 1];
                    const updatedLastMessage = {
                        ...lastMessage,
                        content: lastMessage.content + chunkText,
                    };
                    return [...prev.slice(0, -1), updatedLastMessage];
                });
            }
        } catch (error) {
            console.error(error);
             setMessages(prev => {
                const lastMessage = prev[prev.length - 1];
                const updatedLastMessage = {
                    ...lastMessage,
                    content: 'An error occurred. Please try again.',
                };
                return [...prev.slice(0, -1), updatedLastMessage];
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-screen w-full max-w-3xl mx-auto font-sans text-slate-200">
             <header className="text-center p-4 sm:p-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-100">Multi-Domain AI Chatbot</h1>
                <p className="text-sm text-slate-400">Powered by Gemini</p>
            </header>
            <main className="flex flex-col flex-1 bg-slate-800 sm:rounded-t-xl shadow-2xl overflow-hidden">
                <DomainSelector
                    domains={DOMAINS}
                    activeDomain={activeDomain}
                    onDomainChange={handleDomainChange}
                />
                <ChatWindow messages={messages} isLoading={isLoading} />
                <InputBar
                    onSendMessage={handleSendMessage}
                    isLoading={isLoading}
                    quickReplies={QUICK_REPLIES[activeDomain]}
                />
            </main>
        </div>
    );
};

export default App;