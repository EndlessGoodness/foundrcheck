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
        <form onSubmit={submithandler}>
            <label>🌟What's your IDEA today?</label>
            <br />
            {error && (
                <div style={{ color: "red", fontSize: "14px", marginBottom: "10px" }}>
                    {error}
                </div>
            )}
            <input
                placeholder="Enter your Idea here...be as specific as possible (at least 5 words)"
                value={inputValue}
                onChange={handleInputChange}
                required
            />
            <button type="submit">Go</button>
        </form>
    );
}

export default IdeaInput;
