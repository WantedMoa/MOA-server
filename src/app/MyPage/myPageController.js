const jwtMiddleware = require("../../../config/jwtMiddleware");
const myPageProvider = require("../MyPage/myPageProvider");
const myPageService = require("../MyPage/myPageService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const {emit} = require("nodemon");



/**
 * API No. ?
 * API Name : 내 프로필 조회
 * [GET] /profiles
 */
 exports.getProfile = async function (req, res) {
    const userIdx = req.verifiedToken.userIdx;

    const profileListResult = await myPageProvider.getProfileList(userIdx);

    return res.send(response(baseResponse.SUCCESS, profileListResult));
};


/**
 * API No. ?
 * API Name : 나의 팀 조회 API
 * [GET] /teams
 */
exports.getTeam = async function (req, res) {
    const userIdx = req.verifiedToken.userIdx;

    const teamListResult = await myPageProvider.getTeamList(userIdx);

    if(teamListResult.length < 1){
        return res.send(response(baseResponse.TEAM_EMPTY));
    }

    return res.send(response(baseResponse.SUCCESS, teamListResult));
};


/**
 * API No. ?
 * API Name : 팀원 리뷰 작성 API
 * [POST] /reviews
 */
 exports.postReview = async function (req, res) {
    const reviewerIdx = req.verifiedToken.userIdx;
    const { recruitIdx, userIdx, rating, content } = req.body;

    if(typeof recruitIdx === 'undefined' || recruitIdx === null || recruitIdx === ''){
        return res.send(response(baseResponse.RECRUIT_IDX_EMPTY));
    }

    if(typeof userIdx === 'undefined' || userIdx === null || userIdx === ''){
        return res.send(response(baseResponse.USER_IDX_REVIEW_EMPTY));
    }

    if(typeof rating === 'undefined' || rating === null || rating === ''){
        return res.send(response(baseResponse.REVIEW_RATE_EMPTY));
    }

    if(typeof content === 'undefined' || content === null || content === ''){
        return res.send(response(baseResponse.REVIEW_EMPTY));
    }

    // 평가자가 팀장인 경우와, 팀원인 경우 체크

    const teamCheckResultOne = await myPageProvider.getMemberList(recruitIdx, reviewerIdx, userIdx);
    const teamCheckResultTwo = await myPageProvider.getMemberList(recruitIdx, userIdx, reviewerIdx);

    if(teamCheckResultOne.length < 1 && teamCheckResultTwo.length < 1){
        return res.send(response(baseResponse.TEAM_REVIEW_ERROR));
    }

    const reviewCheckResult = await myPageProvider.getReviewList(recruitIdx, userIdx, reviewerIdx);

    if(reviewCheckResult.length > 0){
        return res.send(response(baseResponse.TEAM_REVIEW_ALREADY));
    }

    const writeReviewResult = await myPageService.postReviewList(recruitIdx, userIdx, reviewerIdx, rating, content);

    return res.send(writeReviewResult);
};