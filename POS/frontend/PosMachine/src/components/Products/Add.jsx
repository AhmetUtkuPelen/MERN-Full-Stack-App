import { Button, Form, Input, message, Modal, Select } from "antd";
import { PropTypes } from 'prop-types';


const Add = ({ isAddModalOpen, setIsAddModalOpen, categories, products , setProducts }) => {
  
    const [form] = Form.useForm();

  const onFinish = (values) => {
    try {
      fetch("http://localhost:5000/api/products/add-product", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      message.success("Added Product Successfully");
      form.resetFields();
      setProducts([
        ...products,
        {
          ...values,
          _id: Math.random(),
          price: Number(values.price),
        },
      ]);
      setIsAddModalOpen(false)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal title="Add New Product" open={isAddModalOpen} onCancel={() => setIsAddModalOpen(false)} footer={false}  className="text-center"s>
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item name="title" label="Product Name" rules={[{ required: true, message: "Product Name Is Required!" }]} >
          <Input placeholder="Product title" />
        </Form.Item>
        <Form.Item name="image" label="Add Product Image" rules={[{ required: true, message: "Product Image Is Required!" }]} >
          <Input placeholder="Product Image" />
        </Form.Item>
        <Form.Item name="price" label="Add Product Price" rules={[{ required: true, message: "Product Price Is Required!" }]} >
          <Input placeholder="Product Price" />
        </Form.Item>
        <Form.Item name="category" label="Product Category" rules={[{ required: true, message: "Product category Is Required!" }]} >
          <Select showSearch placeholder="Search to Select" optionFilterProp="children" filterOption={(input, option) => (option?.title ?? "").includes(input)} filterSort={(optionA, optionB) => (optionA?.title ?? "").toLowerCase().localeCompare((optionB?.title ?? "").toLowerCase())} options={categories}/>
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
    isAddModalOpen : PropTypes.bool,
    setIsAddModalOpen : PropTypes.func,
    products : PropTypes.array,
    setProducts : PropTypes.func,
  };


export default Add;