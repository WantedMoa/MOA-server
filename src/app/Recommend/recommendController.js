const jwtMiddleware = require("../../../config/jwtMiddleware");
const recommendProvider = require("../Recommend/recommendProvider");
const recommendService = require("../Recommend/recommendService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const {emit} = require("nodemon");



/**
 * API No. ?
 * API Name : 내가 등록한 공고 API
 * [GET] /recruits
 */
 exports.getRecruits = async function (req, res) {
    // const userIdx = req.verifiedToken.userIdx;

    const userIdx = 2;

    const recruitListResult = await recommendProvider.getRecruitList(userIdx);

    if(recruitListResult.length < 1){
        return res.send(response(baseResponse.RECRUIT_EMPTY));
    }

    return res.send(response(baseResponse.SUCCESS, recruitListResult));
};


/**
 * API No. ?
 * API Name : 팀원 매칭 API
 * [GET] /recruits/:recruitsIdx/recommends
 */
exports.getRecommend = async function (req, res) {
    const recruitIdx = req.params.recruitsIdx;

    if(typeof recruitIdx === 'undefined' || recruitIdx === null || recruitIdx === ''){
        return res.send(response(baseResponse.RECRUIT_IDX_EMPTY));
    }


    const recommendListResult = await recommendProvider.getRecommedList(recruitIdx);

    if(recommendListResult.length < 1){
        return res.send(response(baseResponse.RECOMMEND_EMPTY));
    }

    return res.send(response(baseResponse.SUCCESS, recommendListResult));
};
