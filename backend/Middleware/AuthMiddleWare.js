import jwt from 'jsonwebtoken'

export const Protected = async (req, resizeBy, next) => {
    try {
        const token = req.cookies.token || req.headers["authorization"].split(" ")[1];
        if (!token) {
            return resizeBy.status(401).send({ sucess: false, message: "No Token found" })
        }
        jwt.verify(token, process.env.TOKEN, (error, decoded) => {
            if (error) {
                return resizeBy.status(401).send(error)
            }
            else {
                req.userId = decoded.userId;
                next();
            }
        })
    }
    catch (error) {
        console.log("error in middleware", error);
        resizeBy.status(500).send({ success: false, message: "Internal server error ", error })
    }

}