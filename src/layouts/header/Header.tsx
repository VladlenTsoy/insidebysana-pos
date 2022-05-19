import {SearchOutlined, SkinFilled, DollarCircleFilled} from "@ant-design/icons"
import {Input, Dropdown, Menu} from "antd"
import {changeSearch} from "features/product/productSlice"
import React from "react"
import {Link, useLocation} from "react-router-dom"
import {useDispatch} from "../../store"
import FilterButton from "./FilterButton"
import styles from "./Header.module.less"
import Navigation from "./Navigation"
import logo from "assets/images/logo-2-white.svg"

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
    let timeout: any

    const onChangeHandler = (e: any) => {
        if (timeout) clearTimeout(timeout)
        timeout = setTimeout(() => {
            dispatch(changeSearch(e.target.value))
        }, 500)
    }

    return (
        <div className={styles.header}>
            <MenuSidebar />
            <div>
                <FilterButton />
            </div>
            <div className={styles.search}>
                <Input
                    suffix={<SearchOutlined />}
                    size="large"
                    onChange={onChangeHandler}
                    allowClear
                    placeholder="Введите SKU или название товара"
                />
            </div>
            <Navigation />
        </div>
    )
}
export default Header
