import { useContext } from "react";
import { MessageContext } from "../context/MessageContext";

function Technology() {
    const { analysisResults } = useContext(MessageContext);
    
    if (!analysisResults) {
        return <p>Loading...</p>;
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