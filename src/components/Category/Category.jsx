import React from 'react';
import { useState,useEffect } from 'react';
import Magazine from '../Magazine/Magazine';
import './index.css'

const Category = () => {
    const [categories,setCategories] = useState([])
    const [categoryName,setCategoryName] = useState('')
    const [activeCategories,setActiveCategories] = useState('')

   
    const fetchCategories = () =>{
        fetch("https://sls.magzter.com/magservices/prod/getCategories?lang=en")
        .then(response =>{
            return response.json()
        })
        .then(data=>{
            setCategories(data)
            setActiveCategories(data[0].category_id)
            setCategoryName(data[0].name)
        })
    }
    useEffect(()=>{
        fetchCategories()
    },[])

    console.log(categories)
    console.log(categoryName)
    console.log(activeCategories)

    return (
        <div className='main-container'>
            <div className='desktop-view'>
            <h1 className='heading'>CATEGORIES</h1>
            <hr className='line'/>
            {categories && categories.map((each) =>{
               return(
                   <button key={each.category_id} className='category-button'
                   onClick={()=>(setActiveCategories(each.category_id),setCategoryName(each.name))}
                   
                   >{each.name}</button>
               )
            })}
            </div>
            <div className='mobile-view'>
            <select className='select1'
              onChange={(e)=>setActiveCategories(e.target.value)}
              
            >
            {categories && categories.map((each) =>{
               return(
                   <option key={each.category_id} value={each.category_id}
                   >{each.name}</option>
               )
            })}
            </select>
            </div>
            <div className='mag'>
            <Magazine activeCategories={activeCategories} categoryName={categoryName}/>
            </div>
        </div>
    );
};

export default Category;