import React from 'react';
import { Conversation, Domain } from '../types';
import TrashIcon from './icons/TrashIcon';
import PlusIcon from './icons/PlusIcon';

interface HistoryPanelProps {
    isOpen: boolean;
    conversations: Conversation[];
    domains: Domain[];
    onClose: () => void;
    onSelectConversation: (id: string) => void;
    onNewChat: () => void;
    onDeleteConversation: (id: string) => void;
}

const ConversationItem: React.FC<{
    conversation: Conversation;
    domain: Domain | undefined;
    onSelect: () => void;
    onDelete: () => void;
}> = ({ conversation, domain, onSelect, onDelete }) => {
    const firstUserMessage = conversation.messages.find(m => m.role === 'user')?.content;
    const preview = firstUserMessage ? `"${firstUserMessage.substring(0, 30)}..."` : 'New Chat';
    const Icon = domain?.icon;

    return (
        <div className="group flex items-center justify-between p-2 rounded-md hover:bg-slate-700/50 cursor-pointer" onClick={onSelect}>
            <div className="flex items-center gap-3 overflow-hidden">
                {Icon && <Icon className="w-5 h-5 text-slate-400 flex-shrink-0" />}
                <div className="overflow-hidden">
                    <p className="text-sm font-medium text-slate-200 truncate">{domain?.name || 'Chat'}</p>
                    <p className="text-xs text-slate-400 truncate">{preview}</p>
                </div>
            </div>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete();
                }}
                className="p-1 rounded-md text-slate-500 opacity-0 group-hover:opacity-100 hover:text-red-400 hover:bg-slate-600/50 transition-opacity"
                aria-label="Delete conversation"
            >
                <TrashIcon className="w-4 h-4" />
            </button>
        </div>
    );
};


const HistoryPanel: React.FC<HistoryPanelProps> = ({
    isOpen,
    conversations,
    domains,
    onClose,
    onSelectConversation,
    onNewChat,
    onDeleteConversation
}) => {
    return (
        <>
            <div className={`fixed inset-0 bg-black/60 z-40 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={onClose}></div>
            <aside className={`fixed top-0 left-0 h-full w-64 bg-slate-800 shadow-xl z-50 transform transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex flex-col h-full">
                    <div className="p-4 border-b border-slate-700 flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-slate-100">History</h2>
                        <button onClick={onNewChat} className="flex items-center gap-2 px-3 py-1.5 text-sm bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors">
                           <PlusIcon className="w-4 h-4"/> New Chat
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-2">
                        {conversations.length > 0 ? (
                             [...conversations].sort((a, b) => b.timestamp - a.timestamp).map(convo => (
                                <ConversationItem
                                    key={convo.id}
                                    conversation={convo}
                                    domain={domains.find(d => d.id === convo.domain)}
                                    onSelect={() => onSelectConversation(convo.id)}
                                    onDelete={() => onDeleteConversation(convo.id)}
                                />
                            ))
                        ) : (
                            <p className="text-sm text-slate-400 text-center p-4">No chat history found.</p>
                        )}
                    </div>
                </div>
            </aside>
        </>
    );
};

export default HistoryPanel;
