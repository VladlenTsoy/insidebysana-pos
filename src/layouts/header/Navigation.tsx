import {
    BellFilled,
    CaretDownFilled,
    FullscreenOutlined,
    FullscreenExitOutlined,
    PoweroffOutlined,
    QuestionCircleOutlined
} from "@ant-design/icons"
import {Button, Menu, Dropdown, Modal} from "antd"
import React, {useCallback, useState} from "react"
import styles from "./Navigation.module.less"
import {logoutUser} from "auth/authApi"
import {useDispatch} from "../../store"

const {confirm} = Modal

const Navigation: React.FC = () => {
    const [fullScreen, setFullScreen] = useState(false)
    const dispatch = useDispatch()

    // Выход
    const logout = useCallback(() => {
        confirm({
            zIndex: 1002,
            title: "Вы действительно хотите выйти?",
            icon: <QuestionCircleOutlined />,
            onOk: async () => {
                dispatch(logoutUser())
            }
        })
    }, [dispatch])

    const requestFullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen()
            setFullScreen(true)
        } else if (document.exitFullscreen) {
            document.exitFullscreen()
            setFullScreen(false)
        }
    }

    const menu = (
        <Menu items={[
            {
                key: "/logout",
                className: "account-item",
                icon: <PoweroffOutlined />,
                onClick: logout,
                label: "Выйти",
                danger: true
            }
        ]} />
    )

    return (
        <div className={styles.navigation}>
            <Button
                icon={
                    !fullScreen ? (
                        <FullscreenOutlined />
                    ) : (
                        <FullscreenExitOutlined />
                    )
                }
                size="large"
                onClick={requestFullScreen}
            />
            <Button icon={<BellFilled />} size="large" />
            <Dropdown overlay={menu} trigger={["click"]}>
                <Button icon={<CaretDownFilled />} size="large" />
            </Dropdown>
        </div>
    )
}
export default Navigation
