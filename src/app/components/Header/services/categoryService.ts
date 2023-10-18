"use client"
import { useState } from "react"

interface Categories{
    name: string,
}
export const useHeader = (()=>{
    const categories: Categories[] = ([
        {name: 'Novidades'},
        {name: 'Beleja'},
        {name: 'Roupas'},
        {name: 'Calsados'},
        {name: 'Alimentos'},
        {name: 'Eletronicos'},
        {name: 'Infantil'},
        {name: 'Promoção'},
    ])
    const [stateMenu,setStateMenu] = useState<boolean>(false)
    const openMenu = (()=>{
        setStateMenu(!stateMenu)
    })
    return {stateMenu,categories,openMenu}
})