import {Avatar, Button, Typography} from 'antd';
import {UserOutlined, EditOutlined, ManOutlined, WomanOutlined} from '@ant-design/icons';
import {HeaderProps} from '../types';
import TONLOGO from '../assets/ton.png';
import { useNavigate } from 'react-router-dom';


const Header = ({user,profile} : HeaderProps) => {
    const {Text} = Typography;

    const navigate = useNavigate();
    
    const handleProfileEdit = () => {
      navigate('/profile')
    }

    return(
        <div className="header">
        <div style={{display:'flex',flexDirection:'column'}}>
          <Avatar size={48} icon={<UserOutlined />} />
        </div>
          <div className="header-profile-info">
            <div>
            <Text strong>{profile.nickname} {profile.gender === 'MALE' ? <ManOutlined style={{color: "#1677ff"}}/>:<WomanOutlined style={{color:"#eb2f96"}}/>}</Text>
            <Button icon={<EditOutlined />} type="link" onClick={handleProfileEdit}></Button>
            </div>
            {
              user && user.username &&
              <Text type="secondary">@{user.username}</Text>
            }
          </div>

          <div className="profile_balance">
            <Text strong>{profile.balance}</Text>
            <img src={TONLOGO} alt="ton" width="24px" height="24px"/>
          </div>
      </div>
    )
}
export default Header;