import { useState, useEffect } from "react";
import "./App.css";
import WebApp from "@twa-dev/sdk";
import axios from "axios";
import {Avatar, Skeleton, Typography,Form, Input, InputNumber, Button, FormProps, Radio,Row,Col, Select} from "antd"
import { UserOutlined , CalendarOutlined , UserAddOutlined } from "@ant-design/icons";
import Profile from "./component/Profile";
import Header from "./component/Header";

import { User, ProfileType, CityOptions, ProfileProps } from "./types";


const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const {Text} = Typography;

function MyApp() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [cityList, setCityList] = useState<CityOptions[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pageLoading, setPageLoading] = useState<boolean>(false);

 const [profileLoading, setProfileLoading] = useState<boolean>(true);
  const [profileList, setProfileList] = useState<ProfileProps[]>([]);

  const PopulateCityList = async () => {

    const response = await axios.get(`${SERVER_URL}/citylist`);
    
    let cityList: CityOptions[] = [];

    if (response.data.success) {
       cityList = response.data.data.Cities.map((city: string) => ({value: city, label: city}));
       setCityList(cityList);  
       
    }
  }

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
    console.log(response.data);
    
  }

  useEffect(() => {
    WebApp.ready();

    async function getData() {
      const initData = WebApp.initDataUnsafe;
       console.log(initData);
      const payLoad = {
        initData: initData
      }

      const response = await axios.post(`${SERVER_URL}/info`, payLoad);

      if (response.data.success) {
        setUser(response.data.data.user);
      }
      if (response.data.profile) {
        setProfile(response.data.profile);
      }
    }
    if (!user) {
      getData();
      PopulateCityList();
    }
  }, [user]);

  async function getProfiles() {
    try {
      setPageLoading(true);
    const response = await axios.get(`https://randomuser.me/api/?results=10&page=${page}`);

    if (response.data.results) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const profiles = response.data.results.map((profile: any) => ({
        nickname: profile.name.first,
        age: profile.dob.age,
        pic: profile.picture.large,
        gender: profile.gender.toUpperCase(),
        city: profile.location.city
    }));

    setProfileList(prev => [...prev,...profiles]);
    setPage(prev => prev + 1);
    setProfileLoading(false);
    }
  } catch (error) {
    console.error(error);
  } finally {
    setPageLoading(false);
  }

  }

  useEffect(() => {

    if (profile){
      
        getProfiles();
     
    }

  }, [profile]);

  const handleScroll = () => {
    const padding = 4 * parseFloat(getComputedStyle(document.documentElement).fontSize); // Convert 4rem to pixels
    if (
      document.documentElement.offsetHeight - (window.innerHeight + document.documentElement.scrollTop) <= padding
    ) {
      
      if (!pageLoading && page < 10){
        getProfiles();
      }
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [pageLoading])
  

  const filterOption = (input: string, option?: { label: string; value: string }) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  if (!user) {
    return (
       <Skeleton/>
    );
  }



  if (profile) {
    return (
      <div className="main_container">
        <Header user={user} profile={profile}/>
        <div className="profile-list">
          
          {profileLoading && 
          <Row gutter={[16,16]}>
            {[1,2,3,4,5,6,7,8,9,10].map((index) => 
            <Col span={12} key={index}>
              <Skeleton active avatar paragraph={{rows: 2}}/>
            </Col>
            )}  
          </Row>
          }
        {profileList && !profileLoading &&
          <Row gutter={[16,16]}>        
          {profileList.map((item,index) => 
            <Col span={24} key={index}>
          <Profile key={index} gender={item.gender} nickname={item.nickname} age={item.age} city={item.city} pic={item.pic}/>
            </Col>
          )}
          </Row>
       
        }
        {pageLoading && <Skeleton active avatar title/>}
        {page === 10 && <><Text type="secondary">End of List</Text></>}
        </div>
        
      </div>
    );
  }
  return (
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
  );
}

export default MyApp;
