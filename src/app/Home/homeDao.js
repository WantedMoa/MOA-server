// 메인화면 공모전 조회
async function selectContest(connection) {
  const selectContestListQuery = `
        SELECT contestIdx, pictureUrl, linkUrl FROM contest
        WHERE now() <= startDate;
                `;
  const [contestRows] = await connection.query(selectContestListQuery);
  return contestRows;
}

// 메인화면 인기팀원 조회
async function selectPopularUser(connection, userIdx) {
  const selectPopularUserListQuery = `
        SELECT userIdx, profileImg, name FROM moa.user
        WHERE rating >= 2 AND NOT userIdx = ? LIMIT 10;
                `;
  const [popularUserRows] = await connection.query(selectPopularUserListQuery, userIdx);
  return popularUserRows;
}

// 인기팀원 상세 조회 기획자
async function selectPm(connection, userIdx) {
  const selectPmListQuery = `
        SELECT userIdx, profileImg, name FROM moa.user
        WHERE rating >= 2 AND NOT userIdx = ? AND positionIdx = 1 LIMIT 5;
                `;
  const [pmRows] = await connection.query(selectPmListQuery, userIdx);
  return pmRows;
}

// 인기팀원 상세 조회 개발자
async function selectDeveloper(connection, userIdx) {
  const selectDeveloperListQuery = `
        SELECT userIdx, profileImg, name FROM moa.user
        WHERE rating >= 2 AND NOT userIdx = ? AND positionIdx = 3 LIMIT 5;
                `;
  const [developerRows] = await connection.query(selectDeveloperListQuery, userIdx);
  return developerRows;
}

// 인기팀원 상세 조회 디자이너
async function selectDesigner(connection, userIdx) {
  const selectDesignerListQuery = `
        SELECT userIdx, profileImg, name FROM moa.user
        WHERE rating >= 2 AND NOT userIdx = ? AND positionIdx = 2 LIMIT 5;
                `;
  const [designerRows] = await connection.query(selectDesignerListQuery, userIdx);
  return designerRows;
}

// 인기팀원 상세 조회 마케터
async function selectMarketer(connection, userIdx) {
  const selectMarketerListQuery = `
        SELECT userIdx, profileImg, name FROM moa.user
        WHERE rating >= 2 AND NOT userIdx = ? AND positionIdx = 4 LIMIT 5;
                `;
  const [marketerRows] = await connection.query(selectMarketerListQuery, userIdx);
  return marketerRows;
}

// 인기 팀원 모집 공고 조회
async function selectRecruit(connection) {
  const selectRecruitListQuery = `
        SELECT recruit.recruitIdx, pictureUrl, title, date_format(startDate, '%m/%d') as startDate, date_format(endDate,'%m/%d') as endDate
        FROM recruit
                JOIN likerecruit ON likerecruit.recruitIdx = recruit.recruitIdx
        WHERE NOW() <= deadline
        group by recruitIdx
        ORDER BY count(likerecruit.recruitIdx) DESC
        LIMIT 10;
                `;
  const [recruitRows] = await connection.query(selectRecruitListQuery);
  return recruitRows;
}

// 인기 팀원 모집 공고 태그 조회
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
  selectContest,
  selectPopularUser,
  selectPm,
  selectDeveloper,
  selectDesigner,
  selectMarketer,
  selectRecruit,
  selectRecruitDetail,
};
