import React from 'react';
import {Card, Typography} from 'antd';
import {EyeOutlined, MessageOutlined,ManOutlined, WomanOutlined} from '@ant-design/icons';
import {ProfileProps} from '../types';


const Profile:React.FC<ProfileProps> = (props: ProfileProps) => {

    const {Meta} = Card;
    const {Text} = Typography;


 return(
    <Card
    
    style={{ width: '100%', margin:'.5rem 0'}}
     
     cover={props.pic === "" ?
            <img
            alt="example"
            src={props.pic}
            />:
            <img
            alt="example"
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            />
     }
    actions={[
        <EyeOutlined key="viewprofile" />,
        <MessageOutlined key="sendmessage"/> 
    ]
    }
    >
        <Meta
        
        // avatar={<Avatar size={64} src={props.pic} />}
        
        title={<Text strong>{props.nickname} ({props.age}) {props.gender === "MALE" ? <ManOutlined style={{color: "#1677ff"}}/>:<WomanOutlined style={{color:"#eb2f96"}}/>}</Text>}
        description={props.city}
        />
    </Card>
 )
}

export default Profile;