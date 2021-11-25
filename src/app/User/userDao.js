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
// 인증
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
    const selectUserIdQuery = `
                 SELECT id, email, nickname 
                 FROM User 
                 WHERE id = ?;
                 `;
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

module.exports = {
    selectUser,
    selectUserEmail,
    selectUnivEmail,
    insertEmailVerify,
    selectVerifiedEmail,
    updateEmailVerify,
    selectUserId,
    insertUserInfo,
};