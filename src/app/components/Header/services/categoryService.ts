"use client"
import { useState } from "react"
import { Requests } from "@/app/api"
import { useProductsContext } from "@/app/contexts/productsContext"

export const useHeader = (()=>{
    const {routeGet} = Requests()
    const [stateMenu,setStateMenu] = useState<boolean>(false)
    const {setCategories} = useProductsContext()
    const openMenu = (()=>{
        setStateMenu(!stateMenu)
    })

    const getCategories = (async()=>{
        await routeGet('categories')
        .then((response) => {
            setCategories(response.data)
        }).catch((err) => {
            console.log(err);
        });
    })

    return {stateMenu,openMenu,getCategories}
})