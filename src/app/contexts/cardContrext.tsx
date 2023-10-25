"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { TypeInvoice } from '../types';
import { ClientTypeScript } from '../types/client';
import { getCookie } from 'cookies-next';

const GlobalCardRequest = createContext<{
  stateShow: boolean,
  setStateShow: React.Dispatch<boolean>,
  client: ClientTypeScript,
  setClient: React.Dispatch<React.SetStateAction<ClientTypeScript>>
  ListOrder: TypeInvoice;
  setListOrder: React.Dispatch<React.SetStateAction<TypeInvoice>>;
} | undefined>(undefined);

export const useRequestCardContext = () => {
  const context = useContext(GlobalCardRequest);
  if (!context) {
    throw new Error('useRequestCardContext deve ser usado dentro de um RequestCardProvider');
  }
  return context;
};

interface RequestCardProviderProps {
  children: ReactNode;
}

export const RequestCardProvider: React.FC<RequestCardProviderProps> = ({ children }) => {
  const [ListOrder, setListOrder] = useState<TypeInvoice>({
    cliente_id: 0,
    company_id:0,
    DateDue:'',
    DateOrder:'',
    discount:0,
    id:0,
    invoice_items:[],
    orderNumber:'',
    RestPayable:0,
    state:'',
    tax:0,
    TotalInvoice:0,
    TotalMerchandise:0,
    user_id:0
  });
  const clientStore:ClientTypeScript = JSON.parse(getCookie('client')|| JSON.stringify({
    city: '',
    company_id: 0,
    country: '',
    email: '',
    id: 0,
    image: '',
    invoices: ListOrder,
    name: '',
    password: '',
    phone: '',
    rua: '',
    state: '',
    surname: '',
    whatssap: ''
  }))
  const [client,setClient] = useState<ClientTypeScript>({...clientStore})
  const [stateShow, setStateShow] = useState<boolean>(false)
  return (
    <GlobalCardRequest.Provider value={{ ListOrder, setListOrder,stateShow,setStateShow,client,setClient }}>
      {children}
    </GlobalCardRequest.Provider>
  );
};
