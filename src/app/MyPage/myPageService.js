const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const myPageProvider = require("./myPageProvider");
const myPageDao = require("./myPageDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {connect} = require("http2");

// Service: Create, Update, Delete 비즈니스 로직 처리


exports.postReviewList = async function(recruitIdx, userIdx, reviewerIdx, rating, content) {
    try {
        const connection = await pool.getConnection(async(conn) => conn);
        const insertPostParams = [recruitIdx, userIdx, reviewerIdx, rating, content]
        const insertPostResult = await myPageDao.insertReview(connection, insertPostParams);

        connection.release();
        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - insert Review Service error\n: ${err.message}`);
        return baseResponse.DB_ERROR;
    }
}