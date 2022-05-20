import React from 'react';
import { useState,useEffect } from 'react';
import Magazine from '../Magazine/Magazine';
import './index.css'
const CategoryDetails = () => {
    const [languages,setLanguages] = useState([])
    const [select,setSelect] = useState([])
    const fetchLanguages = () =>{
        fetch("https://sls.magzter.com/magservices/prod/getLanguages")
        .then(response =>{
            return response.json()
        })
        .then(data=>{
            setLanguages(data)
        })
        
    }
    useEffect(()=>{
        fetchLanguages()
    },[])
    return (
        <div>
            <h1>Category Details</h1>
            <select className='select'
              onChange={e=>setSelect(e.target.value)}
            >
            {languages && languages.map((each) =>{
               return(
                   <option key={each.id} value={each._lang}>{each._lang}</option>
               )
            })}
            </select>
        
        </div>
    );
};

export default CategoryDetails;