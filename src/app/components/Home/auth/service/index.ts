"|use client"
import { Requests } from "@/app/Api";
import { useStateProgressContext } from "@/app/contexts/progress";
import { Login, Register } from "@/app/types/auth";
import { ClientTypeScript } from "@/app/types/client";
import { getCookie, hasCookie, setCookie } from "cookies-next";
import { redirect } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export const Auth = (()=>{
    const {routePost} = Requests()
    const [object,setObject] = useState<Login | Register>()
    const {setState} = useStateProgressContext()
    const [registerFormData,setRegisterFormData] = useState<Register>({
        name: '',
        email: '',
        token: '',
    })
    const [loginFormData,setLoginFormData] = useState<Login>({
        email: '',
        password: ''
    })

    const handlerChangeInputsRegister = ((event: {target: {id: string,value: string}})=>{
        registerFormData[event.target.id] = event.target.value
        setRegisterFormData({...registerFormData})        
    })
    const handlerChangeInputsLogin = ((event: {target: {id: string,value: string}})=>{
        loginFormData[event.target.id] = event.target.value
        setLoginFormData({...loginFormData})      
    })

    const RegisterService = ((event: React.FormEvent<HTMLFormElement>)=>{
        setState('registerUser')
        routePost('/registerUser',registerFormData)
        .then((response) => {
            toast[response.data.type](response.data.message,{position: 'top-right'})
        }).catch((err) => {
            console.log(err);
        }).finally(()=>{
            setState('')
        });
    })

    const isFormValidRegister  = ((): boolean=>{
        for(let key in object){
            if (object.hasOwnProperty(key) && object[key] === ''){
                return false
            }
        }
        return true
    })

    const LoginService = ((event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault()
        setObject({...loginFormData})
        if (!isFormValidRegister()) return toast.warn('Todos os campos são obligatórios',{position: 'top-right'})
        setState('login')
        routePost('/login',loginFormData)
        .then((response) => {
            if(response.data.message) return toast[response.data.type](response.data.message,{position: 'top-right'})
            saveCookie(response.data)
            return redirect('/')
        }).catch((err) => {
            console.log(err);
        }).finally(()=>{
            setState('')
        });
    })

    const saveCookie = ((client: ClientTypeScript)=>{
        if (hasCookie('client')) {
            const clientStore:ClientTypeScript = JSON.parse(getCookie('client') || JSON.stringify(client))
            if (clientStore.id == 0) {
                client.invoices = clientStore.invoices
                setCookie('client',client,{maxAge: 60*60*480})
                return redirect('/')
            }
        }
        setCookie('client',client,{maxAge: 60*60*480})
    })

    return {RegisterService,LoginService,setRegisterFormData,handlerChangeInputsRegister,handlerChangeInputsLogin}
})