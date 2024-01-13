"use client"
import Link from 'next/link'
import React, { useEffect } from 'react'
import { PaymentSuccessFullServices } from '../services'
import { formatToKwanza } from '@/lib/currency'

export default function page({params}:{params:{order:number}}) {
  const {registerPayment,invoice} = PaymentSuccessFullServices()
  useEffect(()=>{
    (async()=>{
      await registerPayment(params.order)
    })()
  },[])
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-extrabold truncate text-[#00a5cf] mb-4">Pagamento Confirmado</h1>
        <p className="text-lg text-gray-700 mb-6">O seu pagamento foi recebido com sucesso. Agradecemos por escolher a nossa loja!</p>
        <div className="border-t border-b border-gray-300 py-4 mb-6">
          <p className="font-semibold text-gray-800 mb-2">Detalhes da Transação:</p>
          <ul className="list-disc pl-6">
            <li><strong>Número do Pedido:</strong> {invoice?.orderNumber}</li>
            <li><strong>Data da Encomenda:</strong> {invoice?.DateOrder}</li>
            <li><strong>Data de pagamento:</strong> {invoice?.DateDue}</li>
            <li><strong>Valor Pago:</strong> {formatToKwanza(invoice?.TotalInvoice,'USD')} </li>
          </ul>
        </div>
        <p className="text-lg text-gray-700 mb-6">Seu pedido será processado e enviado em breve. Caso tenha alguma dúvida, entre em contato conosco. +1 9735249725</p>
        <p className="text-lg text-gray-700 mb-6">Obrigado por fazer negócios conosco!</p>
        <div className="text-right">
          <Link href="/" className="text-blue-500 hover:underline">Voltar à Página Inicial</Link>
        </div>
      </div>
    </div>
  )
}
