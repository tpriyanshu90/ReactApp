var nodemailer = require('nodemailer');			//this package will send emails
var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
    response = {
        Name: req.query.Name,
        Email: req.query.Email,
        Subject: req.query.Subject,
        Message: req.query.Message
    };
    console.log("data submitted");
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'realtp9@gmail.com',
                pass: '***********'
            }
        });

        var mailOptions = {
            from: 'realtp9@gmail.com',
            to: 'tpriyanshu90@gmail.com',
            subject: 'React App Contact',
            html: '<p style="color:red;">A visitor has contacted ReactApp</p><br />'+'<span> Name :'+response.Name+'</span><br />'+'<span>Email : '+response.Email+'</span><br />'+'<span>Subject : '+response.Subject+'</span><br /><span>'+'<span>Your Message : '+response.Message+'</span><br /></span>'
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
                res.json({
                    "msg" : 0
                });
            } else {
                console.log('Email sent: ' + info.response);
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify({ a: 1 }));
            }
        });
});

module.exports = router;
