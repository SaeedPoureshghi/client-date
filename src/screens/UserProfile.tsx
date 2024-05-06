import {useState, useEffect} from "react";
import WebApp from "@twa-dev/sdk";
import useUser from "../hooks/useUser";
import {
  Skeleton,
  Avatar,
  Typography,
  Form,
  Input,
  Button,
  InputNumber,
  Select,
  FormProps,

} from "antd";
import axios from "axios";
import { UserOutlined , CalendarOutlined ,UserAddOutlined, LeftOutlined} from "@ant-design/icons";
import { ProfileType , CityOptions} from "../types";
import { useNavigate } from "react-router-dom";


const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const UserProfile = () => {
  const initData = WebApp.initDataUnsafe;

  const navigate = useNavigate();

  const { user, profile, loading } = useUser({ initData: initData });

  const [cityList, setCityList] = useState<CityOptions[]>([]);


  const { Text } = Typography;

  const onFinish: FormProps<Partial<ProfileType>>['onFinish'] = async (values) => {
    console.log(values);
  }

  const PopulateCityList = async () => {

    const response = await axios.get(`${SERVER_URL}/citylist`);
    
    let cityList: CityOptions[] = [];

    if (response.data.success) {
       cityList = response.data.data.Cities.map((city: string) => ({value: city, label: city}));
       setCityList(cityList);  
       
    }
  }
  
  useEffect(() => {
    PopulateCityList();
  }, [])

  const filterOption = (input: string, option?: { label: string; value: string }) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  

  if (loading) {
    return (
      <div>
        <Skeleton active />
        <Skeleton active />
        <Skeleton active />
        <Skeleton active />
        <Skeleton active />
        <Skeleton active />
      </div>
    );
  }

  if (!loading && user && profile) {
    return (
      <div className="main_container">
        <div className="profile_info">
          <Avatar size={48} icon={<UserOutlined />} />
          <Text strong>
            {user.first_name} {user.last_name}
          </Text>
          {user.username && <Text type="secondary">@{user.username}</Text>}
        </div>
        <Form onFinish={onFinish} layout={"vertical"}>

        <Form.Item name={'city'}
                  rules={[{required:true,message:"State!"}]}
                  label="City"
                  >
                    <Select defaultValue={profile.city} showSearch options={cityList}  placeholder="Select City" optionFilterProp="children" filterOption={filterOption}/>  
                  </Form.Item>
          <Form.Item
            name="age"
            label="Age"
            rules={[{ required: true, message: "Age!" }]}
          >
            <InputNumber
              min={18}
              max={70}
              value={profile.age}
              prefix={<CalendarOutlined style={{ color: "#bfbfbf" }} />}
              placeholder="Age"
            />
          </Form.Item>
          <Form.Item
          name="firstname"
          label="First Name"
          rules={[{required:true,message:"First Name!"}]
          }>
            <Input value={profile.firstname} prefix={<UserOutlined style={{color:"#bfbfbf"}} />} placeholder="First Name" />  
          </Form.Item>

          <Form.Item
          name="lastname"
          label="Last Name"
          rules={[{required:true,message:"Last Name!"}]
          }>
            <Input value={profile.lastname} prefix={<UserOutlined style={{color:"#bfbfbf"}} />} placeholder="Last Name" />  
          </Form.Item>

          <Form.Item>
            <Button
              loading={loading}
              icon={<UserAddOutlined />}
              htmlType="submit"
              type="primary"
              className="login-form-button"
            >
              Update Profile
            </Button>
          </Form.Item>
          <Button
           type="link"
           icon={<LeftOutlined />}
           onClick={() => navigate('/home')}
           style={{width:"100%"}}
          >Back to Home</Button>
        </Form>
      </div>
        )
  }
};

export default UserProfile;
