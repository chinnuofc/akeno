import React from 'react';
import { Domain, DomainID } from '../types';

interface DomainSelectorProps {
    domains: Domain[];
    activeDomain: DomainID;
    onDomainChange: (domainId: DomainID) => void;
}

const DomainSelector: React.FC<DomainSelectorProps> = ({ domains, activeDomain, onDomainChange }) => {
    return (
        <div className="p-2 sm:p-4 bg-slate-800/50 backdrop-blur-sm border-b border-slate-700/50">
            <div className="flex items-center justify-start sm:justify-center space-x-2 overflow-x-auto pb-2 -mb-2">
                {domains.map((domain) => {
                    const Icon = domain.icon;
                    const isActive = activeDomain === domain.id;
                    return (
                        <button
                            key={domain.id}
                            onClick={() => onDomainChange(domain.id)}
                            className={`
                                flex-shrink-0 flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ease-in-out
                                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900
                                ${isActive
                                    ? 'bg-indigo-600 text-white shadow-lg'
                                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                                }
                            `}
                        >
                            <Icon className="h-5 w-5" />
                            <span>{domain.name}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default DomainSelector;