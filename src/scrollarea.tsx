import  REACT from 'react';
import data from './data'
import { useState } from 'react';



function Business ():JSX.Element{
    let [info,setInfo] = useState(data);
    for(let i =0; i < info.length; i++){
        
    }
    return (
        <article>
            <h4>{info[0].title}</h4>
            <h3>{info[0].content}</h3>
        </article>
    )
}

export default Business;