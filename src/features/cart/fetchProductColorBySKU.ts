import {createAsyncThunk} from "@reduxjs/toolkit"
import {ThunkProps} from "../../store"
import {DOMAIN_API, request} from "utils/api"
import {CartProductItemType} from "./cart"
import {message} from "antd"

type ReturnedType = CartProductItemType | undefined

type AgrsProps = {
    sku: string
}

export const fetchProductColorBySKU = createAsyncThunk<ReturnedType, AgrsProps, ThunkProps>(
    "product-color/sku",
    async ({sku}, {signal, getState}) => {
        if (sku.trim() !== "") {
            const {auth} = getState()
            message.loading({content: `${sku.toUpperCase()} Поиск...`, key: sku})
            const response = await request<ReturnedType>(DOMAIN_API + `/user/cashier/product-color/sku`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + auth.token
                },
                body: JSON.stringify({sku}),
                signal
            })
            // const response = await apiRequest("post", `cashier/product-color/sku`, {data: {sku}, signal})
            message.success({content: "Товар добавлен!", key: sku, duration: 2})
            return response
        }
    },
    {
        condition: ({sku}) => {
            return !!(sku && sku.trim() !== "" && /(PC\d+S\d+)+/g.test(sku))
        }
    }
)
