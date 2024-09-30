'use client';
import React, { ReactNode } from 'react';
import {
     QueryClient,
    QueryClientProvider,
  } from '@tanstack/react-query'

export default function Provider({children}: {children: ReactNode}) {
    const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
       {children}
    </QueryClientProvider>
  )
}
