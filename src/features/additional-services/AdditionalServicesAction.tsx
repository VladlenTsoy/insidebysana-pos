import {PlusOutlined} from "@ant-design/icons"
import {Button, Dropdown, Menu} from "antd"
import React from "react"
import {addAdditionalService} from "features/cart/cartSlice"
import {useDispatch} from "store"
import {formatPrice} from "utils/formatPrice"
import {useGetAdditionalServicesQuery} from "./additionalServiceApi"
import styles from "./AdditionalServicesAction.module.less"

const AdditionalServicesAction: React.FC = () => {
    const {data: additionalServices, isLoading} = useGetAdditionalServicesQuery()
    const dispatch = useDispatch()

    if (!(additionalServices && additionalServices.length)) return <></>

    // Добавление доп. услуги
    const clickHandler = (e: any) => {
        const selectAdditionalService = additionalServices.find(add => add.id === Number(e.key))
        selectAdditionalService && dispatch(addAdditionalService(selectAdditionalService))
    }

    const menu = (
        <Menu
            onClick={clickHandler}
            items={
                additionalServices.map(additionalService => (
                    {
                        key: additionalService.id,
                        label: <>
                            <span>{additionalService.title}</span>
                            <span className={styles.price}>{formatPrice(additionalService.price)} сум</span>
                        </>,
                        className: styles.additionalServiceItem
                    }
                ))
            }
        />
    )

    return (
        <>
            <div className={styles.additionalServicesAction}>
                <Dropdown overlay={menu} placement="top" arrow trigger={["click"]}>
                    <Button icon={<PlusOutlined />} size="large" block loading={isLoading}>
                        Добавить услугу
                    </Button>
                </Dropdown>
            </div>
        </>
    )
}
export default React.memo(AdditionalServicesAction)
