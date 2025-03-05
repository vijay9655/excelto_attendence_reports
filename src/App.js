// import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";
import * as XLSX from "xlsx";
import ExcelReader from './ExcelReader';
import ExcelReader1 from './ExcelReader1';

function App() {

  const [data, setData] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const binaryStr = e.target.result;
        const workbook = XLSX.read(binaryStr, { type: "binary" });

        // Get first sheet
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];


        const data = XLSX.utils.sheet_to_json(sheet);



        // Convert sheet to JSON with raw date values
        const jsonData = XLSX.utils.sheet_to_json(sheet, {
          raw: false, // Converts dates automatically
          // dateNF: "yyyy-mm-dd", // Date format
        });

        setData(jsonData);
      };
      reader.readAsBinaryString(file);
    }
  };
  return (
//     <div className="App">
// <div>
//       <h2>Upload Excel File</h2>
//       <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
//       <table border="1">
//         <thead>
//           <tr>
//             {data.length > 0 &&
//               Object.keys(data[0]).map((key, index) => (
//                 <th key={index}>{key}</th>
//               ))}
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((row, rowIndex) => (
//             <tr key={rowIndex}>
//               {Object.values(row).map((value, colIndex) => (
//                 <td key={colIndex}>{value}</td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//     </div>
//  <ExcelReader/> 
<div>
<button class="call-button" onClick={()=>{console.log("entered")
;setTimeout(()=>{window.location.href = 'tel:09842023899'},100)}}>
  Call
</button>
<ExcelReader1/> 
</div>
  );
}

export default App;
