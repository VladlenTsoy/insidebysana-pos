import {createAsyncThunk} from "@reduxjs/toolkit"
import {ThunkProps} from "store"
import {Client} from "types/Client"
import {DOMAIN_API, request} from "utils/api"

type ReturnedType = Client[]

type AgrsProps = string

export const fetchClients = createAsyncThunk<ReturnedType, AgrsProps, ThunkProps>(
    "client/fetch",
    async (search, {signal, getState}) => {
        const {auth} = getState()

        return request<ReturnedType>(DOMAIN_API + "/user/cashier/clients", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + auth.token
            },
            body: JSON.stringify({search}),
            signal
        })
    }
)
