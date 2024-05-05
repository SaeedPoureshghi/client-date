
import useProfileList from '../hooks/useProfileList'
import {Row,Col,Skeleton} from 'antd'
import Profile from './Profile'

const ProfileList = () => {
    const {loadingProfiles,profiles} = useProfileList({page: 1})
    return(
        <div className="profile-list">

        {loadingProfiles && 
          <Row gutter={[16,16]}>
            {[1,2,3,4,5,6,7,8,9,10].map((index) => 
            <Col span={12} key={index}>
              <Skeleton active avatar paragraph={{rows: 2}}/>
            </Col>
            )}  
          </Row>
          }

        {profiles && !loadingProfiles &&
          <Row gutter={[16,16]}>        
          {profiles.map((item,index) => 
            <Col span={12} key={index}>
          <Profile key={index} gender={item.gender} nickname={item.nickname} age={item.age} city={item.city} pic={item.pic}/>
            </Col>
          )}
          </Row>
       
        }
        </div>
    )
}
export default ProfileList;