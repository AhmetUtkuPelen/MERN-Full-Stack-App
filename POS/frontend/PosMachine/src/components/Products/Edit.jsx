import { Button, Form, Input, message, Modal, Select, Table } from "antd";
import { useEffect, useState } from "react";
import { PropTypes } from 'prop-types';


const Edit = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState({});
  const [form] = Form.useForm();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products/get-all");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    getProducts();
  }, []);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/categories/get-all");
        const data = await res.json();
        data &&
          setCategories(
            data.map((item) => {
              return { ...item, value: item.title };
            })
          );
      } catch (error) {
        console.log(error);
      }
    };

    getCategories();
  }, []);

  const onFinish = (values) => {
    try {
      fetch("http://localhost:5000/api/products/update-product", {
        method: "PUT",
        body: JSON.stringify({ ...values, productId: editingItem._id }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      message.success("Product Updated Successfully!");
      setProducts(
        products.map((item) => {
          if (item._id === editingItem._id) {
            return values;
          }
          return item;
        })
      );
    } catch (error) {
      message.error("Something Went Wrong!");
      console.log(error);
    }
  };

  const deleteCategory = (id) => {
    if (window.confirm("Are You Sure You Want To Delete This?")) {
      try {
        fetch("http://localhost:5000/api/products/delete-product", {
          method: "DELETE",
          body: JSON.stringify({ productId: id }),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        });
        message.success("Product Deleted Successfully!");
        setProducts(products.filter((item) => item._id !== id));
      } catch (error) {
        message.error("Something Went Wrong!");
        console.log(error);
      }
    }
  };

  const columns = [
    {
      title: "Product Name",
      dataIndex: "title",
      width: "8%",
      render: (_, record) => {
        return <p>{record.title}</p>;
      },
    },
    {
      title: "Product Image",
      dataIndex: "img",
      width: "4%",
      render: (_, record) => {
        return (
          <img src={record.img} alt="" className="w-full h-20 object-cover" />
        );
      },
    },
    {
      title: "Product Price",
      dataIndex: "price",
      width: "8%",
    },
    {
      title: "Category",
      dataIndex: "category",
      width: "8%",
    },
    {
      title: "Action",
      dataIndex: "action",
      width: "8%",
      render: (_, record) => {
        return (
          <div>
            <Button type="link" className="pl-0" onClick={() => { setIsEditModalOpen(true); setEditingItem(record);}}>EDIT</Button>
            <Button type="link" danger onClick={() => deleteCategory(record._id)}>DELETE</Button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Table bordered dataSource={products} columns={columns} rowKey={"_id"} scroll={{x: 1000,y: 600,}}/>
      <Modal
        title="Add New Product" open={isEditModalOpen} onCancel={() => setIsEditModalOpen(false)} footer={false}>
        <Form layout="vertical" onFinish={onFinish} form={form} initialValues={editingItem}>
          <Form.Item name="title" label="Product Name" rules={[{ required: true, message: "Product Name Is Required!" },]}>
            <Input placeholder="Product Name" />
          </Form.Item>
          <Form.Item name="img" label="Product Image" rules={[{ required: true, message: "Product Image Is Required!" },]}>
            <Input placeholder="Product Image" />
          </Form.Item>
          <Form.Item name="price" label="Product Price" rules={[{ required: true, message: "Product Price Is Required!" },]}>
            <Input placeholder="Product Price" />
          </Form.Item>
          <Form.Item name="category" label="Choose Category" rules={[{ required: true, message: "Category Is Required!" },]}>
            <Select
              showSearch
              placeholder="Search to Select"
              optionFilterProp="children"
              filterOption={(input, option) => (option?.title ?? "").includes(input)}
              filterSort={(optionA, optionB) => (optionA?.title ?? "").toLowerCase().localeCompare((optionB?.title ?? "").toLowerCase())}
              options={categories}/>
          </Form.Item>
          <Form.Item className="flex justify-end mb-0">
            <Button type="primary" htmlType="submit">UPDATE</Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

Edit.propTypes = {
  categories: PropTypes.array,
  isEditModalOpen: PropTypes.func,
  setIsEditModalOpen: PropTypes.func,
  setCategories: PropTypes.func,
};


export default Edit;