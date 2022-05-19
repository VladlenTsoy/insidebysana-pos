import React, {useEffect} from "react"
import "./App.less"
import {useDispatch} from "./store"
import Loader from "components/loader/Loader"
import {useUser} from "auth/authSlice"
import {Route, Routes} from "react-router-dom"
import {fetchUser} from "auth/authApi"
import Layout from "./layouts/Layout"
import LoadingBlock from "components/loading-block/LoadingBlock"

const Auth = React.lazy(() => import("./auth/Auth"))
const Home = React.lazy(() => import("./pages/Home"))
const Orders = React.lazy(() => import("./pages/Orders"))

const Routers: React.FC = () => {
    const {detail, token, isFetchLoading} = useUser()
    const dispatch = useDispatch()

    useEffect(() => {
        if (token) {
            const promise = dispatch(fetchUser())
            return () => {
                promise.abort()
            }
        }
    }, [dispatch, token])

    if (!!token && isFetchLoading) return <Loader text="Загрузка доступа..." />
    return (
        <React.Suspense fallback={<Loader text="Загрузка доступа..." />}>
            {detail ? (
                <Layout>
                    <React.Suspense fallback={<LoadingBlock title="Загрузка..." />}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/orders" element={<Orders />} />
                        </Routes>
                    </React.Suspense>
                </Layout>
            ) : (
                <Auth />
            )}
        </React.Suspense>
    )
}
export default Routers
