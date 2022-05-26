import React from 'react';
import {useState,useEffect} from 'react'

import './index.css'

const Magazine = ({activeCategories,categoryName}) => {
    
    const [magazine,setMagazine] = useState([])
    const [languages,setLanguages] = useState([])
    const [page,setPage] = useState(1)
    const [activeLanguage,setActiveLanguage] = useState('English')
    const fetchLanguages = () =>{
        fetch("https://sls.magzter.com/magservices/prod/getLanguages")
        .then(response =>{
            return response.json()
        })
        .then(data=>{
            setLanguages(data)
        })
        
    }
    const fetchMagazine = () =>{
        fetch(`https://sls.magzter.com/maglists/prod/magazine-filter?ver=3&storeID=1&categoryID=${activeCategories}&lang=${activeLanguage}&page=${page}`)
        .then(response =>{
            return response.json()
        })
        .then(data=>{
            // const updatedMagzine = [...magazine]
            // updatedMagzine.push(...data.hits)
            // setMagazine(updatedMagzine)
            setMagazine(data.hits)
        })
        
    }
    const LoadMore = () =>{
        setPage(page+1)
    }
    useEffect(()=>{
        fetchLanguages()
    },[])
    useEffect(()=>{
        fetchMagazine()
    },[activeLanguage,page,activeCategories])
    return (
        <div className='container'>
            <p className='contegory-name'>{categoryName}</p>
            <select className='select'
              onChange={e=>setActiveLanguage(e.target.value)}
            >
            {languages && languages.map((each) =>{
               return(
                   <option key={each.id} value={each._lang}>{each._lang}</option>
               )
            })}
            </select>
            <hr className='line1'/>
            <div className='magazine-container'>
            {magazine && magazine.map((each) =>{
               return(
                   <>
                    <li className="list"
                    key={each.objectId}>
                      <img 
                      src={`https://files.magzter.com/${each.imgPath}`} alt="img" className='image'/>
                      <p className='publish-name'>{each.pubName}</p>
                    </li>
                   </>
               )
            })}
            
            </div>
            <div className='button'>
            <button type="button"
            className='load-button'
            onClick={LoadMore}>
                Load More
            </button>
            </div>
        </div>
    );
};

export default Magazine;