
"use client"
import React, { useState } from "react";
import FooterBottom from "./bottom";
import { useClientContext } from "@/app/contexts/clientContext";
import { Requests } from "@/app/api";
import { toast } from "react-toastify";

export default function Footer() {
  const {client} = useClientContext()
  const {routePost} = Requests()
  const [newsletter,setNewsletter] = useState({
    email: '',
    genre: ''
  })

  const changeNewsletter = ((event: any)=>{
    if(event.target.value === 'm' || event.target.value === 'f') {
      setNewsletter({
        ...newsletter,
        'genre': event.target.value,
      })
    }else{
      setNewsletter({
        ...newsletter,
        'email': event.target.value,
      })
    }
  })

  const handlerSubmitForm = (event:React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault()
    if(newsletter.email == "" || newsletter.genre == "") return toast.dark('Por favor preenche todos os campos',{position: "top-right"})
    routePost('/registerNewsletter',{...newsletter})
    .then((response) => {
      if(response.data.message) return toast.dark(response.data.message,{position:'top-right'})
    }).catch((err) => {
      console.log(err);
      toast.info(err.response.data.message,{position:'top-right'})
    });
  }

  return (
    <div className="w-full flex flex-col">
      <div className="flex flex-wrap divide-y w-full divide-dashed space-x-4 max-[1000px]:space-x-0 space-y-2 px-10 py-3 mt-10 bg-gray-100 max-[1000px]:flex-col">
        <div className="flex-auto max-[1000px]:w-full flex-col w-64 space-lt-2 flex-col">
          <span className="flex text-lg font-bold text-[#00a5cf]">
            GANHE 5% DE DESCONTO
          </span>
          <span className="flex text-base font-bold">
            Cadastre em nossa Newsletter e ganhe 5% de desconto na sua primeira
            compra
          </span>
          <span className="flex text-xs font-base">
            <p>
              Desfrute de vantagens exclusivas ao se cadastrar em nossa Newsletter! Ao ingressar na nossa comunidade, você automaticamente garante um desconto especial de 5% em sua primeira compra. Mantenha-se atualizado sobre as últimas tendências, lançamentos e ofertas, enquanto economiza em produtos de alta qualidade. Não perca a oportunidade de iniciar sua jornada de compras com uma economia significativa. Cadastre-se agora e descubra como é fácil e gratificante economizar enquanto recebe as últimas novidades diretamente em sua caixa de entrada!
            </p>
          </span>
        </div>
        <form onSubmit={handlerSubmitForm} className="flex-auto flex flex-nowrap flex-wra w-96 items-center max-[1000px]:w-full">
          <div className="flex space-x-2 space-y-3 max-[1000px]:space-x-0 w-full max-[750px]:flex-col text-blue-950 justify-between">
            <span className="w-96 flex-col max-[750px]:w-full">
              <label htmlFor="email" className="text-base font-bold">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                defaultValue={client.email}
                onChange={(e)=>changeNewsletter(e)}
                className="flex w-full p-2 border-0 outline-[#00a5cf] rounded-lg shadow"
                placeholder="digite seu email para receber as melhores novidades"
              />
            </span>
            <div className="flex flex-col max-[750px]:flex-row max-[750px]:space-x-4 space-y-2 items-center justify-center ">
              <h3>Select genero</h3>
              <span className="flex items-center space-x-2 text-xs justify-center">
                <span className="flex items-center space-x-1">
                  <input type="radio" value={'f'} onChange={(e)=>changeNewsletter(e)} checked={newsletter.genre === 'f'} id="f" />
                  <label htmlFor="f" >Feminina</label>
                </span>
                <span className="flex items-center space-x-1">
                  <input type="radio" id="m" value={'m'} onChange={(e)=>changeNewsletter(e)} checked={newsletter.genre === 'm'}/>
                  <label htmlFor="m">Masculino</label>
                </span>
              </span>
            </div>
            <span className="flex items-center justify-center">
              <button
                type="submit"
                className="rounded-lg shadow bg-[#00a5cf] max-[600px]:w-full p-2 text-base font-base text-white px-4"
              >
                Cadastrar
              </button>
            </span>
          </div>
        </form>
      </div>
      <div className="flex-auto px-10 h-full py-5 bg-gray-50">
        <FooterBottom />
      </div>
    </div>
  );
}
