import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MessageContext } from "../context/MessageContext";

function Trends() {
    const { message, analysisResults, searchResults } = useContext(MessageContext);
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!message) {
            navigate("/");
            return;
        }
        if (!analysisResults && !searchResults) {
            navigate("/loading");
            return;
        }
    }, [message, analysisResults, searchResults, navigate]);
    
    if (!analysisResults && !searchResults) {
        return <p>Redirecting...</p>;
    }

    const suggestionsData = analysisResults?.suggestions;
    const trendsData = searchResults?.trends || [];

    return (
        <>
            <h2>Market Trends & Suggestions</h2>
            
            {/* AI-generated suggestions */}
            <div style={{ marginBottom: '30px' }}>
                <h3>💡 AI-Generated Suggestions</h3>
                <div style={{ 
                    backgroundColor: '#f0f8ff', 
                    padding: '15px', 
                    borderRadius: '8px',
                    border: '1px solid #e1f5fe'
                }}>
                    <p style={{ margin: 0, lineHeight: '1.6' }}>
                        {suggestionsData?.Suggestions || "No suggestions available"}
                    </p>
                </div>
            </div>

            {/* Market trends from Google Search */}
            <div>
                <h3>📈 Latest Market Trends</h3>
                <p style={{ marginBottom: '15px', color: '#666', fontSize: '14px' }}>
                    Current market trends and insights related to your startup idea
                </p>
                {trendsData && trendsData.length > 0 ? (
                    <div className="trends-list">
                        {trendsData.map((trend, index) => (
                            <div key={index} className="trend-item" style={{ 
                                marginBottom: '15px', 
                                padding: '15px', 
                                border: '1px solid #ddd', 
                                borderRadius: '8px',
                                backgroundColor: '#fafafa',
                                transition: 'box-shadow 0.2s ease'
                            }}>
                                <h4 style={{ margin: '0 0 8px 0' }}>
                                    <a 
                                        href={trend.link} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        style={{ 
                                            color: '#1a0dab', 
                                            textDecoration: 'none', 
                                            fontSize: '16px',
                                            fontWeight: '600'
                                        }}
                                        onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
                                        onMouseOut={(e) => e.target.style.textDecoration = 'none'}
                                    >
                                        {trend.title}
                                    </a>
                                </h4>
                                <p style={{ 
                                    color: '#006621', 
                                    fontSize: '13px', 
                                    margin: '0 0 8px 0',
                                    fontWeight: '500'
                                }}>
                                    {trend.displayLink}
                                </p>
                                <p style={{ 
                                    color: '#545454', 
                                    fontSize: '14px', 
                                    margin: 0,
                                    lineHeight: '1.5'
                                }}>
                                    {trend.snippet}
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div style={{ 
                        textAlign: 'center', 
                        padding: '40px', 
                        backgroundColor: '#f9f9f9',
                        borderRadius: '8px',
                        border: '1px solid #ddd'
                    }}>
                        <p style={{ color: '#666', margin: 0 }}>
                            No trend data available at the moment.
                        </p>
                        <p style={{ color: '#999', fontSize: '14px', margin: '8px 0 0 0' }}>
                            Try refining your startup idea or check back later.
                        </p>
                    </div>
                )}
            </div>
        </>
    );
}

export default Trends;