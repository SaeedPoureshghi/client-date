import useUser from "../hooks/useUser";
import WebApp from "@twa-dev/sdk";
import { Navigate } from "react-router-dom";
import logo from "../assets/logo.jpg";
import { Spin, Typography } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const Splash = () => {
  WebApp.ready();
  WebApp.expand();
  const initData = WebApp.initDataUnsafe;

  const { Text } = Typography;

  const { loading, profile, user } = useUser({ initData });
  const [isCreatingProfile, setIsCreatingProfile] = useState(false);
  const navigate = useNavigate();

  useEffect(()=>{

    async function createProfile() {
      if (!loading && !profile && user) {
        setIsCreatingProfile(true);
  
        const payload = {
          nickname: user.first_name + " " + user.last_name,
          age: undefined,
          userid : user?.id,
          username: user?.username,
          firstname: user?.first_name,
          lastname: user?.last_name,
          language_code: user?.language_code,
          is_premium: user?.is_premium,
          gender: "MALE",
          city: undefined
        }
        
        const response = await axios.post(`${SERVER_URL}/register`, payload);
        
        if (response.data.success) {
            
         navigate('/home');
        }
    }
}
createProfile();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[loading,profile,user])

  if (loading || !profile) {
    return (
    <div className="splash">
        <img width={"40px"} height={"40px"} style={{borderRadius:"50%"}} src={logo} alt="logo" />
        <Text strong>Persian Connect</Text>
        {isCreatingProfile && <Text>Creating Profile...</Text>}
        <Spin size="large"/>
    </div>)
  }

  if (profile) {
    return <Navigate to="/home" />;
  }

//   return <Navigate to="/create" state={{ user }} />;
};

export default Splash;
