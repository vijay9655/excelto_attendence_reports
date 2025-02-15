import React from 'react'
import{ Table } from"antd";
// import 'antd/dist/antd.min.css';  // Minified CSS




const CustomTable=(val)=>{

  
  return (
    <Table columns={val.columns} dataSource={val.attendence} />
  )
}

export default CustomTable;