import { prisma } from "./database.server"

export async function addToCart(id, userId) {
    try {
        const product = await prisma.product.findUnique({ where: { id } })

        if (!product) {
            throw new Error("Failed to get the product to add to cart.")
        }

        const cart = await getUserCart(userId)

        if (cart) {
            let existingProduct = cart.products.find(p => p.id == id)
            if (existingProduct) {
                existingProduct.qty += 1

                return await prisma.cart.update({
                    where: { userId },
                    data: {
                        products: cart.products
                    }
                })
            } else {

                return await prisma.cart.update({
                    where: { userId },
                    data: {
                        products: [
                            ...cart.products,
                            {
                                id: product.id,
                                name: product.name,
                                description: product.description,
                                price: product.price,
                                picture: product.picture,
                                qty: 1
                            }]
                    }
                })
            }
        } else {
            return await prisma.cart.create({
                data: {
                    products:
                        [{
                            id: product.id,
                            name: product.name,
                            description: product.description,
                            price: product.price,
                            picture: product.picture,
                            qty: 1
                        }],
                    User: { connect: { id: userId } }
                }
            })
        }
    } catch (error) {
        throw new Error("Failed to add to cart.")
    }
}

export async function add(id, userId, shouldAdd) {
    try {
        const product = await prisma.product.findUnique({ where: { id } })

        if (!product) {
            throw new Error("Failed to get the product to add or remove.")
        }

        const cart = await getUserCart(userId)

        if (cart) {
            let existingProduct = cart.products.find(p => p.id == id)
            if (existingProduct) {
                shouldAdd ? existingProduct.qty += 1 : existingProduct.qty -= 1

                if (existingProduct.qty === 0) {
                    if (cart.products.length === 1) {
                        return await prisma.cart.delete({
                            where: { userId }
                        })
                    } else {
                        let otherProducts = cart.products.filter(p => p.id != id)

                        return await prisma.cart.update({
                            where: { userId },
                            data: {
                                products: otherProducts
                            }
                        })
                    }
                } else {
                    return await prisma.cart.update({
                        where: { userId },
                        data: {
                            products: cart.products
                        }
                    })
                }
            }
        }
    } catch (error) {
        throw new Error("Failed to add or remove a product.")
    }
}
export async function removeAll(id, userId) {
    try {
        const product = await prisma.product.findUnique({ where: { id } })

        if (!product) {
            throw new Error("Failed to get the product to delete.")
        }

        const cart = await getUserCart(userId)

        if (cart) {
            if (cart.products.length === 1) {
                return await prisma.cart.delete({
                    where: { userId }
                })
            } else {
                let otherProducts = cart.products.filter(p => p.id != id)

                return await prisma.cart.update({
                    where: { userId },
                    data: {
                        products: otherProducts
                    }
                })
            }
        }

    } catch (error) {
        throw new Error("Failed to delete the user cart.")
    }
}

export async function getUserCart(userId) {
    try {
        return await prisma.cart.findFirst({
            where: { userId }
        })
    } catch (error) {
        throw new Error("Failed to get the user cart.")
    }
}