import { prisma } from "./database.server"
import { stripe } from "./stripe"

export async function addPayments(userId, token, total) {
    try {
        const cart = await prisma.cart.findUnique({ where: { userId } })

        if (!cart) {
            throw new Error("No cart items.")
        }

        const charge = await stripe.charges.create({
            currency: 'usd',
            amount: total * 100,
            source: token
        })

        await prisma.payments.create({
            data: {
                stripeId: charge.id,
                products: cart.products,
                User: { connect: { id: userId } }
            }
        })

        return await prisma.cart.delete({
            where: { userId }
        })

    } catch (error) {
        throw new Error("Failed to add the payment.")
    }
}

export async function getUserPayments(userId) {
    try {
        return await prisma.payments.findMany({
            where: { userId }
        })
    } catch (error) {
        throw new Error("Failed to get the user payment.")
    }
}

export async function getUserRawPayments(userId) {
    try {
        return await prisma.payments.findMany({
            where: { userId },
            select: {
                stripeId: true,
                userId: true,
                products: {
                    select: {
                        name: true,
                        description: true,
                        price: true,
                        qty: true
                    }
                }
            }
        })
    } catch (error) {
        throw new Error("Failed to get the user raw payment.")
    }
}
