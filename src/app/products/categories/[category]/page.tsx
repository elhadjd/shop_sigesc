import Category from '@/app/components/Home/Hero/categories/category'
import React from 'react'

export default function _category({params}:{params:{category: number}}) {
  return <Category categoryId={params.category}/>
}
