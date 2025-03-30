import React, { useState } from 'react';

function Home() {
    const [query, setQuery] = useState("");
    const [papers, setPapers] = useState([]);
    const [professors, setProfessors] = useState([]);
    const [error, setError] = useState("Search for research papers and professors here.");
    const [expandedAbstracts, setExpandedAbstracts] = useState({});

    const toggleAbstract = (index) => {
        setExpandedAbstracts((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    const truncateText = (text, length = 150) => {
        if (text.length <= length) return text;
        return text.substring(0, length) + "...";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!query.trim()) {
            setError("Query cannot be empty.");
            return;
        }

        try {
            const response = await fetch("http://localhost:8000/search", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ query })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            if (data.papers || data.professors) {
                setPapers(data.papers || []);
                setProfessors(data.professors || []);
                setError("");
            } else {
                setPapers([]);
                setProfessors([]);
                setError("No results found.");
            }
        } catch (error) {
            console.error("Search error:", error);
            setError("Failed to perform search.");
            setPapers([]);
            setProfessors([]);
        }
    };

    return (
        <main className="main-container">
            <div className="cards">
                <figure className="card1">
                    <figcaption className="card_title">Research Helper tool</figcaption>
                </figure>
            </div>
            <div className='main-title'>
                <h3 style={{textAlign:'center', margin:'auto auto'}}>Search Here</h3>
            </div>

            <div>
                <form onSubmit={handleSubmit} style={{ margin: '20px auto', textAlign: 'center', padding:'20px', borderRadius:'10px', border:'2px solid red', backgroundColor:'transparent', boxShadow:'0 0 10px rgba(0,0,0,0.1)', display: 'flex', flexDirection:'column', gap:'10px'}}>
                    <textarea 
                        value={query} 
                        onChange={(e) => setQuery(e.target.value)} 
                        placeholder="Describe your research"
                        rows="4"
                        style={{  padding: '10px', borderRadius: '5px', border: '1px solid #ccc', fontSize: '16px', backgroundColor: 'Black', color: 'White' }}
                    />
                    <button type="submit" style={{border:'black 2px solid', borderRadius:'10px', padding:'10px', fontWeight:'bold'}}>Search</button>
                </form>
                {error && <h3 className="error-message">{error}</h3>}
            </div>

            <div style={{ padding: "20px", margin: "auto", fontFamily: "Arial, sans-serif" }}>
            {(papers.length > 0 || professors.length > 0) && (
                <>
                    {papers.length > 0 && (
                        <div style={{ marginBottom: "20px" }}>
                            <h3 style={{ borderBottom: "2px solid #ddd", paddingBottom: "5px" }}>Related Research Papers:</h3>
                            {papers.map((paper, index) => (
                                <div key={`paper-${index}`} style={{ border: "2px solid red", padding: "10px", borderRadius: "5px", marginBottom: "10px", backgroundColor: "transparent", minHeight:'120px' }}>
                                    <h4 style={{ margin: "5px 0", color:'white' }}>{paper.title} ({paper.year})</h4>
                                    <p>
                                        <strong>Abstract:</strong> {expandedAbstracts[index] ? paper.abstract : truncateText(paper.abstract)}
                                        {paper.abstract.length > 150 && (
                                            <span 
                                                onClick={() => toggleAbstract(index)} 
                                                style={{ color: "red", cursor: "pointer", marginLeft: "5px" }}
                                            >
                                                {expandedAbstracts[index] ? " Read Less" : " Read More"}
                                            </span>
                                        )}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}

                    {professors.length > 0 && (
                        <div style={{ marginBottom: "20px", flexDirection: "row", gap: "10px" }}>
                            <h3 style={{ borderBottom: "2px solid #ddd", paddingBottom: "5px" }}>Matching Professors:</h3>
                            <div style={{ display: "flex", flexDirection: "row", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
                                {professors.map((professor, index) => (
                                <div key={`prof-${index}`} style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "5px", marginBottom: "10px", backgroundColor: "Black" , width: "200px", textAlign: "center" }}>
                                    <h4 style={{ margin: "5px 0" }}>{professor.Name}</h4>
                                    <p><strong>Research Interests:</strong><br></br> {professor["Field of Interest"]}</p>
                                </div>
                            ))}
                            </div>

                        </div>
                    )}
                </>
            )}

            {!error && papers.length === 0 && professors.length === 0 && (
                <p style={{ textAlign: "center", color: "#888", fontSize: "16px" }}>No results found. Try a different search query.</p>
            )}
        </div>
        </main>
    );
}

export default Home;
