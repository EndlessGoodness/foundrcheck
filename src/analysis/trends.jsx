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
        <div style={{ 
            padding: '20px', 
            background: 'linear-gradient(135deg, #1a1a2e, #16213e)', 
            color: '#fff', 
            fontFamily: 'Arial, sans-serif', 
            minHeight: '100vh' 
        }}>
            <h2 style={{ 
                fontSize: '2rem', 
                marginBottom: '20px', 
                textAlign: 'center', 
                textShadow: '0 0 10px rgba(255, 255, 255, 0.5)' 
            }}>Market Trends & Suggestions</h2>
            <div style={{ marginBottom: '30px' }}>
                <h3 style={{ 
                    fontSize: '1.5rem', 
                    marginBottom: '10px', 
                    color: '#00f260', 
                    textAlign: 'center' 
                }}>💡 AI-Generated Suggestions</h3>
                <div style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                    padding: '15px', 
                    borderRadius: '8px', 
                    border: '1px solid #444', 
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)' 
                }}>
                    <p style={{ 
                        margin: 0, 
                        lineHeight: '1.6', 
                        color: '#ccc' 
                    }}>
                        {suggestionsData?.Suggestions || "No suggestions available"}
                    </p>
                </div>
            </div>
            <div>
                <h3 style={{ 
                    fontSize: '1.5rem', 
                    marginBottom: '10px', 
                    color: '#00f260', 
                    textAlign: 'center' 
                }}>📈 Latest Market Trends</h3>
                <p style={{ 
                    marginBottom: '15px', 
                    color: '#ccc', 
                    fontSize: '1rem', 
                    textAlign: 'center' 
                }}>Current market trends and insights related to your startup idea</p>
                {trendsData && trendsData.length > 0 ? (
                    <div className="trends-list" style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                        gap: '20px' 
                    }}>
                        {trendsData.map((trend, index) => (
                            <div key={index} className="trend-item" style={{ 
                                padding: '15px', 
                                border: '1px solid #444', 
                                borderRadius: '8px', 
                                background: 'rgba(255, 255, 255, 0.1)', 
                                boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)', 
                                transition: 'transform 0.3s ease' 
                            }}>
                                <h4 style={{ 
                                    margin: '0 0 8px 0', 
                                    color: '#00f260', 
                                    fontSize: '1.2rem', 
                                    fontWeight: '600' 
                                }}>
                                    <a 
                                        href={trend.link} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        style={{ 
                                            color: '#00f260', 
                                            textDecoration: 'none' 
                                        }}
                                        onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
                                        onMouseOut={(e) => e.target.style.textDecoration = 'none'}
                                    >
                                        {trend.title}
                                    </a>
                                </h4>
                                <p style={{ 
                                    color: '#ccc', 
                                    fontSize: '1rem', 
                                    margin: '0 0 8px 0' 
                                }}>
                                    {trend.displayLink}
                                </p>
                                <p style={{ 
                                    color: '#999', 
                                    fontSize: '0.9rem', 
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
                        backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                        borderRadius: '8px', 
                        border: '1px solid #444', 
                        boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)' 
                    }}>
                        <p style={{ color: '#ccc', margin: 0 }}>No trend data available at the moment.</p>
                        <p style={{ color: '#999', fontSize: '1rem', margin: '8px 0 0 0' }}>Try refining your startup idea or check back later.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Trends;