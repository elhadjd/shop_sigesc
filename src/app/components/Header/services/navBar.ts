import { useState } from "react"

export const NavBarService = (()=>{
    const [stateMenu,setStateMenu] = useState<boolean>(false)
    const openMenu = (()=>{
        setStateMenu(!stateMenu)
    })

    const closeMenu = (()=>{
        setStateMenu(false)
    })  
    return {stateMenu,openMenu,closeMenu}
})