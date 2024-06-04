import { Button, Form, Input, message, Modal } from "antd";
import { PropTypes } from 'prop-types';


const Add = ({ isAddModalOpen, setIsAddModalOpen, categories, setCategories,}) => {
  
    const [form] = Form.useForm();

  const onFinish = (values) => {
    try {
      fetch("http://localhost:5000/api/categories/add-category", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      message.success("Added Category Successfully");
      form.resetFields();
      setCategories([
        ...categories,
        {
          _id: Math.random(),
          title: values.title,
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal title="Add New Category" open={isAddModalOpen} onCancel={() => setIsAddModalOpen(false)} footer={false}  className="text-center"s>
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item name="title" label="Add Category" rules={[{ required: true, message: "Category Is Required!" }]} >
          <Input />
        </Form.Item>
        <Form.Item className="flex justify-center mb-0">
          <Button type="primary" htmlType="submit">ADD</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};


Add.propTypes = {
    categories: PropTypes.array,
    setCategories : PropTypes.func,
    isAddModalOpen : PropTypes.bool,
    setIsAddModalOpen : PropTypes.func,
  };


export default Add;