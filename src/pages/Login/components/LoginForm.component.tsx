import { FC, ReactElement } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { ILoginApiParams, loginApi } from "../../../api/auth.api";
import { Link, useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../hook/redux.hook";
import { AuthActions } from "../../../redux/slices/Auth.slice";


interface ILoginFormData {
    username: string
    password: string
}

export const LoginForm: FC = (): ReactElement => {
 

    const appDispatch = useAppDispatch()
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ILoginFormData>()

    const loginMutation = useMutation({
        mutationKey: 'loginApi',
        mutationFn: (data: ILoginApiParams) => loginApi(data),
        onSuccess: ({ data }) => {
            appDispatch(AuthActions.setLogin({ username: data.username, accessToken: data.accessToken }))
            navigate('/home')
        }
    })

    return <form onSubmit={handleSubmit(data => loginMutation.mutate(data))} className="border rounded p-4 text-left flex flex-col gap-4">
        <p className="text-center font-bold">Login Form</p>
        <div className="flex flex-col gap-1 w-full">
            <label htmlFor="username">Username</label>
            <input id="username" {...register("username",
                {
                    required: {
                        value: true,
                        message: "Username must be Enter."
                    },
                    minLength: {
                        value: 3,
                        message: "username must have at least 3 char"
                    }
                })}
                className="py-2 px-4 rounded" type="text" />
            <p className="text-red-300">{errors.username?.message}</p>
        </div>
        <div className="flex flex-col gap-1 w-full">
            <label htmlFor="password">password</label>
            <input id="password" {...register("password",
                {
                    required: {
                        value: true,
                        message: "password must be Enter."
                    },
                    minLength: {
                        value: 8,
                        message: "password must have at least 8 char"
                    },
                    maxLength: {
                        value: 16,
                        message: "password must have maximum 16 char"
                    },
                    pattern: {
                        value: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$])/,
                        message: "Minimum eight characters, at least one letter and one number"
                    }
                }
            )} className="py-2 px-4 rounded" type="password" />
            <p className="text-red-300">{errors.password?.message}</p>
        </div>
        <button className="bg-cyan-300 w-full py-2 px-4 rounded" type="submit">Log In</button>
        <Link to="/dashboard/users"> users page</Link>

    </form>
}