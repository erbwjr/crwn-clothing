
export const addItemToCart = (existingCartItems, cartItemToAdd) => {
    const matchingCartItem = existingCartItems.find(cartItem => cartItem.id === cartItemToAdd.id);

    if (matchingCartItem) {
        return existingCartItems.map(cartItem =>
            cartItem.id === cartItemToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        )
    }

    return [...existingCartItems, { ...cartItemToAdd, quantity: 1 }]
}