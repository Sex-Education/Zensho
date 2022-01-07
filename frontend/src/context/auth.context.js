import { createContext } from "react";

const AuthContext = createContext({
    isAuth: false,
    toggleAuth: () => {},
    username: "",
    setUser: () => {}
})

export default AuthContext