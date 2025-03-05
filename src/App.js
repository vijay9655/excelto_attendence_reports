// import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";
import * as XLSX from "xlsx";
import ExcelReader from './ExcelReader';
import ExcelReader1 from './ExcelReader1';

function App() {

  const [data, setData] = useState([]);
  const handleCall = () => {
    const phoneNumber = "+919123456789"; // Replace with dynamic number if needed

    if (/Android/i.test(navigator.userAgent)) {
        // Android: Try the intent URL
        window.location.href = `intent://${phoneNumber}#Intent;scheme=tel;action=android.intent.action.CALL;end`;
    } else {
        // iOS & other platforms: Open the dialer
        window.location.href = `tel:${phoneNumber}`;
    }
};

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
  const handleClick = (event) => {
    event.preventDefault(); // Prevent the default anchor behavior
    
    // Get the phone number from the data-phone-number attribute
    const phoneNumber = event.target.getAttribute('data-phone-number');
    console.log("phoneNumber==",phoneNumber);
    
    // Check if the phone number exists
    if (phoneNumber) {
      // Initiate a phone call using the 'tel' protocol
      window.location.href = `tel:${phoneNumber}`;
    } else {
      console.error('Phone number not available!');
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
<a 
      href="#"
      className="Od1FEc P6Deab"
      data-phone-number="09842023899"
      role="button"
      aria-label="Call"
      onClick={handleClick}  // Event handler for click
    >
       <div className="JWyTcc">Call</div>
    </a>
<a href='tel:+919123456789' class="call-button" >
  +91Call
</a><br/>
<a href='tel:9234567899' class="call-button" >
  Call
</a><br/>
<a href='tel:09234567899' class="call-button" >
  091Call
</a><br/>
<button class="call-button" onClick={handleCall}>
  Call
</button>
<button class="call-button" onClick={()=>window.location.href="tel:9923456678"}>
  Call
</button>
<ExcelReader1/> 
</div>
  );
}

export default App;
