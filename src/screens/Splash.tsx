import useUser from "../hooks/useUser";
import WebApp from "@twa-dev/sdk";
import { Navigate } from "react-router-dom";
import logo from "../assets/logo.jpg";
import { Spin, Typography } from "antd";

const Splash = () => {
  WebApp.ready();
  WebApp.expand();
  const initData = WebApp.initDataUnsafe;

  const { Text } = Typography;

  const { loading, profile, user } = useUser({ initData });

  if (loading) {
    return (
    <div className="splash">
        <img width={"40px"} height={"40px"} style={{borderRadius:"50%"}} src={logo} alt="logo" />
        <Text strong>Persian Connect</Text>
        <Spin size="large"/>
    </div>)
  }

  if (profile) {
    return <Navigate to="/home" />;
  }

  return <Navigate to="/create" state={{ user }} />;
};

export default Splash;
