import { AxiosResponse } from "axios"
import { HTTP, HTTPPrivate } from "../services/http.service"



export interface ILoginApiParams {
    username: string
    password: string
}

interface ILoginApiResponse {
    message: string
    accessToken: string
    username: string
}


export const loginApi = async (data: ILoginApiParams): Promise<AxiosResponse<ILoginApiResponse>> => {
    return HTTP.post('/auth/login', data)
}

interface IWhoAmIApiResponse {
    username: string
    id: number
}

export const whoAmIApi = async (): Promise<AxiosResponse<IWhoAmIApiResponse>> =>
     { return HTTPPrivate.get('/auth/whoami') }