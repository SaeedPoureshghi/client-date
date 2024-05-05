import { useState,useEffect } from 'react';
import { Form, Input, Button, Select, InputNumber, Radio, Typography, Avatar,FormProps } from 'antd';
import { UserOutlined, CalendarOutlined, UserAddOutlined } from '@ant-design/icons';
import { ProfileType, CityOptions } from '../types';
import axios from 'axios';
import { useLocation , useNavigate} from 'react-router-dom';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const CreateProfile = () => {

    const location = useLocation()

    const navigate = useNavigate();

    const {user} = location.state;

    const {Text} = Typography;

    const [cityList, setCityList] = useState<CityOptions[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

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

    const onFinish: FormProps<ProfileType>['onFinish'] = async (values) => {

        const payload = {
          nickname: values.nickname,
          age: values.age,
          userid : user?.id,
          username: user?.username,
          firstname: user?.first_name,
          lastname: user?.last_name,
          language_code: user?.language_code,
          is_premium: user?.is_premium,
          gender: values.gender,
          city: values.city
        }
        setLoading(true);
        const response = await axios.post(`${SERVER_URL}/register`, payload);
        
        if (response.data.success) {
            
         navigate('/');
        }
        
      }

    return(
        
            <div className="main_container">
              {/* <div style={{alignSelf:'flex-start', textAlign:'center'}}>
                <Title level={4}>Welcome!</Title>
                <Text>To start using Persian Connect complete your profile to help you better!</Text>
              </div> */}
              <div className="profile_info">
              <Avatar size={48} icon={<UserOutlined/>}/>
                <Text strong>{user.first_name} {user.last_name}</Text>
                <Text type="secondary">@{user.username}</Text>
              </div>
              
                <Form onFinish={onFinish}
                        layout={'vertical'}
                >
                  <Form.Item name="nickname"
                  label="Nickname"
                  rules={[{required:true,message:"nickname!"}]}
                  >
                    <Input prefix={<UserOutlined style={{color:"#bfbfbf"}} />} placeholder="Nickname" />
                  </Form.Item>
        
              
                  <Form.Item name="age"
                  label="Age"
                  rules={[{required:true,message:"Age!"}]}
                  >
                    <InputNumber min={18} max={70}  prefix={<CalendarOutlined  style={{color:"#bfbfbf"}} />} placeholder="Age" />
                  </Form.Item>
           
                  <Form.Item name="gender"
                  label="Gender"
                  rules={[{required:true,message:"Gender!"}]}
                  >
                   <Radio.Group>
                    <Radio.Button value={'MALE'}>Male</Radio.Button>
                    <Radio.Button value={'FEMALE'}>Female</Radio.Button>
                    </Radio.Group>
                  </Form.Item>
               
                  <Form.Item name={'city'}
                  rules={[{required:true,message:"State!"}]}
                  label="City"
                  >
                    <Select showSearch options={cityList}  placeholder="Select City" optionFilterProp="children" filterOption={filterOption}/>  
                  </Form.Item>
        
                  <Form.Item>
                    <Button loading={loading} icon={<UserAddOutlined />} htmlType="submit" type="primary" className="login-form-button">Create Profile</Button>
                  </Form.Item>
                </Form>
              
            </div>
        
    )
}
export default CreateProfile;