import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MessageContext } from "../context/MessageContext";

function Market() {
    const { message, analysisResults } = useContext(MessageContext);
    const navigate = useNavigate();
    
    useEffect(() => {
        // If no message or analysis results, redirect to home or loading
        if (!message) {
            navigate("/");
            return;
        }
        if (!analysisResults) {
            navigate("/loading");
            return;
        }
    }, [message, analysisResults, navigate]);
    
    if (!analysisResults) {
        return <p>Redirecting...</p>;
    }

    const marketData = analysisResults.market;

    return (
        <>
            <h2>Market Analysis</h2>
            <p><strong>Domain:</strong> {marketData?.Domain_Name || "N/A"}</p>
            <p><strong>Market Value:</strong> {marketData?.Market_value || "N/A"}</p>
            <p><strong>Organized Market:</strong> {marketData?.Organised_percent || "N/A"}%</p>
        </>
    );
}

export default Market;