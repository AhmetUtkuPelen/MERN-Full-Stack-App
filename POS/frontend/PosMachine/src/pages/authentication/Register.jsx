import { Button, Form, Input, message } from "antd";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Register = () => {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      if (res.status === 200) {
        message.success("You Registered Successfully!");
        navigate("/login");
        setLoading(false);
      }
    } catch (error) {
      message.error("Something Went Wrong!");
      console.log(error);
    }
  };


  return (
    <div className="h-screen">
      <div className="flex justify-between h-full">
        <div className="xl:px-20 px-10 w-full flex flex-col h-full justify-center relative">
          <h1 className="text-center text-5xl font-bold mb-2 text-blue-700 cursor-pointer">POS APP</h1>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item label="User Name" name={"username"} rules={[{required: true,message: "User Name Is Required!",},]}>
              <Input />
            </Form.Item>
            <Form.Item label="E-mail" name={"email"} rules={[{required: true,message: "E-mail Is Required!",},]}>
              <Input />
            </Form.Item>
            <Form.Item label="Password" name={"password"} rules={[{ required: true, message: "Password Is Required!",},]}>
              <Input.Password />
            </Form.Item>
            <Form.Item label="Re-Password" name={"passwordAgain"} rules={[{required:true,message:"Re-Password Is Required"}, ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Password and Re-Password Dont Match!'));
            },
          }),]}>
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="w-full" size="large" loading={loading}>REGISTER</Button>
            </Form.Item>
          </Form>
          <div className="flex justify-center absolute left-0 bottom-10 w-full font-bold text-xl text-center text-amber-600">
            You Already Have An Account ?&nbsp;
            <Link to="/login" className="text-blue-700 font-bold underline text-center">LOGIN</Link>
          </div>  
        </div>
      </div>
    </div>
  );
};

export default Register;