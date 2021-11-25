const { logger } = require("../../../config/winston");
const { pool } = require("../../../config/database");
const secret_config = require("../../../config/secret");
const userProvider = require("./userProvider");
const userDao = require("./userDao");
const baseResponse = require("../../../config/baseResponseStatus");
const { response } = require("../../../config/response");
const { errResponse } = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { connect } = require("http2");

// Service: Create, Update, Delete 비즈니스 로직 처리

//이메일 인증
exports.postEmailVerify = async function(email) {
    try {
        // 이메일 여부 확인
        const emailRows = await userProvider.emailVerifyCheck(email);
        if (emailRows.length > 1) {
            //update
            const connection = await pool.getConnection(async(conn) => conn);
            const emailVerifyResult = await userDao.updateEmailVerify(
                connection,
                email
            );
            connection.release();
        } else {
            //create
            const connection = await pool.getConnection(async(conn) => conn);
            const emailVerifyResult = await userDao.insertEmailVerify(
                connection,
                email
            );
            connection.release();
        }
        return response({ message: "이메일 인증이 완료되었습니다" });
    } catch (err) {
        logger.error(`App - EmailVerify Service error\n: ${err.message}`);
        return errResponse({ message: "이메일 인증에 실패했습니다" });
    }
};

exports.createUser = async function(email, password, name, position) {
    try {
        // 대학 이메일인지 확인
        emailaddress = email.split('@')[1];

        const emailRows = await userProvider.emailUnivCheck(emailaddress);
        if (emailRows.length < 1)
            return errResponse(baseResponse.UNIV_NOT_EXIST);
        universityIdx = emailRows[0].universityIdx;

        // 비밀번호 암호화
        const hashedPassword = await crypto
            .createHash("sha512")
            .update(password)
            .digest("hex");

        const insertUserInfoParams = [email, hashedPassword, universityIdx, name, position];

        const connection = await pool.getConnection(async(conn) => conn);

        const userIdResult = await userDao.insertUserInfo(connection, insertUserInfoParams);
        console.log(`추가된 회원 : ${userIdResult[0].insertId}`)
        connection.release();
        return response(baseResponse.SUCCESS);


    } catch (err) {
        logger.error(`App - createUser Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};