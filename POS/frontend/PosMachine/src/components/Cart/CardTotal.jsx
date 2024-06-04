import { Button, message } from "antd";
import { ClearOutlined , ShoppingCartOutlined , PlusCircleOutlined , MinusCircleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import { decrease, deleteCart, increase, reset } from "../../redux/CartSlice";
import { useNavigate } from 'react-router-dom';


function CardTotal() {

  const cart = useSelector((state) => state.cart)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  return (
    <div className="cart h-full max-h-[calc(100vh_-_90px)] flex flex-col border-l">
      
      <h2 className="bg-blue-700 hover:bg-sky-400 text-center py-4 text-white font-bold tracking-wide cursor-pointer rounded-lg">Cart Products</h2>
      
      <ul className="cart-items px-2 py-2 flex flex-col gap-y-3 overflow-y-auto">
      {cart.cartItems.length > 0
          ? cart.cartItems.map((item) => (
              <li className="cart-item flex justify-between" key={item._id}>
                <div className="flex items-center">
                  <img src={item.image} alt="" className="w-16 h-16 object-cover cursor-pointer" onClick={() => {
                       dispatch(deleteCart(item)); message.success("Deleted The Product Successfully!");}} />
                  <div className="flex flex-col ml-2">
                    <b>{item.title}</b>
                    <span>{item.price}₺ x {item.quantity}</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <Button type="primary" size="small" className="w-full flex items-center justify-center !rounded-full" icon={<PlusCircleOutlined />} onClick={() => dispatch(increase(item))} />
                  <span className="font-bold w-6 inline-block text-center">{item.quantity}</span>
                  <Button type="primary" size="small" className="w-full flex items-center justify-center !rounded-full" icon={<MinusCircleOutlined />}
                    onClick={() => {
                      if (item.quantity === 1) {
                        if (window.confirm("Do You Want To Delete The Product?")) {
                          dispatch(decrease(item));
                        }
                      }
                      if (item.quantity > 1) {
                        dispatch(decrease(item));
                        message.success("Deleted The Product Successfully!")
                      }
                    }} />
                </div>
              </li>
            )).reverse()
          : "There Is No Product In The Cart"}
      </ul>



      <div className="cart-totals mt-auto">
        <div className="border-t border-b">
          <div className="flex justify-between p-2 border-b">
            <b className="text-blue-500 cursor-pointer font-bold">Sub Total</b>
            <span className="text-blue-500 cursor-pointer font-bold">{(cart.total).toFixed(2)}₺</span>
          </div>
          <div className="flex justify-between p-2">
            <b className="text-red-700 cursor-pointer font-bold">Tax %{cart.tax}</b>
            <span className="text-red-700 cursor-pointer font-bold">{((cart.total * cart.tax) / 100).toFixed(2)}₺</span>
          </div>
        </div>
        <div className="border-b mt-4">
          <div className="flex justify-between p-2">
            <b className="text-xl text-green-600 cursor-pointer font-bold">Total</b>
            <span className="text-xl text-green-600 cursor-pointer font-bold">{(cart.total + (cart.total * cart.tax) / 100).toFixed(2)}₺</span>
          </div>
        </div>
        <div className="py-4 px-2">
          <Button type="primary" size="large" className="w-full" icon={<ShoppingCartOutlined />} onClick={() => navigate("/cart")}>CREATE ORDER</Button>
          
          <Button type="primary" size="large" className="w-full mt-2 flex items-center justify-center" icon={<ClearOutlined />} danger             onClick={() => {
              if (window.confirm("Are You Sure You Want To Clear The Cart?")) {
                dispatch(reset());
                message.success("Cleared The Cart Successfully!");
              }
            }}>CLEAR</Button>
        </div>
      </div>


    </div>
  )
}

export default CardTotal