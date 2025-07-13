import { createContext, useState } from 'react';

// Create the context
const MessageContext = createContext();

// Provider component
const MessageProvider = ({ children }) => {
    const [message, setMessage] = useState('');
    const [analysisResults, setAnalysisResults] = useState(null);
    const [searchResults, setSearchResults] = useState(null);

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

    const updateSearchResults = (results) => {
        setSearchResults(results);
    };

    const clearSearchResults = () => {
        setSearchResults(null);
    };

    const value = {
        message,
        updateMessage,
        clearMessage,
        analysisResults,
        updateAnalysisResults,
        clearAnalysisResults,
        searchResults,
        updateSearchResults,
        clearSearchResults
    };

    return (
        <MessageContext.Provider value={value}>
            {children}
        </MessageContext.Provider>
    );
};

export { MessageContext, MessageProvider };
