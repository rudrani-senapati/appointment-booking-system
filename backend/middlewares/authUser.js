import jwt from 'jsonwebtoken'

// user authentication middleware
const authUser = async (req, res, next) => {
    try {
        const { token } = req.headers
        const authHeader = req.headers.authorization

        let userToken = token
        if (!userToken && authHeader) {
            userToken = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader
        }

        if (!userToken || userToken === 'undefined' || userToken === 'null' || userToken === 'false') {
            return res.json({ success: false, message: 'Not Authorized Login Again' })
        }

        const token_decode = jwt.verify(userToken, process.env.JWT_SECRET)
        req.body.userId = token_decode.id
        next()

    } catch (error) {
        console.log("Auth User Error:", error.message)
        return res.json({ success: false, message: 'Session expired or invalid token' })
    }
}

export default authUser