const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const recommendDao = require("./recommendDao");

// Provider: Read 비즈니스 로직 처리

exports.getRecruitList = async function (userIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  const recruitListResult = await recommendDao.selectRecruit(connection,userIdx);

  for(let i = 0; i < recruitListResult.length; i++){
    let result = await recommendDao.selectRecruitDetail(connection, recruitListResult[i].recruitIdx);
    let tagArr = new Array();
    for(let j = 0; j < result.length; j++){
      tagArr.push(result[j].positionName);
    }
    recruitListResult[i].tag = tagArr;
  }
  connection.release();

  return recruitListResult;

};

exports.getRecommedList = async function (recruitIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  const userListResult = await recommendDao.selectUser(connection, recruitIdx);
  connection.release();

  return userListResult;

};
