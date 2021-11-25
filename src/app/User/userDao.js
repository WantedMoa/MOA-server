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
              SELECT id, email, case
              when TIMESTAMPDIFF(Hour, updatedAt, current_timestamp()) > 24
                  then 1
              end as isExpired, isVerified
              FROM EmailCheck
              WHERE email = ?;
              `;
    const [emailRows] = await connection.query(selectUserEmailQuery, email);
    return emailRows;
}

async function insertEmailVerify(connection, email, universityIdx) {
    const insertUserInfoQuery = `INSERT INTO User(email, universityIdx) VALUES (?, ?);`;
    const insertUserInfoRow = await connection.query(insertUserInfoQuery, [email, universityIdx]);

    return insertUserInfoRow;
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
        INSERT INTO User(email, password, nickname)
        VALUES (?, ?, ?);
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
    selectUserId,
    insertUserInfo,
};