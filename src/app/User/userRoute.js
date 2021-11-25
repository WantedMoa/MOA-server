module.exports = function(app) {
    const user = require('./userController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 테스트 API
    // app.get('/app/test', user.getTest)

    // 이메일 인증 전송 API
    app.post("/app/email-send", user.sendEmail);

    // 이메일 인증 확인 API
    app.get("/app/email-check", user.emailVerify);

};