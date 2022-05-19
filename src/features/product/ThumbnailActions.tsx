import React, {useCallback} from "react"
import {ProductCardType} from "./product"
import {useDispatch} from "store"
import {addToCart, removeFromCart, updateQty, useCartProductColors} from "features/cart/cartSlice"
import {motion} from "framer-motion"
import {DeleteOutlined, MinusOutlined, PlusOutlined, StopOutlined} from "@ant-design/icons"
import styles from "./ThumbnailActions.module.less"
import {createRipple} from "utils/reppleAnimation"

type SelectSize = number | null

interface ThumbnailActionsProps {
    product: ProductCardType
    selectSize: ProductCardType["sizes"][0]
    changeSelectSize: (size: SelectSize) => void
}

const ThumbnailActions: React.FC<ThumbnailActionsProps> = ({product, selectSize, changeSelectSize}) => {
    const dispatch = useDispatch()
    const cartProducts = useCartProductColors()

    // Поиск кол-во по размеру в товаре
    const searchCartQtyBySize = useCallback(
        (size: ProductCardType["sizes"][0]) => {
            if (size) {
                const findProduct = cartProducts.find(
                    cartProduct =>
                        cartProduct.product_color_id === product.id && cartProduct.size_id === size.size_id
                )
                if (findProduct) return findProduct.qty
            }
            return 0
        },
        [product, cartProducts]
    )

    // Обновление кол-во в корзине
    const updateQtyToCart = useCallback(
        (qty: any) => dispatch(updateQty({product_color_id: product.id, size_id: selectSize.size_id, qty: qty})),
        [dispatch, selectSize, product]
    )

    // При нажатии на плюс
    const plusHandler = useCallback(
        (e: React.MouseEvent<HTMLElement>) => {
            e.preventDefault()
            // Создание анимации
            createRipple(e)
            // Кол-во в корзине
            const qty = searchCartQtyBySize(selectSize)
            if (qty >= selectSize.qty) return
            if (qty > 0) updateQtyToCart(qty + 1)
            else
                dispatch(
                    addToCart({size_id: selectSize.size_id, product_color_id: product.id, product, qty: 1})
                )
        },
        [dispatch, selectSize, product, updateQtyToCart, searchCartQtyBySize]
    )

    // При нажатии на минус
    const minusHandler = useCallback(
        (e: React.MouseEvent<HTMLElement>) => {
            e.preventDefault()
            // Создание анимации
            createRipple(e)
            // Кол-во в корзине
            const qty = searchCartQtyBySize(selectSize)
            if (qty > 1) updateQtyToCart(qty - 1)
            else {
                dispatch(removeFromCart({size_id: selectSize.size_id, product_color_id: product.id}))
                changeSelectSize(null)
            }
        },
        [selectSize, dispatch, searchCartQtyBySize, updateQtyToCart, product, changeSelectSize]
    )

    return (
        <motion.div
            layout
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.3}}
            className={styles.addToCartBlock}
        >
            <div className={styles.minus} onClick={minusHandler}>
                {searchCartQtyBySize(selectSize) > 0 ? (
                    searchCartQtyBySize(selectSize) === 1 ? (
                        <DeleteOutlined />
                    ) : (
                        <MinusOutlined />
                    )
                ) : (
                    <StopOutlined />
                )}
            </div>
            <div className="count">{searchCartQtyBySize(selectSize)}</div>
            <div className={styles.plus} onClick={plusHandler}>
                {searchCartQtyBySize(selectSize) < selectSize.qty && <PlusOutlined />}
            </div>
            {selectSize && <div className={styles.remainder}>Осталось: {selectSize.qty || 0}</div>}
        </motion.div>
    )
}


export default ThumbnailActions
