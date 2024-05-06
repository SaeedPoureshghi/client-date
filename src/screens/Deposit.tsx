import { useState } from "react";
import { useTonConnectUI, useTonAddress,SendTransactionRequest,TonConnectButton } from "@tonconnect/ui-react";
import { Button, Skeleton, Typography } from "antd";
import WebApp from "@twa-dev/sdk";
import { beginCell, toNano } from "@ton/ton";
import useUser from "../hooks/useUser";
import Header from "../component/Header";
import {MainButton} from '@twa-dev/sdk/react'
import { useNavigate } from "react-router-dom";

const Deposit = () => {
  const [TonConnectUI] = useTonConnectUI();

  const initData = WebApp.initDataUnsafe;

  const address = useTonAddress();
  const { Text } = Typography;
  const [inProgress, setInProgress] = useState(false);
  const { user, profile , meta } = useUser({ initData });

  const navigate = useNavigate();

  function sendInvoice(_id: string) {
    if (meta && meta.fee && meta.owner && _id) {
      const body = beginCell().storeUint(0, 32).storeStringTail(_id).endCell();

      const amount = toNano(meta.fee).toString();

      const transaction: SendTransactionRequest = {
        messages: [
          {
            address: meta.owner,
            amount: amount,
            payload: body.toBoc().toString("base64"),
          },
        ],
        validUntil: Math.floor(Date.now() / 1000) + 360,
      };
      TonConnectUI.sendTransaction(transaction)
        .then((boc) => {
          console.log(boc);
          setInProgress(true);
        })
        .catch((error) => {
          console.log("user not confirmed", error);
        });
    }
  }
  if (user && profile && meta && meta.fee) 
  {
  return (
    <div className="main_container">
        <Header user={user} profile={profile}/>
        
       
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
        <Button
        type="link"
        onClick={() => navigate('/home')}
        style={{padding:"20px",minWidth:'100%'}}
        >
        Back to home
        </Button>
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
        
       
    </div>
  )}

  return(
    <>
    <Skeleton active/>
    <Skeleton active/>
    <Skeleton active/>
    <Skeleton active/>
    <Skeleton active/>
    </>
  )
};
export default Deposit;
