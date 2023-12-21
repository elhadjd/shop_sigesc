"use client"
import { createContext, useContext, useState, ReactNode } from 'react';
import { LuRefreshCcw } from 'react-icons/lu';

const stateProgress = createContext<{
    state: string,
    setState: React.Dispatch<string>
    progress: ReactNode,
    colorIcon: string,
    setColorIcon: React.Dispatch<string>
} | undefined>(undefined)

export const useStateProgressContext = ()=>{
    const context = useContext(stateProgress)
    if(!context){
        throw Error('useStateProgressContext deve ser usado dentro de StateProgressProvider')
    }
    return context
}

interface stateProgressProps {
    children: ReactNode;
}  

export const StateProgressProvider:React.FC<stateProgressProps> = (({children})=>{
    const [state,setState] = useState<string>('')
    const [colorIcon,setColorIcon] = useState<string>('[#00a5cf]')
    const progress = <LuRefreshCcw className={`progress font-bold ${colorIcon}`}/>
    return (
        <stateProgress.Provider value={{state,setState,progress,colorIcon,setColorIcon}}>
            {children}
        </stateProgress.Provider>
    )
})