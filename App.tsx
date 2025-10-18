import React, { useState, useEffect } from 'react';
import ChatWindow from './components/ChatWindow';
import InputBar from './components/InputBar';
import DomainSelector from './components/DomainSelector';
import HistoryPanel from './components/HistoryPanel';
import HistoryIcon from './components/icons/HistoryIcon';
import { Message, Role, DomainID, Conversation } from './types';
import { DOMAINS, SYSTEM_INSTRUCTIONS, QUICK_REPLIES } from './constants';
import { getBotResponse } from './services/geminiService';

const App: React.FC = () => {
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isHistoryPanelOpen, setHistoryPanelOpen] = useState<boolean>(false);

    // Load conversations from localStorage on initial render
    useEffect(() => {
        try {
            const savedConversations = localStorage.getItem('chatHistory');
            if (savedConversations) {
                const parsedConversations: Conversation[] = JSON.parse(savedConversations);
                setConversations(parsedConversations);
                // Start a new chat instead of loading an old one for better UX
                startNewChat(DomainID.CARS, parsedConversations);
            } else {
                startNewChat(DomainID.CARS, []);
            }
        } catch (error) {
            console.error("Failed to load chat history:", error);
            startNewChat(DomainID.CARS, []);
        }
    }, []);

    // Save conversations to localStorage whenever they change
    useEffect(() => {
        if (conversations.length > 0) {
            localStorage.setItem('chatHistory', JSON.stringify(conversations));
        }
    }, [conversations]);

    const startNewChat = (domainId: DomainID, existingConversations: Conversation[] = conversations) => {
        const domainName = DOMAINS.find(d => d.id === domainId)?.name || 'the current topic';
        const newConversation: Conversation = {
            id: Date.now().toString(),
            domain: domainId,
            messages: [{
                role: Role.MODEL,
                content: `Hey there! I'm ready to chat about ${domainName}. What's on your mind?`
            }],
            timestamp: Date.now(),
        };
        setConversations(prev => [...existingConversations, newConversation]);
        setCurrentConversationId(newConversation.id);
        setHistoryPanelOpen(false);
    };

    const handleDomainChange = (domainId: DomainID) => {
        // If the current chat is empty (only has the initial greeting), just switch its domain
        const currentConversation = conversations.find(c => c.id === currentConversationId);
        if (currentConversation && currentConversation.messages.length <= 1) {
             const domainName = DOMAINS.find(d => d.id === domainId)?.name || 'the new topic';
            const updatedConversation = {
                ...currentConversation,
                domain: domainId,
                messages: [{
                    role: Role.MODEL,
                    content: `Alright, let's talk about ${domainName}! Ask me anything.`
                }]
            };
            setConversations(prev => prev.map(c => c.id === currentConversationId ? updatedConversation : c));
        } else {
            // Otherwise, start a new chat for the new domain
            startNewChat(domainId);
        }
    };
    
    const handleSelectConversation = (id: string) => {
        setCurrentConversationId(id);
        setHistoryPanelOpen(false);
    };

    const handleDeleteConversation = (id: string) => {
        const newConversations = conversations.filter(c => c.id !== id);
        setConversations(newConversations);
        if (currentConversationId === id) {
            if (newConversations.length > 0) {
                // select the most recent one
                const sorted = [...newConversations].sort((a,b) => b.timestamp - a.timestamp);
                setCurrentConversationId(sorted[0].id);
            } else {
                // If no conversations left, start a new one
                startNewChat(DomainID.CARS, []);
            }
        }
    };


    const handleSendMessage = async (userMessage: string) => {
        if (!userMessage.trim() || !currentConversationId) return;

        const userMessageObj: Message = { role: Role.USER, content: userMessage };
        
        // Update the current conversation
        const updatedConversations = conversations.map(c => {
            if (c.id === currentConversationId) {
                return { 
                    ...c, 
                    messages: [...c.messages, userMessageObj],
                    timestamp: Date.now() 
                };
            }
            return c;
        });
        setConversations(updatedConversations);
        setIsLoading(true);
        
        // Add a placeholder for the streaming response
        setConversations(prev => prev.map(c => {
             if (c.id === currentConversationId) {
                return { ...c, messages: [...c.messages, { role: Role.MODEL, content: '' }] };
            }
            return c;
        }));

        const currentConvo = updatedConversations.find(c => c.id === currentConversationId);
        if (!currentConvo) return; // Should not happen

        const history = currentConvo.messages.filter(msg => msg.role !== Role.MODEL || (!msg.content.startsWith('Hey there!') && !msg.content.startsWith('Alright, let\'s talk')));
        
        try {
            const responseStream = await getBotResponse(
                userMessage,
                history,
                SYSTEM_INSTRUCTIONS[currentConvo.domain]
            );
            
            for await (const chunk of responseStream) {
                const chunkText = chunk.text;
                setConversations(prev => prev.map(c => {
                    if (c.id === currentConversationId) {
                        const lastMessage = c.messages[c.messages.length - 1];
                        const updatedLastMessage = { ...lastMessage, content: lastMessage.content + chunkText };
                        return { ...c, messages: [...c.messages.slice(0, -1), updatedLastMessage] };
                    }
                    return c;
                }));
            }
        } catch (error) {
            console.error(error);
             setConversations(prev => prev.map(c => {
                if (c.id === currentConversationId) {
                    const lastMessage = c.messages[c.messages.length - 1];
                    const updatedLastMessage = { ...lastMessage, content: 'An error occurred. Please try again.' };
                    return { ...c, messages: [...c.messages.slice(0, -1), updatedLastMessage] };
                }
                return c;
            }));
        } finally {
            setIsLoading(false);
        }
    };
    
    const currentConversation = conversations.find(c => c.id === currentConversationId);
    const activeDomain = currentConversation?.domain || DomainID.CARS;
    const messages = currentConversation?.messages || [];

    return (
        <div className="flex flex-col h-screen w-full max-w-3xl mx-auto font-sans text-slate-200">
             <HistoryPanel
                isOpen={isHistoryPanelOpen}
                conversations={conversations}
                domains={DOMAINS}
                onClose={() => setHistoryPanelOpen(false)}
                onSelectConversation={handleSelectConversation}
                onNewChat={() => startNewChat(activeDomain)}
                onDeleteConversation={handleDeleteConversation}
            />
            <header className="flex items-center justify-between p-4 sm:p-6">
                 <div className="text-left">
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-100">Multi-Domain AI Chatbot</h1>
                    <p className="text-sm text-slate-400">Powered by Gemini</p>
                </div>
                <button
                    onClick={() => setHistoryPanelOpen(true)}
                    className="p-2 rounded-md text-slate-400 hover:text-slate-100 hover:bg-slate-700/50 transition-colors"
                    aria-label="View chat history"
                >
                    <HistoryIcon className="w-6 h-6" />
                </button>
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
