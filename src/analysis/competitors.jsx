import { useContext } from "react";
import { MessageContext } from "../context/MessageContext";

function Competitors() {
    const { searchResults } = useContext(MessageContext);
    
    if (!searchResults || !searchResults.competitors) {
        return <p>Loading competitors...</p>;
    }

    return (
        <>
            <h2>Competitors Analysis</h2>
            <div className="competitors-list">
                {searchResults.competitors.length > 0 ? (
                    searchResults.competitors.map((competitor, index) => (
                        <div key={index} className="competitor-item" style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}>
                            <h3>
                                <a href={competitor.link} target="_blank" rel="noopener noreferrer" style={{ color: '#1a0dab', textDecoration: 'none' }}>
                                    {competitor.title}
                                </a>
                            </h3>
                            <p style={{ color: '#006621', fontSize: '14px' }}>{competitor.displayLink}</p>
                            <p style={{ color: '#545454', fontSize: '13px' }}>{competitor.snippet}</p>
                        </div>
                    ))
                ) : (
                    <p>No competitors found for this idea.</p>
                )}
            </div>
        </>
    );
}

export default Competitors;