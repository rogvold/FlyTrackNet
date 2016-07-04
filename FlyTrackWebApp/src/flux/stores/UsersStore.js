/**
 * Created by sabir on 22.02.16.
 */

var Fluxxor = require('fluxxor');

var constants = require('../FluxConstants');

var UserAPI = require('../../api/UserAPI');

var UsersStore = Fluxxor.createStore({
    self: this,

    initialize: function(){
        this.loading = false;
        this.usersMap = {};

        this.bindActions(
            constants.LOAD_USER, this.loadUser,
            constants.LOAD_USER_SUCCESS, this.loadUserSuccess,
            constants.LOAD_USER_FAIL, this.loadUserFail,


            constants.LOAD_USERS_BY_IDS, this.loadUsersByIds,
            constants.LOAD_USERS_BY_IDS_SUCCESS, this.loadedUsersByIds,

            constants.ADMIN_LOAD_USERS_FROM_TO, this.loadUsersFromTo,
            constants.ADMIN_LOAD_USERS_FROM_TO_SUCCESS, this.loadedUsersFromTo,

            constants.UPDATE_USER, this.updateUser,
            constants.UPDATE_USER_SUCCESS, this.updateUserSuccess,
            constants.UPDATE_USER_FAIL, this.updateUserFail,

            constants.LOAD_USER_BY_EMAIL, this.loadUserByEmail,
            constants.LOAD_USER_BY_EMAIL_SUCCESS, this.loadedUserByEmail,
            constants.LOAD_USER_BY_EMAIL_FAIL, this.loadUserByEmailFail


        );
    },

    onActionMethod: function(payload){
        console.log(payload);
    },

    getState: function(){
        return {

        }
    },

    consumeUsers: function(users){
        if (users == undefined || users.length == 0 ){
            return;
        }
        for (var i in users){
            this.usersMap[users[i].id] = users[i];
        }
        this.emit('change');
    },

    getUserById: function(userId){
        if (userId == undefined){
            return undefined;
        }
        return this.usersMap[userId];
    },

    loadUser: function(payload){
        var userId = payload.userId;
        if (userId == undefined){
            return;
        }
        if (this.usersMap[userId] != undefined){
            return;
        }
        this.loading = true;
        this.emit('change');
    },

    getNotLoadedIdsList: function(ids){
        var map = this.usersMap;
        var arr = [];
        for (var i in ids){
            if (map[ids[i]] == undefined){
                arr.push(ids[i]);
            }
        }
        return arr;
    },

    loadUserSuccess: function(payload){
        var user = payload.user;
        if (user == undefined){
            return;
        }
        this.usersMap[user.id] = user;
        this.loading = false;
        this.emit('change');
    },

    loadUserFail: function(payload){
        this.loading = false;
        this.emit('change');
    },

    loadUserByEmail: function(payload){
        this.loading = true;
        this.emit('change');
    },

    loadedUserByEmail: function(payload){
        var user = payload.user;
        this.loading = false;
        this.usersMap[user.id] = user;
        this.emit('change');
    },

    loadUserByEmailFail: function(){
        this.loading = false;
        this.emit('change');
    },

    loadUsersByIds: function(payload){
        var ids = (payload == undefined) ? [] : payload.ids;
        if (ids == undefined){
            ids = [];
        }
        var notLoadedIds = this.getNotLoadedIdsList(ids);
        if (notLoadedIds.length == 0){
            return;
        }
        this.loading = true;
        this.emit('change');
    },

    loadedUsersByIds: function(payload){
        console.log('UsersStore: loadedUsersByIds: payload = ', payload);
        var users = payload.users;
        if (users == undefined){
            users = [];
        }
        for (var i in users){
            this.usersMap[users[i].id] = users[i];
        }
        console.log('this.usersMap = ', this.usersMap);

        this.loading = false;
        this.emit('change');
    },

    getCurrentUser: function(){
        var id = UserAPI.getCurrentUserId();
        return this.usersMap[id];
    },

    getCurrentUserId: function(){
        var id = UserAPI.getCurrentUserId();
        return id;
    },

    updateUser: function(payload){
        this.loading = true;
        this.emit('change');
    },

    updateUserSuccess: function(payload){
        this.usersMap[payload.user.id] = payload.user;
        this.loading = false;
        this.emit('change');
    },

    updateUserFail: function(payload){
        this.loading = false;
        this.emit('change');
    },

    getUser: function(userId){
        return this.usersMap[userId];
    },

    getUserByEmail: function(email){
        if (email == undefined){
            return undefined;
        }
        var map = this.usersMap;
        for (var key in map){
            var user = map[key];
            if (user.email == email){
                return user;
            }
        }
        return undefined;
    },

    loadUsersFromTo: function(){
        this.loading = true;
        this.emit('change');
    },

    loadedUsersFromTo: function(payload){
        this.loading = false;
        this.consumeUsers(payload.users);
        this.emit('change');
    },

    getUsersFromTo: function(from, to){
        var arr = [];
        var map = this.usersMap;
        for (var key in map){
            var user = map[key];
            if ((user.timestamp >= from) && (user.timestamp <= to)){
                arr.push(user);
            }
        }
        return arr;
    }

});


module.exports = UsersStore;