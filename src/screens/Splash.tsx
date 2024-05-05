import useUser from '../hooks/useUser'
import WebApp from '@twa-dev/sdk'
import {Navigate} from 'react-router-dom'

const Splash = () => {
    WebApp.ready();
    WebApp.expand();
    const initData = WebApp.initDataUnsafe;
    
    const {loading,profile,user} = useUser({initData})


    if(loading){
        return <div>Loading...</div>
    }
   
    if(profile){
        return <Navigate to="/home"/>
    }

    return <Navigate to="/create" state={{user}}/>
}

export default Splash