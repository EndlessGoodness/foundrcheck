import { createContext, useState, useCallback } from 'react';

// Create the context
const MessageContext = createContext();

// Provider component
const MessageProvider = ({ children }) => {
    const [message, setMessage] = useState('');
    const [analysisResults, setAnalysisResults] = useState(null);
    const [searchResults, setSearchResults] = useState(null);

    const updateMessage = useCallback((newMessage) => {
        setMessage(newMessage);
    }, []);

    const clearMessage = useCallback(() => {
        setMessage('');
    }, []);

    const updateAnalysisResults = useCallback((results) => {
        setAnalysisResults(results);
    }, []);

    const clearAnalysisResults = useCallback(() => {
        setAnalysisResults(null);
    }, []);

    const updateSearchResults = useCallback((results) => {
        setSearchResults(results);
    }, []);

    const clearSearchResults = useCallback(() => {
        setSearchResults(null);
    }, []);

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
