import { Input , Badge, message } from "antd";
import { SearchOutlined, HomeOutlined, ShoppingCartOutlined, CopyOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { Link, useNavigate} from "react-router-dom";
import { useSelector } from "react-redux";
import { PropTypes } from 'prop-types';


function Header({setSearch}) {

  const cart = useSelector((state) => state.cart)

  const navigate = useNavigate()

  const logOut = () => {
    if(window.confirm("Are You Sure You Want To Log Out?")){
      localStorage.removeItem("posUser")
      navigate("/login")
      message.success("You Logged Out Successfully!")
    }
  }

  return (
<div className="border-b mb-6">
<header className="py-4 px-6 flex justify-between items-center gap-10">
        <div className="logo">
          <a href="/">
            <h2 className="text-2xl font-bold md:text-4xl text-blue-800 hover:text-sky-400 transition-all">POS APP</h2>
          </a>
        </div>
        <div className="header-search flex-1 flex justify-center">
          <Input size="large" placeholder="SEARCH..." prefix={<SearchOutlined />} className="rounded-full w-full" onChange={(e) => setSearch(e.target.value.toLowerCase())} />
        </div>


        <div className="menu-links flex justify-between items-center gap-8 text-center md:static fixed z-50 bottom-0 md:w-auto w-screen md:bg-transparent bg-white left-0 md:border-t-0 border-t md:px-0 px-4 py-1">
          <Link to={"/"} className="menu-link flex flex-col text-blue-800">
            <HomeOutlined className="md:text-2xl text-xl text-blue-800 hover:text-sky-400 transition-all" />
            <span className="md:text-xs text-[10px] text-blue-800">HOME</span>
          </Link>
        <Badge count={cart.cartItems.length} offset={[4,3]} className="md:flex hidden">          
          <Link to={"/cart"} className="menu-link flex flex-col text-blue-800">
            <ShoppingCartOutlined className="md:text-2xl text-xl text-blue-800 hover:text-sky-400 transition-all" />
            <span className="md:text-xs text-[10px] text-blue-800">CART</span>
          </Link>
        </Badge>
          <Link to={"/bills"} className="menu-link flex flex-col text-blue-800">
            <CopyOutlined className="md:text-2xl text-xl text-blue-800 hover:text-sky-400 transition-all" />
            <span className="md:text-xs text-[10px] text-blue-800">BILLS</span>
          </Link>
          <Link to={"/customers"} className="menu-link flex flex-col text-blue-800">
            <UserOutlined className="md:text-2xl text-xl text-blue-800 hover:text-sky-400 transition-all" />
            <span className="md:text-xs text-[10px] text-blue-800">CUSTOMERS</span>
          </Link>
          <div onClick={logOut}>
          <Link className="menu-link flex flex-col text-blue-800">
            <LogoutOutlined  className="md:text-2xl text-xl text-blue-800 hover:text-sky-400 transition-all" />
            <span className="md:text-xs text-[10px] text-blue-800">LOGOUT</span>
          </Link>
          </div>
        </div>

        <Badge count={cart.cartItems.length} offset={[4,3]} className="md:hidden flex text-2xl">          
          <Link to={"/cart"} className="menu-link flex flex-col text-blue-800">
            <ShoppingCartOutlined className="md:text-2xl text-xl text-blue-800 hover:text-sky-400 transition-all" />
            <span className="md:text-xs text-[10px] text-blue-800">CART</span>
          </Link>
        </Badge>

      </header>      
</div>
  )
}


Header.propTypes = {
  setSearch: PropTypes.func,
};


export default Header