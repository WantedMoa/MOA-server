const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const myPageDao = require("./myPageDao");

// Provider: Read 비즈니스 로직 처리

exports.getProfileList = async function (userIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  const profileListResult = await myPageDao.selectProfile(connection, userIdx);
  connection.release();

  return profileListResult;

};

exports.getTeamList = async function (userIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  const teamListResult = await myPageDao.selectTeam(connection, userIdx);

  for(let i = 0; i < teamListResult.length; i++){
    let memberListResult = await myPageDao.selectMember(connection, teamListResult[i].recruitIdx, userIdx);
    teamListResult[i].member = memberListResult;
  }
  connection.release();

  return teamListResult;

};


exports.getMemberList = async function (recruitIdx, reviewerIdx, userIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  const checkListResult = await myPageDao.selectCheck(connection, recruitIdx, reviewerIdx, userIdx);
  connection.release();

  return checkListResult;

};

exports.getReviewList = async function (recruitIdx, userIdx, reviewerIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  const checkListResult = await myPageDao.selectCheckReview(connection, recruitIdx, userIdx, reviewerIdx);
  connection.release();

  return checkListResult;

};