import {FormEvent, useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import displayImg from '../assets/circle.png'
import config from '../common/config'
import axios from 'axios'

import Danger from '../components/danger';

const UserLogin = () => {

    const [email , setEmail] = useState('');
    const [pass , setPass] = useState('');
    const [errMess , setErrMess] = useState('');
    const [isLoading,setIsLoading] = useState(false);
    const Navigate = useNavigate();

    const guestHandler = () =>{
        setErrMess('');
        Navigate('/');
    }

    // axios.get(`${config.API}/account`).then(res => {
    //     const yourSavedData = res.data;
    //     console.log(yourSavedData)
    // })


    const submitHandler = (event) =>{
        event.preventDefault();

        setIsLoading(true);
        if(email === '' || pass === ''){
            setIsLoading(false);
            setErrMess("Fill all the fields required!");
            // setInvalid(true);
        }
        else{
            axios.post(`${config.API}/login`,{
                account_email: email , 
                password : pass,
                account_type: 1
            }).then((res)=>{
                if(res.data.success==true){
                    setErrMess('');
                    setTimeout(()=>{
                        setIsLoading(false);
                    },800)
                    localStorage.setItem('userDetails', JSON.stringify(res.data.account_info));
                    Navigate('/')
                }else{
                    setIsLoading(false);
                    setErrMess(res.data.error);   
                }
            }).catch((err) => { 
                setIsLoading(false);
                setErrMess(err.response.data.message);
            });
        }
    }


    return (
        <div className='animate-fade-in content-center w-[full] h-screen overflow-hidden font-poppins'>
            {errMess !='' && <Danger message={errMess}/>}
            <div className='flex justify-center items-center w-[full] h-screen'>
                    <div className='flex w-[55%] h-[63vh] bg-red-400 r-5 rounded border border-solid border-[#ccc] max-w-[945px] max-h-[510px] shadow-md'>
                        <div className='w-[45%] overflow-hidden'>
                        <img className='object-cover' src={displayImg} />
                        </div>
                        <div className='p-5 grow bg-[#181c24] flex justify-center items-center text-white rounded'>
                            <form className='formBox w-[70%] flex flex-col xs:max-sm:scale-45 xl:max-2xl:scale-90'>  
                                <div className="inputs">
                                    <div className="I-Box flex flex-col space-y-2 mb-[20px] ">
                                        <label htmlFor="email" className='font-light xs:max-sm:text-[0.4em] xl:max-2xl:text-[0.8em]'>Email</label>
                                        <input type="email" className='w-full inline-block border rounded box-border bg-[#EDF5F3] mx-0 my-2 px-5 py-3 border-solid border-[#ccc] xs:max-sm:h-[3vh] xs:max-sm:text-[0.4rem] xl:max-2xl:h-[6vh] xl:max-2xl:text-[0.7em] text-black' name="email" id="Email" value={email} onChange={(e) =>{setEmail(e.target.value)}} required/>
                                    </div>
                                    <div className="I-Box flex flex-col space-y-2 mb-[10px]">
                                        <label htmlFor="pass" className='font-light xs:max-sm:text-[0.4em] xl:max-2xl:text-[0.8em]'>Password</label>
                                        <input type="password" className='w-full inline-block border rounded box-border bg-[#EDF5F3] mx-0 my-2 px-5 py-3 border-solid border-[#ccc] xs:max-sm:h-[3vh] xs:max-sm:text-[0.4rem] xl:max-2xl:h-[6vh] xl:max-2xl:text-[0.7em] text-black' name="pass" id="pass" value={pass} onChange={(e) =>{setPass(e.target.value)}} required/>
                                    </div>
                                </div>
                                <div className="frgt text-right text-[0.8em] mb-[2rem] hover:text-[#818cf8] transition-colors delay-250 duration-[3000] xs:max-sm:text-[0.3em] xs:max-sm:mb-[1rem] xl:max-2xl:text-[0.6em]">
                                    <Link to={'/forgpass'}>Forgot Password?</Link>
                                </div>
                                <div className="buttons flex flex-col items-center space-y-5 xs:max-sm:space-y-1">
                                    <button type='submit' onClick={submitHandler} className='flex items-center justify-center button bg-[#6366F1] text-white p-[0.5em] w-[100%] rounded 
                                            hover:bg-[#818cf8] font-bold transition-colors delay-250 duration-[3000] ease-in xs:max-sm:text-[0.4em] xs:max-sm:w-[9vh] xl:max-2xl:text-[0.7em]'>
                                            {/* {isLoading && <Spinner className='mr-[1%]'/>} */}
                                                Sign in
                                    </button>
                                    <button type='submit' onClick={guestHandler} className='font-poppins button text-[#6366F1] p-[0.5em] w-[100%] rounded border-solid border-2 border-[#6366F1] font-bold 
                                        hover:bg-[#818cf8] hover:text-white transition-colors delay-250 duration-[3000] ease-in xs:max-sm:text-[0.4em] xs:max-sm:w-[9vh] xl:max-2xl:text-[0.7em] '>Log in as Guest</button>
                                    <div className="signBox">
                                        <span className='capitalize xs:max-sm:text-[0.4em] xl:max-2xl:text-[0.7em]'>need an account ?</span>
                                        <Link to={'/register'} className='link text-[#6366F1] font-bold pl-1 hover:text-[#818cf8] transition-colors delay-250 duration-[3000] ease-in xs:max-sm:text-[0.4em] xl:max-2xl:text-[0.7em]'>Sign Up</Link>
                                    </div>    
                                </div>
                            </form>
                        </div>
                    </div>
            </div>

        </div>
    );
}

export default UserLogin;
