import { Table, message , Popconfirm } from "antd";
import Header from "../components/Header/Header.jsx";
import { Card, Space , Button, Input } from 'antd';
import { StarFilled } from '@ant-design/icons';
import { useRef, useState } from "react";
import CreateBill from "../components/Cart/CreateBill";
import { useSelector } from "react-redux";
import { deleteCart, increase, decrease } from "../redux/CartSlice.js";
import { PlusCircleOutlined, MinusCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import Highlighter from "react-highlight-words";



function CartPage() {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const cart = useSelector((state) => state.cart)

    const dispatch = useDispatch();
      
    const [searchText, setSearchText] = useState('')

    const [searchedColumn, setSearchedColumn] = useState('')

    const searchInput = useRef(null)


    const handleSearch = (selectedKeys , confirm , dataIndex) => {
      confirm();
      setSearchText(selectedKeys[0]);
      setSearchedColumn(dataIndex);
    }

    const handleReset = (clearFilters) => {
      clearFilters();
      setSearchText('');
    }


    const getColumnSearchProps = (dataIndex) => ({
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
        close,
      }) => (
        <div
          style={{
            padding: 8,
          }}
          onKeyDown={(e) => e.stopPropagation()}
        >
          <Input
            ref={searchInput}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{
              marginBottom: 8,
              display: "block",
            }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{
                width: 90,
              }}
            >
              Search
            </Button>
            <Button
              onClick={() => clearFilters && handleReset(clearFilters)}
              size="small"
              style={{
                width: 90,
              }}
            >
              Reset
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                confirm({
                  closeDropdown: false,
                });
                setSearchText(selectedKeys[0]);
                setSearchedColumn(dataIndex);
              }}
            >
              Filter
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                close();
              }}
            >
              close
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined
          style={{
            color: filtered ? "#1890ff" : undefined,
          }}
        />
      ),
      onFilter: (value, record) =>
        record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownOpenChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
      render: (text) =>
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{
              backgroundColor: "#ffc069",
              padding: 0,
            }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ""}
          />
        ) : (
          text
        ),
    });


    const columns = [
      {
        title: "Product Image",
        dataIndex: "image",
        key: "image",
        width: "125px",
        render: (text) => {
          return <img src={text} alt="" className="w-full h-20 object-cover" />;
        },
      },
      {
        title: "Product Name",
        dataIndex: "title",
        key: "title",
        ...getColumnSearchProps("title")
      },
      {
        title: "Category",
        dataIndex: "category",
        key: "category",
        ...getColumnSearchProps("category")
      },
      {
        title: "Product Price",
        dataIndex: "price",
        key: "price",
        render: (text) => {
          return <span>{text.toFixed(2)}₺</span>;
        },
        sorter:(a,b) => a.price - b.price,
      },
      {
        title: "Product Quantity",
        dataIndex: "quantity",
        key: "quantity",
        render: (text, record) => {
          return (
            <div className="flex items-center">
              <Button
                type="primary"
                size="small"
                className="w-full flex items-center justify-center !rounded-full"
                icon={<PlusCircleOutlined />}
                onClick={() => dispatch(increase(record))}
              />
              <span className="font-bold w-6 inline-block text-center">
                {record.quantity}
              </span>
              <Button
                type="primary"
                size="small"
                className="w-full flex items-center justify-center !rounded-full"
                icon={<MinusCircleOutlined />}
                onClick={() => {
                  if (record.quantity === 1) {
                    if (window.confirm("Are You Sure You Want To Delete The Product?")) {
                      dispatch(decrease(record));
                      message.success("Deleted The Product From Cart!");
                    }
                  }
                  if (record.quantity > 1) {
                    dispatch(decrease(record));
                  }
                }}
              />
            </div>
          );
        },
      },
      {
        title: "Total Price",
        render: (text, record) => {
          return <span>{(record.quantity * record.price).toFixed(2)}₺</span>;
        },
      },
      {
        title: "Actions",
        render: (_, record) => {
          return (
           <Popconfirm
           title="Are You Sure You Want To Delete?"
           onConfirm={() => {
            dispatch(deleteCart(record));
            message.success("Deleted The Product From Cart!");
          }} okText="YES" cancelText="NO">
             <Button type="link" danger>DELETE</Button>
           </Popconfirm>
          );
        },
      },
    ];


  return (
<>
    <Header />
    <div className="px-6">
        <Table dataSource={cart.cartItems} columns={columns} bordered scroll={{x:1200,y:300,}}/>
    <div className="cart-total flex justify-end mt-4">
        <Space direction="vertical" size={16}>
        <Card className="w-72">
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
            <Button type="primary" size="large" className="w-full mt-5" icon={<StarFilled/>} onClick={() => setIsModalOpen(true)} disabled={cart.cartItems.length === 0}>CREATE ORDER</Button>
        </Card>
        </Space>
    </div>
    </div>

    <CreateBill isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>

</>
  );
}

export default CartPage;