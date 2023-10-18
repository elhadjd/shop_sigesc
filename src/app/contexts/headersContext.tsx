import React, { ReactNode, createContext, useContext } from "react";

const globalHeaders = createContext<{
    header: ReactNode,
    setHeader: React.Dispatch<ReactNode>
}|undefined>(undefined)

export const useHeadersContext = (()=>{
    const context = useContext(globalHeaders)
    
})