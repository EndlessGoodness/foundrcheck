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
    
    if (!analysisResults || !analysisResults.technologies) {
        return <p>Redirecting...</p>;
    }

    const techData = analysisResults.technologies;

    return (
        <>
            <h2 style={{ fontFamily: 'Arial, sans-serif', fontSize: '24px', fontWeight: 'bold', color: '#333' }}>Technology Analysis</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
                
                {/* Frontend */}
                <div style={{ padding: '15px', border: '2px solid #4CAF50', borderRadius: '8px', backgroundColor: '#f1f8e9', fontFamily: 'Verdana, sans-serif' }}>
                    <h3 style={{ color: '#2E7D32', marginBottom: '10px', fontSize: '20px', fontWeight: '600' }}>Frontend</h3>
                    <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '16px', lineHeight: '1.5' }}>
                        {techData.Frontend?.map((tech, index) => (
                            <li key={index} style={{ marginBottom: '5px', color: '#1B5E20' }}>{tech}</li>
                        )) || <li>No frontend technologies available</li>}
                    </ul>
                </div>

                {/* Backend */}
                <div style={{ padding: '15px', border: '2px solid #F44336', borderRadius: '8px', backgroundColor: '#ffebee', fontFamily: 'Verdana, sans-serif' }}>
                    <h3 style={{ color: '#C62828', marginBottom: '10px', fontSize: '20px', fontWeight: '600' }}>Backend</h3>
                    <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '16px', lineHeight: '1.5' }}>
                        {techData.Backend?.map((tech, index) => (
                            <li key={index} style={{ marginBottom: '5px', color: '#B71C1C' }}>{tech}</li>
                        )) || <li>No backend technologies available</li>}
                    </ul>
                </div>

                {/* AI/ML */}
                <div style={{ padding: '15px', border: '2px solid #2196F3', borderRadius: '8px', backgroundColor: '#e3f2fd', fontFamily: 'Verdana, sans-serif' }}>
                    <h3 style={{ color: '#1565C0', marginBottom: '10px', fontSize: '20px', fontWeight: '600' }}>AI/ML</h3>
                    <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '16px', lineHeight: '1.5' }}>
                        {techData["AI/ML"]?.map((tech, index) => (
                            <li key={index} style={{ marginBottom: '5px', color: '#0D47A1' }}>{tech}</li>
                        )) || <li>No AI/ML technologies available</li>}
                    </ul>
                </div>

                {/* Data / Storage */}
                <div style={{ padding: '15px', border: '2px solid #FF9800', borderRadius: '8px', backgroundColor: '#fff3e0', fontFamily: 'Verdana, sans-serif' }}>
                    <h3 style={{ color: '#E65100', marginBottom: '10px', fontSize: '20px', fontWeight: '600' }}>Data / Storage</h3>
                    <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '16px', lineHeight: '1.5' }}>
                        {techData["Data / Storage"]?.map((tech, index) => (
                            <li key={index} style={{ marginBottom: '5px', color: '#BF360C' }}>{tech}</li>
                        )) || <li>No data/storage technologies available</li>}
                    </ul>
                </div>

                {/* APIs / Integrations */}
                <div style={{ padding: '15px', border: '2px solid #4CAF50', borderRadius: '8px', backgroundColor: '#f1f8e9', fontFamily: 'Verdana, sans-serif' }}>
                    <h3 style={{ color: '#2E7D32', marginBottom: '10px', fontSize: '20px', fontWeight: '600' }}>APIs / Integrations</h3>
                    <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '16px', lineHeight: '1.5' }}>
                        {techData["APIs / Integrations"]?.map((tech, index) => (
                            <li key={index} style={{ marginBottom: '5px', color: '#1B5E20' }}>{tech}</li>
                        )) || <li>No APIs/integrations available</li>}
                    </ul>
                </div>

                {/* DevOps / Hosting */}
                <div style={{ padding: '15px', border: '2px solid #F44336', borderRadius: '8px', backgroundColor: '#ffebee', fontFamily: 'Verdana, sans-serif' }}>
                    <h3 style={{ color: '#C62828', marginBottom: '10px', fontSize: '20px', fontWeight: '600' }}>DevOps / Hosting</h3>
                    <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '16px', lineHeight: '1.5' }}>
                        {techData["DevOps / Hosting"]?.map((tech, index) => (
                            <li key={index} style={{ marginBottom: '5px', color: '#B71C1C' }}>{tech}</li>
                        )) || <li>No DevOps/hosting technologies available</li>}
                    </ul>
                </div>

            </div>
        </>
    );
}

export default Technology;