import { createContext } from 'react'
type AppContextType = {
  session: object,
  setSession: () => void
}
const AppContextDefaultValues : AppContextType = {
  session: {},
  setSession: () => {}
}
const AppContext = createContext<AppContextType>(AppContextDefaultValues)
export default AppContext