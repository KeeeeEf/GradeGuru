import react from 'react'

const Dropdown = (props) =>{

    console.log(props.options)

    function renderData(data, index){
        return(
            <option value={index}>{data.type}</option>
        )
    }

    return(
        <div>
          <select
            // value={semesterName}
            // onChange={(e) => setSemesterName(e.target.value)}
            className={props.className}>
            <option value="" disabled selected>
                Select {props.title}
             </option>
             {props.options.map((data)=>renderData(data))}  
          </select>
        </div>
    )
}

export default Dropdown