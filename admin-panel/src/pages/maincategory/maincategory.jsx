import React, { useEffect, useState } from "react";
import { createCategory, listCategory, listCategoryById, removeCategory, updateCategory } from "../../services/services";
import { Button, Form, Input, message, Modal, Upload } from "antd";
import DataTable from "react-data-table-component";
import { FaEye, FaTrash } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import FormatDate from "../../utility/dateAndTime";
import TextArea from "antd/es/input/TextArea";
import { TiUploadOutline } from "react-icons/ti";

const MainCategory = () => {
  const [listCategoryData, setListCategoryData] = useState([]);
  const [dataShowModal, setDataShowModal] = useState(false);
  const [createCategoryModal, setCreateCategoryModal] = useState(false);
  const [updatedCategoryModal, setUpdatedCategoryModal] = useState(false);
  const [listedCategory, setListedCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);
  const adminBackendUrl = import.meta.env.VITE_BACKEND_URL;
  const [form] = Form.useForm();


const handleUpdateCancel = () => {
  setSelectedCategory(null);
  setUpdatedCategoryModal(false)
}

const handleDeleteModalCancel = () =>{
  setSelectedCategory(null);
  setDeleteCategoryModal(false);
}


  const handleCreate = async (values) => {
    const formData = new FormData();
 
    formData.append('mainCategoryName', values.mainCategoryName);
    formData.append('description', values.description);
  

    if (values.mainCategoryImage && values.mainCategoryImage.fileList.length > 0) {
      formData.append('mainCategoryImage', values.mainCategoryImage.fileList[0].originFileObj);
    }
  
    try {
      const response = await createCategory(formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
  
      if (response.data.success) {
        setCreateCategoryModal(false);
        form.resetFields();
        message.success("Category created successfully");
        fetchCategory();
      }
    } catch (error) {
      console.error("Error in create:", error);
      message.error(error?.response?.data?.message || "Failed to create category, try later...");
    }
  };
  
  const fetchCategory = async () => {
    try {
      const response = await listCategory();
      if (response.data.success) {
        // console.log("list category",response.data.data)
        setListCategoryData(response.data.data);
        // message.success("Fetch category successfully!");
      }
    } catch (error) {
      message.error(error?.response?.data?.message || "Something went wrong!");
    }
  };

  const fetchCategoryById = async (categoryId) => {
    try {
      const response = await listCategoryById(categoryId);
      if (response.data.success) {
        // console.log("list category",response.data.data)
        setListedCategory(response.data.data);
        // message.success("Fetch category successfully!");
      }
    } catch (error) {
      message.error(error?.response?.data?.message || "Something went wrong!");
    }
  };

 

  useEffect(() => {
    fetchCategory();
  }, []);


  //handleListcategoryByid

  const handleListCategory = (category) => {
    setDataShowModal(true);
    fetchCategoryById(category?._id);
  }

//updateCategory

const handleUpdateCategory = (category) => {
  setSelectedCategory(category); // Store the selected category for editing
  setUpdatedCategoryModal(true);
  form.setFieldsValue({ // Populate the form with existing data
    mainCategoryName: category.mainCategoryName,
    description: category.description,
    mainCategoryImage: null, 
  });
};


const submitUpdateCategory = async (values) => {
  const formData = new FormData();
  formData.append("mainCategoryName", values.mainCategoryName);
  formData.append("description", values.description);

 
  if (values.mainCategoryImage && values.mainCategoryImage.fileList.length > 0) {
    formData.append("mainCategoryImage", values.mainCategoryImage.fileList[0].originFileObj);
  }

  try {
    const response = await updateCategory(selectedCategory._id,formData, { 
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (response.data.success) {
      message.success("Category updated successfully");
      setUpdatedCategoryModal(false);
      form.resetFields();
      fetchCategory();
    }
  } catch (error) {
    message.error(error?.response?.data?.message || "Failed to update category, try later...");
  }
};

//delte category
const handleDeleteCategory = (category) => {
  setSelectedCategory(category);
  setDeleteCategoryModal(true);
}

const submitDeleteCategory = async() => {
  try {
    const response = await removeCategory(selectedCategory._id);
    if(response.data.success){
      message.success("Category deleted successfully");
      setSelectedCategory(null);
      setDeleteCategoryModal(false);
      fetchCategory();
    }
  } catch (error) {
    message.error(error?.response?.data?.message || "Failed to delte category modal");
  }
}



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
       <Button onClick={()=>handleListCategory(row)}>
        <FaEye/>
       </Button>
       <Button onClick={()=>handleUpdateCategory(row)}>
        <FaEdit/>
       </Button>
       <Button onClick={()=>handleDeleteCategory(row)}>
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
            <div className="flex justify-between mb-12">
                <div className="text-2xl font-bold mt-6">
                    Main Category
                </div>
                <div className="mt-6">
                  <button onClick={()=>setCreateCategoryModal(true)} className="px-3 py-2 bg-pink-500 text-white  border-2  hover:border-pink-500 hover:text-pink-500 hover:bg-white transform transition-all duration-500 rounded-lg ease-in-out">
                  Create Category
                  </button>
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

{/* Create category */}
<Modal
      title={<h2 className="text-xl font-bold text-pink-600">Create Category</h2>}
      open={createCategoryModal}
      onCancel={()=>setCreateCategoryModal(false)}
      footer={null}
      centered
      >
       <Form form={form} className="flex flex-col" onFinish={handleCreate}>
        <Form.Item
         label="Category Name"
          name = "mainCategoryName"
          rules={[{ required: true, message: "Please enter the category name" }]}
         >
          <Input
          placeholder= "Enter category name"
          />
        </Form.Item>
        <Form.Item 
        label="Category Image"
        name = "mainCategoryImage"
        rules={[{ required: true, message: "Please upload an image" }]}
        >
            <Upload
            name="mainCategoryImage"
            listType="picture"
            beforeUpload={() => false}
            showUploadList={{ showPreviewIcon: true, showRemoveIcon: true }}
            maxCount={1}
          >
            <Button icon={<TiUploadOutline />}>Upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item
         label="Description"
        name = "description"
         >  
          <TextArea
          placeholder= "Enter Description"
          rows={4}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full bg-pink-500">
            Create
          </Button>
        </Form.Item>
       </Form>
      </Modal>

{/* List category */}
      <Modal
      title={<h2 className="text-xl font-bold text-pink-600">Category Details</h2>}
      open={dataShowModal}
      onCancel={()=>setDataShowModal(false)}
      footer={null}
      centered
      >
       <div>
    {listedCategory && (
      <div className="flex py-10 items-center justify-around ">
        <div className="p-3 border border-pink-400 rounded-xl shadow-lg ml-12">
          <img
            src={`${adminBackendUrl}/categoryImages/${listedCategory.mainCategoryImage}`}
            alt="category image"
            className="w-32 h-32"
          />
        </div>
        <div className="drop-shadow-lg ml-6 flex-1 space-y-3">
          <p className="text-2xl font-bold">{listedCategory.mainCategoryName}</p>
          <p className="text-sm text-pink-700">{listedCategory.categoryCode}</p>
          <p>{listedCategory.description}</p>
          <p>Created: {FormatDate(listedCategory.createdAt)}</p>
        </div>
      </div>
    )}
  </div>
      </Modal>


      {/* Edit category */}
      <Modal
  title={<h2 className="text-xl font-bold text-pink-600">Edit Category</h2>}
  open={updatedCategoryModal}
  onCancel={handleUpdateCancel}
  footer={null}
  centered
>
  <Form form={form} className="flex flex-col" onFinish={submitUpdateCategory}>
    <Form.Item
      label="Category Name"
      name="mainCategoryName"
      rules={[{ required: true, message: "Please enter the category name" }]}
    >
      <Input placeholder="Enter category name" />
    </Form.Item>
    <Form.Item label="Current Image">
      {/* Display the existing image */}
      {selectedCategory?.mainCategoryImage && (
        <div className="p-3 border border-pink-400 rounded-xl shadow-lg mb-4">
          <img
            src={`${adminBackendUrl}/categoryImages/${selectedCategory.mainCategoryImage}`}
            alt="Old category"
            className="w-32 h-32"
          />
        </div>
      )}
    </Form.Item>
    <Form.Item
      label="Upload New Image"
      name="mainCategoryImage"
    >
      <Upload
        name="mainCategoryImage"
        listType="picture"
        beforeUpload={() => false}
        showUploadList={{ showPreviewIcon: true, showRemoveIcon: true }}
        maxCount={1}
      >
        <Button icon={<TiUploadOutline />}>Upload</Button>
      </Upload>
    </Form.Item>
    <Form.Item
      label="Description"
      name="description"
    >
      <TextArea placeholder="Enter Description" rows={4} />
    </Form.Item>
    <Form.Item>
      <Button type="primary" htmlType="submit" className="w-full bg-pink-500">
        Update
      </Button>
    </Form.Item>
  </Form>
</Modal>
{/* delete modal */}
<Modal 
open={deleteCategoryModal}
onCancel={handleDeleteModalCancel}
onOk={submitDeleteCategory}
okText="Confirm"
>
Are sure to delete the category?
</Modal>

        </>
    );
};

export default MainCategory;
