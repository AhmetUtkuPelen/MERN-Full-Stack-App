import PropTypes from 'prop-types';
import { Modal , Button , ConfigProvider, Space } from 'antd';
import { PrinterOutlined } from '@ant-design/icons';
import { TinyColor } from '@ctrl/tinycolor';
import { useReactToPrint } from 'react-to-print';
import { useRef } from 'react';


function PrintBill({isModalOpen, setIsModalOpen, customer}) {

  const componentRef = useRef()

  const handlePrint = useReactToPrint({
    content : () => componentRef.current,
  })

const colors1 = ['#6253E1', '#04BEFE'];

const getHoverColors = (colors) =>
  colors.map((color) => new TinyColor(color).lighten(5).toString());
const getActiveColors = (colors) =>
  colors.map((color) => new TinyColor(color).darken(5).toString());



  return (
<Modal title="PRINT BILL" open={isModalOpen} footer={false} onCancel={() => setIsModalOpen(false)} className='text-center' width={1000}>
      <section className="py-20 bg-blue-700" ref={componentRef}>
        <div className="max-w-5xl mx-auto bg-white px-6">
          <article className="overflow-hidden">
            <div className="logo my-6">
              <h2 className="text-4xl font-bold text-slate-700">POS APP</h2>
            </div>
            <div className="bill-details">
              <div className="grid grid-cols-4 gap-12">
                <div className="text-md text-slate-500">
                  <p className="font-bold text-amber-700">Bill Detail:</p>
                  <p className='font-bold'>{customer?.customerName}</p>
                  <p className='font-bold'> Fake Street 123</p>
                  <p className='font-bold'> San Javier </p>
                  <p className='font-bold'> CA 1234</p>
                </div>
                <div className="text-md text-slate-500">
                  <p className="font-bold text-amber-700">Bill:</p>
                  <p className='font-bold'>The Boring Company</p>
                  <p className='font-bold'> Tesla Street 007</p>
                  <p className='font-bold'> Frisco </p>
                  <p className='font-bold'>CA 0000</p>
                </div>
                <div className="text-md text-slate-500">
                  <div>
                    <p className="font-bold text-amber-700">Bill No:</p>
                    <p className='font-bold'>0000{Math.floor(Math.random()*100)}</p>
                  </div>
                  <div>
                    <p className="font-bold text-amber-700 mt-2">Date Of Issue:</p>
                    <p className='font-bold'>{customer?.createdAt.substring(0,10)}</p>
                  </div>
                </div>
                <div className="text-md text-slate-500">
                  <div>
                    <p className="font-bold text-amber-700">Terms:</p>
                    <p className='font-bold'>10 gün</p>
                  </div>
                  <div>
                    <p className="font-bold text-amber-700 mt-2">Expiry:</p>
                    <p className='font-bold'>2023-11-21</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bill-table-area mt-8">
              <table className="min-w-full divide-y divide-slate-500 overflow-hidden">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th scope="col" className="py-3.5 pl-4 text-left text-sm font-bold text-amber-500 sm:pl-6 md:pl-0 sm:table-cell hidden">Picture</th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 text-left text-sm font-bold text-amber-500 sm:pl-6 md:pl-0 sm:table-cell hidden"
                    >
                      {" "}
                      Title
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 text-center text-sm font-bold text-amber-500 sm:pl-6 md:pl-0 sm:table-cell hidden"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 text-center text-sm font-bold text-amber-500 sm:pl-6 md:pl-0 sm:table-cell hidden"
                    >
                      Amount
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 text-end text-sm font-bold text-amber-500 sm:pl-6 md:pl-0 sm:table-cell hidden"
                    >
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                {customer?.cartItems.map((item) => (
                    <tr key={item._id} className="border-b border-slate-200">
                      <td className="py-4 sm:table-cell hidden">
                        <img src={item.image} alt="" className="w-12 h-12 object-cover"/>
                      </td>
                      <td className="py-4 sm:table-cell hidden">
                        <div className="flex flex-col">
                          <span className="font-medium">{item.title}</span>
                          <span className="sm:hidden inline-block text-xs">
                            Product Price {item.price}₺
                          </span>
                        </div>
                      </td>
                      <td className="py-4 sm:hidden" colSpan={4}>
                        <div className="flex flex-col">
                          <span className="font-medium">{item.title}</span>
                          <span className="sm:hidden inline-block text-xs">
                            Product Price {item.price}₺
                          </span>
                        </div>
                      </td>
                      <td className="py-4 text-center sm:table-cell hidden">
                        <span>{item.price}₺</span>
                      </td>
                      <td className="py-4 sm:text-center text-right sm:table-cell hidden">
                        <span>{item.quantity}</span>
                      </td>
                      <td className="py-4 text-end">
                        <span>{(item.price * item.quantity)}₺</span>
                      </td>
                    </tr>
                  ))}
                </tbody>

                <tfoot>
                  <tr>
                    <th
                      className="text-right pt-4 sm:table-cell hidden"
                      colSpan="4"
                      scope="row"
                    >
                      <span className="font-normal text-slate-700">
                        Sub Total
                      </span>
                    </th>
                    <th
                      className="text-left pt-4 sm:hidden"
                      scope="row"
                      colSpan="4"
                    >
                      <p className="font-normal text-slate-700">Sub Total</p>
                    </th>
                    <th className="text-right pt-4" scope="row">
                      <span className="font-normal text-slate-700">{customer?.subTotal}₺</span>
                    </th>
                  </tr>
                  <tr>
                    <th
                      className="text-right pt-4 sm:table-cell hidden"
                      colSpan="4"
                      scope="row"
                    >
                      <span className="font-normal text-slate-700">Tax</span>
                    </th>
                    <th
                      className="text-left pt-4 sm:hidden"
                      scope="row"
                      colSpan="4"
                    >
                      <p className="font-normal text-slate-700">Tax</p>
                    </th>
                    <th className="text-right pt-4" scope="row">
                      <span className="font-normal text-red-600">+{customer?.tax}₺</span>
                    </th>
                  </tr>
                  <tr>
                    <th
                      className="text-right pt-4 sm:table-cell hidden"
                      colSpan="4"
                      scope="row"
                    >
                      <span className="font-normal text-slate-700">
                        Total
                      </span>
                    </th>
                    <th
                      className="text-left pt-4 sm:hidden"
                      scope="row"
                      colSpan="4"
                    >
                      <p className="font-normal text-slate-700">Total</p>
                    </th>
                    <th className="text-right pt-4" scope="row">
                      <span className="font-normal text-slate-700">{customer?.totalAmount}₺</span>
                    </th>
                  </tr>
                </tfoot>

              </table>
              <div className="py-9">
                <div className="border-t border-b pb-9 pt-9 border-slate-200">
                  <p className="text-sm font-semibold text-slate-500">
                    <span className='font-bold text-xl'>1- </span>Without this document , you will be required to provide the account number , account name and amount to be paid
                  </p>
                  <p className="text-sm font-semibold text-slate-500">
                    <span className='font-bold text-xl'>2- </span>Please check your online accounts after payment in order to make sure that the payment is pushed through.
                  </p>
                  <p className="text-sm font-semibold text-slate-500">
                    <span className='font-bold text-xl'>3- </span>If you have any questions , please contact us @ +9 0111 111 11 11 or email us via info@auptech.com 
                  </p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>
      {/* <div className="flex align-center justify-center mt-8">
        <Button className='w-full' icon={<PrinterOutlined/>} type="primary" size="large">PRINT</Button>
      </div> */}


{/* ! ANT DESIGN COLORFUL BUTTON ! */}
      <Space>
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorPrimary: `linear-gradient(135deg, ${colors1.join(', ')})`,
            colorPrimaryHover: `linear-gradient(135deg, ${getHoverColors(colors1).join(', ')})`,
            colorPrimaryActive: `linear-gradient(135deg, ${getActiveColors(colors1).join(', ')})`,
            lineWidth: 0,
          },
        },
      }}
    >
      <Button className='w-full font-bold text-yellow-400 mt-8' icon={<PrinterOutlined/>} type="primary" size="large" onClick={handlePrint}> P R I N T </Button>
    </ConfigProvider>
  </Space>




</Modal>
  )
}


PrintBill.propTypes = {
    setIsModalOpen: PropTypes.func,
     isModalOpen:PropTypes.bool,
     customer:PropTypes.any,
  };

export default PrintBill