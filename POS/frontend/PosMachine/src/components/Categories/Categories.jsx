import { useEffect, useState } from "react";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import Add from "./Add";
import Edit from "./Edit";
import { PropTypes } from 'prop-types';
import "./CategoriesStyle.css";

const Categories = ({ categories, setCategories , setFilter , products }) => {

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [categoryTitle, setCategoryTitle] = useState("All")

  useEffect(() => {
    if(categoryTitle === "All"){
      setFilter(products)
    }else{
      setFilter(products.filter((item) => item.category === categoryTitle))
    }
  },[products,setFilter,categoryTitle])

  return (
    <ul className="flex gap-4 md:flex-col text-lg">
      {categories.map((item) => (
        <li className={`category-item ${item.title === categoryTitle && "bg-amber-700"}`} key={item._id} onClick={() => setCategoryTitle(item.title)} >
          <span>{item.title}</span>
        </li>
      ))}
      <li className="category-item bg-amber-600 hover:bg-amber-800" onClick={() => setIsAddModalOpen(true)}>
        <PlusOutlined className="md:text-2xl" />
      </li>
      <li
        className="category-item !bg-orange-800 hover:opacity-90"
        onClick={() => setIsEditModalOpen(true)}
      >
        <EditOutlined className="md:text-2xl" />
      </li>
      <Add
        isAddModalOpen={isAddModalOpen}
        setIsAddModalOpen={setIsAddModalOpen}
        categories={categories}
        setCategories={setCategories}
      />
      <Edit isEditModalOpen={isEditModalOpen} setIsEditModalOpen={setIsEditModalOpen} categories={categories} setCategories={setCategories} />
    </ul>
  );
};




Categories.propTypes = {
  categories: PropTypes.array,
  setCategories : PropTypes.func,
  setFilter:PropTypes.func,
  products: PropTypes.array,
};

export default Categories;