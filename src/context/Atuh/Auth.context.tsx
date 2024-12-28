import { createContext, FC, ReactElement, ReactNode, useContext, useEffect, useReducer } from "react";

import { EventEmitter } from 'events';

export const eventEmitter = new EventEmitter();

// username,
// accessToken,
interface IAuthProviderProps {
    children: ReactNode
}

interface IAuthContextValue {
    username: string,
    accessToken: string,
}

interface IAuthContextProvider{
    auth:IAuthContextValue,
    set:(username:string,accessToken:string)=>void,
    clear:()=>void
}
const initialValue:IAuthContextValue = { username: '', accessToken: '' }

const AuthContext = createContext<IAuthContextProvider>({auth:initialValue,set:()=>{},clear:()=>{}})

const reducer = (state: IAuthContextValue, action: { type: string, value?: IAuthContextValue }):IAuthContextValue => {
    switch (action.type) {
        case 'set': {
            return {
                username: action.value?.username ||"",
                accessToken: action.value?.accessToken ||""
            }
        }
        case 'clear': {
            return initialValue
        }
        default:
            return initialValue
    }
}

export const AuthProvider: FC<IAuthProviderProps> = ({ children }): ReactElement => {
    const [auth, authDispatch] = useReducer(reducer, initialValue)

    const handleSet = (username:string,accessToken:string)=>{
        console.log("context", username,accessToken)
        authDispatch({
            type:"set",
            value:{
                username,
                accessToken
            }
        })}

    const handleClear= ()=>{
        authDispatch({type:"clear"})
    }

    const contextValue = {
        auth,
        set:handleSet,
        clear:handleClear
    }
    useEffect(() => {
        eventEmitter.emit('aut', auth);
    }, [auth]);

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}


export const getAuth=()=>{
    return useContext(AuthContext)
}