"# sequelize_api" 
"# sequelize_api" 
sequelize_api(MVC pattern) : using mysql, sequelize and node.js

API'S(Separate model's query from controller)-

1) User-
     Register, login, show-profile, edit / update / delete-profile
     password-update 
     forget password(Send the otp at user registerd mail address then login)
     Profile image upload - using multer
     Validation(before user registration and login) - joi(done)

2) Category-
     Add / show(pagination) / edit / update / delete-category
     Validation(before category add and update) - joi(done)

3) Product-
     Add / show(pagination) / edit / update / delete-product
     Product image upload - using multer
     Validation(before product add and update) - joi(done)

4) OrderItems-
     Add / show(get orderDtails and user details using one-to-one) / edit / update / delete-category
     Validation(before product add and update) - joi(done)
     Validation(before order item add and update) - joi(done)

5) OrderDetails-
     Add / show(get user details using one-to-one) / edit / update / delete-category
     Validation(before order detail add and update) - joi(done)

Use :- multer, nodemailer, randomstring, body-parser, bcrypt-hash/compaire, jsonwebtoken, dotenv, express, mysql2, sequelize, nodemon, joi
