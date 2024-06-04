import { useEffect, useState } from 'react'
import CardTotal from '../components/Cart/CardTotal'
import Categories from '../components/Categories/Categories'
import Header from '../components/Header/Header'
import Products from '../components/Products/Products'
import { PropTypes } from 'prop-types';



function Home() {

  const [categories , setCategories] = useState([])

  const [filter , setFilter] = useState([])

  const [products,setProducts] = useState([])

  const [search, setSearch] = useState("")

  useEffect(() => {
      const getCategories = async () => {
        try {
          const res = await fetch("http://localhost:5000/api/categories/get-all")
          const data = await res.json()
          data && setCategories(data.map((item) => {
            return {...item , value : item.title}
          }))
        } catch (error) {
          console.log(error)
        }
      }
      getCategories()
  },[])


  useEffect(() => {

    const getProducts = async () => {
      try {
          const res = await fetch("http://localhost:5000/api/products/get-all")
          const data = await res.json()
          setProducts(data)
      } catch (error) {
          console.log(error)
      }
    }
    getProducts()
  },[])


  return (
<>
<Header setSearch={setSearch}/>
<div className="home px-6 flex flex-col md:flex-row justify-between gap-10 md:pb-0 pb-24 h-screen">
    <div className="categories flex-1 overflow-auto max-h-[calc(100vh_-_3px)] md:pb-32 min-h-[150px] min-w-[150px]">
        <Categories categories={categories} setCategories={setCategories} setFilter={setFilter} products={products} />
    </div>
        
        
    <div className="products flex-[8] max-h-[calc(100vh_-_3px)] overflow-auto pb-36">
        <Products categories={categories} filter={filter} products={products} setProducts={setProducts} search={search} />
    </div>
        
        
    <div className="cart-wrapper min-w-[250px] md:-mr-[10px] md:-mt-[10px]">
        <CardTotal/>
    </div>
</div>     
</>
  )
}


Products.propTypes = {
  products:PropTypes.func,
  setProducts: PropTypes.func,
};


export default Home