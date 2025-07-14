import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MessageContext } from "../context/MessageContext";

function Technology() {
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
    
    if (!analysisResults) {
        return <p>Redirecting...</p>;
    }

    const technologyData = analysisResults.technologies;

    return (
        <>
            <h2>Technology Analysis</h2>
            {technologyData?.Technologies ? (
                <ul>
                    {technologyData.Technologies.map((tech, index) => (
                        <li key={index}>{tech}</li>
                    ))}
                </ul>
            ) : (
                <p>No technology data available</p>
            )}
        </>
    );
}

export default Technology;