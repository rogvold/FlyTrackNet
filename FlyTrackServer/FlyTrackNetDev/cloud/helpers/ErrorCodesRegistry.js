/**
 * Created by sabir on 22.06.16.
 */

var ErrorCodesRegistry = {

    PERMISSION_DENIED: {
        code: 700
    },

    INCORRECT_INPUT_DATA: {
        code: 701
    },

    UNKNOWN_ERROR: {
        code: 705
    },

    USER_WITH_SPECIFIED_EMAIL_ALREADY_EXISTS: {
        code: 706
    },

    USER_WITH_SPECIFIED_ID_IS_NOT_FOUND: {
        code: 707
    },

    AIRCRAFT_IS_NOT_FOUND: {
        code: 708
    }

};

module.exports = ErrorCodesRegistry;