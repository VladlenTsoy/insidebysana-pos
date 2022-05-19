import React from "react"

// Создание анимации
export const createRipple = (event: React.MouseEvent<HTMLElement>) => {
    const button = event.currentTarget.parentElement
    if (button) {
        const circle = document.createElement("span")
        const diameter = Math.max(button.clientWidth, button.clientHeight)
        const radius = diameter / 2

        const rect = button.getBoundingClientRect()

        circle.style.width = circle.style.height = `${diameter}px`
        circle.style.left = `${event.clientX - rect.x - radius}px`
        circle.style.top = `${event.clientY - rect.y - radius}px`
        circle.classList.add("ripple")

        const ripple = button.getElementsByClassName("ripple")[0]

        if (ripple) ripple.remove()
        button.appendChild(circle)
    }
}
