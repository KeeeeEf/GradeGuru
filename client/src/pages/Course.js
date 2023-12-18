import {FormEvent, useEffect, useState} from 'react';
import config from '../common/config';
import axios from 'axios';

import { CircularProgressbar } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";

import DropDown from '../components/Dropdown'
import NavBar from '../components/Navbar'
import Table from '../components/Table';

const Course = () =>{


    const [activity, setActivity] = useState('');
    const [type, setType] = useState('');
    const [score, setScore] = useState('');
    const [total, setTotal] = useState('');

    const [activityList, setActivityList] = useState([])
    const [criteria, setCriteria] = useState([]);
    const [error, setError] = useState("");
    const [select, setSelect] = useState('');
    
    const Title = "CIS1101 PROGRAMMING I"
    const percentage = 66;


    useEffect(() => {
       fetchCriteria()
       fetchActivity()
      }, []);

    const options = criteria.map((data) => data.type) || [];

    const addActivity = () =>{

        if(!activity || !type || !score || !total){
            console.log("fill otu everyting")
            setError("Please fill out the form")
            return;
        }

        axios.post(`${config.API}/activity/addactivity`,{
            course_id: 1,
            activity: activity,
            type: type,
            score: score,
            total: total
        }).then((res)=>{
            if(res.data.success === true){

                setActivityList((prevActivityList) => [
                    ...prevActivityList,
                    res.data.data, // assuming the added data is returned in the response
                  ]);

                console.log(res.data.data)

                alert("Added Successfully");
                setActivity("");
                setType("");
                setScore("");
                setTotal("");
                setSelect('');
            }else{
                setError(res.data.error)
            }
        }).catch((err)=>{
            setError(err.error);
        })
    }

    const fetchCriteria = async () => {
        try{
            const response = await axios.get(`${config.API}/criteria/getcriteria?course_id=1`);
            setCriteria(response.data.data)
        }catch (err){
            console.error('Error fetching criteria:', err);
        }
    };

    const fetchActivity = async () => {
        try{
            const response = await axios.get(`${config.API}/activity/getactivity?course_id=1`);
            setActivityList(response.data.data)
            console.log(activity)
        }catch (err){
            console.error('Error fetching criteria:', err);
        }
    };


    function renderCriteria(datum, index) {
        return (
          <div key={index} className='flex justify-between items-center gap-[10px]'>
            <h1>{datum.type}</h1>
            <div className='w-[100%] h-[2px] bg-black' />
            <h1>{datum.percentage}%</h1>
          </div>
        );
      }
      

    return(
        <div className=''>
            <NavBar/>
            <div className='p-5'>
            <div>
                <h1>{Title}</h1>
            </div>
            <div className='grid grid-cols-3 gap-4'>
                <div className='ml-[2rem] flex flex-col col-span-2 p-5'>
                <div className='flex items-center gap-[2rem] relative'>
                    <h2>Add Activity: </h2>
                    <div className='flex flex-col '>
                        <label className='font-light xs:max-sm:text-[0.4em] xl:max-2xl:text-[0.8em] text-sm font-medium text-gray-600'>Activity (Optional)</label>
                        <input type="text" className='border border-solid border-black'value={activity} onChange={(e) =>{setActivity(e.target.value)}}/>
                    </div>
                    <div className='flex flex-col'>
                        <label className='font-light xs:max-sm:text-[0.4em] xl:max-2xl:text-[0.8em] text-sm font-medium text-gray-600'>Type</label>
                        <DropDown options={options} title={'Type'} select={select} onSelect={(value)=>{setType(value);setSelect(value)}} className={"border border-1 border-black"}/>
                    </div>
                    <div className='relative flex gap-[5rem]'>
                    <div className='flex flex-col'>
                        <label className='font-light xs:max-sm:text-[0.4em] xl:max-2xl:text-[0.8em] text-sm font-medium text-gray-600'>Score</label>
                        <input type="text" className='w-[2.5rem] border border-solid border-black' value={score} onChange={(e) =>{setScore(e.target.value)}}/>
                    </div>
                         <div className="w-[2.1rem] h-16 border-t-[3px] rounded border-solid border-black transform rotate-[-60deg] absolute left-[4.4rem] top-[1rem]"></div>
                    <div className='flex flex-col ml-[-2.5rem]'>
                        <label className='font-light xs:max-sm:text-[0.4em] xl:max-2xl:text-[0.8em] text-sm font-medium text-gray-600'>Total</label>
                        <input type="text" className='w-[2.5rem] border border-solid border-black' value={total} onChange={(e) =>{setTotal(e.target.value)}}/>
                    </div>
                    </div>
                    <div className='flex flex-col ml-[-1.5rem] mt-[17px]'>
                        <button onClick={addActivity} type='submit' className='flex items-center justify-center button bg-[#6366F1] text-white p-[0.5em] w-[100%] rounded hover:bg-[#818cf8] font-bold transition-colors delay-250 duration-[3000] ease-in xs:max-sm:text-[0.4em] xs:max-sm:w-[9vh] xl:max-2xl:text-[0.7em]'>
                        {/* {isLoading && <Spinner className='mr-[1%]'/>} */}
                                                +
                        </button>
                    </div>  
                </div>
                    <div className=''>
                        <div className=''>
                            <Table data={activityList} options={options} criteria={criteria}/>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col justify-center items-center w-[100%] bg-black p-5'>
                    <div className='w-[200px] h-[200px]'>
                        <CircularProgressbar value={percentage} text={`${percentage}%`} strokeWidth={5}/>;
                    </div>
                    <div className='p-5 bg-white w-[100%] mt-[2rem]'>
                        <div className='relative'>
                            <h2 className='font-bold'>Criteria</h2>
                            <button className='absolute top-0 right-[10px]'>
                                edit
                            </button>
                        </div>
                        <div className='p-2'>
                            {criteria.map((data)=>renderCriteria(data))}
                            <div className='relative mt-[5px] mb-[5px]'><div className='w-[40px] h-[2px] bg-black absolute right-0'/></div>
                            <h1 className='text-right font-bold'>100%</h1>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Course