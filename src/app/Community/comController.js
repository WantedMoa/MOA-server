const jwtMiddleware = require("../../../config/jwtMiddleware");
const userProvider = require("../User/userProvider");
const comProvider = require("./comProvider");
const comService = require("./comService");
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const { logger } = require("../../../config/winston");
const request = require("request");
const jwt = require("jsonwebtoken");

const { emit } = require("nodemon");


/**
 * API Name : 전체 모집 공고 조회
 * [GET] /app/recruits
 */
exports.getRecruits = async function(req, res) {
    const userIdFromJWT = req.verifiedToken.userId;
    const recruitsResult = await comProvider.retrievePosts(userIdFromJWT);



    return res.send(baseResponse.SUCCESS, recruitsResult);
};

/**
 * API Name : 모집 공고 상세 조회
 * [POST] /app/recruits/:recruitId
 */
exports.getRecruittById = async function(req, res) {
    /**
     * path variable : postId
     */
    const userIdFromJWT = req.verifiedToken.userId;
    const postId = req.params.postId;

    if (!postId) return res.send(response(baseResponse.POST_ID_EMPTY));

    const postResult = await comProvider.retrievePostById(
        userIdFromJWT,
        postId
    );

    return res.send(baseResponse.SUCCESS, postResult);

};

/**
 * API Name : 모집 공고 등록 API
 * [POST] /app/recruits
 */
exports.writeRecruitPost = async function(req, res) {
    const userIdFromJWT = req.verifiedToken.userIdx; // 내 아이디
    const { deadline, title, startDate, endDate, content } = req.body;

    if (!userIdFromJWT) return res.send(response(baseResponse.USER_USERID_EMPTY));

    // 빈값 체크
    if (!deadline) return res.send(response(baseResponse.SIGNUP_EMAIL_EMPTY));
    if (!title) return res.send(response(baseResponse.SIGNUP_EMAIL_EMPTY));
    if (!startDate) return res.send(response(baseResponse.SIGNUP_EMAIL_EMPTY));
    if (!endDate) return res.send(response(baseResponse.SIGNUP_EMAIL_EMPTY));
    if (!content) return res.send(response(baseResponse.SIGNUP_EMAIL_EMPTY));


    // 이미지 확인
    if (req.file !== undefined)
        var pictureUrl = req.file.location;
    else
        var pictureUrl = 'https://moabucket.s3.ap-northeast-2.amazonaws.com/profile.png';

    // 게시글 등록 

    const writeResponse = await comService.createPost(userIdFromJWT, pictureUrl, deadline, title, startDate, endDate, content);

    return res.send(writeResponse);

};