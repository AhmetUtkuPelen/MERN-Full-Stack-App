import './App.css'
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import CartPage from './pages/CartPage';
import BillPage from './pages/BillPage';
import CustomerPage from './pages/CustomerPage';
import Register from './pages/authentication/Register';
import Login from './pages/authentication/Login';
import ProductPage from './pages/ProductPage';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';


function App() {

  // ! FOR LOCALSTORAGE ! \\
  const cart = useSelector((state) => state.cart)

  useEffect(() => {
    localStorage.setItem("cart",JSON.stringify(cart))
  },[cart])


  return (
<BrowserRouter>

  <Routes>

    <Route path='/' element={<RouteControl>
      <Home/>
    </RouteControl>}/>

    <Route path='/cart' element={<RouteControl>
      <CartPage/>
    </RouteControl>}/>


    <Route path='/bills' element={<RouteControl>
      <BillPage/>
    </RouteControl>}/>
    
    <Route path='/customers' element={<RouteControl>
      <CustomerPage/>
    </RouteControl>}/>
    
    <Route path='/products' element={<RouteControl>
      <ProductPage/>
    </RouteControl>}/>
    
    <Route path='/register' element={<Register/>}/>
    
    <Route path='/login' element={<Login/>}/>

  </Routes>

</BrowserRouter>
  )
}




export const RouteControl = ({ children }) => {
  if (localStorage.getItem("posUser")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};


RouteControl.propTypes = {
  children: PropTypes.node // or PropTypes.element if you expect only a single child
};

export default App