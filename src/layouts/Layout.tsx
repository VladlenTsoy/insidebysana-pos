import React from "react"
import Header from "./header/Header"
import styles from "./Layout.module.less"

interface LayoutProps {
    children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({children}) => {
    return (
        <div className={styles.cashier}>
            <Header/>
            <div className={styles.container}>{children}</div>
        </div>
    )
}
export default Layout
