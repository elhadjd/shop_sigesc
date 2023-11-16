import { useClientContext } from '@/app/contexts/clientContext';
import React, { useEffect } from 'react'
import { CartServices } from '../Home/Cart/services';
import { UserButton, useUser } from '@clerk/nextjs';

export default function ClientUser() {
    const {client,setClient} = useClientContext()
    const {getClientActive} = CartServices()
    const { isSignedIn, user, isLoaded } = useUser();
    if (!isLoaded) {
        return null;
    }

    useEffect(()=>{
        (async()=>{
            if (isSignedIn) {
            const token = localStorage.getItem('clerk-db-jwt') || null
            client.name = user.fullName
            client.email = user.emailAddresses[0].emailAddress
            client.surname = user.firstName
            client.token = token
            client.user_id_clerk = user.id
            client.image = user.imageUrl
            setClient({...client})
            await getClientActive(client)
            }
        })()
    },[user])
  return (<UserButton />)
}
