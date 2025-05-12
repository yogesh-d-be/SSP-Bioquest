import React, { useEffect, useState } from "react";
import { createProduct, listCategory, listCategoryById, listProduct, removeCategory, removeProduct, updateCategory, updateProduct } from "../../services/services";
import { Button, Form, Input, message, Modal, Select, Upload } from "antd";
import DataTable from "react-data-table-component";
import { FaEye, FaTrash } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import FormatDate from "../../utility/dateAndTime";
import TextArea from "antd/es/input/TextArea";
import { TiUploadOutline } from "react-icons/ti";

const Product = () => {
 
  const [listCategoryData, setListCategoryData] = useState([]);
  const [dataShowModal, setDataShowModal] = useState(false);
  const [createProductModal, setCreateProductModal] = useState(false);
  const [updatedProductModal, setUpdatedProductModal] = useState(false);
  const [listProductData, setListProductData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [deleteProductModal, setDeleteProductModal] = useState(false);
  const [feature, setFeature] = useState([]);
  const [currentFeature, setCurrentFeature] = useState("");
  const adminBackendUrl = import.meta.env.VITE_BACKEND_URL;
  const [form] = Form.useForm();


const handleAddFeature = () => {
    if(currentFeature.trim()){
        setFeature([...feature ,currentFeature]);
        setCurrentFeature("");
    }
};

useEffect(()=>{
console.log("feature",feature)
},[currentFeature])

const handleFeatureChange = (e, index) => {
    const updatedFeature = [...feature];
    updatedFeature[index] = e.target.value;
    setFeature(updatedFeature);
  };

const handleRemoveFeature = (index) => {
    const updatedFeatures = feature.filter((_,i) => i !== index);
    setFeature(updatedFeatures);
}

const handleUpdateCancel = () => {
  setSelectedProduct(null);
  setUpdatedProductModal(false)
}

const handleDeleteModalCancel = () =>{
  setSelectedCategory(null);
  setDeleteProductModal(false);
}


  const handleCreateProduct = async (values) => {
    const formData = new FormData();
 
    formData.append('mainCategory', values.mainCategory);
    formData.append("productName", values.productName);
    formData.append("productFeature", JSON.stringify(feature));
  

    if (values.productImage && values.productImage.fileList.length > 0) {
        formData.append("productImage", values.productImage.fileList[0].originFileObj);
      }
  
      if (values.brochure && values.brochure.fileList.length > 0) {
        formData.append("brochure", values.brochure.fileList[0].originFileObj);
      }
  
    try {
      const response = await createProduct(formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
  
      if (response.data.success) {
        setCreateProductModal(false);
        form.resetFields();
        message.success("Product created successfully");
        fetchProduct();
      }
    } catch (error) {
      console.error("Error in create:", error);
      message.error(error?.response?.data?.message || "Failed to create product, try later...");
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

  const fetchProduct = async () => {
    try {
      const response = await listProduct();
      if (response.data.success) {
        // console.log("list category",response.data.data)
        setListProductData(response.data.data);
        console.log("resp", response)
        // message.success("Fetch category successfully!");
      }
    } catch (error) {
      message.error(error?.response?.data?.message || "Something went wrong!");
    }
  };

 

  useEffect(() => {
    fetchCategory();
    fetchProduct();
  }, []);


  //handleListcategoryByid

  const handleListProduct = (product) => {
    console.log("product select",product)
    setDataShowModal(true);
    setSelectedProduct(product);
  }



//updateCategory

const handleUpdateProduct = (product) => {
  setSelectedProduct(product); 
  setUpdatedProductModal(true);
};


const submitUpdateProduct = async (values) => {
  const formData = new FormData();
 formData.append('mainCategory', values.mainCategory);
    formData.append("productName", values.productName);
    formData.append("productFeature", JSON.stringify(feature));
  

    if (values.productImage && values.productImage.fileList.length > 0) {
        formData.append("productImage", values.productImage.fileList[0].originFileObj);
      }
  
      if (values.brochure && values.brochure.fileList.length > 0) {
        formData.append("brochure", values.brochure.fileList[0].originFileObj);
      }
      

  try {
    const response = await updateProduct(selectedProduct._id,formData, { 
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (response.data.success) {
      message.success("Product updated successfully");
      setUpdatedProductModal(false);
      setSelectedProduct(null)
      form.resetFields();
      fetchProduct();
    }
  } catch (error) {
    message.error(error?.response?.data?.message || "Failed to update product, try later...");
  }
};

//delte category
const handleDeleteProduct = (product) => {
  setSelectedProduct(product);
  setDeleteProductModal(true);
}

const submitDeleteProduct = async() => {
  try {
    const response = await removeProduct(selectedProduct._id);
    if(response.data.success){
      message.success("Product deleted successfully");
      setSelectedProduct(null);
      setDeleteProductModal(false);
      setFeature([]);
      setCurrentFeature("");
      fetchProduct();
    }
  } catch (error) {
    message.error(error?.response?.data?.message || "Failed to delete product modal");
  }
}



  // Columns for the table
  const columns = [
    {
      name: "Product Code",
      selector: (row) => row.productCode,
      sortable: true,
      center:true
    },
    {
      name: "Category Name",
      selector: (row) => row.mainCategory.mainCategoryName,
      sortable: true,
      center:true
    },
    {
      name: "Product Name",
      selector: (row) => row.productName,
      sortable: true,
      center:true
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-2">
       <Button onClick={()=>handleListProduct(row)}>
        <FaEye/>
       </Button>
       <Button onClick={()=>handleUpdateProduct(row)}>
        <FaEdit/>
       </Button>
       <Button onClick={()=>handleDeleteProduct(row)}>
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
                    Product Details
                </div>
                <div className="mt-6">
                  <button onClick={()=>setCreateProductModal(true)} className="px-3 py-2 bg-pink-500 text-white  border-2  hover:border-pink-500 hover:text-pink-500 hover:bg-white transform transition-all duration-500 rounded-lg ease-in-out">
                  Create Product
                  </button>
                </div>
            </div>
            <DataTable
        // title="Main Category"
        columns={columns}
        data={listProductData}
        customStyles={customStyles}
        pagination
        highlightOnHover
        pointerOnHover
        responsive
        defaultSortField="mainCategory"
        theme="default"
        className="rounded-lg shadow-lg"
      />

{/* Create product */}
<Modal
      title={<h2 className="text-xl font-bold text-pink-600">Create Category</h2>}
      open={createProductModal}
      onCancel={()=>setCreateProductModal(false)}
      footer={null}
      centered
      >
       <Form form={form} className="flex flex-col" onFinish={handleCreateProduct}>
        <Form.Item
         label="Category Name"
          name = "mainCategory"
          rules={[{ required: true, message: "Please enter the category name" }]}
         >
          <Select
            placeholder="Select category"
          >
                {listCategoryData.map((category,i)=>(
                    <Option key={i} value={category._id}>
                        {category.mainCategoryName}
                    </Option>
                ))}
          </Select>
        </Form.Item>
        <Form.Item
         label="Product Name"
          name = "productName"
          rules={[{ required: true, message: "Please enter the product name" }]}
         >
          <Input
          placeholder= "Enter product name"
          />
        </Form.Item>
        <Form.Item 
        label="Product Image"
        name = "productImage"
        rules={[{ required: true, message: "Please upload a product image" }]}
        >
            <Upload
            name="productImage"
            listType="picture"
            beforeUpload={(file) => {
                const isValidType =
                  file.type === "image/png" ||
                  file.type === "image/jpg" ||
                  file.type === "image/jpeg";
                const isValidSize = file.size <= 200 * 1024; // 500 KB
              
                if (!isValidType) {
                  message.error("Only PNG, JPG, and JPEG files are allowed.");
                  return false;
                }
              
                if (!isValidSize) {
                  message.error("File size must not exceed 200 KB.");
                  return false;
                }
              
                return true;
              }}
            showUploadList={{ showPreviewIcon: true, showRemoveIcon: true }}
            maxCount={1}
          >
            <Button icon={<TiUploadOutline />}>Upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item
         label="Product feature"
         >  
        <Input.Group compact>
        <Input
       value={currentFeature}
       onChange={(e)=> setCurrentFeature(e.target.value)}
       placeholder="Enter product feature"
       style={{width:"calc(100% - 80px)"}} 
        />
        <Button type="primary" onClick={handleAddFeature}>
              Add
            </Button>
        </Input.Group>
        <div className="mt-2">
            {feature.map((text, index) => (
              <div key={index} className="flex justify-between items-center border-b py-2">
                {console.log("text",text)}
                <span>{text}</span>
                <Button type="link" danger onClick={() => handleRemoveFeature(index)}>
                  Remove
                </Button>
              </div>
            ))}
          </div>
        </Form.Item>
        <Form.Item 
        label="Brochure"
        name = "brochure"
        rules={[{ required: true, message: "Please upload a brochure pdf" }]}
        >
            <Upload
            name="brochure"
            listType="picture"
            beforeUpload={(file) => {
                const isValidType =
                  file.type === "application/pdf"
                const isValidSize = file.size <= 200 * 1024; 
              
                if (!isValidType) {
                  message.error("Only pdf files are allowed.");
                  return false;
                }
              
                if (!isValidSize) {
                  message.error("File size must not exceed 200 KB.");
                  return false;
                }
              
                return true;
              }}
            showUploadList={{ showPreviewIcon: true, showRemoveIcon: true }}
            maxCount={1}
          >
            <Button icon={<TiUploadOutline />}>Upload</Button>
          </Upload>
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
  title={<h2 className="text-xl font-bold text-pink-600">Product Details</h2>}
  open={dataShowModal}
  onCancel={() => {setDataShowModal(false), setSelectedProduct(null)}}
  footer={null}
  centered
  width={800}
>
  <div>
    {selectedProduct && (
      <div className="flex flex-col py-10 space-y-8">
        {/* Product Images */}
        <div className="flex items-center justify-center space-x-4">
          {selectedProduct.productImage.map((image, index) => (
            <img
              key={index}
              src={`${adminBackendUrl}/categoryFiles/${image}`}
              alt={`product image ${index + 1}`}
              className="w-32 h-32 border border-pink-400 rounded-lg shadow-lg"
            />
          ))}
        </div>

        {/* Product Details */}
        <div className="flex flex-col items-start px-6 space-y-3">
          <p className="text-lg font-bold text-gray-800">
            Category: {selectedProduct.mainCategory.mainCategoryName}
          </p>
          <p className="text-sm text-pink-700">
            Product Code: {selectedProduct.productCode}
          </p>
          <p className="text-base text-gray-600 font-semibold">Features:</p>
          <ul className="list-disc pl-5 text-gray-600">
            {JSON.parse(selectedProduct.productFeature[0]).map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
          <p className="text-sm text-gray-500">
            Created: {FormatDate(selectedProduct.createdAt)}
          </p>
        </div>

        {/* Brochure Preview */}
        <div className="flex flex-col items-start px-6 space-y-3">
          <p className="text-base font-semibold text-gray-800">Brochure:</p>
          <a
            href={`${adminBackendUrl}/categoryFiles/${selectedProduct.brochure}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            View Brochure
          </a>
          <embed
            src={`${adminBackendUrl}/categoryFiles/${selectedProduct.brochure}`}
            type="application/pdf"
            className="w-full h-96 border rounded-lg"
          />
        </div>
      </div>
    )}
  </div>
</Modal>



<Modal
  title={<h2 className="text-xl font-bold text-pink-600">Edit Product</h2>}
  open={updatedProductModal}
  onCancel={handleUpdateCancel}
  footer={null}
  centered
>
  {selectedProduct && (
    <Form
      form={form}
      className="flex flex-col"
      onFinish={submitUpdateProduct}
      initialValues={{
        mainCategory: selectedProduct.mainCategory._id,
        productName: selectedProduct.productName,
        productFeature: selectedProduct.productFeature.length
          ? selectedProduct.productFeature
          : [], // pre-fill features if any
      }}
    >
      <Form.Item
        label="Category Name"
        name="mainCategory"
        rules={[{ required: true, message: "Please select the category" }]}
      >
        <Select placeholder="Select category">
          {listCategoryData.map((category, i) => (
            <Select.Option key={i} value={category._id}>
              {category.mainCategoryName}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Product Name"
        name="productName"
        rules={[{ required: true, message: "Please enter the product name" }]}
      >
        <Input placeholder="Enter product name" />
      </Form.Item>

      <Form.Item label="Product Features">
        <Input.Group compact>
          <Input
            value={currentFeature}
            onChange={(e) => setCurrentFeature(e.target.value)}
            placeholder="Enter product feature"
            style={{ width: "calc(100% - 80px)" }}
          />
          <Button type="primary" onClick={handleAddFeature}>
            Add
          </Button>
        </Input.Group>

        <div className="mt-2">
          {/* Render pre-filled features */}
          {feature.map((text, index) => (
            <div key={index} className="flex justify-between items-center border-b py-2">
              <span>{text}</span>
              <Button type="link" danger onClick={() => handleRemoveFeature(index)}>
                Remove
              </Button>
            </div>
          ))}
        </div>
      </Form.Item>

      <Form.Item label="Current Product Image">
        <div className="p-3 border border-pink-400 rounded-xl shadow-lg mb-4">
          {selectedProduct.productImage.map((image, index) => (
            <img
              key={index}
              src={`${adminBackendUrl}/categoryFiles/${image}`}
              alt={`product ${index + 1}`}
              className="w-32 h-32"
            />
          ))}
        </div>
      </Form.Item>

      <Form.Item label="Upload New Image" name="productImage">
        <Upload
          name="productImage"
          listType="picture"
          beforeUpload={() => false}
          showUploadList={{ showPreviewIcon: true, showRemoveIcon: true }}
          maxCount={1}
        >
          <Button icon={<TiUploadOutline />}>Upload</Button>
        </Upload>
      </Form.Item>

      <Form.Item label="Current Brochure">
        <a
          href={`${adminBackendUrl}/categoryFiles/${selectedProduct.brochure}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          View Brochure
        </a>
      </Form.Item>

      <Form.Item label="Upload New Brochure" name="brochure">
        <Upload
          name="brochure"
          listType="picture"
          beforeUpload={() => false}
          showUploadList={{ showPreviewIcon: true, showRemoveIcon: true }}
          maxCount={1}
        >
          <Button icon={<TiUploadOutline />}>Upload</Button>
        </Upload>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="w-full bg-pink-500">
          Update Product
        </Button>
      </Form.Item>
    </Form>
  )}
</Modal>


{/* delete modal */}
<Modal 
open={deleteProductModal}
onCancel={handleDeleteModalCancel}
onOk={submitDeleteProduct}
okText="Confirm"
>
Are sure to delete the category?
</Modal>

        </>
    );
};

export default Product;
