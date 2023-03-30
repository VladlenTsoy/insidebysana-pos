import {createEntityAdapter, createSlice, PayloadAction} from "@reduxjs/toolkit"
import {StoreState} from "../../store"
import {useSelector} from "react-redux"
import {ProductCardType} from "./product"
import {fetchProductColorBySearch} from "./fetchProductColorBySearch"

export const productAdapter = createEntityAdapter<ProductCardType>()

export interface StateProps {
    loading: boolean
    categoryId: number
    sizeId: number
    search?: string
    isScroll?: boolean,
    pagination: {
        currentPage: number
        limit: number
        total: number
    }
}

const initialState = productAdapter.getInitialState<StateProps>({
    loading: false,
    isScroll: false,
    categoryId: 0,
    sizeId: 0,
    pagination: {currentPage: 0, limit: 18, total: 0},
    search: undefined
})

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        // Изменить категорию для, фильтрации
        changeCategoryId: (state, action: PayloadAction<StateProps["categoryId"]>) => {
            state.categoryId = action.payload
            state.pagination = initialState.pagination
            productAdapter.removeAll(state)
        },
        // Изменить размер для фильтрации
        changeSizeId: (state, action: PayloadAction<StateProps["sizeId"]>) => {
            state.sizeId = action.payload
            state.pagination = initialState.pagination
            productAdapter.removeAll(state)
        },
        // Сбросить фильтрацию категорию и размер
        resetCategoryIdAndSizeId: (
            state,
            action: PayloadAction<{categoryId: StateProps["categoryId"]; sizeId: StateProps["sizeId"]}>
        ) => {
            if (state.categoryId !== 0 || state.sizeId !== 0) {
                state.categoryId = action.payload.categoryId
                state.sizeId = action.payload.sizeId
                state.pagination = initialState.pagination
                productAdapter.removeAll(state)
            }
        },
        // Изменения пагинации
        changeCurrentPage: (state, action: PayloadAction<StateProps["pagination"]["currentPage"]>) => {
            state.pagination.currentPage = action.payload
        },
        // Изменения поиска
        changeSearch: (state, action: PayloadAction<StateProps["search"]>) => {
            state.search = action.payload
            state.pagination = initialState.pagination
        }

    },
    extraReducers: builder => {
        // Загрузка продуктов
        builder.addCase(fetchProductColorBySearch.pending, (state, action) => {
            state.isScroll = action.meta.arg?.isScroll || false
            state.search = action.meta.arg?.search || ""
            state.loading = true
        })
        builder.addCase(fetchProductColorBySearch.fulfilled, (state, action) => {
            const {currentPage = 0} = action.meta.arg
            if (currentPage === 0) productAdapter.removeAll(state)
            productAdapter.addMany(state, action.payload.results)
            state.pagination.currentPage = currentPage + 1
            state.pagination.total = action.payload.total
            state.loading = false
        })
        builder.addCase(fetchProductColorBySearch.rejected, state => {
            state.loading = false
        })
    }
})

export const {
    changeCategoryId,
    changeSizeId,
    resetCategoryIdAndSizeId,
} = productSlice.actions

export const {selectAll} = productAdapter.getSelectors<StoreState>(state => state.product)

export default productSlice.reducer

// Вывод Категории для фильтрации
export const useCategoryIdPos = () => useSelector((state: StoreState) => state.product.categoryId)

// Вывод размера для фильтрации
export const useSizeIdPos = () => useSelector((state: StoreState) => state.product.sizeId)

// Вывод продукта
export const useProductColors = () => useSelector(selectAll)

// Вывод параметров для продуктов
export const useGetParamsProduct = () => useSelector((state: StoreState) => state.product)
