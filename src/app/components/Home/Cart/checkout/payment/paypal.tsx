"use client"
import { useEffect, useState } from 'react';
import { useClientContext } from '@/app/contexts/clientContext';
declare global {
    interface Window {
      paypal: any;
    }
}
export default function PayPal() {
    const [loaded,setLoaded] = useState<boolean>(false)
    const [paid,setPaid] = useState<boolean>(false)
    const {client} = useClientContext()
    useEffect(()=>{
        const id = 'ATht4B6eiCPEp4ptAOiP9JomI_40q97GWyoykjcHRDJTAtRJdqq0Oo-A9k1EQEk-DNjrmbctA0pvAtXN';
        const script = document.createElement('script');
        script.src = `https://www.paypal.com/sdk/js?client-id=${id}`;
        script.addEventListener('load', () => setLoaded(true));
        document.body.appendChild(script);
        return () => {
        const paypalButtonContainer = document.getElementById('paypal-button-container');
        if (paypalButtonContainer) {
            paypalButtonContainer.innerHTML = '';
        }
        }
  },[])

  

  useEffect(() => {
    const paypalButtonContainer = document.getElementById('paypal-button-container');
    if (paypalButtonContainer) {
      paypalButtonContainer.innerHTML = '';
    }
    
    if (loaded && !paid) {
      function loadButtonAndLogicAboutPayment() {
        setTimeout(() => {
          window.paypal
            .Buttons({
              createOrder: (data: any, actions: { order: { create: (arg0: { purchase_units: { description: string; amount: { currency_code: string; value: number; }; }[]; }) => any; }; }) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      description: client.name,
                      amount: {
                        currency_code: 'USD',
                        value: client.invoices[0].TotalInvoice,
                      },
                    },
                  ],
                });
              },
              onApprove: async (_: any, actions: { order: { capture: () => any; }; }) => {
                const order = await actions.order.capture();
                setPaid(true);
                console.log(order);
              },
            })
            .render('#paypal-button-container');
        });
      }
      loadButtonAndLogicAboutPayment();
    }
  }, [loaded, paid,client]);

  return (
    <div>
      <div id='paypal-button-container'></div>
    </div>
  )
}
