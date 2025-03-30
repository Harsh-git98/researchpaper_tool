import React from 'react'

 function Analytics() {
   return (
     <main className="main-container">
       <div style={{
  margin: '0 auto',
  backgroundColor: '#7f1d1d',
  padding: '24px',
  borderRadius: '16px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
}}>
  <h1 style={{
    fontSize: '24px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '16px',
    borderBottom: '2px solid #fca5a5',
    paddingBottom: '8px'
  }}>Department Information</h1>
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

  <h2 style={{
    fontSize: '20px',
    fontWeight: '600',
    marginTop: '24px',
    borderBottom: '2px solid #fca5a5',
    paddingBottom: '8px'
  }}>Faculty Members</h2>
  <div style={{ marginTop: '16px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
    {facultyData.map((faculty, index) => (
      <div key={index} style={{
        backgroundColor: '#b91c1c',
        padding: '16px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
      }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600' }}>{faculty.name}</h3>
        <p style={{ fontSize: '14px', color: '#d1d5db' }}>{faculty.designation}</p>
        <p style={{ fontSize: '14px', color: '#d1d5db' }}>📞 {faculty.phone}</p>
        <p style={{ fontSize: '14px', color: '#d1d5db' }}>✉ {faculty.email}</p>
      </div>
    ))}
  </div>
</div>

     </main>
   );
 }
 
 const facultyData = [
   {
     name: "Arindam Biswas",
     designation: "Professor",
     phone: "+91 33 26680525/0526 x 3003",
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
     phone: "+91 33 26684561 x260",
     email: "chandan@it.iiests.ac.in",
   },
   {
     name: "Hafizur Rahaman",
     designation: "Professor",
     phone: "+91 33 26684561 x309/249",
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
     phone: "+91 33 26684561 x260",
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
     phone: "+91 33 26684561 x858",
     email: "santipmaity@it.iiests.ac.in",
   },
   {
     name: "Shyamalendu Kandar",
     designation: "Assistant Professor",
     phone: "+91 33 26684561 x260",
     email: "shyamalenduk@it.iiests.ac.in",
   },
   {
     name: "Sukanta Das",
     designation: "Associate Professor",
     phone: "+91 33 26684561 x260",
     email: "sukanta@it.iiests.ac.in",
   },
   {
     name: "Surajit Kumar Roy",
     designation: "Associate Professor",
     phone: "+91 33 26684561 x260",
     email: "suraroy@it.iiests.ac.in",
   },
   {
     name: "Tuhina Samanta",
     designation: "Head & Associate Professor",
     phone: "+91 33 26684561 x260",
     email: "t_samanta@it.iiests.ac.in",
   },
 ];
 
 export default Analytics;