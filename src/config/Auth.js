import {getAuth , GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import { initializeApp } from "firebase/app";
import axios from 'axios'

const url = 'http://localhost:5001'
const config = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId:process.env.REACT_APP_PROJECTID ,
    storageBucket:process.env.REACT_APP_STORAGEBUCKET ,
    messagingSenderId:process.env.REACT_APP_MESSAGINGSENDERID,
    appId:process.env.REACT_APP_APPID,
    measurementId: process.env.REACT_APP_MEASUREMENTID
  };

export const authProvider = {
    login: async () => {
        const options = {}
        const app = initializeApp(config,options);
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
    
        try {
            const {user} = await signInWithPopup(auth, provider);
            const {data} = await axios.post(url+'/userlogin',  {email:user.email} )
            if(data.status == 200){
                localStorage.setItem("username",data.user_[0].username)
                return Promise.resolve('login');
            }
        } catch (error) {
            throw error;
        }
    }
}