import { createContext, useState } from 'react';

// Create the context
const MessageContext = createContext();

// Provider component
const MessageProvider = ({ children }) => {
    const [message, setMessage] = useState('');

    const updateMessage = (newMessage) => {
        setMessage(newMessage);
    };

    const clearMessage = () => {
        setMessage('');
    };

    const value = {
        message,
        updateMessage,
        clearMessage
    };

    return (
        <MessageContext.Provider value={value}>
            {children}
        </MessageContext.Provider>
    );
};

export { MessageContext, MessageProvider };
