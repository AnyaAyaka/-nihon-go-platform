'use client'
import { useEffect } from 'react'

export default function AccessCheck({ level, mockNum }) {
  useEffect(() => {
    console.log('AccessCheck loaded', level, mockNum)
  }, [level, mockNum])
  return null
}
