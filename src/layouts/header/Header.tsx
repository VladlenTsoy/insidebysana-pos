import {DollarCircleFilled, SearchOutlined, SkinFilled} from "@ant-design/icons"
import {Dropdown, Input, Menu} from "antd"
import {useGetParamsProduct} from "features/product/productSlice"
import React from "react"
import {Link, useLocation} from "react-router-dom"
import {useDispatch} from "../../store"
import FilterButton from "./FilterButton"
import styles from "./Header.module.less"
import Navigation from "./Navigation"
import logo from "assets/images/logo-2-white.svg"
import {fetchProductColorBySearch} from "../../features/product/fetchProductColorBySearch"

const MenuSidebar: React.FC = () => {
    const {pathname} = useLocation()

    const menu = (
        <Menu
            items={[
                {key: "/", label: <Link to="/">Товары</Link>, className: "account-item", icon: <SkinFilled />},
                {
                    key: "/orders",
                    label: <Link to="/orders">Сделки</Link>,
                    className: "account-item",
                    icon: <DollarCircleFilled />
                }
            ]}
            selectedKeys={[pathname]}
        />
    )

    return (
        <div className={styles.logo}>
            <Dropdown overlay={menu} trigger={["click"]}>
                <div className={styles.logoImg}>
                    <img src={logo} alt="insidebysana" />
                    <span>Меню</span>
                </div>
            </Dropdown>
        </div>
    )
}

const Header: React.FC = () => {
    const dispatch = useDispatch()
    const {categoryId, sizeId} = useGetParamsProduct()

    const onChangeHandler = (value: string) => {
        document.getElementById("grid-products-list")?.scrollIntoView(true)
        dispatch(fetchProductColorBySearch({sizeId, categoryId, search: value, currentPage: 0}))
    }

    return (
        <div className={styles.header}>
            <MenuSidebar />
            <div>
                <FilterButton />
            </div>
            <div className={styles.search}>
                <Input.Search
                    suffix={<SearchOutlined />}
                    size="large"
                    onSearch={onChangeHandler}
                    allowClear
                    enterButton="Поиск"
                    placeholder="Введите SKU или название товара"
                />
            </div>
            <Navigation />
        </div>
    )
}
export default Header
