import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface IAuthSliceState {
    accessToken: string,
    username: string
}


const initialAuthState: IAuthSliceState = {
    accessToken: "",
    username: ""
}


const authSliceActions = () => ({
    setLogin: (state: IAuthSliceState, action: PayloadAction<IAuthSliceState>) => {
        state.accessToken = action.payload.accessToken
        state.username = action.payload.username
    },
    clear: (state: IAuthSliceState) => {
        state = initialAuthState
    }
})

const authSliceSelectors = () => ({
    getAccessToken:(state:IAuthSliceState)=>state.accessToken,
    getUsername:(state:IAuthSliceState)=>state.username,

})

const authSlice = createSlice({
    name: "auth",
    initialState: initialAuthState,
    reducers:authSliceActions(), 
    selectors:authSliceSelectors(),
})


export const AuthActions = authSlice.actions
export const authReducer = authSlice.reducer
export const {getAccessToken,getUsername} = authSlice.selectors