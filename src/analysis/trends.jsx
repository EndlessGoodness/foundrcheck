import { useContext } from "react";
import { MessageContext } from "../context/MessageContext";

function Trends() {
    const { analysisResults, searchResults } = useContext(MessageContext);
    
    if (!analysisResults && !searchResults) {
        return <p>Loading...</p>;
    }

    const suggestionsData = analysisResults?.suggestions;
    const trendsData = searchResults?.trends;

    return (
        <>
            <h2>Suggestions & Market Trends</h2>
            
            {/* AI-generated suggestions */}
            <div style={{ marginBottom: '30px' }}>
                <h3>AI-Generated Suggestions</h3>
                <p>{suggestionsData?.Suggestions || "No suggestions available"}</p>
            </div>

            {/* Market trends from Google Search */}
            <div>
                <h3>Latest Market Trends</h3>
                {trendsData && trendsData.length > 0 ? (
                    <div className="trends-list">
                        {trendsData.map((trend, index) => (
                            <div key={index} className="trend-item" style={{ marginBottom: '15px', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}>
                                <h4>
                                    <a href={trend.link} target="_blank" rel="noopener noreferrer" style={{ color: '#1a0dab', textDecoration: 'none', fontSize: '16px' }}>
                                        {trend.title}
                                    </a>
                                </h4>
                                <p style={{ color: '#006621', fontSize: '14px' }}>{trend.displayLink}</p>
                                <p style={{ color: '#545454', fontSize: '13px' }}>{trend.snippet}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No trend data available.</p>
                )}
            </div>
        </>
    );
}

export default Trends;