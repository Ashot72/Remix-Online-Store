import { prisma } from "./database.server"

export async function addCategory(categoryData, userId) {
    try {
        return await prisma.category.create({
            data: {
                name: categoryData.name,
                description: categoryData.description,
                User: { connect: { id: userId } }
            }
        })
    } catch (error) {
        throw new Error("Failed to add category.")
    }
}

export async function getCategories() {
    try {
        return await prisma.category.findMany({
            orderBy: { dateAdded: 'desc' }
        })
    } catch (error) {
        throw new Error("Failed to get categories")
    }
}

export async function updateCategory(id, categoryData) {
    try {
        await prisma.category.update({
            where: { id },
            data: {
                name: categoryData.name,
                description: categoryData.description
            }
        })
    } catch (error) {
        throw new Error("Failed to update the category.")
    }
}

export async function deleteCategory(id) {
    try {
        const product = await prisma.product.findMany({
            where: { categoryId: id },
        })

        if (product.length > 0) {
            throw new Error("There is a product attached to the category.")
        }
    } catch (e) {
        throw new Error(e.message)
    }

    try {
        await prisma.category.delete({
            where: { id }
        })
    } catch (error) {
        throw new Error("Failed to delete the category.")
    }
}