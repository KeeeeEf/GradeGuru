import React, { FormEvent, useState } from 'react'
// import { BsFillPersonFill } from "react-icons/bs";
// import { MdEmail } from "react-icons/md";
// import { BsFillTelephoneFill } from "react-icons/bs";
// import { BiSolidLockAlt } from "react-icons/bi";
import config from '../common/config'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Danger from '../components/danger';


const UserRegister = () => {
  const navigate = useNavigate();
  const [emailAdd, setEmailAdd]= useState("");
  const [accName, setAccName]= useState("");
  const [password, setPassword]= useState("");;
  const [error,setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const Navigate = useNavigate();

  const signUp = (event) =>{
    event.preventDefault();
    setIsLoading(true);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailAdd)) {
      setError("Please enter a valid Email Address");
      return;
    }

    axios.post(`${config.API}/signup`,{
        account_name:  accName, 
        account_email: emailAdd,
        password : password,
        account_type: 1,
    }).then((res)=>{
        if (res.data.success == true){
          setTimeout(()=>{
            setIsLoading(false);
          },1500);
          alert("Registered Successfully!");
          Navigate('/login');
        }else{
          setTimeout(()=>{setIsLoading(false)},800);
          setError(res.data.error);
        }
    }).catch((err) => { 
        setError(err.error);
        setIsLoading(false);
    });
  }

  return (
    <div className='animate-fade-in content-center w-[full] h-screen overflow-hidden font-poppins'>
      {error !='' && <Danger message={error}/> }
      <div className='flex justify-center items-center w-[full] h-screen'>
      <div className='flex w-[55%] h-[63vh] r-5 rounded border border-solid border-[#ccc] max-w-[945px] max-h-[510px] shadow-md'>
        <div className='grow overflow-hidden flex flex-col justify-center items-center rounded'>
          <h2 className='text-center text-[25px] font-bold font-poppins'>Create Your Account</h2>
          <form className='formBox w-[70%] flex flex-col xs:max-sm:scale-45 xl:max-2xl:scale-90'>  
            <div className='inputs'>
              <div className="I-Box flex flex-col space-y-2 mb-[20px] ">
              <label className='font-light xs:max-sm:text-[0.4em] xl:max-2xl:text-[0.8em]'>Username</label>
              <input type="username" className='w-full inline-block border rounded box-border bg-[#EDF5F3] mx-0 my-2 px-5 py-3 border-solid border-[#ccc] xs:max-sm:h-[3vh] xs:max-sm:text-[0.4rem] xl:max-2xl:h-[6vh] xl:max-2xl:text-[0.7em] text-black'
                  value={accName}
                  onChange={(e) => setAccName(e.target.value)}            
              ></input>
                <label htmlFor="email" className='font-light xs:max-sm:text-[0.4em] xl:max-2xl:text-[0.8em]'>Email</label>
                <input type="email" className='w-full inline-block border rounded box-border bg-[#EDF5F3] mx-0 my-2 px-5 py-3 border-solid border-[#ccc] xs:max-sm:h-[3vh] xs:max-sm:text-[0.4rem] xl:max-2xl:h-[6vh] xl:max-2xl:text-[0.7em] text-black' name="email" id="Email" value={emailAdd} onChange={(e) =>{setEmailAdd(e.target.value)}} required/>
              </div>
              <div className="I-Box flex flex-col space-y-2 mb-[10px]">
                  <label htmlFor="pass" className='font-light xs:max-sm:text-[0.4em] xl:max-2xl:text-[0.8em]'>Password</label>
                  <input type="password" className='w-full inline-block border rounded box-border bg-[#EDF5F3] mx-0 my-2 px-5 py-3 border-solid border-[#ccc] xs:max-sm:h-[3vh] xs:max-sm:text-[0.4rem] xl:max-2xl:h-[6vh] xl:max-2xl:text-[0.7em] text-black' name="pass" id="pass" value={password} onChange={(e) =>{setPassword(e.target.value)}} required/>
              </div>
            </div>
            <div className="buttons flex flex-col items-center space-y-5 xs:max-sm:space-y-1 mt-[10px]">
                <button type='submit' onClick={signUp} className='flex items-center justify-center button bg-[#6366F1] text-white p-[0.5em] w-[100%] rounded 
                hover:bg-[#818cf8] font-bold transition-colors delay-250 duration-[3000] ease-in xs:max-sm:text-[0.4em] xs:max-sm:w-[9vh] xl:max-2xl:text-[0.9em]'>
                {/* {isLoading && <Spinner className='mr-[1%]'/>} */}
                  Sign Up
                </button>  
            </div>
          </form>
        </div>
        <div className='w-[40%] p-5 bg-[#181c24] text-center flex justify-center items-center flex-col '>
          <div className='m-2.5 p-0 border-y-2 border-y-[white] border-solid  font-bold font-poppins'>
            <h2 className='block text-[1.7em] m-[5.45%] text-[white]'>Sign Up to<br/> GradeGuru!</h2>
          </div>
          <div className='mt-[30px] font-bold font-poppins'>
            <h3 className=' mb-0 text-[1.17em] text-white'>Already have an</h3>
            <h3 className=' mb-[20px] text-[1.17em] text-white'>existing account?</h3>

            <a className='font-poppins no-underline inline-block text-[#6366F1] border text-lg relative cursor-pointer font-[bold] w-[150px] px-6 py-[11px] bg-white rounded-full font-bold hover:bg-[#818cf8] hover:border-[#818cf8] hover:text-white transition-colors delay-250 duration-[3000] ease-in'
                          onClick={()=>{navigate('/login')}}>
              Log In
            </a>
          </div>
        </div>
      </div>
      </div>
    </div>
    // <div className='animate-fade-in content-center overflow-hidden font-poppins'>
    //   {error !='' && <Danger message={error}/> }
    //   {/* Background Picture */}
    //   <div className='absolute left-2/4 top-2/4 text-align w-[1000px] p-[10px] -translate-x-2/4 -translate-y-2/4 mx-auto xs:max-sm:scale-[0.38] xl:max-2xl:scale-[0.67]'>
    //     {/* Left Box */}
    //     <div className='w-[35%] h-[100] bg-[#181c24] float-left text-center shadow-[12px_23px_10px_-4px_gray] pt-[70px] pb-[78px] px-10 rounded-[7px_0px_0px_7px]'>
    //       {/* Welcome Sign */}
          // <div className='m-2.5 p-0 border-y-2 border-y-[white] border-solid  font-bold font-poppins'>
          //   <h2 className='block text-[1.7em] m-[5.45%] text-[white]'>Sign Up to<br/> GradeGuru!</h2>
          // </div>
          // <div className='mt-[53px] font-bold font-poppins'>
          //   <h3 className=' mb-0 text-[1.17em] text-white'>Already have an</h3>
          //   <h3 className=' mb-2 text-[1.17em] text-white'>existing account?</h3>

          //   <a className='no-underline inline-block text-[#e72a2a] border text-lg relative cursor-pointer font-[bold] 
          //                 w-[190px] px-6 py-[11px] bg-white
          //                 rounded-[100px] font-poppins font-bold hover:bg-[#9a1a00] hover:border-[#9a1a00] hover:text-white transition-colors delay-250 duration-[3000] ease-in'
          //                 onClick={()=>{navigate('/uslogin')}}>
          //     Log In
          //   </a>
          // </div>
    //     </div>
    //     {/* Right Box */}
    //     <div className='w-[65%] float-left bg-[white] shadow-[4px_15px_10px_4px_gray] pt-[38px] pb-[50px] px-[100px] rounded-[0px_7px_7px_0px]'>
    //       <h2 className='text-center text-[25px] font-bold font-poppins'>Create Your Account</h2>
    //       <div className='mt-2.5'>
    //         {/* <BsFillPersonFill className='float-left text-[21px]'  /> */}
            // <label className='float-left ml-[2px]'>Username</label>
            // <input type="username" className='w-full inline-block border rounded box-border bg-[#EDF5F3] mx-0 my-2 px-5 py-3 border-solid border-[#ccc]'
            //     value={accName}
            //     onChange={(e) => setAccName(e.target.value)}            
            // ></input>
    //       </div>
    //       <div className='mt-2.5'>
    //         {/* <MdEmail className='float-left text-[20px]'/> */}
    //         <label  className='float-left ml-[3px]'>Email</label>
    //         <input type="username" className='w-full inline-block border rounded box-border bg-[#EDF5F3] mx-0 my-2 px-5 py-3 border-solid border-[#ccc]'
    //         value={emailAdd}
    //         onChange={(e) => setEmailAdd(e.target.value)}></input>
    //       </div>
    //       {/* //Halu */}
    //       <div className='mt-2.5'>
    //         {/* <BsFillTelephoneFill className='float-left text-[17px]'/> */}
    //       </div>
    //       <div className='mt-2.5'>
    //         {/* <BiSolidLockAlt className='float-left text-[19px]'/> */}
    //         <label className='float-left ml-[3px]'>Password</label>
    //         <input type="password" className='w-full inline-block border rounded box-border bg-[#EDF5F3] mx-0 my-2 px-5 py-3 border-solid border-[#ccc]'
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //         ></input>
    //       </div>
    //       <div className='flex justify-center mt-5'>
            // <button type='submit' onClick={signUp} className='flex items-center justify-center no-underline inline-block text-[white] border text-lg relative cursor-pointer
            // shadow-[inset_0_0_0_white] w-[220px] px-6 py-[11px] rounded-[100px] border-solid border-[#e72a2a] font-poppins font-bold bg-[#DD2803] hover:bg-[#9a1a00] hover:border-[#9a1a00] hover:text-white transition-colors delay-250 duration-[3000] ease-in'>
            //         {/* {isLoading && <Spinner className='mr-[1%]'/>} */}
            //         Sign Up                                                 
            //   </button> 
    //       </div>

    //     </div>
    //   </div>
    // </div>
  )
}

export default UserRegister