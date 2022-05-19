import React, {useCallback, useState} from "react"
import {Radio} from "antd"
import ImageBlock from "components/image-block/ImageBlock"
import {formatPrice} from "utils/formatPrice"
import {AnimatePresence, motion} from "framer-motion"
import styles from "./ProductCard.module.less"
import {ProductCardType} from "./product"
import {formatDiscount} from "utils/formatDiscount"
import ThumbnailActions from "./ThumbnailActions"

type SelectSize = number | null

interface ProductCardProps {
    product: ProductCardType
}

const ProductCard: React.FC<ProductCardProps> = ({product}) => {
    const [selectSize, setSelectSize] = useState<ProductCardType["sizes"][0] | undefined>()

    // Изменить выбранный размер
    const changeSelectSize = useCallback(
        (sizeId: SelectSize) => {
            const size = product.sizes.find(size => size.size_id === sizeId)
            setSelectSize(size)
        },
        [product]
    )

    // Выбор размер
    const onChangeHandler = (e: any) => changeSelectSize(Number(e.target.value))

    // Нажатие на размер
    const onClickHandler = (e: any) => {
        if (selectSize && Number(e.target.value) === selectSize.size_id) setSelectSize(undefined)
    }

    return (
        <motion.div
            className={styles.productCard}
            id={`product-item-${product.id}`}
            layout
            variants={{
                hidden: {y: 20, opacity: 0},
                visible: {y: 0, opacity: 1},
                exit: {opacity: 0}
            }}
            transition={{duration: 0.3}}
        >
            <div className={styles.thumbnail}>
                <div className={styles.color}>
                    <span className={styles.hex} style={{background: product.color.hex}} />
                    <span className={styles.title}>{product.color.title}</span>
                </div>
                {product.discount && (
                    <div className={styles.discount}>-{formatDiscount(product.discount.discount)}%</div>
                )}
                <ImageBlock image={product.url_thumbnail} />
                <AnimatePresence>
                    {selectSize && (
                        <ThumbnailActions
                            selectSize={selectSize}
                            product={product}
                            changeSelectSize={changeSelectSize}
                        />
                    )}
                </AnimatePresence>
            </div>
            <div className={styles.details}>
                <div className={styles.title}>{product.title}</div>
                {product.discount && <div className={styles.priceDiscount}>{formatPrice(product.price)} сум</div>}
                <div className={styles.price}>{formatPrice(product.price, product.discount)} сум</div>
            </div>
            <div className={styles.sizesAction}>
                <Radio.Group onChange={onChangeHandler} size="large" value={selectSize?.size_id || null}>
                    {product.sizes.map(
                        size =>
                            size.qty > 0 && (
                                <Radio.Button
                                    key={`PC${product.id}S${size.size_id}`}
                                    value={size.size_id}
                                    className={styles.buttonSize}
                                    onClick={onClickHandler}
                                >
                                    {size.title}
                                </Radio.Button>
                            )
                    )}
                </Radio.Group>
            </div>
        </motion.div>
    )
}

export default React.memo<ProductCardProps>(ProductCard)
