import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MessageContext } from "../context/MessageContext";

function Swot() {
    const { message, analysisResults } = useContext(MessageContext);
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!message) {
            navigate("/");
            return;
        }
        if (!analysisResults) {
            navigate("/loading");
            return;
        }
    }, [message, analysisResults, navigate]);
    
    if (!analysisResults || !analysisResults.swot) {
        return <p>Redirecting...</p>;
    }

    const swotData = analysisResults.swot;

    return (
        <>
            <h2>SWOT Analysis</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
                
                {/* Strengths */}
                <div style={{ padding: '15px', border: '2px solid #4CAF50', borderRadius: '8px', backgroundColor: '#f1f8e9' }}>
                    <h3 style={{ color: '#2E7D32', marginBottom: '10px' }}>Strengths</h3>
                    <ul style={{ margin: 0, paddingLeft: '20px' }}>
                        {swotData.Strengths?.map((strength, index) => (
                            <li key={index} style={{ marginBottom: '5px', color: '#1B5E20' }}>{strength}</li>
                        )) || <li>No strengths data available</li>}
                    </ul>
                </div>

                {/* Weaknesses */}
                <div style={{ padding: '15px', border: '2px solid #F44336', borderRadius: '8px', backgroundColor: '#ffebee' }}>
                    <h3 style={{ color: '#C62828', marginBottom: '10px' }}>Weaknesses</h3>
                    <ul style={{ margin: 0, paddingLeft: '20px' }}>
                        {swotData.Weaknesses?.map((weakness, index) => (
                            <li key={index} style={{ marginBottom: '5px', color: '#B71C1C' }}>{weakness}</li>
                        )) || <li>No weaknesses data available</li>}
                    </ul>
                </div>

                {/* Opportunities */}
                <div style={{ padding: '15px', border: '2px solid #2196F3', borderRadius: '8px', backgroundColor: '#e3f2fd' }}>
                    <h3 style={{ color: '#1565C0', marginBottom: '10px' }}>Opportunities</h3>
                    <ul style={{ margin: 0, paddingLeft: '20px' }}>
                        {swotData.Opportunities?.map((opportunity, index) => (
                            <li key={index} style={{ marginBottom: '5px', color: '#0D47A1' }}>{opportunity}</li>
                        )) || <li>No opportunities data available</li>}
                    </ul>
                </div>

                {/* Threats */}
                <div style={{ padding: '15px', border: '2px solid #FF9800', borderRadius: '8px', backgroundColor: '#fff3e0' }}>
                    <h3 style={{ color: '#E65100', marginBottom: '10px' }}>Threats</h3>
                    <ul style={{ margin: 0, paddingLeft: '20px' }}>
                        {swotData.Threats?.map((threat, index) => (
                            <li key={index} style={{ marginBottom: '5px', color: '#BF360C' }}>{threat}</li>
                        )) || <li>No threats data available</li>}
                    </ul>
                </div>

            </div>
        </>
    );
}

export default Swot;
