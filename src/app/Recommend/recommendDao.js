// 내가 등록한 공고 조회
async function selectRecruit(connection, userIdx) {
  const selectRecruitListQuery = `
        SELECT recruit.recruitIdx, pictureUrl, title, date_format(startDate, '%m/%d') as startDate, date_format(endDate,'%m/%d') as endDate
        FROM recruit
        WHERE NOW() <= deadline AND userIdx = ?;
                `;
  const [recruitRows] = await connection.query(selectRecruitListQuery, userIdx);
  return recruitRows;
}

// 팀원 추천
async function selectUser(connection, recruitIdx) {
  const selectUserListQuery = `
        SELECT User.userIdx, User.profileImg, User.name FROM User
        WHERE User.positionIdx IN (SELECT positionIdx FROM recruitposition WHERE recruitIdx = ?) AND
              User.rating >= 2 AND NOT User.userIdx = (SELECT userIdx FROM recruit WHERE recruitIdx = ?)
                AND NOT User.userIdx IN (SELECT userIdx FROM Team WHERE recruitIdx = ?) LIMIT 20;
                `;

  const params = [recruitIdx, recruitIdx, recruitIdx];
  const [userRows] = await connection.query(selectUserListQuery, params);
  return userRows;
}

// 내가 등록한 공고 태그 조회
async function selectRecruitDetail(connection, recruitIdx) {
  const selectRecruitListQuery = `
        SELECT positionName FROM position
        JOIN recruitposition on recruitposition.positionIdx = position.positionIdx
        WHERE recruitIdx = ?;
                `;
  const [recruitRows] = await connection.query(selectRecruitListQuery, recruitIdx);
  return recruitRows;
}

module.exports = {
  selectRecruit,
  selectUser,
  selectRecruitDetail
};
