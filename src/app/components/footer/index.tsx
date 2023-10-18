import React from "react";
import FooterBottom from "./bottom";

export default function Footer() {
  return (
    <div className="w-full flex flex-col">
      <div className="flex flex-wrap divide-y w-full divide-dashed space-x-4 max-[1000px]:space-x-0 space-y-2 px-10 py-3 mt-10 bg-gray-100 max-[1000px]:flex-col">
        <div className="flex-auto max-[1000px]:w-full flex-col w-64 space-lt-2 flex-col">
          <span className="flex text-lg font-bold text-red-700">
            GANHE 10% DE DESCONTO
          </span>
          <span className="flex text-base font-bold">
            Cadastre em nossa Newsletter e ganhe 10% de desconto na sua primeira
            compra
          </span>
          <span className="flex text-xs font-base">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
              dolores asperiores est eius adipisci aspernatur distinctio
              consequuntur non ullam quas corporis facilis praesentium cum,
              veniam illo vitae natus error eaque.
            </p>
          </span>
        </div>
        <form className="flex-auto flex flex-nowrap flex-wra w-96 items-center max-[1000px]:w-full">
          <div className="flex space-x-2 space-y-3 max-[1000px]:space-x-0 w-full max-[750px]:flex-col text-blue-950 justify-between">
            <span className="w-96 flex-col max-[750px]:w-full">
              <label htmlFor="email" className="text-base font-bold">
                E-mail
              </label>
              <input
                type="email"
                className="flex w-full p-2 border-0 outline-red-700 rounded-lg shadow"
                placeholder="digite seu email para receber as melhores novidades"
              />
            </span>
            <div className="flex flex-col max-[750px]:flex-row max-[750px]:space-x-4 space-y-2 items-center justify-center ">
              <h3>Select genero</h3>
              <span className="flex items-center space-x-2 text-xs justify-center">
                <span className="flex items-center space-x-1">
                  <input type="radio" id="femia" />
                  <label htmlFor="femia">Feminina</label>
                </span>
                <span className="flex items-center space-x-1">
                  <input type="radio" id="mal" />
                  <label htmlFor="mal">Masculino</label>
                </span>
              </span>
            </div>
            <span className="flex items-center justify-center">
              <button
                type="submit"
                className="rounded-lg shadow bg-red-700 max-[600px]:w-full p-2 text-base font-base text-white px-4"
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
