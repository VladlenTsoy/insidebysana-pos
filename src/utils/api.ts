import {message} from "antd"
import {removeCookie, setCookie} from "./cookie"

export const DOMAIN_API =
    process.env.NODE_ENV === "production" ? "https://insidebysana-api.herokuapp.com/api" : "http://localhost:9000/api"

const TOKEN_NAME = "crm_token_access"

export const updateToken = (token: string | null) => {
    if (token) setCookie(TOKEN_NAME, token, {expires: 30})
    else removeCookie(TOKEN_NAME)
}

export const request = async <T>(
    url: string,
    config: RequestInit = {}
): Promise<T> => {
    return fetch(url, config)
        .then(async (response) => {
            if (!response.ok) throw response
            return response.json()
        })
        .catch(async (e) => {
            const data = await e.json()
            if (e.status === 401)
                await message.error("Ошибка токена!")
            else if (e.status === 422) {
                data.errors.map((error: any) => message.error(error.msg))
            } else {
                message.error(data?.message || e?.message || "Неизвестная ошибка!")
            }
            throw Error(data?.message || e?.message || "Неизвестная ошибка!")
        })
        .then((data) => data as T)
}
