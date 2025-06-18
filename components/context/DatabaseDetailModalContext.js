import { createContext, useContext } from "react"

export const DatabaseDetailModalContext =createContext(null)

export const useDatabaseDetailModalContext = () => {
    const context = useContext(DatabaseDetailModalContext)

    if (!context) {
        throw new Error('useDatabaseDetailModalContext must be used within a DatabaseProvider')
    }

    return context
}
