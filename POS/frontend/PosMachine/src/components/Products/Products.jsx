import { useState } from "react"
import ProductItem from "./ProductItem"
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import Add from "./Add";
import { PropTypes } from 'prop-types';
import { useNavigate } from "react-router-dom";



function Products({categories , filter , products , setProducts, search}) {


  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const navigate = useNavigate()


  return (
<>
<div className="products-wrapper grid grid-cols-card gap-4">
    {filter.filter((product) => product.title.toLowerCase().includes(search)).map((item) => (
      <ProductItem item={item} key={item._id} />
    ))}

  <div onClick={() => setIsAddModalOpen(true)} className="product-item border hover:shadow-lg bg-amber-600 hover:bg-amber-800 cursor-pointer transition-all select-none flex justify-center items-center">
    <PlusOutlined className="text-white font-bold md:text-2xl"/>
  </div>

  <div className="product-item border hover:shadow-lg bg-orange-800 hover:bg-opacity-90 min-h-[165px] cursor-pointer transition-all select-none flex justify-center items-center" onClick={() => navigate("/products")}>
    <EditOutlined className="text-white font-bold md:text-2xl"/>
  </div>

    <Add isAddModalOpen={isAddModalOpen} setIsAddModalOpen={setIsAddModalOpen} categories={categories} setProducts={setProducts} products={products} />

</div>     
</>
  )
}

Products.propTypes = {
  categories: PropTypes.array,
  filter: PropTypes.func,
  products:PropTypes.func,
  setProducts: PropTypes.func,
  search: PropTypes.func,
};


export default Products