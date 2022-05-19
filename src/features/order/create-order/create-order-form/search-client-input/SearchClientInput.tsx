import {Form, Input} from "antd"
import {Client} from "types/Client"
import LoadingBlock from "components/loading-block/LoadingBlock"
import React, {useEffect, useState} from "react"
import {formatPhone} from "utils/formatPhone"
import styles from "./SearchClientInput.module.less"
import {useClients, useIsLoadingClients} from "./clientSlice"
import {useDispatch} from "store"
import {fetchClients} from "./fetchClients"

interface SearchClientInputProps {
    updateSelectClient: (client: Client | null) => void
    selectClient: Client | null
}

const SearchClientInput: React.FC<SearchClientInputProps> = ({updateSelectClient, selectClient}) => {
    const clients = useClients()
    const isLoading = useIsLoadingClients()
    const dispatch = useDispatch()
    let timeout: any
    const [search, setSearch] = useState<string>("")

    const onChangeHandler = (e: any) => {
        if (timeout) clearTimeout(timeout)
        if (selectClient?.phone !== e.target.value) {
            updateSelectClient(null)
            timeout = setTimeout(() => {
                setSearch(e.target.value)
            }, 500)
        }
    }

    const onSelectHandler = (client: Client) => {
        updateSelectClient(client)
    }

    useEffect(() => {
        if (search.trim() !== "") {
            const promise = dispatch(fetchClients(search))
            return () => {
                promise.abort()
            }
        }
    }, [search, dispatch])

    return (
        <div className={styles.searchClientInput}>
            <Form.Item label="Номер телефона" name="phone">
                <Input
                    onChange={onChangeHandler}
                    placeholder="Введите номер телефона"
                    style={{width: "100%"}}
                />
            </Form.Item>
            {!selectClient && (!!clients.length || isLoading) && (
                <div className={styles.dropdownClients}>
                    {isLoading ? (
                        <LoadingBlock />
                    ) : (
                        clients.map(client => (
                            <div
                                className={styles.dropdownClient}
                                key={client.id}
                                onClick={() => onSelectHandler(client)}
                            >
                                <div>#{client.id}</div>
                                <div>{formatPhone(client.phone)}</div>
                                <div>{client.full_name}</div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    )
}
export default SearchClientInput
