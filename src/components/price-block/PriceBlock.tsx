import React from "react"
import styles from "./PriceBlock.module.less"
import {ProductColor} from "types/product/ProductColor"
import {formatPrice} from "utils/formatPrice"
import {ClockCircleOutlined} from "@ant-design/icons"
import {Tooltip} from "antd"
import {formatDate} from "utils/formatDate"
import {formatDiscount} from "utils/formatDiscount"

interface PriceBlockProps {
    discount?: ProductColor["discount"]
    price: number
}

const PriceBlock: React.FC<PriceBlockProps> = ({discount, price}) => {
    return (
        <div className={styles.priceBlock}>
            {discount ? (
                <>
                    {discount.end_at && (
                        <div className={styles.endAt}>
                            <Tooltip title={`До ${formatDate(discount.end_at)}`}>
                                <ClockCircleOutlined />
                            </Tooltip>
                        </div>
                    )}
                    <small>
                        {formatPrice(price)} -{" "}
                        <span className={styles.percent}>{formatDiscount(discount.discount)}%</span>
                    </small>
                    <div>{formatPrice((price - (price / 100) * discount.discount).toFixed(0))} сум</div>
                </>
            ) : (
                formatPrice(price) + " сум"
            )}
        </div>
    )
}

export default PriceBlock
