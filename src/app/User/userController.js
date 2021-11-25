const jwtMiddleware = require("../../../config/jwtMiddleware");
const userProvider = require("../../app/User/userProvider");
const userService = require("../../app/User/userService");
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const { smtpTransport } = require("../../../config/email.js");
const regexEmail = require("regex-email");
const { emit } = require("nodemon");


/**
 * API No.
 * API Name : 인증 메일 전송 API
 * [GET] /app/email-check
 */
exports.sendEmail = async function(req, res) {
    const email = req.body.email;

    // 빈 값 체크
    if (!email) return res.send(response(baseResponse.SIGNUP_EMAIL_EMPTY));
    // 길이 체크
    if (email.length > 30)
        return res.send(response(baseResponse.SIGNUP_EMAIL_LENGTH));
    // 형식 체크 (by 정규표현식)
    if (!regexEmail.test(email))
        return res.send(response(baseResponse.SIGNUP_EMAIL_ERROR_TYPE));

    // 대학 이메일인지 확인
    emailaddress = email.split('@')[1];

    const emailRows = await userProvider.emailVerifyCheck(emailaddress);
    if (emailRows.length < 1)
        return res.send(errResponse(baseResponse.UNIV_NOT_EXIST));

    // 이메일 중복인지
    const userRows = await userProvider.emailCheck(email);

    if (userRows.length > 0)
        return res.send(errResponse(baseResponse.SIGNUP_REDUNDANT_EMAIL));


    const mailOptions = {
        from: "yeonns2@naver.com",
        to: email,
        subject: "[MOA]회원가입 이메일 인증 메일입니다.",
        html: `<html><head></head><body><h3>MOA 가입을 위해 이메일 인증을 진행해주세요. <h3><a href="http://127.0.0.1:3000/app/email-check?email=${email}" rel="noreferrer noopener" target="_blank">이메일 인증</a></body></html>`,
    };

    const result = await smtpTransport.sendMail(
        mailOptions,
        (error, responses) => {
            if (error) {
                res.send(errResponse(baseResponse.SIGNUP_SENDEMAIL_FAIL));
            } else {
                res.send(response(baseResponse.SUCCESS));
            }
            smtpTransport.close();
        }
    );
    return;
};

/**
 * API No.
 * API Name : 메일 인증 확인 API
 * [GET] /app/email-check
 */
exports.emailVerify = async function(req, res) {
    const email = req.query.email;

    const emailVerifyResponse = await userService.postEmailVerify(email);
    return res.send(emailVerifyResponse);
};