import { hash, compare } from 'bcryptjs'
import { createCookieSessionStorage, redirect } from '@remix-run/node'
import { prisma } from "./database.server";

const SESSION_SECRET = process.env.SESSION_SECRET

const sessionStorage = createCookieSessionStorage({
    secure: process.env.NODE_ENV === 'production',
    secrets: [SESSION_SECRET],
    sameSite: 'lax',
    maxAge: 30 * 24 * 60 * 60,
    httpOnly: true
})

async function createUserSession(userId, redirectPath) {
    const session = await sessionStorage.getSession()
    session.set('userId', userId)

    return redirect(redirectPath, {
        headers: {
            'Set-Cookie': await sessionStorage.commitSession(session)
        }
    })
}

export async function getUserFromSession(request) {
    const session = await sessionStorage.getSession(request.headers.get('Cookie'))
    const userId = session.get('userId')
    if (!userId) { return null }

    return userId
}

export async function destroyUserSession(request) {
    const session = await sessionStorage.getSession(
        request.headers.get('Cookie')
    )

    return redirect("/", {
        headers: {
            'Set-Cookie': await sessionStorage.destroySession(session)
        }
    })
}

export async function getUser(request) {
    const userId = await getUserFromSession(request)

    if (userId) {
        try {
            return await prisma.user.findFirst({ where: { id: userId } })
        } catch (error) {
            throw new Error('Failed to get user')
        }
    }

    return null
}

export async function requireUserSession(request) {
    const userId = await getUserFromSession(request)

    if (!userId) {
        throw redirect('/signin')
    }

    return userId
}

export async function signin({ email, password }) {

    const throwError = () => {
        const error = new Error('Could not log you in, please check the provided credentials.')
        error.status = 401
        throw error
    }

    const existingUser = await prisma.user.findFirst({ where: { email } })
    if (!existingUser) { throwError() }

    const passwordCorrect = await compare(password, existingUser.password)
    if (!passwordCorrect) { throwError() }

    return createUserSession(existingUser.id, "/")
}

export async function signup({ email, password }) {
    const existingUser = await prisma.user.findFirst({ where: { email } })

    if (existingUser) {
        const error = new Error('A user with the provided email already exists.')
        error.status = 422
        throw error
    }

    const passwordHash = await hash(password, 12)
    const user = await prisma.user.create({ data: { email, password: passwordHash } })

    return createUserSession(user.id, "/")
}