import React from "react"
import styles from "./Auth.module.less"
import {Button, Card, Checkbox, Form, Input, Typography} from "antd"
import {LockOutlined, LoginOutlined, UserOutlined} from "@ant-design/icons"
import {authUser} from "./authApi"
import {emailRules, passwordRules} from "utils/formRules"
import {useDispatch} from "store"
import {useUser} from "./authSlice"

const {Title} = Typography

interface ValuesProps {
    email: string
    password: string
}

const Auth = () => {
    const {isAuthLoading} = useUser()
    const dispatch = useDispatch()

    const onFinishHandler = async (values: ValuesProps) => {
        dispatch(authUser(values))
    }

    return (
        <div className={styles.wrapper}>
            <Card
                className={styles.card}
                title={
                    <Title level={3} title="Авторизация">
                        Авторизация
                    </Title>
                }
            >
                <Form layout="vertical" onFinish={onFinishHandler}>
                    <Form.Item label="Почта" name="email" rules={emailRules({required: true})}>
                        <Input size="large" prefix={<UserOutlined />} placeholder="Введите почту" />
                    </Form.Item>
                    <Form.Item label="Пароль" name="password" rules={passwordRules({required: false})}>
                        <Input.Password size="large" prefix={<LockOutlined />} placeholder="Введите пароль" />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Запомнить меня</Checkbox>
                        </Form.Item>
                    </Form.Item>
                    <Button
                        type="primary"
                        size="large"
                        block
                        loading={isAuthLoading}
                        htmlType="submit"
                        icon={<LoginOutlined />}
                    >
                        Войти
                    </Button>
                </Form>
            </Card>
        </div>
    )
}

export default Auth
