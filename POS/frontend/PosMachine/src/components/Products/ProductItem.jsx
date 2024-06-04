import PropTypes from "prop-types";
import { addProduct } from "../../redux/CartSlice";
import { useDispatch } from "react-redux";
import { message } from "antd";



function ProductItem({item}) {


  const dispatch = useDispatch()


  const handleClick = () => {
    dispatch(addProduct({...item,quantity:1}))
    message.success("Added Product To The Cart Successfully!")
  }

  return (
<>
<div className="product-item border hover:shadow-lg cursor-pointer transition-all select-none" onClick={handleClick}>
        <div className="product-img">
          <img src={item.image} alt="" className="h-40 object-cover w-full border-b" />
        </div>
        <div className="product-info flex flex-col p-3 text-center">
          <span className="font-bold text-xl text-blue-700">{item.title}</span>
          <span className="text-xl">{item.price}₺</span>
        </div>
</div>
</>
  )
}


ProductItem.propTypes = {
    item : PropTypes.object,
    image: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.string,
  };


export default ProductItem