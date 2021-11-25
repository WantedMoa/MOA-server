// 모든 유저 조회
async function selectUser(connection) {
    const selectUserListQuery = `
                SELECT email, name 
                FROM User;
                `;
    const [userRows] = await connection.query(selectUserListQuery);
    return userRows;
}

// 이메일로 회원 조회
async function selectUserEmail(connection, email) {
    const selectUserEmailQuery = `
                SELECT email
                FROM User
                WHERE email = ?;
                `;
    const [emailRows] = await connection.query(selectUserEmailQuery, email);
    return emailRows;
}

// 대학 이메일 조회
async function selectUnivEmail(connection, email) {
    const selectUnivEmailQuery = `
            SELECT universityIdx, universityEmail,universityName
            FROM University
            WHERE universityEmail = ?;
            `;
    const [emailRows] = await connection.query(selectUnivEmailQuery, email);
    return emailRows;
}

//이메일 인증 조회
async function selectVerifiedEmail(connection, email) {
    const selectUserEmailQuery = `
              SELECT emailCheckIdx, email, isVerified
              FROM EmailCheck
              WHERE email = ?;
              `;
    const [emailRows] = await connection.query(selectUserEmailQuery, email);
    return emailRows;
}
// 인증 확인 
async function insertEmailVerify(connection, email) {
    const insertUserInfoQuery = `INSERT INTO EmailCheck(email, isVerified) VALUES(?, 1);`;
    const insertUserInfoRow = await connection.query(insertUserInfoQuery, [email]);

    return insertUserInfoRow;
}
async function updateEmailVerify(connection, email) {
    const updateEmailQuery = `UPDATE EmailCheck SET isVerified = 1 WHERE email = ?;`;
    const updateEmailRow = await connection.query(updateEmailQuery, email);
    return updateEmailRow[0];
}

// userId 회원 조회
async function selectUserId(connection, userId) {
    const selectUserIdQuery = ` SELECT userIdx, name, University.universityName AS university, bio, experiance, portfolio 
    FROM User 
    INNER JOIN University ON University.universityIdx = User.universityIdx
    WHERE userIdx = ?; `;
    const [userRow] = await connection.query(selectUserIdQuery, userId);
    return userRow;
}

// 유저 생성
async function insertUserInfo(connection, insertUserInfoParams) {
    const insertUserInfoQuery = `
        INSERT INTO User(email, password, universityIdx,  name, positionIdx)
        VALUES (?, ?, ?, ?, ?);
    `;
    const insertUserInfoRow = await connection.query(
        insertUserInfoQuery,
        insertUserInfoParams
    );

    return insertUserInfoRow;
}

// 패스워드 체크
async function selectUserPassword(connection, selectUserPasswordParams) {
    const selectUserPasswordQuery = `
      SELECT email, name, password
      FROM User 
      WHERE email = ? AND password = ?;`;
    const selectUserPasswordRow = await connection.query(
        selectUserPasswordQuery,
        selectUserPasswordParams
    );

    return selectUserPasswordRow;
}

// 유저 계정 상태 체크
async function selectUserAccount(connection, email) {
    const selectUserAccountQuery = `
      SELECT status, userIdx
      FROM User 
      WHERE email = ?;`;
    const selectUserAccountRow = await connection.query(
        selectUserAccountQuery,
        email
    );
    return selectUserAccountRow[0];
}

//jwt status 업데이트
async function updateJwtStatus(connection, userIdx) {
    const updateJwtStatusQuery = `
UPDATE Jwt SET status=1 where userIdx=?
`;
    const updateJwtStatusRow = await connection.query(
        updateJwtStatusQuery,
        userIdx
    );
    return updateJwtStatusRow;
}

//jwt token 업데이트
async function updateJwtToken(connection, updateJwtTokenParams) {
    const updateJwtTokenQuery = `
UPDATE Jwt SET token=?, status=0 where userIdx=?
`;
    const updateJwtTokenRow = await connection.query(
        updateJwtTokenQuery,
        updateJwtTokenParams
    );
    return updateJwtTokenRow;
}
//login user 조회
async function selectLoginUser(connection, userIdx) {
    const selectJwtQuery = `
SELECT userIdx, status FROM Jwt WHERE userIdx=?;
`;
    const selectJwtRow = await connection.query(selectJwtQuery, userIdx);
    return selectJwtRow;
}
//login 추가
async function insertLoginUser(connection, updateJwtTokenParams) {
    const insertJwtQuery = `
INSERT INTO Jwt(token, userIdx) VALUES(?,?);
`;
    const insertJwtRow = await connection.query(
        insertJwtQuery,
        updateJwtTokenParams
    );
}

module.exports = {
    selectUser,
    selectUserEmail,
    selectUnivEmail,
    insertEmailVerify,
    selectVerifiedEmail,
    updateEmailVerify,
    selectUserId,
    insertUserInfo,
    selectUserPassword,
    selectUserAccount,
    updateJwtStatus,
    updateJwtToken,
    selectLoginUser,
    insertLoginUser

};