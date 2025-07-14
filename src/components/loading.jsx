import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState, useRef } from "react";
import { MessageContext } from "../context/MessageContext";
import CallGemini from "../api_calls/gemini";
import { searchTrends, searchCompetitors } from "../api_calls/google_search";

function Loading() {
    const { message, analysisResults, searchResults, updateAnalysisResults, updateSearchResults } = useContext(MessageContext);
    const [currentStep, setCurrentStep] = useState("Analyzing your idea...");
    const [progress, setProgress] = useState(0);
    const hasStartedProcessing = useRef(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!message) {
            navigate("/");
            return;
        }

        // If we already have analysis results, skip loading and go directly to results
        if (analysisResults && searchResults) {
            navigate("/result/market");
            return;
        }

        // Prevent duplicate API calls
        if (hasStartedProcessing.current) {
            return;
        }

        const fetchData = async () => {
            hasStartedProcessing.current = true;
            try {
                // Step 1: AI Analysis
                setCurrentStep("🤖 Running AI analysis...");
                setProgress(25);
                
                const geminiResult = await CallGemini(message);
                const parsedGeminiResult = typeof geminiResult === 'string' ? JSON.parse(geminiResult) : geminiResult;
                updateAnalysisResults(parsedGeminiResult);
                
                // Step 2: Market Research
                setCurrentStep("🔍 Researching competitors and trends...");
                setProgress(50);
                
                // Extract market domain from Gemini analysis for more targeted searches
                const marketDomain = parsedGeminiResult?.market?.Market || 
                                   parsedGeminiResult?.market?.["Market Analysis"] || 
                                   parsedGeminiResult?.market?.domain ||
                                   message; // fallback to original message
                
                // Get competitors using Google Search API for each company from Gemini
                const competitorNames = parsedGeminiResult?.competitors?.Companies || [];
                const competitors = await searchCompetitors(competitorNames);
                
                // Get trends from Google Search using market domain from Gemini
                const trends = await searchTrends(marketDomain);
                
                // Combine the results
                const searchResult = {
                    competitors: competitors,
                    trends: trends
                };
                
                updateSearchResults(searchResult);
                
                // Step 3: Finalizing
                setCurrentStep("📊 Preparing your comprehensive report...");
                setProgress(75);
                
                // Small delay for better UX
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                setProgress(100);
                setCurrentStep("✅ Analysis complete!");
                
                // Navigate to results
                setTimeout(() => {
                    navigate("/result/market");
                }, 500);
                
            } catch (error) {
                console.error("Error during analysis:", error);
                setCurrentStep("❌ Analysis failed. Redirecting...");
                setTimeout(() => {
                    navigate("/result/market");
                }, 2000);
            }
        };

        fetchData();
    }, [message, analysisResults, searchResults, navigate, updateAnalysisResults, updateSearchResults]);

    return (
        <>
            <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                minHeight: '50vh',
                padding: '20px',
                textAlign: 'center'
            }}>
                <Link to={"/"}><button style={{ marginBottom: '20px' }}>← Back</button></Link>
                
                <h2 style={{ marginBottom: '30px' }}>Analyzing Your Startup Idea</h2>
                
                {/* Progress Bar */}
                <div style={{ 
                    width: '300px', 
                    height: '20px', 
                    backgroundColor: '#e0e0e0', 
                    borderRadius: '10px',
                    marginBottom: '20px',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        width: `${progress}%`,
                        height: '100%',
                        backgroundColor: '#4CAF50',
                        borderRadius: '10px',
                        transition: 'width 0.5s ease-in-out'
                    }}></div>
                </div>
                
                <p style={{ fontSize: '18px', marginBottom: '10px' }}>{currentStep}</p>
                <p style={{ fontSize: '14px', color: '#666', marginBottom: '20px' }}>{progress}% Complete</p>
                
                <div style={{ 
                    border: '1px solid #ddd', 
                    borderRadius: '8px', 
                    padding: '15px', 
                    backgroundColor: '#f9f9f9',
                    maxWidth: '400px'
                }}>
                    <h4 style={{ marginBottom: '10px' }}>Your Idea:</h4>
                    <p style={{ fontStyle: 'italic' }}>{message}</p>
                </div>
                
                {/* Loading Animation */}
                <div style={{ marginTop: '30px' }}>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        border: '4px solid #f3f3f3',
                        borderTop: '4px solid #3498db',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                    }}></div>
                </div>
                
                <style jsx>{`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}</style>
            </div>
        </>
    );
}

export default Loading;