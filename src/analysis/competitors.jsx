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
        <>
            <h2>Competitors Analysis</h2>
            <p style={{ marginBottom: '20px', color: '#666' }}>
                AI-identified competitor companies in your market space
            </p>
            <div className="competitors-list">
                {competitors.length > 0 ? (
                    competitors.map((competitor, index) => (
                        <div key={index} className="competitor-item" style={{ 
                            marginBottom: '20px', 
                            padding: '15px', 
                            border: '1px solid #ddd', 
                            borderRadius: '8px',
                            backgroundColor: '#f9f9f9'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                                {competitor.image && (
                                    <img 
                                        src={competitor.image} 
                                        alt={competitor.name}
                                        style={{ 
                                            width: '60px', 
                                            height: '60px', 
                                            borderRadius: '8px',
                                            objectFit: 'cover'
                                        }}
                                    />
                                )}
                                <div style={{ flex: 1 }}>
                                    <h3 style={{ margin: '0 0 8px 0' }}>
                                        <a 
                                            href={competitor.link} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            style={{ 
                                                color: '#da552f', 
                                                textDecoration: 'none',
                                                fontWeight: 'bold'
                                            }}
                                        >
                                            {competitor.name}
                                        </a>
                                    </h3>
                                    <p style={{ 
                                        color: '#545454', 
                                        fontSize: '14px', 
                                        margin: '0 0 10px 0',
                                        lineHeight: '1.4'
                                    }}>
                                        {competitor.description}
                                    </p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', fontSize: '12px' }}>
                                        <span style={{ 
                                            color: '#da552f', 
                                            fontWeight: 'bold',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '4px'
                                        }}>
                                            ▲ {competitor.upvotes} upvotes
                                        </span>
                                        {competitor.topics && competitor.topics.length > 0 && (
                                            <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                                                {competitor.topics.slice(0, 3).map((topic, topicIndex) => (
                                                    <span 
                                                        key={topicIndex}
                                                        style={{ 
                                                            backgroundColor: '#e7f3ff', 
                                                            color: '#0066cc',
                                                            padding: '2px 6px',
                                                            borderRadius: '12px',
                                                            fontSize: '11px'
                                                        }}
                                                    >
                                                        {topic.name}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div style={{ 
                        textAlign: 'center', 
                        padding: '40px', 
                        backgroundColor: '#f9f9f9',
                        borderRadius: '8px',
                        border: '1px solid #ddd'
                    }}>
                        <p style={{ color: '#666', margin: 0 }}>
                            No competitors identified for this idea.
                        </p>
                        <p style={{ color: '#999', fontSize: '14px', margin: '8px 0 0 0' }}>
                            This could be a good opportunity for a unique market entry!
                        </p>
                    </div>
                )}
            </div>
        </>
    );
}

export default Competitors;