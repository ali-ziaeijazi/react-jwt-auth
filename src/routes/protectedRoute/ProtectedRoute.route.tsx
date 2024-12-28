import { FC, ReactElement } from "react";
import { useQuery } from "react-query";
import { Navigate, Outlet } from "react-router";
import { whoAmIApi } from "../../api/auth.api";
import { getAccessToken } from "../../redux/slices/Auth.slice";
import { useAppSelector } from "../../hook/redux.hook";





export const ProtectedRoute: FC = (): ReactElement => {


    const { isSuccess, isLoading } = useQuery({
        queryKey: "whoAmI",
        queryFn: () => whoAmIApi(),
    })
    // const accessTokon = useAppSelector(getAccessToken)
    // return accessTokon!=="" ?<Outlet/>:<Navigate to={"/login"}/>


    return isLoading ? <div>loading ...</div> : (isSuccess ? <Outlet /> : <Navigate to={"/login"} />)


}