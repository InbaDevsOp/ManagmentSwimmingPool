nodemailer = require('nodemailer');
  var transporter = nodemailer.createTransport('direct');

    transporter.sendMail({
          from: 'Fred Foo <foo@blurdybloop.com>',
          to: 'felipe.alfarom@usach.cl',
          subject: 'hello',
          text: 'hello world!'
      }, function(err, response) {
            console.log(err || response);
        });
