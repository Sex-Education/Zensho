import { createContext } from "react";

const AuthContext = createContext({
    isAuth: false,
    toggleAuth: () => {},
    username: "",
    setUser: () => {},
    avatarUrl: "",
    setAvatarUrl: () => {}
})

export default AuthContext