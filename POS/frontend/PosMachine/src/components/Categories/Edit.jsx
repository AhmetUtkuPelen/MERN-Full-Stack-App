import { Button, Form, Input, message, Modal, Table } from "antd";
import { useState } from "react";
import { PropTypes } from 'prop-types';

const Edit = ({isEditModalOpen,setIsEditModalOpen,categories,setCategories}) => {

  const [editingRow, setEditingRow] = useState({});


  const onFinish = (values) => {
    console.log(values);
    try {
      fetch("http://localhost:5000/api/categories/update-category", {
        method: "PUT",
        body: JSON.stringify({ ...values, categoryId: editingRow._id }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      message.success("Updated Category Successfully!");
      setCategories(
        categories.map((item) => {
          if (item._id === editingRow._id) {
            return { ...item, title: values.title };
          }
          return item;
        })
      );
    } catch (error) {
      message.error("Something Went Wrong!");
      console.log(error);
    }
  };


  const categoryDelete = (id) => {
    if(window.confirm("Are You Sure You Want To Delete THis Category?")){
        try {
            fetch("http://localhost:5000/api/categories/delete-category" , {
                method:"DELETE",
                body:JSON.stringify({categoryId:id}),
                headers: { "Content-type": "application/json; charset=UTF-8" },
            })
            message.success("Deleted Category Successfully!")
            setCategories(categories.filter((item) => item._id !== id))
        } catch (error) {
            message.error("Something Went Wrong!")
            console.log(error)
        }
    }
  }

  const columns = [
    {
      title: "Category Title",
      dataIndex: "title",
      render: (_, record) => {
        if (record._id === editingRow._id) {
          return (
            <Form.Item className="mb-0" name="title">
              <Input defaultValue={record.title} />
            </Form.Item>
          );
        } else {
          return <p>{record.title}</p>;
        }
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <div>
            <Button type="link" onClick={() => setEditingRow(record)} className="pl-0">EDIT</Button>
            <Button type="link" htmlType="submit" className="text-gray-500">SAVE</Button>
            <Button type="link" danger onClick={() => categoryDelete(record._id)}>DELETE</Button>
          </div>
        );
      },
    },
  ];

  return (
    <Modal open={isEditModalOpen} title="Category Operations" footer={false} onCancel={() => setIsEditModalOpen(false)}>
      <Form onFinish={onFinish}>
        <Table bordered dataSource={categories} columns={columns} rowKey={"_id"} />
      </Form>
    </Modal>
  );
};


Edit.propTypes = {
    categories: PropTypes.array,
    setCategories : PropTypes.func,
    isAddModalOpen : PropTypes.bool,
    setIsAddModalOpen : PropTypes.func,
    isEditModalOpen : PropTypes.bool,
    setIsEditModalOpen : PropTypes.func,
  };

  export default Edit;