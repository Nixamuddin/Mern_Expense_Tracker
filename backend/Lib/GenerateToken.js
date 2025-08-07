import jwt from 'jsonwebtoken'
export const generateToken = (userId, res) => {
   const token=jwt.sign({ userId }, process.env.TOKEN, { expiresIn: '7d' });
    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });
    return token;
}