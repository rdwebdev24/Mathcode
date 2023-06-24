import {getAuth , GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import { initializeApp } from "firebase/app";
import axios from 'axios'

const url = 'http://localhost:5001'
const config = {
    apiKey: import.meta.env.VITE_APP_APIKEY,
    authDomain: import.meta.env.VITE_APP_AUTHDOMAIN,
    projectId:import.meta.env.VITE_APP_PROJECTID ,
    storageBucket:import.meta.env.VITE_APP_STORAGEBUCKET ,
    messagingSenderId:import.meta.env.VITE_APP_MESSAGINGSENDERID,
    appId:import.meta.env.VITE_APP_APPID,
    measurementId: import.meta.env.VITE_APP_MEASUREMENTID
};

export const authProvider = {
    login: async () => {
        const options = {}
        const app = initializeApp(config,options);
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        const  headers = {
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'application/json',
            'mode': 'no-cors',
        }
        try {
            const {user} = await signInWithPopup(auth, provider);
            console.log(user);
            const {data} = await axios.post(url+'/googleAuth',  {email:user.email} , headers)
            console.log(data);
            if(data.status == 200){
                localStorage.setItem("mathcode-token",data.user.token)
                localStorage.setItem("mathcode-username",data.user.username)
                return Promise.resolve('login');
            }
        } catch (error) {
            throw error;
        }
    }
}