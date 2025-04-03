import React from 'react'
import { useEffect, useState } from 'react'
import HashLoader from 'react-spinners/HashLoader'
 function Analytics() {

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

   return (
    <main className="main-container">
    {loading ? (
      <div style={{ display: 'flex', justifyContent: 'center',alignItems:'center', marginTop: '20px' ,height:'80%'}}>
          <HashLoader color="#6e6189" size={100} />
      </div>
  ) : (
    <>

       <div style={{
  margin: '0 auto',
  backgroundColor: '#211e46',
  padding: '24px',
  borderRadius: '16px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
}}>
  <h1 style={{
    fontSize: '24px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '16px',
    borderBottom: '2px solid #cbc9cc',
    paddingBottom: '8px'
  }}>About IT Department</h1>
  <p style={{ lineHeight: '1.6', color: '#e5e7eb' }}>
    The Department of Information Technology started its journey in 2000. It is one of the youngest departments of
    this 168-year-old institute. The department specializes in diverse domains of research ranging from VLSI
    Design and Test, Hardware Security, Image and Signal Processing, Digital Geometry, Cellular Automata, Cyber
    Security to recently evolving areas of Wireless Networks, Cognitive Radio Networks, Internet-of-Things, and
    Machine Learning.
  </p>
  <p style={{ lineHeight: '1.6', color: '#e5e7eb', marginTop: '16px' }}>
    The faculty, research scholars, and students strive to produce world-class research outcomes through top-tier
    journal and conference publications, books, chapters, patents, and copyrights. The department has been involved
    in multiple research projects, including six different SPARC projects, making it one of the top research units
    in the institute.
  </p>

  <h3 style={{
    fontSize: '20px',
    fontWeight: '600',
    marginTop: '24px',
    borderBottom: '2px solid #000003',
    paddingBottom: '8px'
  }}>Faculty Members</h3>
  <div style={{ marginTop: '16px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
    {facultyData.map((faculty, index) => (
      <div key={index} style={{
        backgroundColor: '#9c90aa',
        padding: '16px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
      }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600' }}>{faculty.name}</h3>
        <p style={{ fontSize: '14px', color: '#000003' }}>{faculty.designation}</p>
        <p style={{ fontSize: '14px', color: '#000' }}>📞 {faculty.phone}</p>
        <p style={{ fontSize: '14px', color: '#000003' }}>✉ {faculty.email}</p>
      </div>
    ))}
  </div>
</div>
</>
  )}
     </main>
    

);
 }
 
 const facultyData = [
   {
     name: "Arindam Biswas",
     designation: "Professor",
     phone: "+91 33 26680525/0526 ",
     email: "abiswas@it.iiests.ac.in",
   },
   {
     name: "Binanda Sengupta",
     designation: "Assistant Professor",
     phone: "+91 33 26684561",
     email: "binanda@it.iiests.ac.in",
   },
   {
     name: "Chandan Giri",
     designation: "Associate Professor",
     phone: "+91 33 26684561 ",
     email: "chandan@it.iiests.ac.in",
   },
   {
     name: "Hafizur Rahaman",
     designation: "Professor",
     phone: "+91 33 26684561 ",
     email: "rahaman_h@it.iiests.ac.in",
   },
   {
     name: "Indrajit Banerjee",
     designation: "Associate Professor",
     phone: "+91 33 26684561-63",
     email: "ibanerjee@it.iiests.ac.in",
   },
   {
     name: "Prasun Ghosal",
     designation: "Associate Professor",
     phone: "+91 33 26684561 ",
     email: "p_ghosal@it.iiests.ac.in",
   },
   {
     name: "Ruchira Naskar",
     designation: "Associate Professor",
     phone: "+91 33 26684561",
     email: "ruchira@it.iiests.ac.in",
   },
   {
     name: "Santi Prasad Maity",
     designation: "Professor",
     phone: "+91 33 26684561 ",
     email: "santipmaity@it.iiests.ac.in",
   },
   {
     name: "Shyamalendu Kandar",
     designation: "Assistant Professor",
     phone: "+91 33 26684561 ",
     email: "shyamalenduk@it.iiests.ac.in",
   },
   {
     name: "Sukanta Das",
     designation: "Associate Professor",
     phone: "+91 33 26684561 ",
     email: "sukanta@it.iiests.ac.in",
   },
   {
     name: "Surajit Kumar Roy",
     designation: "Associate Professor",
     phone: "+91 33 26684561 ",
     email: "suraroy@it.iiests.ac.in",
   },
   {
     name: "Tuhina Samanta",
     designation: "Head & Associate Professor",
     phone: "+91 33 26684561 ",
     email: "t_samanta@it.iiests.ac.in",
   },
 ];
 
 export default Analytics;