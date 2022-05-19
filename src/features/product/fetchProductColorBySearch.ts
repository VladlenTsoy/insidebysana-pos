import {createAsyncThunk} from "@reduxjs/toolkit"
import {ThunkProps} from "../../store"
import {DOMAIN_API, request} from "utils/api"
import {ProductCardType} from "features/product/product"

type ReturnedType = {
    total: number
    results: ProductCardType[]
}

type AgrsProps = {
    search?: string
    categoryId?: number
    sizeId?: number
    currentPage?: number
}

export const fetchProductColorBySearch = createAsyncThunk<ReturnedType, AgrsProps, ThunkProps>(
    "product-color/fetch",
    async ({search = "", categoryId = 0, sizeId = 0, currentPage = 0}, {signal, getState}) => {
        const {product, auth} = getState()
        const {pagination: {limit}} = product

        return request<ReturnedType>(DOMAIN_API + "/user/cashier/search-products", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + auth.token
            },
            body: JSON.stringify({search, categoryId, sizeId, currentPage, limit}),
            signal
        })
    },
    {
        condition: (_, {getState}) => {
            const {product} = getState()
            return (
                !product.loading &&
                (product.pagination.total === 0 || product.pagination.total > product.ids.length)
            )
        },
        dispatchConditionRejection: true
    }
)
