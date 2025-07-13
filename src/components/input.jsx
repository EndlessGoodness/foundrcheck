import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { MessageContext } from "../context/MessageContext";
import CallGemini from "../api_calls/gemini";
import { searchAll } from "../api_calls/google_search";

function IdeaInput() {
    const { updateMessage, updateAnalysisResults, updateSearchResults } = useContext(MessageContext);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    async function submithandler(e) {
        e.preventDefault();
        if (!inputValue.trim()) return;
        
        setIsLoading(true);
        updateMessage(inputValue);
        
        try {
            // Call both Gemini API and Google Search API in parallel
            const [geminiResult, searchResult] = await Promise.all([
                CallGemini(inputValue),
                searchAll(inputValue)
            ]);
            
            const parsedGeminiResult = typeof geminiResult === 'string' ? JSON.parse(geminiResult) : geminiResult;
            updateAnalysisResults(parsedGeminiResult);
            updateSearchResults(searchResult);
            
            navigate("/result/market");
        } catch (error) {
            console.error("Error calling APIs:", error);
            // Still navigate but without results
            navigate("/result/market");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form onSubmit={submithandler}>
            <label>🌟What's your IDEA today?</label>
            <br />
            <input
                placeholder="Enter your Idea here...be as specific as possible"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                disabled={isLoading}
            />
            <button type="submit" disabled={isLoading}>
                {isLoading ? "Analyzing..." : "Go"}
            </button>
        </form>
    );
}

export default IdeaInput;