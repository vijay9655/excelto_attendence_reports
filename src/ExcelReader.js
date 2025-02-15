import React, { useState } from "react";
import * as ExcelJS from "exceljs";

const ExcelReader = () => {
  const [data, setData] = useState([]);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = async (e) => {
        const arrayBuffer = e.target.result;
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(arrayBuffer);
        
        const sheet = workbook.worksheets[0]; // Get the first sheet
        const sheetData = [];

        sheet.eachRow((row, rowIndex) => {
          if (rowIndex === 1) return; // Skip header row if needed
          row.eachCell((cell, colNumber) => {
            // If the cell is blank, store as `null`
            rowData.push(cell.value === undefined || cell.value === '' ? null : cell.value);
          });
          const rowData = row.values.map((cell,index) => {
            if (cell instanceof Date) {
              
            return undefined;
            //   return cell.toISOString().split("T")[0]; // Format Date as YYYY-MM-DD
            }
           
            return cell;
          });
        
          const filteredArr = rowData.filter(value => value !== undefined);
         // Output: [1, 2, 3, 4]
          
          sheetData.push(filteredArr);
        });

        setData(sheetData);
        customize(sheetData);
      };

      reader.readAsArrayBuffer(file);
    }
  };


//  const customize=(data)=>{
//     let day=1
//     let month =new Date().getMonth()-1;

//     let datewise=[]
//     let filter_val=data.map((row, rowIndex) => {
//         let obj={};
//             // console.log("rowsplice====",row.splice(3,row.length-1));
//             if(!row.includes('NIGHT')){
             
//                 console.log("value===",row[0]);
// obj.id=row[0];
//             }
//             let spliceval=row.splice(3,row.length-1);
          
//             spliceval.length>0&&spliceval.map((value, colIndex) => {
//                if(value!=="NIGHT"&&value!=="DAY "){
// console.log("colIndex==",colIndex+1,((colIndex+1)%2==0));
// if(colIndex==0){
//   day=1
// }
//                 if((colIndex+1)%2==0){
//                    obj={};
//                     console.log("value1===",row[0]);
                   
//                     obj.date=day;
//                 // }-${month}-${new Date().getFullYear()}`;
//                     day=day+1;

//                     if(datewise.length>0){
//                          datewise.map((existuser,index)=>{
//                             console.log("existuser[index]night==",existuser,day);
                            
//                             if(existuser&&(existuser.name==value &&existuser.date==day)){
//                                 datewise[index].night=datewise[index].night?datewise[index].night+1:1;

//                         // datewise.push(obj);
//                           console.log("existuser[index]night==success",datewise);
                          
//                             }
//                             else{
//                                 obj.night=1;
//                                 obj.name=value;
                                

                        
//                         datewise.push(obj);
//                         console.log("night failiur==",obj);


//                             }
//                         })
//                     }
//                     else{
//                         obj.night=1;
//                         datewise.push(obj);
//                         console.log("night no have data===",row[0]);

                        
//                     }
                
//                 }
//                 else{
//                     console.log("value2===",row[0]);
//                     obj={}
//                 obj.date=day;
//                 // obj.date=`${day}-${month}-${new Date().getFullYear()}`;
//                 obj.name=value;
                
//                 if(datewise.length>0){
//                   datewise.map((existuser,index)=>{
//                        console.log("existuser[index]day==",existuser);
                       
                        
//                         if(existuser&&(existuser.name==value &&existuser.date==day)){
//                             // existuser.day+=1;
//                             datewise[index].day+=1;
//  console.log("existuser[index]daysuccess==",obj);
//                         //datewise.push(obj);

//                         }
//                         else{
//                             obj.day=1;
//                                 obj.name=value;
//                         datewise.push(obj);
//                         console.log("if undifined ? existuser[index]day==",obj);


//                         }
//                     })
//                 }
//                 else{

//                     obj.day=1;
//                     datewise.push(obj);
//                     console.log("no have data ? existuser[index]day==",obj);



//                 }
                
//                 }
//                 // datewise.push(obj);
//             }
//                 console.log("value",value)
                
//  })
            
        
//  })
//           console.log("filter_val===",datewise);
          
    

//   }

const customize = (data) => {
    let day = 1;
    let month = new Date().getMonth(); // Current month
    let datewise = [];

    data.forEach((row) => {
        // Skip rows that contain 'NIGHT' value
        if (!row.includes('NIGHT')) {
            let obj = {};

            // Process the row's elements starting from index 3
            let id=row[0];

            let spliceval = row.splice(3, row.length - 1);


            spliceval.forEach((value, colIndex) => {
 
              if(colIndex==0){

                day=1;
              }
                if (value !== "NIGHT" && value !== "DAY ") {

                  if((colIndex+1) % 2 === 0){
                    obj={}
                    obj.id=id;

                    // for night
                    obj.date=day;
                    obj.name=value;

                    let existingIndex = datewise.findIndex(
                              (entry) => entry.name === value && entry.date === day
                          );
  
                          if (existingIndex !== -1) {
                              datewise[existingIndex].night = datewise[existingIndex].night?datewise[existingIndex].night+1:1;


                              
                          } else {
                              obj.night = 1;


                              datewise.push({"id":obj.id,"name":value,night:1,date:day});
                          }
day=day+1;

                  }
                  else {
                    obj={}
                    obj.id=id;
                    // day
                    obj.date=day;
                    obj.name=value;

                    let existingIndex = datewise.findIndex(
                              (entry) => entry.name === value && entry.date === day
                          );
  
                          if (existingIndex !== -1) {
                              // datewise[existingIndex].day = datewise[existingIndex].day+1;
                              datewise[existingIndex].day = datewise[existingIndex].day?datewise[existingIndex].day+1:1;
                    // console.log("existing day==",day,obj, datewise[existingIndex].day);


                              
                          } else {
                              obj.day = 1;

                              datewise.push({id:id,day:1,name:value,date:day});
                          }
                    

                  }

                    // if ((colIndex+1) % 2 === 0) {
                    //     console.log("night==",datewise);

                    //    obj = {}; // Reset obj to avoid overwriting previous values
                    //     obj.date = day;
                    //     obj.name = value;

                    //     // Check if the datewise array already has the name with the same date
                    //     let existingIndex = datewise.findIndex(
                    //         (entry) => entry.name === value && entry.date === day
                    //     );

                    //     if (existingIndex !== -1) {
                    //         datewise[existingIndex].night = (datewise[existingIndex].night || 0) + 1;
                            
                    //     } else {
                    //         obj.night = 1;
                           
                    //         console.log("night1==",datewise);
                    //          // First occurrence of this name on this date
                    //         datewise.push(obj);
                    //    day+=1;

                    //     }
                    //     // Even column index means it's for the "day" part
                       
                    // } else {
                    //     console.log("day==",datewise);

                    //    obj = {}; // Reset obj to avoid overwriting previous values
                    //     obj.date = day;
                    //     obj.name = value;

                    //     // Check if the datewise array already has the name with the same date
                    //     let existingIndex = datewise.findIndex(
                    //         (entry) => entry.name === value && entry.date === day
                    //     );

                    //     if (existingIndex !== -1) {
                    //         datewise[existingIndex].day += 1; // Increment the day count for that entry
                    //     } else {
                    //         obj.day = 1; // First occurrence of this name on this date
                    //         datewise.push(obj);
                    //         console.log("datewise==",obj);
                            
                    //     }  // Odd column index means it's for the "night" part
                    // }
                }
            });

             // Increment the day after processing each row
        }
    });


};


  return (
    <div>
      <h2>Upload Excel File</h2>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      <table border="1">
        <thead>
          <tr>
            {data.length > 0 &&
              data[0].map((_, index) => <th key={index}>{index>=3&&index-2}-{index>=3?new Date().getMonth()+1:"Column"}-{index>=3&&new Date().getFullYear()}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((value, colIndex) => (
                <td key={colIndex}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExcelReader;
