import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { MessageContext } from "../context/MessageContext";
import CallGemini from "../api_calls/gemini";

function IdeaInput() {
    const { updateMessage, updateAnalysisResults } = useContext(MessageContext);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    async function submithandler(e) {
        e.preventDefault();
        if (!inputValue.trim()) return;
        
        setIsLoading(true);
        updateMessage(inputValue);
        
        try {
            const result = await CallGemini(inputValue);
            const parsedResult = typeof result === 'string' ? JSON.parse(result) : result;
            updateAnalysisResults(parsedResult);
            navigate("/result/market");
        } catch (error) {
            console.error("Error calling Gemini API:", error);
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