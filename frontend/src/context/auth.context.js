import { createContext } from "react";

const AuthContext = createContext({
    isAuth: false,
    toggleAuth: () => {},
    userId: 0,
})

export default AuthContext