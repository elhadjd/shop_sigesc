"use client"
import _Product from "@/app/components/Home/products/[id]/product";
export default function Page({params}: {params: {id: number}}) {
  return (
    <_Product productId={params.id} />
  )
}