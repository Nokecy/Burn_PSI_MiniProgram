export const ProductApiUrl = 'http://api.juheapi.com'

export const MockApiUrl = 'https://www.easy-mock.com/mock/5d674dd1571a4f465a287c4a'

export const HOST = process.env.NODE_ENV === "production" ? ProductApiUrl : MockApiUrl;