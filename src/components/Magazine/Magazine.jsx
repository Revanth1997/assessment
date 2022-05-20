import React from 'react';
import {useState,useEffect} from 'react'
import CategoryDetails from '../CategoryDetails/CategoryDetails';


import './index.css'

const Magazine = () => {
    const [magazine,setMagazine] = useState([])
    const fetchMagazine = () =>{
        fetch("https://sls.magzter.com/maglists/prod/magazine-filter?ver=3&storeID=1&categoryID=8&lang=English&page=1")
        .then(response =>{
            return response.json()
        })
        .then(data=>{
            setMagazine(data.hits)
        })
        
    }
    useEffect(()=>{
        fetchMagazine()
    },[])
    console.log(magazine)
    return (
        <div>
            <CategoryDetails />
            <h1>Magazine</h1>
            <div className='magazine-container'>
            {magazine && magazine.map((each) =>{
               return(
                   <>
                    <li className="list"
                    key={each.id}>
                      <img src={each.imgPath} alt="img"/>
                      <p>{each.pubName}</p>
                    </li>
                   </>
               )
            })}
            </div>
        </div>
    );
};

export default Magazine;