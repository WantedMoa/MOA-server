module.exports = {

    // Success
    SUCCESS: { "isSuccess": true, "code": 1000, "message": "성공" },

    // Common
    TOKEN_EMPTY: { "isSuccess": false, "code": 2000, "message": "JWT 토큰을 입력해주세." },
    TOKEN_VERIFICATION_FAILURE: { "isSuccess": false, "code": 3000, "message": "JWT 토큰 검증 실패" },
    TOKEN_VERIFICATION_SUCCESS: { "isSuccess": true, "code": 1001, "message": "JWT 토큰 검증 성공" }, // ?

    //Request error
    SIGNUP_EMAIL_EMPTY: { "isSuccess": false, "code": 2001, "message": "이메일을 입력해주세요" },
    SIGNUP_EMAIL_LENGTH: { "isSuccess": false, "code": 2002, "message": "이메일은 30자리 미만으로 입력해주세요." },
    SIGNUP_EMAIL_ERROR_TYPE: { "isSuccess": false, "code": 2003, "message": "이메일을 형식을 정확하게 입력해주세요." },
    SIGNUP_PASSWORD_EMPTY: { "isSuccess": false, "code": 2004, "message": "비밀번호를 입력 해주세요." },
    SIGNUP_PASSWORD_LENGTH: { "isSuccess": false, "code": 2005, "message": "비밀번호는 6~20자리를 입력해주세요." },
    SIGNUP_NICKNAME_EMPTY: { "isSuccess": false, "code": 2006, "message": "닉네임을 입력 해주세요." },
    SIGNUP_NICKNAME_LENGTH: { "isSuccess": false, "code": 2007, "message": "닉네임은 최대 20자리를 입력해주세요." },

    SIGNIN_EMAIL_EMPTY: { "isSuccess": false, "code": 2008, "message": "이메일을 입력해주세요" },
    SIGNIN_EMAIL_LENGTH: { "isSuccess": false, "code": 2009, "message": "이메일은 30자리 미만으로 입력해주세요." },
    SIGNIN_EMAIL_ERROR_TYPE: { "isSuccess": false, "code": 2010, "message": "이메일을 형식을 정확하게 입력해주세요." },
    SIGNIN_PASSWORD_EMPTY: { "isSuccess": false, "code": 2011, "message": "비밀번호를 입력 해주세요." },

    USER_USERID_EMPTY: { "isSuccess": false, "code": 2012, "message": "userId를 입력해주세요." },
    USER_USERID_NOT_EXIST: { "isSuccess": false, "code": 2013, "message": "해당 회원이 존재하지 않습니다." },

    USER_USEREMAIL_EMPTY: { "isSuccess": false, "code": 2014, "message": "이메일을 입력해주세요." },
    USER_USEREMAIL_NOT_EXIST: { "isSuccess": false, "code": 2015, "message": "해당 이메일을 가진 회원이 존재하지 않습니다." },
    USER_ID_NOT_MATCH: { "isSuccess": false, "code": 2016, "message": "유저 아이디 값을 확인해주세요" },
    USER_NICKNAME_EMPTY: { "isSuccess": false, "code": 2017, "message": "변경할 닉네임 값을 입력해주세요" },

    USER_STATUS_EMPTY: { "isSuccess": false, "code": 2018, "message": "회원 상태값을 입력해주세요" },
    SIGNUP_SENDEMAIL_FAIL: { "isSuccess": false, "code": 2019, "message": "이메일 전송에 실패하였습니다." },

    DEADLINE_EMPTY: { "isSuccess": false, "code": 2020, "message": "모집 기한을 입력해주세요." },
    TITLE_EMPTY: { "isSuccess": false, "code": 2021, "message": "제목을 입력해주세요." },
    START_DATE_EMPTY: { "isSuccess": false, "code": 2022, "message": "시작 날짜를 입력해주세요." },
    END_DATE_EMPTY: { "isSuccess": false, "code": 2023, "message": "마감 날짜를 입력해주세요." },
    CONTENT_EMPTY: { "isSuccess": false, "code": 2024, "message": "내용을 입력해주세요" },
    POSITION_EMPTY: { "isSuccess": false, "code": 2025, "message": "모집 분야를 선택해주세요." },


    RECRUIT_IDX_EMPTY: { "isSuccess": false, "code": 2501, "message": "모집공고 idx를 입력해주세요" },

    USER_IDX_REVIEW_EMPTY: { "isSuccess": false, "code": 2530, "message": "리뷰 할 멤버의 인덱스를 입력해주세요" },
    REVIEW_RATE_EMPTY: { "isSuccess": false, "code": 2531, "message": "리뷰 점수를 입력해주세요" },
    REVIEW_EMPTY: { "isSuccess": false, "code": 2532, "message": "리뷰 내용을 입력해주세요" },

    // Response error
    SIGNUP_REDUNDANT_EMAIL: { "isSuccess": false, "code": 3001, "message": "중복된 이메일입니다." },
    SIGNUP_REDUNDANT_NICKNAME: { "isSuccess": false, "code": 3002, "message": "중복된 닉네임입니다." },
    SIGNUP_EMAIL_NOT_VERIFIED: { "isSuccess": false, "code": 3003, "message": "이메일 인증이 완료되지 않았습니다" },

    SIGNIN_EMAIL_WRONG: { "isSuccess": false, "code": 3003, "message": "아이디가 잘못 되었습니다." },
    SIGNIN_PASSWORD_WRONG: { "isSuccess": false, "code": 3004, "message": "비밀번호가 잘못 되었습니다." },
    SIGNIN_INACTIVE_ACCOUNT: { "isSuccess": false, "code": 3005, "message": "비활성화 된 계정입니다. 고객센터에 문의해주세요." },
    SIGNIN_WITHDRAWAL_ACCOUNT: { "isSuccess": false, "code": 3006, "message": "탈퇴 된 계정입니다. 고객센터에 문의해주세요." },
    UNIV_NOT_EXIST: { "isSuccess": false, "code": 3007, "message": "존재하지 않는 대학 메일입니다." },




    RECRUIT_EMPTY: { "isSuccess": false, "code": 3501, "message": "등록한 공고가 없습니다." },
    RECOMMEND_EMPTY: { "isSuccess": false, "code": 3510, "message": "모집 공고에 맞는 추천 유저가 없습니다." },

    TEAM_EMPTY: { "isSuccess": false, "code": 3520, "message": "나의 팀이 없습니다." },
    TEAM_REVIEW_ERROR: { "isSuccess": false, "code": 3530, "message": "리뷰 작성 권한이 없는 멤버 입니다." },
    TEAM_REVIEW_ALREADY: { "isSuccess": false, "code": 3531, "message": "이미 리뷰를 작성한 멤버 입니다." },


    //Connection, Transaction 등의 서버 오류
    DB_ERROR: { "isSuccess": false, "code": 4000, "message": "데이터 베이스 에러" },
    SERVER_ERROR: { "isSuccess": false, "code": 4001, "message": "서버 에러" },


}