import {StoreState} from "../../store"

// Обновить итоговую стоимость
export const updateTotal = (state: StoreState["cart"]) => {
    const {discount, additionalServices} = state
    const products = Object.values(state.entities)
    let totalPrice = 0

    // Добавление товаров
    if (products.length) {
        totalPrice += products.reduce((acc, {product, qty}: any) => {
            const price = product.discount
                ? (product.price - (product.price / 100) * product.discount.discount).toFixed(0)
                : product.price
            return acc + Number(price) * qty
        }, 0)
    }

    // Скидка
    if (discount && totalPrice > 0) {
        if (discount.type === "percent") totalPrice = totalPrice - (totalPrice / 100) * discount.discount
        else totalPrice = totalPrice - discount.discount
    }

    // Добавление допб услуг
    if (additionalServices.length)
        totalPrice += additionalServices.reduce(
            (acc, addtionalService) => (acc + addtionalService.price * addtionalService.qty),
            0
        )

    // Общая введенная сумма
    const totalPricePayments = state.payments.reduce((acc, payment) => (acc += payment.price), 0)
    // Осталось оплатить
    const leftToPay = totalPrice - totalPricePayments >= 0 ? totalPrice - totalPricePayments : 0
    // Сдачи
    const payChange = totalPricePayments - state.totalPrice > 0 ? totalPricePayments - state.totalPrice : 0
    // Блокировка кнопки
    const createOrderButtonDisabled = state.totalPrice > totalPricePayments

    return {totalPrice, leftToPay, payChange, createOrderButtonDisabled}
}
