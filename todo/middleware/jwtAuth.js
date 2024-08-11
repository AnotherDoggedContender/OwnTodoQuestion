import jwt from "jsonwebtoken";
export const jwtAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]; //auth의 Bearer에 넣은 값이 authorization으로 간다.
        console.log(token);
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {
            id: user.id,
        };
        next();
    } catch (err) {
        res.status(403).json({
            message: "인증되지 않은 회원입니다",
        });
    }
};
