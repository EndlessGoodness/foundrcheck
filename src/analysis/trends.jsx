import { useContext } from "react";
import { MessageContext } from "../context/MessageContext";

function Trends() {
    const { analysisResults } = useContext(MessageContext);
    
    if (!analysisResults) {
        return <p>Loading...</p>;
    }

    const suggestionsData = analysisResults.suggestions;

    return (
        <>
            <h2>Suggestions</h2>
            <p>{suggestionsData?.Suggestions || "No suggestions available"}</p>
        </>
    );
}

export default Trends;