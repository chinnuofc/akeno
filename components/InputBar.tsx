import React, { useState } from 'react';
import SendIcon from './icons/SendIcon';

interface InputBarProps {
    onSendMessage: (message: string) => void;
    isLoading: boolean;
    quickReplies: string[];
}

const InputBar: React.FC<InputBarProps> = ({ onSendMessage, isLoading, quickReplies }) => {
    const [inputValue, setInputValue] = useState('');

    const handleSend = () => {
        if (inputValue.trim() && !isLoading) {
            onSendMessage(inputValue.trim());
            setInputValue('');
        }
    };

    const handleQuickReplyClick = (reply: string) => {
        if (!isLoading) {
            onSendMessage(reply);
        }
    };

    return (
        <div className="p-3 sm:p-4 border-t border-slate-700 bg-slate-800">
            <div className="mb-3 flex flex-wrap gap-2">
                {quickReplies.map((reply, index) => (
                    <button
                        key={index}
                        onClick={() => handleQuickReplyClick(reply)}
                        disabled={isLoading}
                        className="px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs text-indigo-200 bg-indigo-900/50 rounded-full hover:bg-indigo-900/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {reply}
                    </button>
                ))}
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Type your message..."
                    disabled={isLoading}
                    className="flex-1 w-full bg-slate-700 text-slate-200 placeholder-slate-400 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                />
                <button
                    onClick={handleSend}
                    disabled={isLoading || !inputValue.trim()}
                    className="bg-indigo-600 text-white rounded-lg p-2 sm:p-2.5 transition-colors duration-200 hover:bg-indigo-700 disabled:bg-slate-600 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500"
                >
                    <SendIcon className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

export default InputBar;