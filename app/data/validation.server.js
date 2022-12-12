
function isValidEmail(value) {
    return value && value.includes('@')
}

function isValidPassword(value) {
    return value && value.trim().length >= 7
}

export function validateCredentials(input) {
    let validationErrors = {}

    if (!isValidEmail(input.email)) {
        validationErrors.email = 'Invalid email address.'
    }

    if (!isValidPassword(input.password)) {
        validationErrors.password = 'Invalid password. Must be at least 7 characters long.'
    }

    if (Object.keys(validationErrors).length > 0) {
        throw validationErrors
    }
}


function isValidName(value) {
    return value && value.trim().length > 0 && value.trim().length <= 80
}

function isValidDescription(value) {
    return value && value.trim().length > 0 && value.trim().length <= 500
}

export function validateCategoryInput(input) {
    let validationErrors = {}

    if (!isValidName(input.name)) {
        validationErrors.name = 'Invalid category name. Must be at most 80 characters long.'
    }

    if (!isValidDescription(input.description)) {
        validationErrors.description = 'Invalid category description. Must be at most 500 characters long.'
    }

    if (Object.keys(validationErrors).length > 0) {
        throw validationErrors
    }
}


function isValidPrice(value) {
    return !isNaN(value) && Number(value) > 0;
}

function isValidCount(value) {
    return !isNaN(value) && Number.isInteger(+value) && Number(value) > 0;
}

function isValidPicture(value) {
    return value
}

function isValidCategory(value) {
    return value != 0;
}

export function validateProductInput(input) {
    let validationErrors = {}

    if (!isValidName(input.name)) {
        validationErrors.name = 'Invalid product name. Must be at most 80 characters long.'
    }

    if (!isValidDescription(input.description)) {
        validationErrors.description = 'Invalid product description. Must be at most 500 characters long.'
    }

    if (!isValidPrice(input.price)) {
        validationErrors.price = 'Invalid price. Must be a positive number.'
    }

    if (!isValidCount(input.count)) {
        validationErrors.count = 'Invalid count. Must be a positive number.'
    }

    if (!isValidPicture(input.pictureBase64)) {
        validationErrors.picture = 'Invalid picture.'
    }

    if (!isValidCategory(input.category)) {
        validationErrors.category = 'Invalid category.'
    }

    if (Object.keys(validationErrors).length > 0) {
        throw validationErrors
    }
}