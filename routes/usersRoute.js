const express = require("express")
const router = express.Router()

const bcrypt = require("bcryptjs")

// user model
const User = require("../models/userModel")

router.post('/register', async (req, res) => {
    try {
        let user = await User.findOne({ phone: req.body.phone })
        if (user) {
            return res.send({
                message: "کاربر وجود دارد! وارد شوید",
                success: false,
                data: null
            })
        }

        let hashedPassword = await bcrypt.hash(req.body.password, 10)
        req.body.password = hashedPassword
        const newUser = new User(req.body)
        await newUser.save()
        res.send({
            message: "کاربر ثبت نام شد",
            success: true,
            data: null
        })
    } catch (error) {
        res.send({
            message:error.message,
            success: false,
            data: null
        })
    }
})

module.exports = router