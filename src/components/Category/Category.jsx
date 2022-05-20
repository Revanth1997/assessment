import React from 'react';
import { useState,useEffect } from 'react';
import './index.css'

const Category = () => {
    const [categories,setCategories] = useState([])
    const [activeCategories,setActiveCategories] = useState([])
    const onClickCategories = (e) =>{
        setActiveCategories(e.target.value)
        console.log(activeCategories)
    }
    const fetchCategories = () =>{
        fetch("https://sls.magzter.com/magservices/prod/getCategories?lang=en")
        .then(response =>{
            return response.json()
        })
        .then(data=>{
            setCategories(data)
        })
    }
    useEffect(()=>{
        fetchCategories()
    },[])

    console.log(categories)

    return (
        <div className='category-container'>
            <h1>Category</h1>
            {categories && categories.map((each) =>{
               return(
                   <button key={each.id}className='category-button'
                   onClick={onClickCategories}
                   >{each.name}</button>
               )
            })}
        </div>
    );
};

export default Category;