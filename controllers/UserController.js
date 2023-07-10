const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var randomstring = require("randomstring");
const nodemailer = require('nodemailer');
const { Op } = require("sequelize");
const config = require('../config/config')
const repository = require('../repository/userRepository');

UserController = {

    // Send mail for reset password.
    async sentMail(firstName, lastName, email, token) {
        const fName = firstName + " " + lastName;
        const tranceporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: config.emailUser,
                pass: config.emailPassword
            }
        })
        const mailOptions = {
            from: config.emailUser,
            to: email,
            subject: "For reset password.",
            html: `<div style="padding: 15px; font-weight: 500; margin: auto; width: 350px; font-family:Verdana, Arial, Helvetica, sans-serif; background-image: url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWF03kZnDjGVVkHcpC1IxweHKvcPf8n-XU6Q&usqp=CAU); background-repeat: no-repeat; background-size: cover; border-radius: 15px;">
            <h2 style="text-align: center;">Verification code</h2>
            <p>Hello ${fName}, Please use the verification code below to sign in.</p>
            <h4>${token}</h4>
            <p>If you didn’t request this, you can ignore this email.</p>
            <p>Thanks,</p>
        </div>`
        }
        tranceporter.sendMail(mailOptions, function (error) {
            if (error) {
                console.log(error);
            } else {
                console.log("Mail has been sent at " + email);
            }
        });
    },

    // User register.
    async register(req, res) {
        const findOneUser = await repository.findOneUserDetails(req);
        const findOneUserAddress = await repository.findOneUserAddressDetails(req);
        if (findOneUser || findOneUserAddress) {
            return res.status(400).json({
                'message': 'This user is already registerd.',
                success: false,
                status: 400
            });
        } else {
            // Hashed register password
            const salt = await bcrypt.genSalt(10);
            const hashedRegisterPswd = await bcrypt.hash(req.body.password, salt);
            const userData = await repository.registerUserDetail(req, hashedRegisterPswd);
            const userId = userData.id;
            const userAddressData = await repository.registerUserAddressDetail(req, userId);
            if (userData && userAddressData) {
                return res.status(200).json({
                    'message': 'Reistration successfully.',
                    success: true,
                    status: 200
                });
            } else {
                return res.status(process.env.UNSUCCESSFULL).json({
                    'message': 'Something went wrong.',
                    success: false,
                    status: process.env.UNSUCCESSFULL
                });
            }
        }
    },

    // User log-in.
    async login(req, res) {
        const loginData = await repository.LoginUser(req)

        if (loginData) {
            bcrypt.compare(req.body.password, loginData.password, (err, result) => {
                if (err) {
                    return res.status(process.env.UNSUCCESSFULL).json({
                        "message": "Invalid login details.",
                        success: false,
                        status: process.env.UNSUCCESSFULL
                    });
                }
                if (result) {

                    // JWT token generate.
                    const token = jwt.sign({
                        id: loginData.id
                    },
                        process.env.JWT_SECRET_KEY,
                        {
                            expiresIn: "5 days"
                        }
                    );
                    return res.status(200).json({
                        "message": "Login successfull.",
                        success: true,
                        token,
                        status: 200
                    });
                } else {
                    return res.status(400).json({
                        "message": "Invalid login details.",
                        success: false,
                        status: 400
                    });
                }
            });
        } else {
            return res.status(400).json({
                "message": "Invalid login details.",
                success: false,
                status: 400
            });
        }
    },

    // Update password.
    async updatePassword(req, res) {
        const dataForPassUpdate = await repository.findDataForPasswordUpdate(req);
        if (dataForPassUpdate) {
            // Hash password.
            const hashPwdForPwUpdate = await bcrypt.hash(req.body.password, 10);
            const passwordUpdateDone = await repository.passwordUpdate(req, hashPwdForPwUpdate);
            if (passwordUpdateDone) {
                return res.status(200).json({
                    "message": "Password updated successfully.",
                    status: 200,
                    success: true
                });
            } else {
                return res.status(400).json({
                    "message": "Password not updated.",
                    status: 400,
                    success: false
                });
            }
        } else {
            return res.status(404).json({
                "message": "Please registerd first.",
                status: 404,
                success: false
            });
        }
    },

    // Show user profile.
    async profile(req, res) {

        const userData = await repository.findUserDetail(req);
        const userAddressData = await repository.findUserAddressDetail(req);

        if (userData && userAddressData) {
            var combinedData = {
                userAddressData,
                userAddressData
            }
            return res.status(200).json({
                combinedData,
                success: true,
                status: 200
            });
        } else {
            res.status(400).json({
                success: false,
                status: 400
            });
        }
    },

    // Update user profile.
    async updateProfile(req, res) {
        // Password hash.
        var hashedPassForProfileUpdate = await bcrypt.hash(req.body.password, 10);

        const updateUserDetailData = await repository.updateUserDetail(req, hashedPassForProfileUpdate);
        const updateUserAddressDetailData = await repository.updateUserAddressDetail(req);

        if (updateUserDetailData && updateUserAddressDetailData) {
            return res.status(process.env.SUCCESSFULL).json({
                "message": "Profile updated successfully.",
                success: true,
                status: process.env.SUCCESSFULL
            });
        } else {
            return res.status(process.env.UNSUCCESSFULL).json({
                "message": "Something went wrong.",
                success: false,
                status: process.env.UNSUCCESSFULL
            });
        }
    },

    // Destroy user profile.
    async deleteProfile(req, res) {
        const DestroyUserDetailData = await repository.DestroyUserDetail(req);
        const DestroyUserAddressDetailData = await repository.DestroyUserAddressDetail(req);

        if (DestroyUserDetailData && DestroyUserAddressDetailData) {
            res.status(200).json({
                "message": "User profile deleted successfull.",
                success: true,
                status: 200
            });
        } else {
            res.status(400).json({
                "message": "Something went wrong.",
                success: false,
                status: 400
            });
        }
    },

    // Forget password.
    async forgetPassword(req, res) {
        const findDataByemail = await repository.findDataForForget(req);
        if (findDataByemail) {
            const randomString = randomstring.generate({
                length: 8,
                charset: 'numeric'
            });
            const hashedPd = await bcrypt.hash(randomString, 10);
            const updatePswdData = await repository.updatePasswordByMail(req, hashedPd);
            if (updatePswdData) {
                UserController.sentMail(findDataByemail.firstName, findDataByemail.lastName, findDataByemail.email, randomString);
                return res.status(200).json({
                    "message": "Please check your email and get your new password.",
                    success: true,
                });
            }
        } else {
            return res.status(400).json({
                "message": "This email does not exists.",
                success: false,
                status: 400
            })
        }
    }
}

module.exports = UserController;