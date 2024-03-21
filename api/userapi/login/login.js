const user = require("../user/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
function login(req, res) {
    let formdata = req.body
    let validations = []
    let { email, password } = formdata
    if (!email) {
        validations.push("email")
    }
    if (!password) {
        validations.push("password")
    }
    if (validations.length > 0) {
        res.send({
            success: false,
            status: 400,
            message: validations.join("+")+"required"
        })
    } else {
        user.findOne({ email: formdata.email }).then((item) => {
            if (!item) {
                res.send({
                    success: false,
                    status: 400,
                    message: 'user doesnt exists'
                })
            } else {
                let hashed = bcrypt.compareSync(formdata.password, item.password)
                let payload = { email: formdata.email, password: formdata.password }
                let token = jwt.sign(payload, "SECRETKEY")
                if (!hashed) {
                    res.send({
                        success: false,
                        status: 400,
                        message: 'Invalid credentails'
                    })
                } else {
                    res.send({
                        success: true,
                        status: 200,
                        message: "login successfully",
                        data: item,
                        token: token
                    })
                }
            }
        }).catch((err) => {
            res.send({
                success: false,
                status: 500,
                message: 'Error:' + err
            })
        })
    }
}
module.exports ={ login }