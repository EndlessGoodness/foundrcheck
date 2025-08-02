import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { MessageContext } from "../context/MessageContext";

function IdeaInput() {
    const { updateMessage } = useContext(MessageContext);
    const [inputValue, setInputValue] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    function validateInput(input) {
        const trimmedInput = input.trim();
        if (trimmedInput === "") {
            return "Please enter your startup idea.";
        }
        
        const wordCount = trimmedInput.split(/\s+/).length;
        if (wordCount < 5) {
            return `Please enter at least 5 words. You have ${wordCount} word${wordCount === 1 ? '' : 's'}.`;
        }
        
        return null;
    }

    function submithandler(e) {
        e.preventDefault();
        
        const validationError = validateInput(inputValue);
        if (validationError) {
            setError(validationError);
            return;
        }
        
        setError("");
        updateMessage(inputValue.trim());
        navigate("/loading");
    }

    function handleInputChange(e) {
        setInputValue(e.target.value);
        // Clear error when user starts typing
        if (error) setError("");
    }

    return (
        <form onSubmit={submithandler} className="space-y-6">
            {error && (
                <div className="text-red-400 text-sm text-center bg-red-900 bg-opacity-20 border border-red-500 rounded-lg px-4 py-3">
                    {error}
                </div>
            )}
            
            <input
                type="text"
                className="w-full px-6 py-4 text-lg bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="Enter your innovative idea... be as specific as possible (at least 5 words)"
                value={inputValue}
                onChange={handleInputChange}
                required
            />
            
            <button 
                type="submit"
                className="w-full px-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
            >
                Analyze My Idea
            </button>
        </form>
    );
}

export default IdeaInput;
