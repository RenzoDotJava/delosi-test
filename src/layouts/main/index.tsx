'use client'
import React from 'react'
import MatrixProvider from '@/context/MatrixContext'

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <MatrixProvider>
      {children}
    </MatrixProvider>
  )
}

export default MainLayout