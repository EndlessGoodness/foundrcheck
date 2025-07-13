import { useContext } from "react";
import { MessageContext } from "../context/MessageContext";

function Market() {
    const { analysisResults } = useContext(MessageContext);
    
    if (!analysisResults) {
        return <p>Loading...</p>;
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