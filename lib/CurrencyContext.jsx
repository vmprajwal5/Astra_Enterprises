'use client'
import { createContext, useContext, useState } from 'react'

const CurrencyContext = createContext({})

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState('GBP')

  const currencies = ['GBP', 'USD', 'INR']

  const symbols = { GBP: '£', USD: '$', INR: '₹' }

  const convert = (gbpPrice) => {
    const rates = { GBP: 1, USD: 1.27, INR: 105 }
    const amount = Math.round(gbpPrice * rates[currency])
    return `${symbols[currency]}${amount.toLocaleString()}`
  }

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, currencies, symbols, convert }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export const useCurrency = () => useContext(CurrencyContext)
