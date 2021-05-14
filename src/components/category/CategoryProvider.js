import React, { useState } from "react"

export const CategoryContext = React.createContext()

export const CategoryProvider = (props) => {
    const [ categories, setCategories ] = useState([])


    const getCategories = () => {
        return fetch("http://localhost:8000/categories", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(response => response.json())
            .then(setCategories)
    }

    const createCategory = (category) => {
        return fetch("http://localhost:8000/categories", {
            method: "POST",
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(category)
         })
            .then(getCategories)
    }
    

    const getCategoryById = (id) => {
        return fetch(`http://localhost:8000/categories/${id}`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(response => response.json())
    }

    const editCategory = (category) => {
        return fetch(`http://localhost:8000/categories/${category.id}`,{
            method:"PUT",
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`,
                "Content-Type":"application/json"
            },
            body: JSON.stringify(category)
        })
        .then(getCategories)
    }

    
    const deleteCategory = categoryId => {
        return fetch(`http://localhost:8000/categories/${categoryId}`, {
            method: "DELETE",
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`,
            },
        })
        .then(getCategories)
    }

    return (
        
        <CategoryContext.Provider value={{ categories, getCategoryById, editCategory, getCategories, deleteCategory, createCategory }} >
            { props.children }
        </CategoryContext.Provider>
    )
}
