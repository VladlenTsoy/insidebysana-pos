import {createAsyncThunk} from "@reduxjs/toolkit"
import {DOMAIN_API, request} from "utils/api"
import {ThunkProps} from "../store"
import {User} from "types/User"
import {getCookie} from "utils/cookie"

interface AuthUserResponseType {
    token: string
}

interface AuthUserParamProps {
    email: string
    password: string
}

// Авторизация пользователя
export const authUser = createAsyncThunk<AuthUserResponseType, AuthUserParamProps, ThunkProps>(
    "user/auth",
    async (data, {signal}) => {
        return request<AuthUserResponseType>(DOMAIN_API + "/login", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
            signal
        })
    }
)

// Вывод пользователя
export const fetchUser = createAsyncThunk<User, undefined, ThunkProps>(
    "user/fetch",
    async (_, {signal, getState}) => {
        const {auth} = getState()
        return request<User>(DOMAIN_API + "/user", {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + auth.token
            },
            signal
        })
    },
    {
        condition(_) {
            if (!getCookie("crm_token_access")) return false
        },
        dispatchConditionRejection: true
    }
)

interface LogoutAuthResponseType {
    status: "success"
}

// Завершения сеанса
export const logoutUser = createAsyncThunk<LogoutAuthResponseType, undefined, ThunkProps>(
    "user/logout",
    async (_, {signal, getState}) => {
        const {auth} = getState()
        return request<LogoutAuthResponseType>(DOMAIN_API + "/user/logout", {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + auth.token
            },
            signal
        })
    }
)
