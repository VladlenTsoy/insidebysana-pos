import {createEntityAdapter, createSlice} from "@reduxjs/toolkit"
import {Client} from "types/Client"
import {fetchClients} from "./fetchClients"
import {useSelector} from "react-redux"
import {StoreState} from "store"

export const clientAdapter = createEntityAdapter<Client>()

export interface StateProps {
    isLoading: boolean
}

const initialState = clientAdapter.getInitialState<StateProps>({
    isLoading: false
})

const clientSlice = createSlice({
    name: "client",
    initialState,
    reducers: {
        clearClients: (state) => {
            clientAdapter.setAll(state, [])
            state.isLoading = false
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchClients.pending, state => {
            state.isLoading = true
        })
        builder.addCase(fetchClients.fulfilled, (state, action) => {
            clientAdapter.setAll(state, action.payload)
            state.isLoading = false
        })
        builder.addCase(fetchClients.rejected, state => {
            state.isLoading = false
        })
    }
})

export const {clearClients} = clientSlice.actions

export const {selectAll} = clientAdapter.getSelectors<StoreState>(state => state.client)

export const useClients = () => useSelector(selectAll)

export const useIsLoadingClients = () => useSelector((state: StoreState) => state.client.isLoading)

export default clientSlice.reducer
