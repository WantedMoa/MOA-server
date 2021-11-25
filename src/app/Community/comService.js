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

exports.createPost = async function(userId, pictureUrl, deadline, title, startDate, endDate, content) {
    try {
        const connection = await pool.getConnection(async(conn) => conn);
        const insertPostParams = [userId, pictureUrl, deadline, title, startDate, endDate, content]
        const insertPostResult = await comDao.insertPost(connection, insertPostParams);


        connection.release();
        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - insertPost Service error\n: ${err.message}`);
        return baseResponse.DB_ERROR;
    }
}