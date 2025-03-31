import React, { useEffect, useState } from 'react'
import HashLoader from 'react-spinners/HashLoader'

function Schedule() {
    const [searchHistory, setSearchHistory] = useState([])
    const [filteredHistory, setFilteredHistory] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await fetch('http://localhost:8000/search/history')
                const data = await response.json();
                setTimeout(() => {
                  if (data.history) {
                      setSearchHistory(data.history);
                      setFilteredHistory(data.history);
                  }
                  setLoading(false);
              }, 2000);
            } catch (error) {
                console.error('Error fetching history:', error)
            }
        }
        
        fetchHistory()
    }, [])

    const handleSearch = () => {
        const filtered = searchHistory.filter(search => 
            search.query.toLowerCase().includes(searchQuery.toLowerCase())
        )
        setFilteredHistory(filtered)
    }

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
            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center',alignItems:'center', marginTop: '20px' ,height:'80%'}}>
                    <HashLoader color="#6e6189" size={100} />
                </div>
            ) : (
                <>
                    <div className="search-container" style={{ marginBottom: '20px' }}>
                        <input 
                            type="text" 
                            placeholder="Search history..." 
                            value={searchQuery} 
                            onChange={(e) => setSearchQuery(e.target.value)} 
                            style={{ padding: '10px', marginRight: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
                        />
                        <button 
                            onClick={handleSearch} 
                            style={{ padding: '10px 20px', background: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                        >
                            Search
                        </button>
                    </div>
                    <div className="history-list">
                        {filteredHistory.map((search, index) => (
                            <div key={index} className="history-item" style={{ marginBottom: '5vh' , border: '3px solid #ccc', padding: '10px', borderRadius: '5px', boxShadow: '5px 5px 10px rgba(241, 234, 234, 0.62)'}}>
                                <div className="history-header">
                                    <h3>Query: {search.query}</h3>
                                    <span className="history-date">
                                        {formatDate(search.timestamp)}
                                    </span>
                                </div>
                                
                                <div className="results-container" >
                                    {/* Papers Section */}
                                    {search.papers_results?.length > 0 && (
                                        <div className="results-group">
                                            <h2>Related Papers Found:</h2>
                                            <div className="results-list">
                                                {search.papers_results.map((paper, paperIndex) => (
                                                    <div key={`paper-${paperIndex}`} className="result-card paper-result" style={{ marginBottom: '20px' , border: '1px solid #ccc', padding: '10px', borderRadius: '5px'}}>
                                                        <h4>{paper.title} ({paper.year})</h4>
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
                                            <h2>Matching Professors:</h2>
                                            <div className="results-list" style={{ marginBottom: '20px' , border: '1px solid #ccc', padding: '10px', borderRadius: '5px'}}>
                                                {search.professors_results.map((professor, profIndex) => (
                                                    <div key={`prof-${profIndex}`} className="result-card professor-result">
                                                        <h4>{professor.Name}</h4>
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
                </>
            )}
        </main>
    )
}

export default Schedule
