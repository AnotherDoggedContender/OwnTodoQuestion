import express from "express";
import { jwtAuth } from "../middleware/jwtAuth.js";
import Todo from "../models/todo.model.js";
import Users from "../models/user.model.js";
const router = express.Router();
router.get("/", async (req, res) => {
    // const { page, per_page } = req.query;
    // const perPage = parseInt(per_page ?? 10);
    // const pageOffset = (page ?? 1) - 1;
    // const todos = await Todo.findAll({
    //     limit: perPage,
    //     offset: pageOffset * perPage,
    // });
    const todos = await Todo.findAll();
    res.json(todos);
});
router.post("/", jwtAuth, async (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({
            message: "양식을 입력해주세요",
        });
    }
    const todo = await Todo.create({
        userId: req.user.id, //이거 표기 어디서 나옴?
        title,
        content,
    });
    const findTodo = await Todo.findOne({
        where: {
            id: todo.id,
        },
        attributes: ["id", "title", "content"],
        include: [
            {
                model: Users,
                attributes: ["email"],
            },
        ],
    });
    res.json(findTodo);
});

router.patch("/", jwtAuth, async (res, req) => {
    const { todoId } = req.query;
    const { title, content, state } = req.body;

    await Todo.update(
        {
            title,
            content,
            state,
        },
        {
            where: {
                id: todoId,
                userId: req.user.id,
            },
        }
    );
    res.json({
        ok: true,
        id: todoId,
    });
});

router.delete("/:todoId", jwtAuth, async (req, res) => {
    const { todoId } = req.params;
    await Todo.destroy({
        where: {
            id: todoId,
            userId: req.user.id,
        },
    });
    res.json({
        ok: true,
        id: todoId,
    });
});
export default router;
