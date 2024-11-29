import React, { useEffect, useState } from "react";
import { listCategory } from "../../services/services";
import { Button, message, Modal } from "antd";
import DataTable from "react-data-table-component";
import { FaEye, FaTrash } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";

const MainCategory = () => {
  const [listCategoryData, setListCategoryData] = useState([]);
  const [dataShowModal, setDataShowModal] = useState();

  const fetchCategory = async () => {
    try {
      const response = await listCategory();
      if (response.data.success) {
        // console.log("list category",)
        setListCategoryData(response.data.data);
        message.success("Fetch category successfully!");
      }
    } catch (error) {
      message.error(error?.response?.data?.message || "Something went wrong!");
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  // Columns for the table
  const columns = [
    {
      name: "Category Code",
      selector: (row) => row.categoryCode,
      sortable: true,
      center:true
    },
    {
      name: "Category Name",
      selector: (row) => row.mainCategoryName,
      sortable: true,
      center:true
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
      center:true
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-2">
       <Button onClick={()=>setDataShowModal(true)}>
        <FaEye/>
       </Button>
       <Button>
        <FaEdit/>
       </Button>
       <Button>
        <FaTrash/>
       </Button>
       </div>
      ),
      center:true
    },
  ];

  const customStyles = {
    
    headCells: {
      style: {
        backgroundColor: "#ec4899", // pink-600
        color: "#ffffff",
        fontSize: "14px",
        fontWeight: "bold",
        textAlign: "left",
        padding: "10px",
        cursor: "pointer",
      },
      hover: {
        backgroundColor: "#db2777", // pink-700 when hovered
      },
    },
    rows: {
      style: {
        fontSize: "14px",
        color: "#4b5563", // gray-700
        backgroundColor: "#ffffff",
      },
      highlightOnHoverStyle: {
        backgroundColor: "#FCE4EC", // pink-300
        transition: "all 0.2s ease-in-out",
        cursor: "pointer",
      },
    },
  };


    return (
        <>
            <div className="flex justify-between mb-16">
                <div className="text-2xl font-bold mt-6">
                    Main Category
                </div>
                <div>
                    Create Category
                </div>
            </div>
            <DataTable
        // title="Main Category"
        columns={columns}
        data={listCategoryData}
        customStyles={customStyles}
        pagination
        highlightOnHover
        pointerOnHover
        responsive
        defaultSortField="mainCategoryName"
        theme="default"
        className="rounded-lg shadow-lg"
      />

      <Modal
      title="Category Details"
      open={dataShowModal}
      onCancel={()=>setDataShowModal(false)}
      footer={null}
      centered
      >
        <div>
          {/* {listCategoryData.map((data,i)=>(

          ))

          } */}
        </div>
      </Modal>

        </>
    );
};

export default MainCategory;
