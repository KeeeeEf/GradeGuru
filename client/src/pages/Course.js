import {FormEvent, useEffect, useState} from 'react';
import '../App.css';
import config from '../common/config';
import axios from 'axios';
import Table from '../components/Table';

import Modal from 'react-modal'
import Skeleton from 'react-loading-skeleton';
import { CircularProgressbar } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";

import DropDown from '../components/Dropdown'
import NavBar from '../components/Navbar'
import Danger from '../components/danger';
import { useParams } from 'react-router-dom';
  

const Course = () =>{

    const {course_id} = useParams();
    
    const [activity, setActivity] = useState('');
    const [type, setType] = useState('');
    const [score, setScore] = useState('');
    const [total, setTotal] = useState('');
    const [grade, setGrade] = useState({});


    const [isTerm, setIsTerm] = useState('midterms')
    const [activityList, setActivityList] = useState([])
    const [criteria, setCriteria] = useState([]);
    const [error, setError] = useState("");
    const [select, setSelect] = useState('');
    const [title, setTitle] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const percentage = 66;

    useEffect(() => {
       fetchCriteria()
       fetchActivity()
      }, [isTerm]);

    useEffect(() => {
        // Call calculateGrade after fetching data or any relevant updates
        calculateGrade();
    }, [activityList, criteria]);

    const options = criteria.map((data) => data.type) || [];

    const handleUpdateTable = async () => {
        // Fetch the latest data after a deletion
        await fetchActivity();
      };

    const addActivity = () =>{

        if(!type || !score || !total){
            console.log("fill otu everyting")
            setError("Please fill out the form")
            return;
        }

        if (!Number.isNaN(Number(score)) || !Number.isNaN(Number(total))) {
            setError("Score or Total is not a number");
            return;
          }

        const numericScore = parseFloat(score);
        const numericTotal = parseFloat(total);

        if(numericScore>numericTotal){
            setError(`Score is greater than Total`)
            return;
        }

        axios.post(`${config.API}/activity/addactivity`,{
            course_id: course_id,
            term: isTerm,
            activity: activity,
            type: type,
            score: score,
            total: total
        }).then((res)=>{
            if(res.data.success === true){

                setActivityList((prevActivityList) => [
                    ...prevActivityList,
                    res.data.data,
                  ]);

                console.log(res.data.data)

                setActivity("");
                setType("");
                setScore("");
                setTotal("");
                setSelect('');
                setError('')
            }else{
                setError(res.data.error)
            }
        }).catch((err)=>{
            setError(err.error);
        })
    }

    const fetchCriteria = async () => {
        try{
            const response = await axios.get(`${config.API}/criteria/getcriteria?course_id=${course_id}`);
            setCriteria(response.data.data)
        }catch (err){
            console.error('Error fetching criteria:', err);
        }
    };

    const fetchActivity = async () => {

        try {
            const response = await axios.get(`${config.API}/activity/getactivity`, {
                params: {
                    course_id: course_id,
                    term: isTerm,
                },
            });
            setActivityList(response.data.data);
            setTitle(response.data.data[0].course_name)
        } catch (err) {
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

      const calculateGrade = () => {
        let grades = [];
    
        criteria.forEach((data) => {
            grades.push({
                score: 0,
                total: 0,
                type: data.type,
                percentage: data.percentage / 100
            });
        });
    
        activityList.forEach((data) => {
            const index = grades.findIndex((grade) => grade.type === data.type);
    
            if (index !== -1) {
                grades[index].score += data.score;
                grades[index].total += data.total;
            }
        });
    
        const calculate = grades.map((data) => {
            if (data.total !== 0) {
                const result = (data.score / data.total) * data.percentage;
                return parseFloat(result.toFixed(4));
            } else {
                return 0;
            }
        });
    
        let summedGrade = calculate.reduce((accumulator, currentNumber) => {
            return accumulator + currentNumber;
        }, 0);
    
        const rounded = Math.floor(summedGrade * 100);
    
        if (rounded >= 95 && rounded <= 100) {
            setGrade({
                scale: 5.0.toFixed(1),
                percentage: parseFloat((summedGrade*100).toFixed(2))
            });
        } else if(rounded <=94 && rounded >=75){
            let subtract = (94 - rounded)/100;
            setGrade({
                scale: parseFloat((1.0+subtract).toFixed(1)),
                percentage: parseFloat((summedGrade*100).toFixed(2))
            });
        }else{
            setGrade({
                scale: 5.0.toFixed(1),
                percentage: parseFloat((summedGrade*100).toFixed(2))
            })
        }

        console.log(grade)
    };

    const openModal = () =>{
        setIsModalOpen(true)
    }

    const closeModal = () =>{
        setIsModalOpen(false)
    }
    
      

    return(
        <div className=''>
            <NavBar/>
            <div className='p-5'>
            <div className='text-[30px] mb-[2rem]'>
                <h1>{title}</h1>
            </div>
            <div className='grid grid-cols-3 gap-4'>
                <div className='ml-[2rem] flex flex-col col-span-2 p-5'>
                <div className='flex items-center gap-[2rem] relative mb-[2rem]'>
                    <h2>Add Activity: </h2>
                    <div className='flex flex-col '>
                        <label className='font-light xs:max-sm:text-[0.4em] xl:max-2xl:text-[0.8em] text-sm font-medium text-gray-600 '>Activity (Optional)</label>
                        <input type="text" className='bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500  block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 'value={activity} onChange={(e) =>{setActivity(e.target.value)}}/>
                    </div>
                    <div className='flex flex-col'>
                        <label className='font-light xs:max-sm:text-[0.4em] xl:max-2xl:text-[0.8em] text-sm font-medium text-gray-600'>Type</label>
                        <DropDown options={options} title={'Type'} select={select} onSelect={(value)=>{setType(value);setSelect(value)}} className={"bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500  block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 "}/>
                    </div>
                    <div className='relative flex gap-[5rem]'>
                    <div className='flex flex-col'>
                        <label className='font-light xs:max-sm:text-[0.4em] xl:max-2xl:text-[0.8em] text-sm font-medium text-gray-600'>Score</label>
                        <input type="text" className='w-[2.5rem] bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500  block p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 ' value={score} onChange={(e) =>{setScore(e.target.value)}}/>
                    </div>
                         <div className="w-[2.1rem] h-16 border-t-[3px] rounded border-solid border-black transform rotate-[-60deg] absolute left-[4.4rem] top-[1.5rem]"></div>
                    <div className='flex flex-col ml-[-2.5rem]'>
                        <label className='font-light xs:max-sm:text-[0.4em] xl:max-2xl:text-[0.8em] text-sm font-medium text-gray-600'>Total</label>
                        <input type="text" className='w-[2.5rem] w-[2.5rem] bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500  block p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 ' value={total} onChange={(e) =>{setTotal(e.target.value)}}/>
                    </div>
                    </div>
                    <div className='flex flex-col ml-[-1.5rem] mt-[17px] '>
                        <button onClick={addActivity} type='submit' className='flex items-center justify-center button bg-[#6366F1] text-white p-[0.5em] w-[100%] rounded hover:bg-[#818cf8] font-bold transition-colors delay-250 duration-[3000] ease-in xs:max-sm:text-[0.4em] xs:max-sm:w-[9vh] xl:max-2xl:text-[0.7em]'>
                        {/* {isLoading && <Spinner className='mr-[1%]'/>} */}
                                                Add
                        </button>
                    </div>  
                </div>
                    <div className=''>
                        <div className='gap-[10px] flex'>
                        <button onClick={() => { setIsTerm('midterms'); }} className={`${isTerm === 'midterms' ? 'text-black' : 'text-gray-400'}`}>
                        Midterms
                        </button>
                        <button onClick={() => { setIsTerm('finals'); }} className={`${isTerm === 'finals' ? 'text-black' : 'text-gray-400'}`}>
                        Finals
                        </button>
                        </div>

                        <div className='w-[100%] h-[35rem] text-center rounded p-5 overflow-auto' style={{
                                boxShadow: "0px 0px 15px -6px rgba(0,0,0,0.75) inset",
                                WebkitBoxShadow: "0px 0px 15px -6px rgba(0,0,0,0.75) inset",
                                MozBoxShadow: "0px 0px 15px -6px rgba(0,0,0,0.75) inset",

                            }}>
                            {activityList.length === 0?
                            <div className='flex h-[100%] flex-col items-center justify-center text-[30px]'
                            >
                            <h1>No Records Found!</h1>
                            </div>
                            :
                            <Table data={activityList} options={options} criteria={criteria} onUpdate={handleUpdateTable}/>
                            }
                        </div>
                    </div>
                </div>
                <div className='flex flex-col items-center  w-[100%] shadow-lg p-5'>
                    <div className='w-[200px] h-[200px]'>
                        <CircularProgressbar value={grade.percentage} text={`${grade.percentage}%`} strokeWidth={5}/>;
                    </div>
                    <h1 className='text-black text-[30px]'>Your grade is: {grade.scale}</h1>
                    <div className='p-5 bg-white w-[100%] mt-[3rem] shadow-md'>
                        <h1 className='text-gray-500 italic mb-[1rem]'>Note: 100%-95% = 1.0 and 75% below = 5.0</h1>
                        <div className='relative'>
                            <h2 className='font-bold'>Criteria</h2>
                            {/* <button onClick={openModal} className='absolute top-0 right-[10px]'>
                                edit
                            </button> */}
                        </div>
                        <div className='flex flex-col gap-[10px] p-2'>
                            {criteria.map((data)=>renderCriteria(data))}
                            <div className='relative mt-[5px] mb-[5px]'><div className='w-[40px] h-[2px] bg-black absolute right-0'/></div>
                            <h1 className='text-right font-bold'>100%</h1>
                        </div>
                    </div>
                </div>
            </div>
                {error !='' && <Danger message={error} onChanged={(value)=>setError(value)}/>}
                {/* <Modal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    contentLabel="Edit Criteria Modal"
                    className="bg-white p-5 rounded absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    overlayClassName="overlay"
                >
                    <div className="modal-content ">
                        <h2 className="text-2xl font-bold mb-4">Edit Criteria</h2>

                        <div className=' items-center'>
                            <div className='flex mb-4 gap-[10rem] '>
                                <label className="block text-md font-bold">Criteria</label>
                                <label className="block text-md font-bold ml-4">%</label>
                            </div>

                            {criteria.map((item, index) => (
                                <div key={index} className='flex mb-4'>
                                    <div className="mr-4">
                                        {isSubmitting ? (
                                            <Skeleton className="mb-4" height={40} width={"100%"} baseColor='#bcbcbc' />
                                        ) : (
                                            <input
                                                type="text"
                                                placeholder="Enter Criteria"
                                                value={item.type}
                                                className="border rounded p-2 mb-2"
                                                // You might want to add an onChange handler to update the state accordingly
                                            />
                                        )}
                                    </div>
                                    <div>
                                        {isSubmitting ? (
                                            <Skeleton className="mb-4" height={40} width={"100%"} baseColor='#bcbcbc' />
                                        ) : (
                                            <input
                                                type="text"
                                                placeholder="Enter Percentage"
                                                value={item.percentage}
                                                className="border rounded p-2 mb-2"
                                                // You might want to add an onChange handler to update the state accordingly
                                            />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button className="bg-blue-500 text-white py-2 px-4 rounded mr-2">
                            Save
                        </button>
                        <button onClick={closeModal} className="bg-gray-500 text-white py-2 px-4 rounded">
                            Cancel
                        </button>
                        {error && <p className="text-red-500">{error}</p>}
                    </div>
                </Modal> */}
            </div>
        </div>
    )
}

export default Course