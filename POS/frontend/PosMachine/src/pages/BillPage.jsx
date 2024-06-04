import { Table,Button, Input , Space } from "antd";
import Header from "../components/Header/Header";
import { useState } from "react";
import PrintBill from "../components/Bills/PrintBill";
import { useEffect , useRef } from "react";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";




function BillPage() {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const[billItems , setBillItems] = useState([])

    const [customer , setCustomer] = useState()

    const [searchText, setSearchText] = useState('')

    const [searchedColumn, setSearchedColumn] = useState('')

    const searchInput = useRef(null)


    const handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      setSearchText(selectedKeys[0]);
      setSearchedColumn(dataIndex);
    };
  
    const handleReset = (clearFilters) => {
      clearFilters();
      setSearchText("");
    };
  
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



    useEffect(() => {
      const getBills = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/bills/get-all")
            const data = await res.json()
            setBillItems(data)
        } catch (error) {
            console.log(error)
        }
      }
      getBills()
    },[])


 
      
      const columns = [
        {
          title: 'Customer Name',
          dataIndex: 'customerName',
          key: 'customerName',
          ...getColumnSearchProps("customerName")
        },
        {
          title: 'Phone Number',
          dataIndex: 'phoneNumber',
          key: 'phoneNumber',
          ...getColumnSearchProps("phoneNumber")
        },
        {
          title: 'Creation Date',
          dataIndex: 'createdAt',
          key: 'createdAt',
          ...getColumnSearchProps("createdAt"),
          render: (text) => {
            return <span>{text.substring(0,10)}</span>
          }
        },
        {
          title: 'Payment Method',
          dataIndex: 'paymentMethod',
          key: 'paymentMethod',
          ...getColumnSearchProps("paymentMethod")
        },
        {
          title: 'Total Amount',
          dataIndex: 'totalAmount',
          key: 'totalAmount',
          render: (text) => {
            return <span>{text}₺</span>
          },
          sorter: (a,b) => a.price - b.price,
        },
        {
          title: 'Action',
          dataIndex: 'action',
          key: 'action',
          render: (_, record) => {
            return <Button type="link" className="pl-0" onClick={() => { setIsModalOpen(true); setCustomer(record);}}>PRINT</Button>
          }
        },
      ];


  return (
<>
    <Header />
    <div className="px-6">
    <h1 className="text-4xl text-blue-700 text-center mb-5 font-bold">BILLS</h1>
        <Table dataSource={billItems} columns={columns} bordered scroll={{x:1000,y:300,}} />
    </div>
    <PrintBill isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} customer={customer} />
</>
  );
}

export default BillPage;