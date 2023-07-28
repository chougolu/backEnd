const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var randomstring = require("randomstring");
const nodemailer = require('nodemailer');
const config = require('../config/config')
const repository = require('../repository/userRepository');
const registerValSchema = require('../middlewares/validation/registerValidation');
const loginValSchema = require('../middlewares/validation/loginValidation');
const forgetSchema = require('../middlewares/validation/forgetValidation')
const resetValSchema = require('../middlewares/validation/resetValidation');
const profileUpValSchema = require('../middlewares/validation/profileUpValidation');

UserController = {

    // Send mail for reset password.
    async sentMail(firstName, lastName, email, otp) {
        const fullname = firstName + " " + lastName;
        const tranceporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: config.emailUser,
                pass: config.emailPassword
            }
        });
        const mailOptions = {
            from: config.emailUser,
            to: email,
            subject: "For reset password.",
            html: `<div style="padding: 15px; font-weight: 500; margin: auto; width: 350px; font-family:Verdana, Arial, Helvetica, sans-serif; background-image: url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWF03kZnDjGVVkHcpC1IxweHKvcPf8n-XU6Q&usqp=CAU); background-repeat: no-repeat; background-size: cover; border-radius: 15px;">
            <h2 style="text-align: center;">Verification code</h2>
            <p>Hello ${fullname}, Please use the verification code below to sign in.</p>
            <h4>${otp}</h4>
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

        // Validate the request body against the schema
        const { error } = registerValSchema.validate({
            email: req.body.email,
            mobile: req.body.mobile,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password,
            telephone: req.body.telephone,
            address_line_1: req.body.address_line_1,
            address_line_2: req.body.address_line_2,
            city: req.body.city,
            country: req.body.country,
            postal_code: req.body.postal_code
        });
        if (error) {
            // Return validation error message
            return res.status(400).json({ message: error.details[0].message, status: 400 });
        }

        if (req.body.telephone == req.body.mobile) {
            return res.json({
                "message": "Mobile and telephone number should be separate.",
                success: false,
                status: 400
            });
        } else {
            const findOneUser = await repository.findOneUserDetails(req);
            const findOneUserAddress = await repository.findOneUserAddressDetails(req);
            if (findOneUser || findOneUserAddress) {
                return res.json({
                    'message': 'Email or Mobile or Telephone is already exists.',
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
                        'message': 'Registration successfully.',
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
        }
    },

    // User log-in.
    async login(req, res) {
        // Validate the request body against the schema
        const { error } = loginValSchema.validate(req.body);
        if (error) {
            // Return validation error message
            return res.status(400).json({ message: error.details[0].message });
        }

        const loginData = await repository.LoginUser(req);
        if (loginData) {
            bcrypt.compare(req.body.password, loginData.password, (err, result) => {
                if (err) {
                    return res.json({
                        "message": "Invalid login details.",
                        success: false
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
                    return res.json({
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
        // Validate the request body against the schema
        const { error } = resetValSchema.validate(req.body);
        if (error) {
            // Return validation error message
            return res.status(400).json({ message: error.details[0].message, status: 400 });
        }
        const dataForPassUpdate = await repository.findDataForPasswordUpdate(req);
        if (dataForPassUpdate) {
            const passwordMatch = await bcrypt.compare(req.body.newPassword, dataForPassUpdate.password);
            if (passwordMatch) {
                return res.status(200).json({
                    "message": "This password is already exists.",
                    status: 200,
                    success: false
                });
            } else {
                const hashPwdForPwUpdate = await bcrypt.hash(req.body.newPassword, 10);
                const passwordUpdateDone = await repository.passwordUpdate(req, hashPwdForPwUpdate);
                if (passwordUpdateDone == 1) {
                    return res.status(200).json({
                        "message": "Password reset successfully.",
                        status: 200,
                        success: true
                    });
                }
            }
        }
    },

    // Show user profile.
    async profile(req, res) {
        const userData = await repository.findUserDetail(req);
        const userAddressData = await repository.findUserAddressDetail(req);
        if (userData && userAddressData) {
            var combinedData = {
                userData,
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
        if (req.body.mobile === req.body.telephone) {
            return res.status(400).json({
                "message": "Mobile and telephone number should be separate.",
                success: false,
                status: 400
            });
        } else {
            // Validate the request body against the schema
            const { error } = profileUpValSchema.validate({
                email: req.body.email,
                firstName: req.body.firstName,
                mobile: req.body.mobile,
                lastName: req.body.lastName,
                address_line_1: req.body.address_line_1,
                city: req.body.city,
                address_line_2: req.body.address_line_2,
                country: req.body.country,
                telephone: req.body.telephone,
                postal_code: req.body.postal_code
            });

            if (error) {
                // Return validation error message
                return res.status(400).json({ message: error.details[0].message });
            }

            const findByEmailAndTelephoneData = await repository.findUserByEmailAndTelephone(req);
            const findByEmailData = await repository.findUserByEmail(req);
            const findByTelephoneData = await repository.findUserByTelephone(req);

            const findUserByMobileData = await repository.findUserByMobile(req);
            const userData = await repository.findUserDetail(req);
            const userAddressData = await repository.findUserAddressDetail(req);

            // const userUpdateCode = async () => {
                const updateUserDetailData = await repository.updateUserDetail(req);
                const updateUserAddressDetailData = await repository.updateUserAddressDetail(req);
                if (updateUserDetailData && updateUserAddressDetailData) {
                    return res.status(200).json({
                        "message": "Profile updated successfully.",
                        success: true,
                        status: 200
                    });
                } else {
                    return res.json({
                        "message": "Something went wrong.",
                        success: false,
                        status: 400
                    });
                }
            // };

            // // 1
            // if (req.body.email !== userData.email &&
            //     req.body.telephone !== userData.telephone &&
            //     req.body.mobile !== userAddressData.mobile) {
            //     await userUpdateCode();
            // } 
            // // 6
            // else if (req.body.email === userData.email &&
            //     req.body.telephone === userData.telephone &&
            //     req.body.mobile === userAddressData.mobile) {
            //     await userUpdateCode();
            // } 
            // else if (req.body.email !== findByEmailData.email &&
            //     req.body.telephone !== findByTelephoneData.telephone &&
            //     (req.body.mobile === findUserByMobileData.mobile)) {
            //     return res.json({
            //         "message": "This mobile number is already exists.",
            //         success: false,
            //         status: 400
            //     });

            //     // right way follow this.

            // } else if (req.body.email === findByEmailData.email &&
            //     req.body.telephone !== findByEmailData.telephone &&
            //     (req.body.mobile !== findUserByMobileData.mobile)) {
            //     return res.json({
            //         "message": "This email address is already exists.",
            //         success: false,
            //         status: 400
            //     });

            // } else if (req.body.email !== findByTelephoneData.email &&
            //     req.body.telephone === findByTelephoneData.telephone &&
            //     (req.body.mobile !== findUserByMobileData.mobile)) {
            //     return res.json({
            //         "message": "This telephone number is already exists.",
            //         success: false,
            //         status: 400
            //     });
            // } else {
            //     return res.json({
            //         "message": "Something went wrong.",
            //         success: false,
            //         status: 400
            //     });
            // }



            // if (findByEmailAndTelephoneData === null && findUserByMobileData === null) {
            //     await userUpdateCode();
            // } else if (
            //     findByEmailAndTelephoneData !== null &&
            //     findByEmailAndTelephoneData.email === userData.email &&
            //     findByEmailAndTelephoneData.telephone === userData.telephone &&
            //     findUserByMobileData !== null &&
            //     findUserByMobileData.mobile === userAddressData.mobile
            // ) {
            //     await userUpdateCode();
            // } else if (
            //     findByEmailAndTelephoneData !== null &&
            //     findByEmailAndTelephoneData.email === userData.email &&
            //     findByEmailAndTelephoneData.telephone === userData.telephone &&
            //     (findUserByMobileData !== null || findUserByMobileData.mobile !== userAddressData.mobile)
            // ) {
            //     return res.json({
            //         "message": "This mobile number is already exists.",
            //         success: false,
            //         status: 400
            //     });
            // } else if (
            //     findByEmailAndTelephoneData !== null &&
            //     (findByEmailAndTelephoneData.email !== userData.email ||
            //     findByEmailAndTelephoneData.telephone !== userData.telephone) &&
            //     (findUserByMobileData !== null && findUserByMobileData.mobile === userAddressData.mobile)

            // ) {
            //     return res.json({
            //         "message": "This email or telephone number is already exists.",
            //         success: false,
            //         status: 400
            //     });
            // } else {
            //     return res.json({
            //         "message": "This user is already exists.",
            //         success: false,
            //         status: 400
            //     });
            // }
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
        // Validate the request body against the schema
        const { error } = forgetSchema.validate(req.body);
        if (error) {
            // Return validation error message
            return res.status(400).json({ message: error.details[0].message });
        }
        const findDataByemail = await repository.findDataForForget(req);
        if (findDataByemail) {
            const otp = randomstring.generate({
                length: 8,
                charset: 'numeric'
            });
            const hashedPd = await bcrypt.hash(otp, 10);
            const updatePswdData = await repository.updatePasswordByMail(req, hashedPd);
            if (updatePswdData) {
                UserController.sentMail(findDataByemail.firstName, findDataByemail.lastName, findDataByemail.email, otp);
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
            });
        }
    }
}

module.exports = UserController;