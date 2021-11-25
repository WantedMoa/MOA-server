const nodemailer = require('nodemailer');

const smtpTransport = nodemailer.createTransport({
    service: "Naver",
    auth: {
        user: "yeonns2@naver.com",
        pass: "wjddus1687"
    },
    tls: {
        rejectUnauthorized: false
    }
});

module.exports = {
    smtpTransport
}