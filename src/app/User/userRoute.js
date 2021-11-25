module.exports = function(app) {
    const user = require('./userController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 이메일 인증 전송 API
    app.post("/app/email-send", user.sendEmail);

    // 이메일 인증 확인 API
    app.get("/app/email-check", user.emailVerify);

    // 회원가입 - 이메일 체크 API
    app.post("/app/users/check", user.postEmailCheck);

    // 유저 생성(회원가입) API
    app.post("/app/users", user.postUser);

    // 로그인 API
    app.post("/app/login", user.login);

};