import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { MessageContext } from "../context/MessageContext";

function IdeaInput() {
    const { updateMessage } = useContext(MessageContext);
    const [inputValue, setInputValue] = useState("");
    const navigate = useNavigate();

    function submithandler(e) {
        e.preventDefault();
        if (!inputValue.trim()) return;
        
        updateMessage(inputValue);
        navigate("/loading");
    }

    return (
        <form onSubmit={submithandler}>
            <label>🌟What's your IDEA today?</label>
            <br />
            <input
                placeholder="Enter your Idea here...be as specific as possible"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
            />
            <button type="submit">Go</button>
        </form>
    );
}

export default IdeaInput;
