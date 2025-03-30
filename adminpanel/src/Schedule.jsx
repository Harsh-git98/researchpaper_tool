import React, { useEffect, useState } from 'react'

function Schedule() {
    const [searchHistory, setSearchHistory] = useState([])

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await fetch('http://localhost:8000/search/history')
                const data = await response.json()
                if (data.history) {
                    setSearchHistory(data.history)
                }
            } catch (error) {
                console.error('Error fetching history:', error)
            }
        }
        
        fetchHistory()
    }, [])

    const formatDate = (dateString) => {
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit' 
        }
        return new Date(dateString).toLocaleDateString(undefined, options)
    }

    return (
        <main className="main-container">
            <h1>Search History</h1>
            <div className="history-list">
                {searchHistory.map((search, index) => (
                    <div key={index} className="history-item">
                        <div className="history-header">
                            <h3>{search.query}</h3>
                            <span className="history-date">
                                {formatDate(search.timestamp)}
                            </span>
                        </div>
                        
                        <div className="results-container">
                            {/* Papers Section */}
                            {search.papers_results?.length > 0 && (
                                <div className="results-group">
                                    <h4>Related Papers Found:</h4>
                                    <div className="results-list">
                                        {search.papers_results.map((paper, paperIndex) => (
                                            <div key={`paper-${paperIndex}`} className="result-card paper-result">
                                                <h5>{paper.title} ({paper.year})</h5>
                                                <p className="paper-abstract">
                                                    {paper.abstract.substring(0, 150)}...
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Professors Section */}
                            {search.professors_results?.length > 0 && (
                                <div className="results-group">
                                    <h4>Matching Professors:</h4>
                                    <div className="results-list">
                                        {search.professors_results.map((professor, profIndex) => (
                                            <div key={`prof-${profIndex}`} className="result-card professor-result">
                                                <h5>{professor.Name}</h5>
                                                <p className="research-interests">
                                                    {professor["Field of Interest"]}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </main>
    )
}

export default Schedule
