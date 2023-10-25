"use client"
import { Login } from "@/app/components/Home/auth/login";
import Register from "@/app/components/Home/auth/register";
import { useRequestCardContext } from "@/app/contexts/cardContrext";
import { ClientTypeScript } from "@/app/types/client";
import { getCookie, hasCookie } from "cookies-next";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Auth({ params }: { params: { verify: string } }) {
    const {client} = useRequestCardContext()
    useEffect(()=>{
        if (hasCookie('client')) {
            const clientStore:ClientTypeScript = JSON.parse(getCookie('client') || JSON.stringify(client))
            if (clientStore.id != 0) {
                return redirect('/')
            }
        }
    },[])
    return (
        <>
            {
                params.verify == 'login' ? (<Login/>):(<Register/>)
            }
        </>
    )
}