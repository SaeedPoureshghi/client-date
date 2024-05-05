import {useState} from 'react'
import Header from '../component/Header'
import '../App.css'
import {SendTransactionRequest, TonConnectButton, useTonConnectUI} from '@tonconnect/ui-react'
import WebApp from '@twa-dev/sdk'
import {MainButton} from '@twa-dev/sdk/react'
import {beginCell,toNano} from '@ton/ton'
import {useTonAddress} from '@tonconnect/ui-react'
import {Typography} from 'antd'
import ProfileList from '../component/ProfileList'
import useUser from '../hooks/useUser'



const Home = () => {
    WebApp.ready();
    WebApp.expand();
    const initData = WebApp.initDataUnsafe;
    const {loading,user,profile,meta} = useUser({initData})
    const [TonConnectUI] = useTonConnectUI();
    const address = useTonAddress()
    const {Text} = Typography
    const [inProgress, setInProgress] = useState(false)
    
function sendInvoice(_id: string) {

  if (meta && meta.fee && meta.owner && _id) {

    const body = beginCell()
    .storeUint(0,32)
    .storeStringTail(_id)
    .endCell();
    
    const amount = toNano(meta.fee).toString();
    
    const transaction: SendTransactionRequest = {
      messages:[
        {
          address : meta.owner,
          amount: amount,
          payload: body.toBoc().toString("base64")
        }
      ],
      validUntil: Math.floor(Date.now() / 1000) + 360,
    }
    TonConnectUI.sendTransaction(transaction)
    .then((boc) => {
      console.log(boc)
      setInProgress(true)
    })
    .catch((error) => {
      console.log('user not confirmed', error)
    })
  }

}

if (loading) {
  return <div>Loading...</div>
}
  
if (user && profile && meta && meta.fee) 
  return (
    <div className="main_container">
        <Header user={user} profile={profile}/>
        {/* <ProfileList /> */}
       
         {profile.balance < meta.fee && 
          <div
          style={{
           marginTop: '10rem',
          }}
         >
         <div className='balance_warning'>
         
         {!inProgress &&
         <>
         <Text strong >Insufficient balance</Text>
         <Text>Deposit atleast {meta.fee} TON to start using app.</Text>
         </>
         }
         {inProgress &&
         <>
         <Text strong>Wait for transaction to confirm!</Text>
         </>

         }
         
         <div style={{alignSelf:'center',padding:"10px"}}>
        <TonConnectButton/>
         </div>

         </div>
         {address &&
         <MainButton
         progress={inProgress}
         text={`Deposit ${meta.fee} TON`}
         onClick={() => sendInvoice(profile.uuid)}
         />
    }
         </div>
        }
        
        {profile.balance >= meta.fee &&
        <ProfileList/>
        }
    </div>
  )
}

export default Home