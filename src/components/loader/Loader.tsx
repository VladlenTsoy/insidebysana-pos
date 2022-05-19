import React from "react"
import LoadingOutlined from "@ant-design/icons/LoadingOutlined"
import styles from "./Loader.module.less"

const Loader: React.FC<any> = ({text}) => {
    return (
        <div className={styles.loader}>
            <LoadingOutlined spin />
            {text ? <p>{text}</p> : null}
        </div>
    )
}

export default Loader
