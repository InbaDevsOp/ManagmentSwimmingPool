var nodemailer = require("nodemailer");
var express=require("express");
var app=express();
/*
Here we are configuring our SMTP Server details.
STMP is mail server which is responsible for sending and recieving email.
*/
var smtpTransport = nodemailer.createTransport("SMTP",{
	service: "Gmail",
	auth: {
		user: "contactopiscinatemperada@gmail.com",
		pass: "recepcionpot2014"
	}
});
/*------------------SMTP Over-----------------------------*/

/*------------------Routing Started ------------------------*/

app.get('/',function(req,res){
	res.sendfile('contacto.html');
});

app.get('/send',function(req,res){
	var mailOptions={
		to : "recepcionpot@cordesan.cl",
		subject : req.query.subject,
		text : req.query.text
	}
	console.log(mailOptions);
	smtpTransport.sendMail(mailOptions, function(error, response){
		if(error){
			console.log(error);
			res.end("error");
		}
		else{
			console.log("Message sent: " + response.message);
			res.end("sent");
		}
	});
});

/*--------------------Routing Over----------------------------*/

app.listen(3000,function(){
console.log("Express Started on Port 3000");
});


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
