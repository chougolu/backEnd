const db = require('../models/index');
const { Op } = require("sequelize");
const User = db.user;
const UserAddress = db.useraddress;

userRepository = {

    //Insert user details
    registerUserDetail(req, hashedRegisterPswd) {

        const userDetail = ({
            email: req.body.email,
            password: hashedRegisterPswd,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            telephone: req.body.telephone,
        });

        if(req.file && req.file.filename){
            userDetail.profileImg = req.file.filename;
        }

        var userDetailRes = User.create(userDetail);
        return userDetailRes;
    },

    // Insert user address details
    registerUserAddressDetail(req, userId) {
        var userAddressDetailRes = UserAddress.create({
            userId,
            address_line_1: req.body.address_line_1,
            address_line_2: req.body.address_line_2,
            city: req.body.city,
            postal_code: req.body.postal_code,
            country: req.body.country,
            mobile: req.body.mobile
        });
        return userAddressDetailRes;
    },

    // Find one user details
    async findOneUserDetails(req) {
        const findUser = await User.findOne({
            where: {
                [Op.or]: [
                    { email: req.body.email },
                    { telephone: req.body.telephone }
                ]
            }
        });
        return findUser;
    },

    // Find one user address details
    async findOneUserAddressDetails(req) {
        const findUserAddress = await UserAddress.findOne({
            where: {
                mobile: req.body.mobile
            }
        });
        return findUserAddress;
    },

    // Login user
    async LoginUser(req) {
        const loginData = await User.findOne({
            where: {
                [Op.or]: [
                    { email: req.body.email },
                    { password: req.body.password }
                ]
            }
        });
        return loginData;
    },

    // Find user data for password update.
    async findDataForPasswordUpdate(req) {
        const dataForPassUpdate = await User.findOne({
            where: {
                id: req.params.id
            }
        });
        return dataForPassUpdate;
    },

    // Finally password update
    async passwordUpdate(req, hashPwdForPwUpdate) {
        const passwordUpdateDone = await User.update({ password: hashPwdForPwUpdate }, {
            where: {
                id: req.params.id
            }
        });
        return passwordUpdateDone;
    },

    // Find user details for profile 
    async findUserDetail(req) {
        const userData = await User.findOne({
            where: {
                id: req.user.id
            }
        });
        return userData;
    },

    // Find user address details for profile 
    async findUserAddressDetail(req) {
        const userAddressData = await UserAddress.findOne({
            where: {
                id: req.user.id
            }
        });
        return userAddressData;
    },

    // Find user by email and telephone
    async findUserByEmailAndTelephone(req) {
        const findByEmailAndTelephoneData = await User.findOne({
            where: {
                [Op.or]: [
                    { email: req.body.email },
                    { telephone: req.body.telephone }
                ]
            }
        });
        return findByEmailAndTelephoneData;
    },

    // Find user by email 
    async findUserByEmail(req) {
        const findByEmailData = await User.findOne({
            where: { email: req.body.email }
        });
        return findByEmailData;
    },

    // Find user by telephone 
    async findUserByTelephone(req) {
        const findByTelephoneData = await User.findOne({
            where: { telephone: req.body.telephone }
        });
        return findByTelephoneData;
    },

    // Find user by mobile
    async findUserByMobile(req) {
        const findByMobileData = await UserAddress.findOne({
            where: {
                mobile: req.body.mobile
            }
        });
        return findByMobileData;
    },

    // Update user details
    async updateUserDetail(req) {
        const updateData = {
            email: req.body.email,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            telephone: req.body.telephone,
        };
    
        // Check if req.file exists and has the filename property
        if (req.file && req.file.filename) {
            updateData.profileImg = req.file.filename;
        }
    
        const options = {
            where: {
                id: req.user.id
            }
        };
    
        const updateUserDetail = await User.update(updateData, options);
        return updateUserDetail;
    },
    

    // Update user details
    async updateUserAddressDetail(req) {
        const updateUserAddressDetailData = await UserAddress.update({
            address_line_1: req.body.address_line_1,
            address_line_2: req.body.address_line_2,
            city: req.body.city,
            postal_code: req.body.postal_code,
            country: req.body.country,
            mobile: req.body.mobile
        },
            {
                where: {
                    id: req.user.id
                }
            });
        return updateUserAddressDetailData;
    },

    // Destroy user details.
    async DestroyUserDetail(req) {
        const DestroyUserDetailData = await User.destroy({
            where: {
                id: req.user.id
            }
        });
        return DestroyUserDetailData;
    },

    // Destroy user address details.
    async DestroyUserAddressDetail(req) {
        const DestroyUserAddressDetailData = await UserAddress.destroy({
            where: {
                userId: req.user.id
            }
        });
        return DestroyUserAddressDetailData;
    },

    // Find data for forget password
    async findDataForForget(req) {
        const findDataByemail = await User.findOne({
            where: {
                email: req.body.email
            }
        });
        return findDataByemail;
    },

    // Update password by e-mail
    async updatePasswordByMail(req, hashedPd) {
        const updatePswdData = await User.update({ password: hashedPd }, {
            where: {
                email: req.body.email
            }
        });
        return updatePswdData;
    }
}

module.exports = userRepository;