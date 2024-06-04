import { Form, Input, Modal, Select , Button , Card , Space, message } from 'antd';
import PropTypes from 'prop-types';
import { StarFilled } from '@ant-design/icons';
import { useSelector , useDispatch } from "react-redux";
import {reset} from '../../redux/CartSlice.js'
import { useNavigate } from 'react-router-dom';



function CreateBill({isModalOpen, setIsModalOpen}) {

    const cart = useSelector((state) => state.cart)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const onFinish = async (values) => {
        try {
            const res = await fetch("http://localhost:5000/api/bills/add-bill",{
                method:"POST",
                body:JSON.stringify({
                    ...values,
                    subTotal:cart.total,
                    tax:((cart.total * cart.tax) / 100).toFixed(2),
                    totalAmount:(cart.total + (cart.total * cart.tax) / 100).toFixed(2),
                    cartItems:cart.cartItems,
                }),
                headers:{"Content-type":"application/json; charset=UTF-8"},
            })
            if(res.status === 200){
                message.success("Created The Bill Successfully!")
                dispatch(reset())
                navigate("/bills")
            }
        } catch (error) {
            message.error("Something Went Wrong!")
            console.log(error)
        }
    }



  return (
<Modal title="CREATE BILL" open={isModalOpen} footer={false} onCancel={() => setIsModalOpen(false)} className='text-center'>
    <Form layout={"vertical"} onFinish={onFinish}>
        
        <Form.Item label='Customer Name' className='font-bold' rules={[{required:true,message:"This Is Required"}]} name={"customerName"}>
            <Input placeholder='Customer Name' className='font-bold'/>
        </Form.Item>
        
        <Form.Item label='Phone Number' className='font-bold' rules={[{required:true,message:"This Is Required"}]} name={"phoneNumber"}>
            <Input placeholder='Phone Number' className='font-bold' maxLength={11}/>
        </Form.Item>

        <Form.Item label='Payment Method' className='font-bold' rules={[{required:true,message:"This Is Required"}]} name={"paymentMethod"}>
            <Select placeholder="Payment Method Choice">
                <Select.Option value="Cash" className='text-center'>Cash</Select.Option>
                <Select.Option value="Debit Card" className='text-center'>Debit Card</Select.Option>
            </Select>
        
        </Form.Item>



        <Space direction="vertical" size={16} className='w-full mt-5'>
        <Card>
            <div className="flex justify-between border-b mt-2 my-2">
                <span className="text-xl font-bold text-blue-500">Sub Total</span>
                <span className="text-xl font-bold text-blue-500">{(cart.total).toFixed(2)}₺</span>
            </div>
            <div className="flex justify-between border-b mt-3  my-2">
                <span className="text-red-700 text-xl font-bold">Tax %{cart.tax}</span>
                <span className="text-red-700 text-xl font-bold">{((cart.total * cart.tax) / 100).toFixed(2)}₺</span>
            </div>
            <div className="flex justify-between border-b mt-3  my-2">
                <span className="text-xl font-bold text-green-600">Total</span>
                <span className="text-xl font-bold text-green-600">{(cart.total + (cart.total * cart.tax) / 100).toFixed(2)}₺</span>
            </div>
            <Button htmlType='submit' type="primary" size="large" className="w-full mt-5" icon={<StarFilled/>} onClick={() => setIsModalOpen(true)} disabled={cart.cartItems.length === 0}>CREATE ORDER</Button>
        </Card>
        </Space>


    </Form>
</Modal>
  )
}


CreateBill.propTypes = {
    setIsModalOpen: PropTypes.func,
     isModalOpen:PropTypes.bool,
  };

export default CreateBill