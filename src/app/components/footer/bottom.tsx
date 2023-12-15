"use client"
import React from "react";
import Link from "next/link";
import { ImFacebook } from "react-icons/im";
import { FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import { footerLinks } from "@/app/links";
import { useProductsContext } from "@/app/contexts/productsContext";

export default function FooterBottom() {
  const {categories} = useProductsContext()

  const sociasMedias = [
    {
      icon: <ImFacebook />,
      href: "#",
    },
    {
      icon: <FaLinkedinIn />,
      href: "#",
    },
    {
      icon: <FaYoutube />,
      href: "#",
    },
    {
      icon: <FiInstagram />,
      href: "#",
    },
  ];

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex h-full max-[800px]:flex-col">
        <div className="flex-auto w-64 h-full">
          <span className="flex text-lg font-sm uppercase">Categorias</span>
          <div className="flex space-y-1 flex-col">
            {categories.map((category, index) => (
              <Link href={`/products/categories/${category.id}`} key={index} className="text-sm py-1 font-base">
                {category.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex-auto w-64 h-full">
          <span className="flex text-lg font-sm uppercase">INSTITUCIONAL</span>
          <div className="flex space-y-1 flex-col">
            {footerLinks.map((footer, idx) => (
              <Link
                key={idx}
                href={footer.href}
                className="text-sm py-1 font-base"
              >
                {footer.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex-auto w-64 h-full">
          <span className="flex text-lg font-sm uppercase">AJUDA</span>
          <div className="flex space-y-1 flex-col">
            <Link href={"#"} className="text-sm py-1 font-base">
              Ajudas frequentes
            </Link>
          </div>
        </div>
        <div className="flex-auto w-64 h-full space-y-4">
          <span className="flex text-lg font-sm uppercase">REDES SOCIAIS</span>
          <div className="flex flex-wrap text-xl items-center justify-center">
            {sociasMedias.map((media, idx) => (
              <Link key={idx} className="flex-auto" href={media.href}>
                {media.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
}
