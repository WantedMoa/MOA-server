const jwtMiddleware = require("../../../config/jwtMiddleware");
const homeProvider = require("../../app/Home/homeProvider");
const homeService = require("../../app/Home/homeService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const {emit} = require("nodemon");


/**
 * API No. ?
 * API Name : 메인화면 공모전 목록 조회 API
 * [GET] /homes/contests
 */
exports.getContests = async function (req, res) {


    const contestListResult = await homeProvider.getContestList();

    return res.send(response(baseResponse.SUCCESS, contestListResult));
};

/**
 * API No. ?
 * API Name : 메인화면 인기 팀원 목록 조회 API
 * [GET] /homes/popular-users
 */
 exports.getPopularUser = async function (req, res) {

    const userIdx = req.verifiedToken.userIdx;

    const userListResult = await homeProvider.getUserList(userIdx);
    
    return res.send(response(baseResponse.SUCCESS, userListResult));
};

/**
 * API No. ?
 * API Name : 메인화면 인기 팀원 목록 상세 조회 API
 * [GET] /homes/popular-users/details
 */
 exports.getPopularUserDetail = async function (req, res) {

    const userIdx = req.verifiedToken.userIdx;

    const pmListResult = await homeProvider.getPmList(userIdx);
    const developerListResult = await homeProvider.getDeveloperList(userIdx);
    const designerListResult = await homeProvider.getDesignerList(userIdx);
    const marketerListResult = await homeProvider.getMarketerList(userIdx);
    
    return res.send(response(baseResponse.SUCCESS, {
        pmList : pmListResult,
        developerList : developerListResult,
        designerList : designerListResult,
        marketerListResult : marketerListResult
    }));
};

/**
 * API No. ?
 * API Name : 메인화면 인기 팀원 모집 공고 조회 API
 * [GET] /homes/popular-recruits
 */
 exports.getPopularRecruit = async function (req, res) {

    const userIdx = req.verifiedToken.userIdx;

    const recruitListResult = await homeProvider.getRecruitList();
    
    return res.send(response(baseResponse.SUCCESS, recruitListResult));
};
