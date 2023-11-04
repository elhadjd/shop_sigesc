"use client"
import {useStateProgressContext} from './contexts/progress'
export default function loading() {
  const {progress} = useStateProgressContext()
  return  progress
}
