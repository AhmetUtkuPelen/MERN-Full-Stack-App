import { Button, Checkbox, Form, Input, message } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";



function Login() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });

      const user = await res.json()

      if (res.status === 200) {
        localStorage.setItem("posUser",JSON.stringify({username : user.username,email:user.email,}))
        message.success("You Logged In Successfully!");
        navigate("/");
      }else if(res.status === 404){
        message.error("User Not Found!")
      }else if(res.status === 403){
        message.error("Wrong Password!")
      }
      setLoading(false);
    } catch (error) {
      message.error("Something Went Wrong!");
      console.log(error);
      setLoading(false)
    }
  };




  return (
    <div className="h-screen">
      <div className="flex justify-between h-full">
        <div className="xl:px-20 px-10 w-full flex flex-col h-full justify-center relative">
          <h1 className="text-center text-5xl font-bold mb-2 text-blue-700">POS APP</h1>
          <Form layout="vertical" onFinish={onFinish} initialValues={{remember:false,}}>
            <Form.Item label="E-mail" name={"email"} rules={[{required: true, message: "E-mail Is Required!",},]}>
              <Input />
            </Form.Item>
            <Form.Item label="Password" name={"password"} rules={[{ required: true, message: "Password Is Required!",},]}>
              <Input.Password />
            </Form.Item>
            <Form.Item name={"remember"} valuePropName="checked">
              <div className="flex justify-between items-center">
                <Checkbox className="text-l font-bold text-blue-500">Remember me</Checkbox>
                <Link className="text-l font-bold text-red-600">Forgot Password?</Link>
              </div>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="w-full" size="large" loading={loading}>LOGIN</Button>
            </Form.Item>
          </Form>
          <div className="flex justify-center absolute left-0 bottom-10 w-full text-red-600">
            You Dont Have An Account ? &nbsp;
            <Link to="/register" className="text-blue-700">Register Now !</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login