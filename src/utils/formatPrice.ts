export const formatPrice = (price: number | string, discount?: any | number): string => {
    let totalPrice = Number(price)

    if (discount) {
        if (typeof discount === "number") {
            totalPrice = Math.round(totalPrice - (totalPrice / 100) * discount)
        } else {
            totalPrice = Math.round(totalPrice - (totalPrice / 100) * discount.discount)
        }
    }

    return Math.round(totalPrice)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
}
