import jwt from 'jsonwebtoken'

// user authentication middleware
const authUser = async (req,res,next) => {
    try {
        // 1. Get the Authorization header
        const authHeader = req.headers.authorization 

        // 2. Check if the header exists and starts with 'Bearer '
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, message: 'Not Authorized, token missing or malformed' })
        }

        // 3. Extract the actual token (skip 'Bearer ')
        const token = authHeader.split(' ')[1] 
        
        // The rest of your logic remains the same
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)

        req.body.userId = token_decode.id

        next()

    } catch (error) {
        // This will catch the 'invalid signature' error
        console.log(error)
        // Send a 401 Unauthorized status for token errors
        res.status(401).json({ success: false, message: 'Invalid Token Signature or Expired' }) 
    }
}

export default authUser