import express from "express";
import bcrypt from "bcrypt";
import Users from "../models/user.model.js";
import jwt from "jsonwebtoken";

const router = express.Router();
router.post("/sign-up", async (req, res) => {
    const { email, password } = req.body;
    const existUser = await Users.findOne({
        where: {
            email,
        },
    });
    if (existUser) {
        return res.json({
            ok: false,
            message: "이미 존재하는 이메일입니다.",
        });
    }
    console.log("password", password);
    const hashedPassword = await bcrypt.hash(password, 12);
    await Users.create({
        email,
        password: hashedPassword,
    });
    res.json({ ok: true, message: "환영합니다!" });
});
router.post("/sign-in", async (req, res) => {
    const { email, password } = req.body;
    const user = await Users.findOne({
        where: {
            email,
        },
    });
    if (!user) {
        //400번으로 보내려면 res.status(400).json({})
        return res.json({
            ok: false,
            message: "존재하지 않는 사용자입니다",
        });
    }
    /**
     * @password: {request}
     * @user.password: {database}
     */
    const isMatchPassword = await bcrypt.compare(password, user.password);
    console.log("isMatchPassword", isMatchPassword);
    if (!isMatchPassword) {
        return res.json({
            ok: false,
            message: "비밀번호를 다시 확인해주세요",
        });
    }

    const token = jwt.sign(
        {
            id: user.id,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: 1000 * 60 * 5,
        }
    );
    return res.json({
        ok: true,
        info: {
            email: user.email,
        },
        // message: `${user.email}님 환영합니다`,
        token,
    });
});

export default router;
