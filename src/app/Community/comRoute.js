module.exports = function(app) {
    const com = require('./comController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');
    const upload = require('../../../config/multer');

    // 전체 모집 공고 조회 API
    app.get("/app/recruits", jwtMiddleware, com.getRecruits);

    // 모집 공고 상세 조회 API
    app.get("/app/recruits/:recruitId", jwtMiddleware, com.getRecruitById);

    // 모집 공고 등록 API
    app.post("/app/recruits", jwtMiddleware, upload.single('image'), com.writeRecruitPost);

}