const baseResponse = require("../../../config/baseResponseStatus");
const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");
const { response, errResponse } = require("../../../config/response");

const comDao = require("./comDao");

// Provider: Read 비즈니스 로직 처리
exports.retrieveRecruits = async function(userId) {
    const connection = await pool.getConnection(async(conn) => conn);
    try {

        const recruitListResult = await comDao.selectRecruit(connection);

        for (recruit of recruitListResult) {
            let positionResult = await comDao.selectRecruitPosition(connection, recruit.recruitIdx);
            let position = new Array();
            for (result of positionResult) {
                position.push(result.positionName);
            }
            recruit.position = position;
        }

        connection.release();
        return recruitListResult;

    } catch (err) {
        logger.error(`App - retrieveRecruits Error\n: ${err.message}`);
        await connection.rollback();
        connection.release();
        return errResponse(baseResponse.DB_ERROR);
    }
};


exports.retrieveRecruitById = async function(userId, recruitId) {
    const connection = await pool.getConnection(async(conn) => conn);
    try {
        const recruitResult = await comDao.selectRecruitById(connection, recruitId);

        const positionResult = await comDao.selectRecruitPosition(connection, recruitId);
        let position = new Array();
        for (result of positionResult) {
            position.push(result.positionName);

        }
        recruitResult[0].position = position;
        connection.release();
        return recruitResult[0];
    } catch (err) {
        logger.error(`App - retrieveRecruitById Error\n: ${err.message}`);
        await connection.rollback();
        connection.release();
        return errResponse(baseResponse.DB_ERROR);
    }

}