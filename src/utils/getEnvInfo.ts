export const isDev = () => process.env.NODE_ENV === 'development'
export const getEnvIP = () => process.env.IP || 'localhost'
export const getEnvPort = () => process.env.PORT || '3000'
