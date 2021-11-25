const baseResponse = require("../../../config/baseResponseStatus");
const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");
const { response, errResponse } = require("../../../config/response");

const comDao = require("./comDao");

// Provider: Read 비즈니스 로직 처리
exports.retrievePosts = async function(userId) {
    try {
        const connection = await pool.getConnection(async(conn) => conn);
        const postListResult = await comDao.selectPost(connection);
        connection.release();
        return postListResult;

    } catch (err) {
        logger.error(`App - retrievePost Error\n: ${err.message}`);
        await connection.rollback();
        connection.release();
        return errResponse(baseResponse.DB_ERROR);
    }
};


exports.retrievePostById = async function(userId, postId) {
    const connection = await pool.getConnection(async(conn) => conn);
    try {
        const postResult = await comDao.selectPostById(connection, postId);
        connection.release();
        return postResult;
    } catch (err) {
        logger.error(`App - retrievePostById Error\n: ${err.message}`);
        await connection.rollback();
        connection.release();
        return errResponse(baseResponse.DB_ERROR);
    }

}