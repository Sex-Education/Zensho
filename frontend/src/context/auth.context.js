import { createContext } from "react";

const AuthContext = createContext({
    isAuth: false,
    toggleAuth: () => {},
    username: "",
})

export default AuthContext