const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const homeDao = require("./homeDao");

// Provider: Read 비즈니스 로직 처리

exports.getContestList = async function () {
  const connection = await pool.getConnection(async (conn) => conn);
  const contestListResult = await homeDao.selectContest(connection);
  connection.release();

  return contestListResult;

};

exports.getUserList = async function (userIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  const userListResult = await homeDao.selectPopularUser(connection, userIdx);
  connection.release();

  return userListResult;

};

exports.getPmList = async function (userIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  const userListResult = await homeDao.selectPm(connection, userIdx);
  connection.release();

  return userListResult;

};

exports.getDeveloperList = async function (userIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  const userListResult = await homeDao.selectDeveloper(connection, userIdx);
  connection.release();

  return userListResult;

};

exports.getDesignerList = async function (userIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  const userListResult = await homeDao.selectDesigner(connection, userIdx);
  connection.release();

  return userListResult;

};

exports.getMarketerList = async function (userIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  const userListResult = await homeDao.selectMarketer(connection, userIdx);
  connection.release();

  return userListResult;

};

exports.getRecruitList = async function () {
  const connection = await pool.getConnection(async (conn) => conn);
  const recruitListResult = await homeDao.selectRecruit(connection);
  
  for(let i = 0; i < recruitListResult.length; i++){
    let result = await homeDao.selectRecruitDetail(connection, recruitListResult[i].recruitIdx);
    let tagArr = new Array();
    for(let j = 0; j < result.length; j++){
      tagArr.push(result[j].positionName);
    }
    recruitListResult[i].tag = tagArr;
  }
  connection.release();

  return recruitListResult;

};