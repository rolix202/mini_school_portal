import jwt  from "jsonwebtoken";

export const createJWT = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_SECRET_EXP
    })
}

export const verifyJWT = (payload) => {
    return jwt.verify(payload, process.env.JWT_SECRET)
}