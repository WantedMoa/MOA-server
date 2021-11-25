module.exports = function(app){
    const myPage = require('./myPageController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 내 정보 조회
    app.get('/profiles',jwtMiddleware,myPage.getProfile);

    // 나의 팀 조회
    app.get('/teams',jwtMiddleware ,myPage.getTeam);

    // 팀원 리뷰 작성
    app.post('/reviews',jwtMiddleware, myPage.postReview);
};