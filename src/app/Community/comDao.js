// 글 포스팅
async function insertPost(connection, insertPostParams) {
    const insertListQuery = `
    INSERT INTO Recruit(userIdx, pictureUrl, deadline, title, startDate, endDate, content) VALUES (?, ?, ?, ?, ?, ?, ?);
    `;
    const [insertListRows] = await connection.query(insertListQuery, insertPostParams);
    return insertListRows;
}

module.exports = {
    insertPost,
}