import { createContext, useContext, useState } from "react"

import useLocalStorage from "../hooks/useLocalStorage"
import { monthsAndYears } from "../utils/Date"
import { useFecth } from "../hooks/useFetch"
import { IData } from "../types";

interface DataContextType {
  data: IData | null;
  loading: boolean;
  error: string | null;
  month: string;
  setMonth: React.Dispatch<React.SetStateAction<string>>;
  year: string;
  setYear: React.Dispatch<React.SetStateAction<string>>;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

const DataContext = createContext<DataContextType | null>(null)

export const useData = () => {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error("useData deve estar em DataContextProvider!")
  }

  return context
}

export const DataContextProvider = ({ children }:  React.PropsWithChildren) => {
  const [username] = useLocalStorage("username", "")

  const { currentYear, currentMonth } = monthsAndYears()
  const [month, setMonth] = useState(currentMonth)
  const [year, setYear] = useState(currentYear)

  const { data, loading, error, setUpdate } = useFecth<DataContextType>(
    `${process.env.VITE_DEFAULT_URL}/bill?username=${username}&date=${month+year}`
  )

  return <DataContext.Provider 
    value={{ 
      data, 
      loading, 
      error, 
      month, 
      year, 
      setMonth, 
      setYear,
      setUpdate
    }}
  >
    {children}
  </DataContext.Provider>
}
