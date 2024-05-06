import {useState} from 'react'
import useProfileList from '../hooks/useProfileList'
import {Row,Col,Skeleton, Modal} from 'antd'
import Profile from './Profile'

interface Props {
  balance: number,
  fee: number
}
const ProfileList = ({balance,fee} : Props) => {
    const {loadingProfiles,profiles} = useProfileList({page: 1})

    const [isDepositModalOpen,setIsDepositModalOpen] = useState(false)

    const handleProdileView = () => {
      if (balance < fee) {
        setIsDepositModalOpen(true)
      }
    }

    const handlesendMessage = () => {
        if (balance < fee) {
          setIsDepositModalOpen(true)
        }
    }

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
          <Profile handleProfileView={handleProdileView} handleSendMessage={handlesendMessage} key={index} gender={item.gender} nickname={item.nickname} age={item.age} city={item.city} pic={item.pic}/>
            </Col>
          )}
          </Row>
       
        }

        <Modal
          title="Deposit"
          open={isDepositModalOpen}
          onOk={() => setIsDepositModalOpen(false)}
          onCancel={() => setIsDepositModalOpen(false)}
        >
          <p>Your balance is low. Please deposit to continue</p>
        </Modal>
        </div>
    )
}
export default ProfileList;