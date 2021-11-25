// 글 포스팅
async function insertRecruit(connection, insertParams) {
    const insertRecruitQuery = `
    INSERT INTO Recruit(userIdx, pictureUrl, deadline, title, startDate, endDate, content) VALUES (?, ?, ?, ?, ?, ?, ?);
    `;
    const [insertRecruitRows] = await connection.query(insertRecruitQuery, insertParams);
    return insertRecruitRows;
}
async function insertRecruitPosition(connection, recruitIdx, positionIdx) {
    const insertListQuery = `
    INSERT INTO RecruitPosition(recruitIdx, positionIdx) VALUES (?, ?);
    `;
    const [insertListRows] = await connection.query(insertListQuery, [recruitIdx, positionIdx]);
    return insertListRows;
}

// 전체 모집글 검색
async function selectRecruit(connection) {
    const selectRecruitListQuery = `
    SELECT recruitIdx, pictureUrl, title, date_format(startDate, '%m/%d') as startDate, date_format(endDate,'%m/%d') as endDate,content
        FROM recruit
        WHERE NOW() <= deadline
        ORDER BY createdAt;
    `;
    const [recruitRows] = await connection.query(selectRecruitListQuery);
    return recruitRows;
}

// 모집 파트 검색
async function selectRecruitPosition(connection, recruitIdx) {
    const selectRecruitPositionQuery = `
    SELECT positionName FROM position
        JOIN recruitposition on recruitposition.positionIdx = position.positionIdx
        WHERE recruitIdx = ?;
                `;
    const [recruitRows] = await connection.query(selectRecruitPositionQuery, recruitIdx);
    return recruitRows;
}

// 아이디로 글 검색
async function selectRecruitById(connection, recruitIdx) {
    const selectRecruitListQuery = `
    SELECT recruitIdx, pictureUrl, date_format(deadline, '%y-%m-%d') AS deadline, title, date_format(startDate, '%y-%m-%d') AS startDate, date_format(endDate, '%y-%m-%d') AS endDate, content
    FROM Recruit
    WHERE recruitIdx = ?;
    `;
    const [recruitRows] = await connection.query(selectRecruitListQuery, [recruitIdx]);
    return recruitRows;
}

// 지원하기 
async function insertApply(connection, insertApplyParams) {
    const insertApplyQuery = `
    INSERT INTO APPLY(recruitIdx, userIdx, title, content) VALUES (?, ?, ?, ?);
    `;
    const [ApplyRows] = await connection.query(insertApplyQuery, insertApplyParams);
    return ApplyRows;
}

module.exports = {
    insertRecruit,
    insertRecruitPosition,
    selectRecruit,
    selectRecruitPosition,
    selectRecruitById,
    insertApply
}