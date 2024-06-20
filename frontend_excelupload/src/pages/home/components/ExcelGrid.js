// // import React, { useState } from 'react';
// // import axios from 'axios';
// // import DataGrid, { Column } from 'devextreme-react/data-grid';
// // import FileUploader from 'devextreme-react/file-uploader';

// // const ExcelGrid = () => {
// //   const [data, setData] = useState([]);
// //   const [columns, setColumns] = useState([]);

// //   const handleFileUpload = async (file) => {
// //     const formData = new FormData();
// //     formData.append('file', file);

// //     try {
// //       const response = await axios.post('https://localhost:7059/api/ExcelUpload/upload', formData, {
// //         headers: {
// //           'Content-Type': 'multipart/form-data',
// //         },
// //       });

// //       const excelData = response.data;

// //       console.log('Excel Data:', excelData); // Log excelData to console

// //       if (!excelData || !excelData.columns || !excelData.data) {
// //         throw new Error('Invalid data received from server');
// //       }

// //       // Transform columns to include accessor
// //       const transformedColumns = excelData.columns.map((col) => ({
// //         header: col.header,
// //         accessor: col.header.toLowerCase().replace(/\s+/g, '_'),
// //       }));

// //       // Transform data to match the accessors
// //       const transformedData = excelData.data.map(row => {
// //         const transformedRow = {};
// //         transformedColumns.forEach(column => {
// //           transformedRow[column.accessor] = row[column.header];
// //         });
// //         return transformedRow;
// //       });

// //       setColumns(transformedColumns);
// //       setData(transformedData);
// //     } catch (error) {
// //       console.error('Error uploading file:', error);
// //       // Handle error, e.g., show error message to user
// //     }
// //   };

// //   return (
// //     <div>
// //       <FileUploader
// //         accept=".xlsx, .xls"
// //         uploadMode="instantly"
// //         onValueChanged={(e) => handleFileUpload(e.value[0])}
// //         labelText="Upload Excel File"
// //       />
// //       {columns.length > 0 && (
// //         <DataGrid
// //           dataSource={data}
// //           showBorders={true}
// //           rowAlternationEnabled={true}
// //         >
// //           {columns.map((col, index) => (
// //             <Column
// //               key={index}
// //               dataField={col.accessor}
// //               caption={col.header}
// //             />
// //           ))}
// //         </DataGrid>
// //       )}
// //     </div>
// //   );
// // };

// // export default ExcelGrid;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import DataGrid, { Column } from 'devextreme-react/data-grid';
// import FileUploader from 'devextreme-react/file-uploader';
// import SelectBox from 'devextreme-react/select-box';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const ExcelGrid = () => {
//   const [datasources, setDatasources] = useState([]);
//   const [selectedDatasource, setSelectedDatasource] = useState(null);
//   const [data, setData] = useState([]);
//   const [columns, setColumns] = useState([]);
//   const [uploadError, setUploadError] = useState(null);

//   useEffect(() => {
//     const fetchDatasources = async () => {
//       try {
//         const response = await axios.get('https://localhost:7059/api/ExcelUpload/datasources');
//         setDatasources(response.data);
//       } catch (error) {
//         console.error('Error fetching datasources:', error);
//       }
//     };

//     fetchDatasources();
//   }, []);

 

// //  const handleFileUpload = async (file) => {
// //     const formData = new FormData();
// //     formData.append('file', file);

// //     try {
// //       const response = await axios.post(`https://localhost:7059/api/ExcelUpload/upload?datasourceId=${selectedDatasource}`, formData, {
// //         headers: {
// //           'Content-Type': 'multipart/form-data',
// //         },
// //       });

// //       const excelData = response.data;

// //       if (!excelData || !excelData.columns || !excelData.data) {
// //         throw new Error('Invalid data received from server');
// //       }

// //       setUploadError(null);

// //       const transformedColumns = excelData.columns.map((col) => ({
// //         header: col.Header,
// //         accessor: col.Header.toLowerCase().replace(/\s+/g, '_'),
// //       }));

// //       const transformedData = excelData.data.map(row => {
// //         const transformedRow = {};
// //         transformedColumns.forEach(column => {
// //           transformedRow[column.accessor] = row[column.Header];
// //         });
// //         return transformedRow;
// //       });

// //       setColumns(transformedColumns);
// //       setData(transformedData);
// //     } catch (error) {
// //       console.error('Error uploading file:', error);
// //       setUploadError(error.response?.data?.message || 'Error uploading file');
// //     }
// //   };


// const handleFileUpload = async (file) => {
//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//         const response = await axios.post(`https://localhost:7059/api/ExcelUpload/upload?datasourceId=${selectedDatasource}`, formData, {
//             headers: {
//                 'Content-Type': 'multipart/form-data',
//             },
//         });

//         const excelData = response.data;

//         console.log('Excel data received:', excelData);

//         if (!excelData || !excelData.columns || !excelData.data) {
//             throw new Error('Invalid data received from server');
//         }

//         setUploadError(null);

//         // const transformedColumns = excelData.columns.map((col) => ({
//         //     header: col?.Header || '', // Ensure col.Header is defined
//         //     accessor: col?.Header ? col.Header.toLowerCase().replace(/\s+/g, '_') : '', // Ensure col.Header is defined
//         // }));

//         const transformedColumns = excelData.columns.map((col) => ({
//             header: col.header || '', // Adjusted to use col.header instead of col.Header
//             accessor: col.header ? col.header.toLowerCase().replace(/\s+/g, '_') : '', // Adjusted to use col.header instead of col.Header
//         }));
        
//         console.log('Transformed columns:', transformedColumns);

//         const transformedData = excelData.data.map(row => {
//             const transformedRow = {};
//             transformedColumns.forEach(column => {
//                 transformedRow[column.accessor] = row[column.header];
//             });
//             return transformedRow;
//         });

//         setColumns(transformedColumns);
//         setData(transformedData);
//     } catch (error) {
//         console.error('Error uploading file:', error);
//         setUploadError(error.response?.data?.message || 'Error uploading file');
//         toast.error(error.response?.data?.message || 'Error uploading file');
//     }
// };


//   return (
//     <div>
//       <SelectBox
//         dataSource={datasources}
//         displayExpr="datasourceName"
//         valueExpr="id"
//         value={selectedDatasource}
//         onValueChanged={(e) => setSelectedDatasource(e.value)}
//         placeholder="Select a Datasource"
//       />
//       <FileUploader
//         accept=".xlsx, .xls"
//         uploadMode="instantly"
//         onValueChanged={(e) => handleFileUpload(e.value[0])}
//         labelText="Upload Excel File"
//         disabled={!selectedDatasource}
//       />
//       {uploadError && <div style={{ color: 'red' }}>{uploadError}</div>}
//       {columns.length > 0 && (
//         <DataGrid
//           dataSource={data}
//           showBorders={true}
//           rowAlternationEnabled={true}
//         >
//           {columns.map((col, index) => (
//             <Column
//               key={index}
//               dataField={col.accessor}
//               caption={col.header}
//             />
//           ))}
//         </DataGrid>
//       )}
//         <ToastContainer />
//     </div>
//   );
// };

// export default ExcelGrid;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import DataGrid, { Column ,LoadPanel,RequiredRule,Editing} from 'devextreme-react/data-grid';
// import FileUploader from 'devextreme-react/file-uploader';
// import SelectBox from 'devextreme-react/select-box';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const ExcelGrid = () => {
//   const [datasources, setDatasources] = useState([]);
//   const [selectedDatasource, setSelectedDatasource] = useState(null);
//   const [data, setData] = useState([]);
//   const [columns, setColumns] = useState([]);
//   const [uploadError, setUploadError] = useState(null);

//   useEffect(() => {
//     const fetchDatasources = async () => {
//       try {
//         const response = await axios.get('https://localhost:7059/api/ExcelUpload/datasources');
//         setDatasources(response.data);
//       } catch (error) {
//         console.error('Error fetching datasources:', error);
//       }
//     };

//     fetchDatasources();
//   }, []);

//   const handleFileUpload = async (file) => {
//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const response = await axios.post(`https://localhost:7059/api/ExcelUpload/upload?datasourceId=${selectedDatasource}`, formData, {
//         headers: {
//           'Content-Type': 'ultipart/form-data',
//         },
//       });

//       const excelData = response.data;

//       if (!excelData ||!excelData.columns ||!excelData.data) {
//         throw new Error('Invalid data received from server');
//       }

//       setUploadError(null);

//       const transformedColumns = excelData.columns.map((col) => ({
//         header: col.header || '',
//         accessor: col.header? col.header.toLowerCase().replace(/\s+/g, '_') : '',
//       }));

//       const transformedData = excelData.data.map((row, rowIndex) => {
//         const transformedRow = {};
//         transformedColumns.forEach((column) => {
//           transformedRow[column.accessor] = row[column.header];
//         });
//         transformedRow.validationErrors = excelData.validationResults[rowIndex];
//         return transformedRow;
//       });

//       setColumns(transformedColumns);
//       setData(transformedData);
//     } catch (error) {
//       console.error('Error uploading file:', error);
//       setUploadError(error.response?.data?.message || 'Error uploading file');
//       toast.error(error.response?.data?.message || 'Error uploading file');
//     }
//   };

//   const cellRender = ({ data, column }) => {
//     if (!columns || columns.length === 0) {
//       return <div>{data[column.dataField]}</div>;
//     }
  
//     // const headerName = columns.find((col) => col.accessor === column.dataField).header;
//     const headerName = column.caption;
//     const error = data.validationErrors && data.validationErrors[headerName];
    
//     return (
//       <div
//         style={{
//           position: 'relative',
//           padding: '5px',
//           backgroundColor: error ? '#ffcccc' : 'transparent', // Light red background for errors
//           color: error ? '#b30000' : 'black', // Dark red text for errors
//           border: error ? '1px solid #ff0000' : '1px solid transparent', // Red border for errors
//           borderRadius: '3px',
//           boxShadow: error ? '0 0 5px rgba(255, 0, 0, 0.5)' : 'none', // Slight shadow for errors
//           transition: 'all 0.3s ease-in-out', // Smooth transition for the cell changes
//         }}
//       >
//         {data[column.dataField]}
//       </div>
//     );
//   };
  

//   return (
//     <div>
//       <SelectBox
//         dataSource={datasources}
//         displayExpr="datasourceName"
//         valueExpr="id"
//         value={selectedDatasource}
//         onValueChanged={(e) => setSelectedDatasource(e.value)}
//         placeholder="Select a Datasource"
//       />
//       <FileUploader
//         accept=".xlsx,.xls"
//         uploadMode="instantly"
//         onValueChanged={(e) => handleFileUpload(e.value[0])}
//         labelText="Upload Excel File"
//         disabled={!selectedDatasource}
//       />
//       {uploadError && <div style={{ color: 'red' }}>{uploadError}</div>}
//       {columns.length > 0 && (
//         <DataGrid
//           dataSource={data}
//           showBorders={true}
//           // editing={{
//           //   mode: 'cell',
//           //   allowUpdating: true,
//           //   allowDeleting: false,
//           //   allowAdding: false,
//           // }}
//           allowUpdating={true}
          
          
//         >
//           {columns.map((col, index) => (
//             <Column
//               key={index}
//               dataField={col.accessor}
//               caption={col.header}
//               cellRender={cellRender}
//               // editCellRender={(cellElement) => {
//               //   return (
//               //     <div>
//               //       {cellElement.value}
//               //       {cellElement.data.validationErrors && cellElement.data.validationErrors[cellElement.column.dataField] && (
//               //         <RequiredRule
//               //           message={cellElement.data.validationErrors[cellElement.column.dataField]}
//               //         />
//               //       )}
//               //     </div>
//               //   );
//               // }}
//             />
//           ))}
//             <Editing mode="cell" allowUpdating={true} />
//            <LoadPanel enabled />
//         </DataGrid>
//       )}
//       <ToastContainer />
//     </div>
//   );
// };

// export default ExcelGrid;





import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataGrid, { Column, Editing, LoadPanel } from 'devextreme-react/data-grid';
import FileUploader from 'devextreme-react/file-uploader';
import SelectBox from 'devextreme-react/select-box';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ExcelGrid = () => {
  const [datasources, setDatasources] = useState([]);
  const [selectedDatasource, setSelectedDatasource] = useState(null);
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [uploadError, setUploadError] = useState(null);

  useEffect(() => {
    const fetchDatasources = async () => {
      try {
        const response = await axios.get('https://localhost:7059/api/ExcelUpload/datasources');
        setDatasources(response.data);
      } catch (error) {
        console.error('Error fetching datasources:', error);
      }
    };

    fetchDatasources();
  }, []);

  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`https://localhost:7059/api/ExcelUpload/upload?datasourceId=${selectedDatasource}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const excelData = response.data;

      if (!excelData || !excelData.columns || !excelData.data) {
        throw new Error('Invalid data received from server');
      }

      setUploadError(null);

      const transformedColumns = excelData.columns.map((col) => ({
        header: col.header || '',
        accessor: col.header ? col.header.toLowerCase().replace(/\s+/g, '_') : '',
      }));

    
     

      const transformedData = excelData.data.map((row, rowIndex) => {
        const transformedRow = {};
        console.log("Current row:", row); // Log the current row object
        transformedColumns.forEach((column) => {
          console.log("Current column:", column); // Log the current column object
          transformedRow[column.accessor] = row[column.header];
        });
        console.log("Transformed row:", transformedRow); // Log the transformed row object
        transformedRow.validationErrors = excelData.validationResults[rowIndex];
        transformedRow.rowId = rowIndex + 1; // Add the rowId property
        return transformedRow;
      });
      
      
      setColumns(transformedColumns);
      setData(transformedData);
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadError(error.response?.data?.message || 'Error uploading file');
      toast.error(error.response?.data?.message || 'Error uploading file');
    }
  };

  const cellRender = ({ data, column }) => {
    if (!columns || columns.length === 0) {
      return <div>{data[column.dataField]}</div>;
    }

    const headerName = column.caption;
    const error = data.validationErrors && data.validationErrors[headerName];

    return (
      <div
        style={{
          position: 'relative',
          padding: '5px',
          backgroundColor: error ? '#ffcccc' : 'transparent', // Light red background for errors
          color: error ? '#b30000' : 'black', // Dark red text for errors
          border: error ? '1px solid #ff0000' : '1px solid transparent', // Red border for errors
          borderRadius: '3px',
          boxShadow: error ? '0 0 5px rgba(255, 0, 0, 0.5)' : 'none', // Slight shadow for errors
          transition: 'all 0.3s ease-in-out', // Smooth transition for the cell changes
        }}
      >
        {data[column.dataField]}
      </div>
    );
  };

  // const handleSave = async () => {
  //   try {
  //     const response = await axios.post('https://localhost:7059/api/ExcelUpload/save', data);
  //     toast.success(response.data.message);
  //   } catch (error) {
  //     console.error('Error saving data:', error);
  //     toast.error('Error saving data');
  //   }
  // };

  // const handleSave = async () => {
  //   try {
  //     data.forEach(row => console.log("qqqqqq",row['__rowId']));
  //     const queryString = `?dataSourceId=${selectedDatasource}`;
  //     const response = await axios.post(`https://localhost:7059/api/ExcelUpload/save${queryString}`, data);
  //     toast.success(response.data.message);
  //   } catch (error) {
  //     console.error('Error saving data:', error);
  //     toast.error('Error saving data');
  //   }
  // };
  
//   const handleSave = async () => {
//     try {
//         // Generate row IDs for each row
//         const dataWithRowIds = data.map((row, index) => ({ ...row, rowId: index + 1 }));
        
//         // Send data with row IDs to the backend
//         const queryString = `?dataSourceId=${selectedDatasource}`;
//         const response = await axios.post(`https://localhost:7059/api/ExcelUpload/save${queryString}`, dataWithRowIds);
//         toast.success(response.data.message);
//     } catch (error) {
//         console.error('Error saving data:', error);
//         toast.error('Error saving data');
//     }
// };

const handleSave = async () => {
  try {
    // Send data with row IDs to the backend
    const queryString = `?dataSourceId=${selectedDatasource}`;
console.log("Data",data);
    const response = await axios.post(`https://localhost:7059/api/ExcelUpload/save${queryString}`, data);
    toast.success(response.data.message);
  } catch (error) {
    console.error('Error saving data:', error);
    toast.error('Error saving data');
  }
};


  return (
    <div>
      <SelectBox
        dataSource={datasources}
        displayExpr="datasourceName"
        valueExpr="id"
        value={selectedDatasource}
        onValueChanged={(e) => setSelectedDatasource(e.value)}
        placeholder="Select a Datasource"
      />
      <FileUploader
        accept=".xlsx,.xls"
        uploadMode="instantly"
        onValueChanged={(e) => handleFileUpload(e.value[0])}
        labelText="Upload Excel File"
        disabled={!selectedDatasource}
      />
      {uploadError && <div style={{ color: 'red' }}>{uploadError}</div>}
      {columns.length > 0 && (
        <DataGrid
          dataSource={data}
          showBorders={true}
          allowUpdating={true}
        
        >
          {columns.map((col, index) => (
            <Column
              key={index}
              dataField={col.accessor}
              caption={col.header}
              cellRender={cellRender}
            />
          ))}
          <Editing mode="cell" allowUpdating={true} />
          <LoadPanel enabled />
        </DataGrid>
      )}
      <button onClick={handleSave}>Save</button>
      <ToastContainer />
    </div>
  );
};

export default ExcelGrid;
