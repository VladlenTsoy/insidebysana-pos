import {Empty, Spin} from "antd"
import React, {useEffect} from "react"
import {useGetParamsProduct, useProductColors} from "features/product/productSlice"
import styles from "./GridProducts.module.less"
import {motion, AnimatePresence} from "framer-motion"
import {useDispatch} from "store"
import ProductCard from "./ProductCard"
import {fetchProductColorBySearch} from "./fetchProductColorBySearch"
import {LoadingOutlined} from "@ant-design/icons"

const GridProducts: React.FC = () => {
    const dispatch = useDispatch()
    const {
        loading,
        categoryId,
        sizeId,
        search,
        pagination: {currentPage}
    } = useGetParamsProduct()
    const products = useProductColors()

    const onScrollHandler = (e: any) => {
        const {scrollTop, scrollHeight, clientHeight} = e.target
        if (scrollTop + clientHeight >= scrollHeight - clientHeight && !loading) {
            dispatch(fetchProductColorBySearch({search, categoryId, sizeId, currentPage}))
        }
    }

    useEffect(() => {
        const promise = dispatch(fetchProductColorBySearch({sizeId, categoryId, search}))
        return () => {
            promise.abort()
        }
    }, [dispatch, sizeId, categoryId, search])

    return (
        <div className={styles.searchContainer} onScroll={onScrollHandler}>
            <AnimatePresence>
                {currentPage === 0 && loading && (
                    <motion.div
                        animate={{opacity: 1}}
                        initial={{opacity: 0}}
                        exit={{opacity: 0}}
                        transition={{duration: 0.015}}
                        key="loading-first"
                    >
                        <div className={styles.loadingFirst}>
                            <Spin indicator={<LoadingOutlined style={{marginBottom: "1rem"}} />} />
                            <p>Загрузка...</p>
                        </div>
                    </motion.div>
                )}
                {!loading && !products.length && (
                    <motion.div
                        animate={{opacity: 1}}
                        initial={{opacity: 0}}
                        exit={{opacity: 0}}
                        transition={{duration: 0.015}}
                        key="empty"
                    >
                        <Empty />
                    </motion.div>
                )}
                {!!products.length && (
                    <motion.div
                        id="grid-products-list"
                        key="grid-products"
                        className={styles.productsContainer}
                        animate="visible"
                        initial="hidden"
                        exit="exit"
                        variants={{
                            visible: {
                                transition: {
                                    delayChildren: 0.015,
                                    staggerChildren: 0.015
                                }
                            },
                            exit: {
                                transition: {
                                    delayChildren: 0.015,
                                    staggerChildren: 0.015,
                                    repeatType: "reverse"
                                }
                            }
                        }}
                    >
                        {products.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </motion.div>
                )}
                {currentPage !== 0 && loading && (
                    <motion.div
                        animate={{opacity: 1}}
                        initial={{opacity: 0}}
                        exit={{opacity: 0}}
                        transition={{duration: 0.015}}
                        key="loading-pagination"
                    >
                        <div className={styles.loadingPagination}>
                            <Spin indicator={<LoadingOutlined />} />
                            <p>Загрузка...</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
export default React.memo(GridProducts)
