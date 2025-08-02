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
                updateAnalysisResults({
                    ...parsedGeminiResult,
                    technologies: {
                        Frontend: parsedGeminiResult.technologies?.Frontend || [],
                        Backend: parsedGeminiResult.technologies?.Backend || [],
                        "AI/ML": parsedGeminiResult.technologies?.["AI/ML"] || [],
                        "Data / Storage": parsedGeminiResult.technologies?.["Data / Storage"] || [],
                        "APIs / Integrations": parsedGeminiResult.technologies?.["APIs / Integrations"] || [],
                        "DevOps / Hosting": parsedGeminiResult.technologies?.["DevOps / Hosting"] || [],
                    },
                });
                
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
        <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '100vh', 
            background: 'linear-gradient(135deg, #1a1a2e, #16213e)', 
            color: '#fff', 
            fontFamily: 'Arial, sans-serif' 
        }}>
            <Link to={"/"}><button style={{ marginBottom: '20px' }}>← Back</button></Link>
            
            <h1 style={{ 
                fontSize: '2.5rem', 
                marginBottom: '20px', 
                textShadow: '0 0 10px rgba(255, 255, 255, 0.5)' 
            }}>Analyzing Your Startup Idea</h1>
            <div style={{ 
                width: '80%', 
                height: '10px', 
                background: '#333', 
                borderRadius: '5px', 
                overflow: 'hidden', 
                marginBottom: '20px' 
            }}>
                <div style={{ 
                    width: `${progress}%`, 
                    height: '100%', 
                    background: 'linear-gradient(90deg, #00f260, #0575e6)', 
                    transition: 'width 0.3s ease' 
                }}></div>
            </div>
            <p style={{ 
                fontSize: '1.2rem', 
                textAlign: 'center', 
                textShadow: '0 0 5px rgba(255, 255, 255, 0.3)' 
            }}>{currentStep}</p>
        </div>
    );
}

export default Loading;