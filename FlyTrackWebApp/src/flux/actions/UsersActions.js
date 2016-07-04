/**
 * Created by sabir on 22.02.16.
 */

var assign = require('object-assign');
var constants = require('../FluxConstants');

var UserAPI = require('../../api/UserAPI');
var ParseAPI = require('../../api/ParseAPI');
var CommonHelper = require('../../helpers/CommonHelper');

var UsersActions = {

    loadUser: function(userId){
        console.log('UsersActions: loadUser occured: userId = ', userId);
        this.dispatch(constants.LOAD_USER, {userId: userId});
        ParseAPI.runCloudFunction('loadUser', {userId: userId}, function(user){
            this.dispatch(constants.LOAD_USER_SUCCESS, {user: user});
        }.bind(this), function(err){
            this.dispatch(constants.LOAD_USER_FAIL, {});
        }.bind(this));
    },

    loadUserByEmail: function(email){
        this.dispatch(constants.LOAD_USER_BY_EMAIL, {email: email});
        UserAPI.loadUserByEmail(email, function(user){
            this.dispatch(constants.LOAD_USER_BY_EMAIL_SUCCESS, {user: user});
        }.bind(this), function(message){
            this.dispatch(constants.LOAD_USER_BY_EMAIL_FAIL, {message: message});
            setTimeout(function(){
                this.flux.actions.showAlertNotification('Not found', 'User with email "' + email + '" is not found');
            }.bind(this), 10);
        }.bind(this));
    },

    loadUsersByIds: function(ids){
        console.log('UsersActions: loadUsersByIds occured: ids = ', ids);
        if (ids == undefined || ids.length == 0){
            return;
        }
        var map = {};
        for (var i in ids){
            map[ids[i]] = 1;
        }
        var arrIds = [];
        for (var key in map){
            arrIds.push(key);
        }
        var self = this;
        this.dispatch(constants.LOAD_USERS_BY_IDS, {ids: arrIds});
        UserAPI.loadUsersByIdsList(arrIds, function(users){
            this.dispatch(constants.LOAD_USERS_BY_IDS_SUCCESS, {users: users});
        }.bind(this));
    },

    updateUser: function(data){
        if (data == undefined){
            return;
        }
        this.dispatch(constants.UPDATE_USER, {});
        ParseAPI.runCloudFunction('updateUser', data, function(updatedUser){
            this.dispatch(constants.UPDATE_USER_SUCCESS, {user: updatedUser});
        }.bind(this), function(err){
            this.dispatch(constants.UPDATE_USER_FAIL, {errorMessage: err.message});
        }.bind(this));
    },


    logOut: function(){
        UserAPI.logOut(function(){
            CommonHelper.forceTransitionTo('/#/');
            //window.location.href = '/#/';
            //setTimeout(function(){
            //    window.location.reload();
            //}, 200);
        });
    }

}

module.exports = UsersActions;