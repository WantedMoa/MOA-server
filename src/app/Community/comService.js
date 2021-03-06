const { logger } = require("../../../config/winston");
const { pool } = require("../../../config/database");
const secret_config = require("../../../config/secret");
const userProvider = require("../User/userProvider");
const comProvider = require("./comProvider");
const comDao = require("./comDao");
const baseResponse = require("../../../config/baseResponseStatus");
const { response } = require("../../../config/response");
const { errResponse } = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { connect } = require("http2");

// Service: Create, Update, Delete 비즈니스 로직 처리

exports.createRecruit = async function(userIdx, pictureUrl, deadline, title, startDate, endDate, content) {
    try {
        const connection = await pool.getConnection(async(conn) => conn);
        const insertPostParams = [userIdx, pictureUrl, deadline, title, startDate, endDate, content]
        const insertPostResult = await comDao.insertRecruit(connection, insertPostParams);

        const recruitIdx = insertPostResult.insertId;

        // 팀 개설
        const createTeam = await comDao.insertTeam(connection, recruitIdx, userIdx);

        // for (positionIdx of position) {
        //     var insertRecruitPosionResult = await comDao.insertRecruitPosition(connection, recruitIdx, positionIdx);
        // }

        connection.release();
        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - insert Recruit Service error\n: ${err.message}`);
        return baseResponse.DB_ERROR;
    }
}

exports.createApply = async function(recruitIdx, userIdx, title, content) {
    const connection = await pool.getConnection(async(conn) => conn);
    const insertApplyParams = [recruitIdx, userIdx, title, content];
    const insertApplyResult = await comDao.insertApply(connection, insertApplyParams);

    connection.release();
    return response(baseResponse.SUCCESS);
}

exports.createTeam = async function(recruitIdx, userIdx) {
    const connection = await pool.getConnection(async(conn) => conn);
    const insertTeamResult = await comDao.insertTeam(connection, recruitIdx, userIdx);

    connection.release();
    return response(baseResponse.SUCCESS);
}