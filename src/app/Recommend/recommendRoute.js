module.exports = function(app){
    const recommend = require('./recommendController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 내가 등록한 공고
    app.get('/recruits',recommend.getRecruits);

    // 팀원 매칭
    app.get('/recruits/:recruitsIdx/recommends',recommend.getRecommend);
};