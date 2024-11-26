import React, { useEffect, useState } from "react";
import labImage from "../../assets/lab.jpg";
import { Button, Form, Input, message } from "antd";
import { adminLogin } from "../../services/services";
// import { useAuth } from "../../contexts/authContext";
import { useDispatch } from "react-redux";
import { setTokens } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";


const Login = () => {

    // const {setTokens} = useAuth();
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const navigate = useNavigate();

    // const handleChange = (e) => {
    //     const {name, value} = e.target;
    //     setCredentials({
    //         ...credentials,
    //         [name]:value
    //     });
    // };

    const handleSubmit = async (values) =>{
        try{
            
            const res = await adminLogin(values);
            if(res.data.success){
             const {accessToken, refreshToken} = res.data.data;
             form.resetFields();
            dispatch(setTokens({ accessToken, refreshToken }));
            message.success("Login successful!");
            setTimeout(()=>{
                navigate('/dashboard');
            },2000)
            }
            // console.log("login",res.data);
        }catch(err){
            // console.error("error of login",err)
            message.error(err.response?.data?.message || "Login failed");
        }
    }

    return (
        <>
        <div className="relative w-full h-screen">
        <img src={labImage} alt="laboratory"  className="w-full h-full object-cover"/>
       <div className="absolute inset-0 flex items-center justify-center  ">
        <div className="relative w-96 h-auto backdrop-blur-lg bg-white/30 rounded-xl p-6">
       <Form layout="vertical" form={form} onFinish={handleSubmit} initialValues={{ email: "", password: "" }}>
        <h1 className="text-center font-bold py-4 text-2xl">Welcome</h1>
       <Form.Item
        label="Email Address"
        name="email"
        labelCol={{ span: 24 }} 
        rules={[{required:true, message:"Please enter your email"}]}
        >
            <Input
            type="email"
            placeholder="Enter your email"
            // value={credentials.email}
            // onChange={handleChange}
            className="h-10 text-md" 

            />
        </Form.Item>
        <Form.Item
        label="Password"
        name="password"
        labelCol={{ span: 24 }} 
        rules={[{required:true, message:"Please enter password"}]}
        >
            <Input.Password
            placeholder="Enter your password"
            // value={credentials.password}
            // onChange={handleChange}
            className="h-10 text-md" 
            />
        </Form.Item>
        <Form.Item className="pt-3 flex justify-center">
            <Button type="primary" htmlType="submit"  className="py-4 px-6 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700">
                Log In
            </Button>
        </Form.Item>
       </Form>
        </div>
       </div>
        </div>

        </>
    );
};

export default Login;
