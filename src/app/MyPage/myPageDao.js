// 내가 등록한 공고 조회
async function selectProfile(connection, userIdx) {
  const selectProfileListQuery = `
        SELECT profileImg, name, email, u.universityName, rating, portfolio, experiance, bio FROM User
        JOIN university u on user.universityIdx = u.universityIdx
        WHERE user.userIdx = ?;
                `;
  const [profileRows] = await connection.query(selectProfileListQuery, userIdx);
  return profileRows;
}

// 나의 팀 조회
async function selectTeam(connection, userIdx) {
  const selectTeamListQuery = `
        SELECT recruit.recruitIdx, title, content FROM recruit
        LEFT JOIN team t on recruit.recruitIdx = t.recruitIdx
        WHERE recruit.userIdx = ? OR t.userIdx = ?;
                `;
  const params = [userIdx, userIdx];
  const [teamRows] = await connection.query(selectTeamListQuery, params);
  return teamRows;
}

// 나의 팀 팀원 조회
async function selectMember(connection, recruitIdx, userIdx) {
  const selectMemberListQuery = `
        SELECT userIdx, profileImg, name, rating
        FROM User
        WHERE userIdx IN (SELECT userIdx FROM team WHERE recruitIdx = ?)
          OR userIdx = (SELECT userIdx FROM recruit WHERE recruitIdx = ?) AND NOT userIdx = ?;
                `;
  const params = [recruitIdx, recruitIdx, userIdx];
  const [memberRows] = await connection.query(selectMemberListQuery, params);
  return memberRows;
}

// 리뷰를 위해 같은 팀이었는지 조회
async function selectCheck(connection, recruitIdx, userIdx, reviewerIdx) {
  const selectMemberListQuery = `
        SELECT title FROM recruit
        JOIN team t on recruit.recruitIdx = t.recruitIdx
        WHERE t.recruitIdx = ? AND recruit.userIdx = ? AND t.userIdx = ?;
                `;
  const params = [recruitIdx, userIdx, reviewerIdx];
  const [memberRows] = await connection.query(selectMemberListQuery, params);
  return memberRows;
}

// 이미 리뷰를 작성했는지 조회
async function selectCheckReview(connection, recruitIdx, userIdx, reviewerIdx) {
  const selectReviewListQuery = `
        SELECT content FROM teamreview
        WHERE recruitIdx = ? AND userIdx = ? AND reviewer = ?;
                `;
  const params = [recruitIdx, userIdx, reviewerIdx];
  const [reviewRows] = await connection.query(selectReviewListQuery, params);
  return reviewRows;
}

// 리뷰 작성
async function insertReview(connection, insertParams) {
  const insertReviewQuery = `
        INSERT INTO teamreview(recruitIdx, userIdx, reviewer, rating, content)
         VALUES (?, ?, ?, ?, ?);
  `;
  const [insertReviewRows] = await connection.query(insertReviewQuery, insertParams);
  return insertReviewRows;
}


module.exports = {
  selectProfile,
  selectTeam,
  selectMember,
  selectCheck,
  selectCheckReview,
  insertReview
};
