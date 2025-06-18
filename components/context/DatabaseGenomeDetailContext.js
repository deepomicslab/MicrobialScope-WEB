import { createContext, useContext } from "react"

export const DatabaseGenomeDetailContext = createContext(null)

export const useDatabaseGenomeDetailContext = () => {
    const context = useContext(DatabaseGenomeDetailContext)

    if (!context) {
        throw new Error('useDatabaseGenomeDetailContext must be used within a DatabaseProvider')
    }

    return context
}
