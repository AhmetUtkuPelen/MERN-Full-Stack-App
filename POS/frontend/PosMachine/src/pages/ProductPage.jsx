import Header from './../components/Header/Header';
import Edit from './../components/Products/Edit';



function ProductPage() {
  return (
<>
    <Header/>
    <div className='px-6'>
        <h1 className='text-4xl text-blue-700 font-bold text-center mb-4'>PRODUCTS</h1>
        <Edit/>
    </div>
</>
  )
}

export default ProductPage