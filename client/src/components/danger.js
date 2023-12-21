import React, { useState } from 'react';
// import {CgDanger} from 'react-icons/cg';

const Danger = (props) => {

  const handleChange = () =>{
    props.onChanged('')
  }



  return (
    <div>
      <div className='animate-shake absolute w-[50%] z-10 top-[7%] left-[25%] xl:max-2xl:w-[57%] xl:max-2xl:left-[21.5%]'>
        <div className="flex justify-between items-center w-full p-5 rounded-lg border border-red-400 bg-red-300 text-red-900 xl:max-2xl:p-2 xl:max-2xl:text-[0.9em]">
          {/* <CgDanger className='mr-[1%]'/> */}
          {props.message}
          <button onClick={handleChange}>X</button>
        </div>
      </div>
    </div>
  );
};

export default Danger;
