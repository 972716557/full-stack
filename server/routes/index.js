import express from "express"
import User from '../src/models/user';

const router = express.Router();

// 获取所有用户
router.get('/users', async (req, res) => {
    try {
        const users = await User.findAll();
        console.log(users, 'use')
        res.json({
            success: true, data: users, count: users.length
        });
    } catch (error) {
        res.status(500).json({
            success: false, message: error.message
        });
    }
});

// 根据ID获取用户
router.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({
                success: false, message: '用户不存在'
            });
        }
        res.json({
            success: true, data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false, message: error.message
        });
    }
});

// 条件查询用户
router.get('/users/search/query', async (req, res) => {
    try {
        const {name, email, page = 1, limit = 10, sortBy = 'name', order = 'asc'} = req.query;

        // 构建查询条件
        const query = {};
        if (name) query.name = new RegExp(name, 'i'); // 不区分大小写的模糊查询
        if (email) query.email = new RegExp(email, 'i');

        // 构建排序选项
        const sort = {};
        sort[sortBy] = order === 'desc' ? -1 : 1;

        // 计算分页
        const skip = (parseInt(page) - 1) * parseInt(limit);

        const users = await User.findByQuery(query, {
            limit: parseInt(limit), skip, sort
        });

        const total = await User.count(query);

        res.json({
            success: true, data: users, pagination: {
                page: parseInt(page), limit: parseInt(limit), total, pages: Math.ceil(total / parseInt(limit))
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false, message: error.message
        });
    }
});

module.exports = router;