// 글 포스팅
async function insertPost(connection, insertPostParams) {
    const insertListQuery = `
    INSERT INTO Recruit(userIdx, pictureUrl, deadline, title, startDate, endDate, content) VALUES (?, ?, ?, ?, ?, ?, ?);
    `;
    const [insertListRows] = await connection.query(insertListQuery, insertPostParams);
    return insertListRows;
}

// 전체 모집글 검색
async function selectPost(connection) {
    const selectListQuery = `
    SELECT recruitIdx, pictureUrl, deadline, title, startDate, endDate, content
      FROM Recruit
      ORDER BY createdAt DESC;
    ;
    `;
    const [selectListRows] = await connection.query(selectListQuery);
    console.log(selectListRows)

    return selectListRows;
}

// 아이디로 글 검색
async function selectPostById(connection, postId) {
    const selectListQuery = `
    SELECT recruitIdx, pictureUrl, deadline, title, startDate, endDate, content
      FROM Recruit 
      WHERE recruitIdx = ?
      ORDER BY createdAt DESC;
    ;
   
    `;
    const [selectListRows] = await connection.query(selectListQuery, [postId]);
    return selectListRows;
}

module.exports = {
    insertPost,
    selectPost,
    selectPostById
}