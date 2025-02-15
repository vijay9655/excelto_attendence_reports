import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import CustomTable from './CustomTable';
import { Table } from 'antd';

function ExcelReader1() {
  const [excelData, setExcelData] = useState([]);
    const [namelist,setNamelist]=useState([]);
    const [columns,setColumns]=useState([]);
  const [attendence,setAttendence]=useState([]);
  const [mothDays,setMonthdays]=useState(0)

  // Function to handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });

      // Get the first sheet
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];

      // Convert the sheet data to JSON with header: 1 to preserve row structure
      const data = XLSX.utils.sheet_to_json(ws, { header: 1, defval: null });

      // Set the parsed data into state
      setExcelData(data);
      customize(data.slice(1));

    };
    reader.readAsBinaryString(file);
  };
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

            let spliceval = row.splice(4, row.length - 1);


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
                            if(value!=null){
                              datewise.push({"id":obj.id,"name":value,night:1,date:day});
                            }
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

if(value!=null){
                              datewise.push({id:id,day:1,name:value,date:day});
          }          }
                    

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
    datewise.sort((a, b) => a.date - b.date);

    const uniqueNames = [...new Set(datewise.map(item => item.name))];
    uniqueNames.sort();


setNamelist(uniqueNames)
let finaluserdatewise=[];
uniqueNames.map((e,index)=>{
let userdate_wise_record={
    name:e
}

Array.from({ length: mothDays }).map((_,date)=>{
    
    let dataq=datewise.filter(

(entry) => entry.name === e && entry.date === date+1
    )
    if(dataq.length>0){
        userdate_wise_record[`${date+1}`]=(dataq[0].day?"DP":"")+(dataq[0].night?"/NP":"")


    }

    
    
})



finaluserdatewise.push(userdate_wise_record);

   
})




    // setAttendence(datewise)

    setAttendence(finaluserdatewise)



};
useEffect(()=>{
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth(); // 0-indexed, so 0 = January
    const currentYear = currentDate.getFullYear();
    
    // Create a new Date object for the last day of the current month
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
    
    // Get the day of the month for the last day (this gives the number of days in the current month)
    const daysInMonth = lastDayOfMonth.getDate();
    setMonthdays(daysInMonth)

    let column=[{
        title: 'Name',
        dataIndex: 'name',
        fixed: 'left',
        key: 'name',
        width: 150,
        responsive: ['xxl', 'xl', 'lg', 'md', 'sm', 'xs'],
        
        render: (text) => <a style={{fontWeight:"bold",fontSize:"15px"}}>{text}</a>,
      }]
    Array.from({ length: daysInMonth }).map((_,index)=>{
   
        column.push({
            title:index+1,
            dataIndex:index+1,
            key:index+1,
        width:80,
        responsive: ['xxl', 'xl', 'lg', 'md', 'sm', 'xs']

          })
    })
    setColumns(column)



   

},[])
  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
   {/* {columns&&attendence&&<CustomTable attendence={attendence} column={columns}/>
} */}
 <Table 

 scroll={{
    y: 150 * 5,
  }}  bordered pagination={false} columns={columns} dataSource={attendence} />
     
    </div>
  );
}

export default ExcelReader1;
