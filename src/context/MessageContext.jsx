import { createContext, useState } from 'react';

// Create the context
const MessageContext = createContext();

// Provider component
const MessageProvider = ({ children }) => {
    const [message, setMessage] = useState('');
    const [analysisResults, setAnalysisResults] = useState(null);

    const updateMessage = (newMessage) => {
        setMessage(newMessage);
    };

    const clearMessage = () => {
        setMessage('');
    };

    const updateAnalysisResults = (results) => {
        setAnalysisResults(results);
    };

    const clearAnalysisResults = () => {
        setAnalysisResults(null);
    };

    const value = {
        message,
        updateMessage,
        clearMessage,
        analysisResults,
        updateAnalysisResults,
        clearAnalysisResults
    };

    return (
        <MessageContext.Provider value={value}>
            {children}
        </MessageContext.Provider>
    );
};

export { MessageContext, MessageProvider };
