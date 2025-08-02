import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MessageContext } from "../context/MessageContext";

function Competitors() {
    const { message, searchResults } = useContext(MessageContext);
    const navigate = useNavigate();
    
    useEffect(() => {
        // If no message or search results, redirect appropriately
        if (!message) {
            navigate("/");
            return;
        }
        if (!searchResults) {
            navigate("/loading");
            return;
        }
    }, [message, searchResults, navigate]);
    
    if (!searchResults) {
        return <p>Redirecting...</p>;
    }

    const competitors = searchResults.competitors || [];

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
            }}>Competitors Analysis</h2>
            <p style={{ 
                marginBottom: '20px', 
                color: '#ccc', 
                textAlign: 'center' 
            }}>AI-identified competitor companies in your market space</p>
            <div className="competitors-list" style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                gap: '20px' 
            }}>
                {competitors.length > 0 ? (
                    competitors.map((competitor, index) => (
                        <div key={index} className="competitor-item" style={{ 
                            padding: '15px', 
                            border: '1px solid #444', 
                            borderRadius: '8px', 
                            background: 'rgba(255, 255, 255, 0.1)', 
                            boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)', 
                            transition: 'transform 0.3s ease' 
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                {competitor.image && (
                                    <img 
                                        src={competitor.image} 
                                        alt={competitor.name}
                                        style={{ 
                                            width: '60px', 
                                            height: '60px', 
                                            borderRadius: '50%', 
                                            boxShadow: '0 0 5px rgba(255, 255, 255, 0.5)' 
                                        }}
                                    />
                                )}
                                <div>
                                    <h3 style={{ 
                                        fontSize: '1.5rem', 
                                        margin: '0 0 5px 0', 
                                        color: '#00f260' 
                                    }}>{competitor.name}</h3>
                                    <p style={{ 
                                        margin: 0, 
                                        color: '#ccc' 
                                    }}>{competitor.description}</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p style={{ 
                        textAlign: 'center', 
                        color: '#999' 
                    }}>No competitors data available</p>
                )}
            </div>
        </div>
    );
}

export default Competitors;