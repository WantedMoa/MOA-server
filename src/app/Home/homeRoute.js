module.exports = function(app){
    const home = require('./homeController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 메인화면 공모전 목록
    app.get('/homes/contests',home.getContests);

    // 인기 팀원 목록
    app.get('/homes/popular-users',home.getPopularUser);

    // 인기 팀원 목록 상세
    app.get('/homes/popular-users/details',home.getPopularUserDetail);

    // 인기 팀원 모집 공고 조회
    app.get('/homes/popular-recruits',home.getPopularRecruit);
};