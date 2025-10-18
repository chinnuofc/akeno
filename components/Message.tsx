import React, { useState } from 'react';
import { Message, Role } from '../types';
import BotIcon from './icons/BotIcon';
import UserIcon from './icons/UserIcon';
import CopyIcon from './icons/CopyIcon';
import CheckIcon from './icons/CheckIcon';

interface MessageProps {
    message: Message;
}

const MessageComponent: React.FC<MessageProps> = ({ message }) => {
    const isModel = message.role === Role.MODEL;
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        if (isCopied) return;
        navigator.clipboard.writeText(message.content)
            .then(() => {
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), 2000);
            })
            .catch(err => {
                console.error('Failed to copy text: ', err);
            });
    };

    return (
        <div className={`flex items-start gap-2 sm:gap-3 my-4 ${isModel ? 'justify-start' : 'justify-end'}`}>
            {isModel ? (
                <>
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center">
                        <BotIcon className="w-5 h-5 text-white" />
                    </div>
                    <div className="relative group">
                        <div
                            className="max-w-xs sm:max-w-md lg:max-w-xl px-3 sm:px-4 py-2 sm:py-3 rounded-xl shadow bg-slate-700 text-slate-200 rounded-tl-none"
                        >
                            <p className="whitespace-pre-wrap text-sm sm:text-base">{message.content}</p>
                        </div>
                        <button
                            onClick={handleCopy}
                            aria-label={isCopied ? "Copied to clipboard" : "Copy message"}
                            className={`
                                absolute top-1.5 right-1.5 p-1 rounded-md text-slate-400
                                opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all duration-200
                                hover:bg-slate-600/50 hover:text-slate-200
                                disabled:cursor-not-allowed
                            `}
                            disabled={isCopied}
                        >
                            {isCopied
                                ? <CheckIcon className="w-4 h-4 text-green-400" />
                                : <CopyIcon className="w-4 h-4" />
                            }
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <div
                        className="max-w-xs sm:max-w-md lg:max-w-xl px-3 sm:px-4 py-2 sm:py-3 rounded-xl shadow bg-indigo-600 text-white rounded-br-none"
                    >
                        <p className="whitespace-pre-wrap text-sm sm:text-base">{message.content}</p>
                    </div>
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center">
                        <UserIcon className="w-5 h-5 text-slate-200" />
                    </div>
                </>
            )}
        </div>
    );
};

export default MessageComponent;
