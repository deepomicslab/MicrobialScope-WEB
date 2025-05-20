import { createContext, useContext, useState } from "react"

export const DatabaseContext = createContext(null)

export const useDatabaseContext = () => {
    const context = useContext(DatabaseContext)

    if (!context) {
        throw new Error('useDatabaseContext must be used within a DatabaseProvider')
    }

    return context
}
