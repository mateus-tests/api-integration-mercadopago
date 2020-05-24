const nodemailer = require("nodemailer");
require('../config/getEnv');

let transporter = nodemailer.createTransport({
    host : "smtp.gmail.com",
    port : 587,
    secure : false,
    auth : {
        user : process.env.EMAIL,
        pass : process.env.EMAIL_PASSWORD
    }
});

module.exports = {
    add : {
        async email(req, res, next){
            const { email, token, nickName } = req.body;
            console.log(email);
            console.log(token);
            console.log(nickName);
            const response = await transporter.sendMail({
                from : `RpgZone <${process.env.EMAIL}>`,
                to : `${email}`,
                subject : "Email confirmation for sign up into Rpg Zone",
                text : `Hello new user with name of ${nickName}, nice meet to you, this email are  confirmation email for sign up on to rpg Zone`,
                html : `<p>Hello new user with name of ${nickName}, nice meet to you, this email are  confirmation email for sign up on to rpg Zone The link for to be approved sign up in rpgZone is => </p></br><a href='https://mateus-tests.github.io/rpgzoneFront/signup.html?token=${token}'>Here same!!!</a>`
            }).catch(err => {
                console.log(err);
                res.json({status : 400});
            });
            console.log(response);
            res.json({status : 200});
        },
    }
}