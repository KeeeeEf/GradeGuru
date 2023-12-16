import {FormEvent, useEffect, useState} from 'react';
import DropDown from 'react-dropdown'
import { CircularProgressbar } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";
import NavBar from '../components/Navbar'

const Course = () =>{

    const [activity, setActivity] = useState('');
    const [type, setType] = useState('');
    const [score, setScore] = useState('');
    const [total, setTotal] = useState('');
    
    const Title = "CIS1101 PROGRAMMING I"
    const percentage = 66;
    const options = ["quiz", "assignment", "project"]

    return(
        <div className=''>
            <NavBar/>
            <div className='p-5'>
            <div>
                <h1>{Title}</h1>
            </div>
            <div className='grid grid-cols-3'>
                <div className='ml-[2rem] flex flex-col col-span-2'>
                <div className='flex items-center gap-[5rem] relative'>
                    <h2>Add Activity: </h2>
                    <div className='flex flex-col '>
                        <label className='font-light xs:max-sm:text-[0.4em] xl:max-2xl:text-[0.8em]'>Activity (Optional)</label>
                        <input type="text" className='border border-solid border-black'value={activity} onChange={(e) =>{setActivity(e.target.value)}}/>
                    </div>
                    <div className='flex flex-col'>
                        <label className='font-light xs:max-sm:text-[0.4em] xl:max-2xl:text-[0.8em]'>Type: </label>
                    </div>
                    <div className='flex flex-col'>
                        <label className='font-light xs:max-sm:text-[0.4em] xl:max-2xl:text-[0.8em]'>Score</label>
                        <input type="text" className='w-[2.5rem] border border-solid border-black' value={score} onChange={(e) =>{setScore(e.target.value)}}/>
                    </div>
                    <div className="w-[2.4rem] h-16 border-t-[4px] rounded border-solid border-black transform rotate-[-60deg] absolute left-[39.4rem] top-[1rem]"></div>
                    <div className='flex flex-col'>
                        <label className='font-light xs:max-sm:text-[0.4em] xl:max-2xl:text-[0.8em]'>Total</label>
                        <input type="text" className='w-[2.5rem] border border-solid border-black' value={total} onChange={(e) =>{setTotal(e.target.value)}}/>
                    </div>
                </div>
                    <div>
                        For table
                    </div>
                </div>
                <div className='flex justify-center items-center w-[100%] bg-black p-5'>
                    <div className='w-[200px] h-[200px]'>
                    <CircularProgressbar value={percentage} text={`${percentage}%`} strokeWidth={5}/>;
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Course