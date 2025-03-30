import React, { useState } from 'react';

function Home() {
    const [query, setQuery] = useState("");
    const [papers, setPapers] = useState([]);
    const [professors, setProfessors] = useState([]);
    const [error, setError] = useState("");

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
                    <figcaption className="card_title">DEPARTMENT OF INFORMATION TECHNOLOGY</figcaption>
                </figure>
            </div>
            <div className='main-title'>
                <h3>Department at a Glance</h3>
            </div>

            <div>
                <form onSubmit={handleSubmit}>
                    <textarea 
                        value={query} 
                        onChange={(e) => setQuery(e.target.value)} 
                        placeholder="Describe your research"
                        rows="4"
                    />
                    <button type="submit">Search</button>
                </form>
                {error && <p className="error-message">{error}</p>}
            </div>

            <div className="results-section">
                {(papers.length > 0 || professors.length > 0) && (
                    <>
                        {papers.length > 0 && (
                            <div className="results-group">
                                <h3>Related Research Papers:</h3>
                                {papers.map((paper, index) => (
                                    <div key={`paper-${index}`} className="result-card paper-result">
                                        <h4>{paper.title} ({paper.year})</h4>
                                        <p><strong>Abstract:</strong> {paper.abstract}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {professors.length > 0 && (
                            <div className="results-group">
                                <h3>Matching Professors:</h3>
                                {professors.map((professor, index) => (
                                    <div key={`prof-${index}`} className="result-card professor-result">
                                        <h4>{professor.Name}</h4>
                                        <p><strong>Research Interests:</strong> {professor["Field of Interest"]}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}

                {!error && papers.length === 0 && professors.length === 0 && (
                    <p className="no-results">No results found. Try a different search query.</p>
                )}
            </div>
        </main>
    );
}

export default Home;
