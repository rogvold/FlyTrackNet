/**
 * Created by sabir on 20.06.16.
 */


var React = require('react');
var assign = require('object-assign');

var Constants = {

    //clubs
    CREATE_CLUB: 'CREATE_CLUB',
    CREATE_CLUB_SUCCESS: 'CREATE_CLUB_SUCCESS',
    CREATE_CLUB_FAIL: 'CREATE_CLUB_FAIL',

    UPDATE_CLUB: 'UPDATE_CLUB',
    UPDATE_CLUB_SUCCESS: 'UPDATE_CLUB_SUCCESS',
    UPDATE_CLUB_FAIL: 'UPDATE_CLUB_FAIL',

    LOAD_CLUB: 'LOAD_CLUB',
    LOAD_CLUB_SUCCESS: 'LOAD_CLUB_SUCCESS',
    LOAD_CLUB_FAIL: 'LOAD_CLUB_FAIL',

    LOAD_CLUB_INFO_BY_CLUB_URL: 'LOAD_CLUB_INFO_BY_CLUB_URL',
    LOAD_CLUB_INFO_BY_CLUB_URL_SUCCESS: 'LOAD_CLUB_INFO_BY_CLUB_URL_SUCCESS',
    LOAD_CLUB_INFO_BY_CLUB_URL_FAIL: 'LOAD_CLUB_INFO_BY_CLUB_URL_FAIL',

    //club displays

    LOAD_ADMIN_CLUB_DISPLAYS: 'LOAD_ADMIN_CLUB_DISPLAYS',
    LOAD_ADMIN_CLUB_DISPLAYS_SUCCESS: 'LOAD_ADMIN_CLUB_DISPLAYS_SUCCESS',
    LOAD_ADMIN_CLUB_DISPLAYS_FAIL: 'LOAD_ADMIN_CLUB_DISPLAYS_FAIL',

    CREATE_DISPLAY: 'CREATE_DISPLAY',
    CREATE_DISPLAY_SUCCESS: 'CREATE_DISPLAY_SUCCESS',
    CREATE_DISPLAY_FAIL: 'CREATE_DISPLAY_FAIL',

    DELETE_DISPLAY: 'DELETE_DISPLAY',
    DELETE_DISPLAY_SUCCESS: 'DELETE_DISPLAY_SUCCESS',
    DELETE_DISPLAY_FAIL: 'DELETE_DISPLAY_FAIL',

    UNLINK_DISPLAY: 'UNLINK_DISPLAY',
    UNLINK_DISPLAY_SUCCESS: 'UNLINK_DISPLAY_SUCCESS',
    UNLINK_DISPLAY_FAIL: 'UNLINK_DISPLAY_FAIL',

    //club users

    LOAD_CLUB_USERS: 'LOAD_CLUB_USERS',
    LOAD_CLUB_USERS_SUCCESS: 'LOAD_CLUB_USERS_SUCCESS',
    LOAD_CLUB_USERS_FAIL: 'LOAD_CLUB_USERS_FAIL',

    CREATE_CLUB_USER: 'CREATE_CLUB_USER',
    CREATE_CLUB_USER_SUCCESS: 'CREATE_CLUB_USER_SUCCESS',
    CREATE_CLUB_USER_FAIL: 'CREATE_CLUB_USER_FAIL',


    //cardio sessions

    LOAD_USER_CARDIO_SESSIONS: 'LOAD_USER_CARDIO_SESSIONS',
    LOAD_USER_CARDIO_SESSIONS_SUCCESS: 'LOAD_USER_CARDIO_SESSIONS_SUCCESS',
    LOAD_USER_CARDIO_SESSIONS_FAIL: 'LOAD_USER_CARDIO_SESSIONS_FAIL',

    LOAD_CARDIO_SESSION_POINTS: 'LOAD_CARDIO_SESSION_POINTS',
    LOAD_CARDIO_SESSION_POINTS_SUCCESS: 'LOAD_CARDIO_SESSION_POINTS_SUCCESS',
    LOAD_CARDIO_SESSION_POINTS_FAIL: 'LOAD_CARDIO_SESSION_POINTS_FAIL',

    UPDATE_SESSION: 'UPDATE_SESSION',
    UPDATE_SESSION_SUCCESS: 'UPDATE_SESSION_SUCCESS',
    UPDATE_SESSION_FAIL: 'UPDATE_SESSION_FAIL',


    //-------


    //users
    LOAD_USER: 'LOAD_USER',
    LOAD_USER_SUCCESS: 'LOAD_USER_SUCCESS',
    LOAD_USER_FAIL: 'LOAD_USER_FAIL',


    LOAD_USERS_BY_IDS: 'LOAD_USERS_BY_IDS',
    LOAD_USERS_BY_IDS_SUCCESS: 'LOAD_USERS_BY_IDS_SUCCESS',
    UPDATE_USER: 'UPDATE_USER',
    UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS',
    UPDATE_USER_FAIL: 'UPDATE_USER_FAIL',

    LOAD_USER_BY_EMAIL: 'LOAD_USER_BY_EMAIL',
    LOAD_USER_BY_EMAIL_SUCCESS: 'LOAD_USER_BY_EMAIL_SUCCESS',
    LOAD_USER_BY_EMAIL_FAIL: 'LOAD_USER_BY_EMAIL_FAIL',

    //sessions
    LOAD_SESSION: 'LOAD_SESSION',
    LOAD_SESSION_SUCCESS: 'LOAD_SESSION_SUCCESS',
    LOAD_USER_SESSIONS: 'LOAD_USER_SESSIONS',
    LOAD_USER_SESSIONS_SUCCESS: 'LOAD_USER_SESSIONS_SUCCESS',
    LOAD_SESSION_DATA: 'LOAD_SESSION_DATA',
    LOAD_SESSION_DATA_SUCCESS: 'LOAD_SESSION_DATA_SUCCESS',

    LOAD_USERS_SESSIONS: 'LOAD_USERS_SESSIONS',
    LOAD_USERS_SESSIONS_SUCCESS: 'LOAD_USERS_SESSIONS_SUCCESS',
    LOAD_USERS_SESSIONS_FAIL: 'LOAD_USERS_SESSIONS_FAIL',

    LOAD_SESSIONS_POINTS: 'LOAD_SESSIONS_POINTS',
    LOAD_SESSIONS_POINTS_SUCCESS: 'LOAD_SESSIONS_POINTS_SUCCESS',
    LOAD_SESSIONS_POINTS_FAIL: 'LOAD_SESSIONS_POINTS_FAIL',

    FLUSH_SESSIONS_FILTRATION: 'FLUSH_SESSIONS_FILTRATION',


    //group labels
    LOAD_GROUP_LABELS: 'LOAD_GROUP_LABELS',
    LOAD_GROUP_LABELS_SUCCESS: 'LOAD_GROUP_LABELS_SUCCESS',
    CREATE_GROUP_LABEL: 'CREATE_GROUP_LABEL',
    CREATE_GROUP_LABEL_SUCCESS: 'CREATE_GROUP_LABEL_SUCCESS',
    UPDATE_GROUP_LABEL: 'UPDATE_GROUP_LABEL',
    UPDATE_GROUP_LABEL_SUCCESS: 'UPDATE_GROUP_LABEL_SUCCESS',
    DELETE_GROUP_LABEL: 'DELETE_GROUP_LABEL',
    DELETE_GROUP_LABEL_SUCCESS: 'DELETE_GROUP_LABEL_SUCCESS',

    //groups
    LOAD_DOCTOR_GROUPS: 'LOAD_DOCTOR_GROUPS',
    LOAD_DOCTOR_GROUPS_SUCCESS: 'LOAD_DOCTOR_GROUPS_SUCCESS',
    LOAD_GROUP: 'LOAD_GROUP',
    LOAD_GROUP_SUCCESS: 'LOAD_GROUP_SUCCESS',
    CREATE_GROUP: 'CREATE_GROUP',
    CREATE_GROUP_SUCCESS: 'CREATE_GROUP_SUCCESS',
    UPDATE_GROUP: 'UPDATE_GROUP',
    UPDATE_GROUP_SUCCESS: 'UPDATE_GROUP_SUCCESS',
    DELETE_GROUP: 'DELETE_GROUP',
    DELETE_GROUP_SUCCESS: 'DELETE_GROUP_SUCCESS',
    LOAD_GROUP_LINKS: 'LOAD_GROUP_LINKS',
    LOAD_GROUP_LINKS_SUCCESS: 'LOAD_GROUP_LINKS_SUCCESS',
    DELETE_USER_GROUP_LINK: 'DELETE_USER_GROUP_LINK',
    DELETE_USER_GROUP_LINK_SUCCESS: 'DELETE_USER_GROUP_LINK_SUCCESS',

    LOAD_USER_GROUPS: 'LOAD_USER_GROUPS',
    LOAD_USER_GROUPS_SUCCESS: 'LOAD_USER_GROUPS_SUCCESS',

    ADD_USER_GROUP: 'ADD_USER_GROUP',
    ADD_USER_GROUP_SUCCESS: 'ADD_USER_GROUP_SUCCESS',
    ADD_USER_GROUP_FAIL: 'ADD_USER_GROUP_FAIL',



    //alert notifications
    SHOW_ALERT_NOTIFICATION: 'SHOW_ALERT_NOTIFICATION',
    HIDE_ALERT_NOTIFICATION: 'HIDE_ALERT_NOTIFICATION',


    //mail
    SHOW_MAIL_DIALOG: 'SHOW_MAIL_DIALOG',
    CLOSE_MAIL_DIALOG: 'CLOSE_MAIL_DIALOG',
    SEND_MAIL: 'SEND_MAIL',
    SEND_MAIL_SUCCESS: 'SEND_MAIL_SUCCESS',
    MAIL_DATA_CHANGE: 'MAIL_DATA_CHANGE',


    //notifications
    LOAD_NOTIFICATIONS: 'LOAD_NOTIFICATIONS',
    LOAD_NOTIFICATIONS_SUCCESS: 'LOAD_NOTIFICATIONS_SUCCESS',
    VIEW_NOTIFICATION: 'VIEW_NOTIFICATION',
    VIEW_NOTIFICATION_SUCCESS: 'VIEW_NOTIFICATION_SUCCESS',


    //comments
    LOAD_COMMENTS_FOR_RELATED_OBJECTS_LIST: 'LOAD_COMMENTS_FOR_RELATED_OBJECTS_LIST',
    LOAD_COMMENTS_FOR_RELATED_OBJECTS_LIST_SUCCESS: 'LOAD_COMMENTS_FOR_RELATED_OBJECTS_LIST_SUCCESS',
    MAKE_COMMENT: 'MAKE_COMMENT',
    MAKE_COMMENT_SUCCESS: 'MAKE_COMMENT_SUCCESS',


    //params
    LOAD_PARAMS: 'LOAD_PARAMS',
    LOAD_PARAMS_SUCCESS: 'LOAD_PARAMS_SUCCESS',
    LOAD_ACF: 'LOAD_ACF',
    LOAD_ACF_SUCCESS: 'LOAD_ACF_SUCCESS',
    FLUSH_PARAMS: 'FLUSH_PARAMS',

    LOAD_SESSION_STRESS: 'LOAD_SESSION_STRESS',
    LOAD_SESSION_STRESS_SUCCESS: 'LOAD_SESSION_STRESS_SUCCESS',

    LOAD_SESSIONS_STRESS: 'LOAD_SESSION_STRESS',

    FILTER_RRS: 'FILTER_RRS',
    FILTER_RRS_SUCCESS: 'FILTER_RRS_SUCCESS',

    //realtime
    ADD_REALTIME_USER: 'ADD_REALTIME_USER',
    ADD_REALTIME_USERS: 'ADD_REALTIME_USERS',
    ADD_REALTIME_MESSAGE: 'ADD_REALTIME_MESSAGE', // for fake real-time


    //doctor user notes
    LOAD_DOCTOR_USER_NOTE: 'LOAD_DOCTOR_USER_NOTE',
    LOAD_DOCTOR_USER_NOTE_SUCCESS: 'LOAD_DOCTOR_USER_NOTE_SUCCESS',
    UPDATE_DOCTOR_USER_NOTE: 'UPDATE_DOCTOR_USER_NOTE',
    UPDATE_DOCTOR_USER_NOTE_SUCCESS: 'UPDATE_DOCTOR_USER_NOTE_SUCCESS',


    //export
    GENERATE_REPORT_FOR_XLS: 'GENERATE_REPORT_FOR_XLS',
    GENERATE_REPORT_FOR_XLS_SUCCESS: 'GENERATE_REPORT_FOR_XLS_SUCCESS',

    //animation
    ANIMATION_BEAT_HEART: 'ANIMATION_BEAT_HEART',
    ANIMATION_MAKE_SUPERLOVE: 'ANIMATION_MAKE_SUPERLOVE',

    //admin
    ADMIN_LOAD_USERS_FROM_TO: 'ADMIN_LOAD_USERS_FROM_TO',
    ADMIN_LOAD_USERS_FROM_TO_SUCCESS: 'ADMIN_LOAD_USERS_FROM_TO_SUCCESS',

    ADMIN_LOAD_SESSIONS_FROM_TO: 'ADMIN_LOAD_USERS_FROM_TO',
    ADMIN_LOAD_SESSIONS_FROM_TO_SUCCESS: 'ADMIN_LOAD_USERS_FROM_TO_SUCCESS',

    ADMIN_CHANGE_TIME_RANGE: 'ADMIN_CHANGE_TIME_RANGE',

    //report
    GROUP_REPORT_USER_SELECTION_CHANGE: 'GROUP_REPORT_USER_SELECTION_CHANGE',
    GROUP_REPORT_TIME_SELECTION_CHANGE: 'GROUP_REPORT_TIME_SELECTION_CHANGE',
    GROUP_REPORT_LABELS_CHANGE: 'GROUP_REPORT_LABELS_CHANGE'



};

module.exports = Constants;