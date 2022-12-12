import { prisma } from "./database.server";
var fs = require('fs');

export async function addProduct(productData, categoryId, userId) {
    try {
        return await prisma.product.create({
            data: {
                name: productData.name,
                description: productData.description,
                price: +productData.price,
                picture: productData.pictureBase64,
                count: +productData.count,
                Category: { connect: { id: categoryId } },
                User: { connect: { id: userId } }
            }
        })
    } catch (error) {
        throw new Error("Failed to add the product.")
    }
}

export async function getCategoryProducts(categoryId) {
    if (!categoryId) {
        throw new Error('Failed to get the category.')
    }

    try {
        return await prisma.product.findMany({
            where: { categoryId },
            orderBy: { dateAdded: 'desc' },
            include: {
                Category: true,
            }
        })
    } catch (error) {
        throw new Error('Failed to get category products.')
    }
}

export async function getUserProducts(categoryId, userId) {
    if (!categoryId || !userId) {
        throw new Error('Failed to get the user products.')
    }

    try {
        return await prisma.product.findMany({
            where: { categoryId, userId },
            orderBy: { dateAdded: 'desc' },
            include: {
                Category: true,
            }
        })
    } catch (error) {
        throw new Error('Failed to get the user products.')
    }
}

export async function updateProduct(id, productData) {
    try {
        await prisma.product.update({
            where: { id },
            data: {
                name: productData.name,
                description: productData.description,
                price: +productData.price,
                picture: productData.pictureBase64,
                count: +productData.count,
                Category: { connect: { id: productData.category } },
            }
        })
    } catch (error) {
        throw new Error("Failed to update the product.")
    }
}

export async function deleteProduct(id) {
    try {
        await prisma.product.delete({ where: { id } })
    } catch (error) {
        throw new Error("Failed to delete the product.")
    }
}

