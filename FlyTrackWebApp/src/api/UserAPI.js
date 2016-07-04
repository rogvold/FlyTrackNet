/**
 * Created by sabir on 20.06.16.
 */

var React = require('react');

var Parse = require('parse').Parse;

var assign = require('object-assign');

var ParseAPI = require('./ParseAPI');

var UserAPI = {

    onChange: function(){

    },

    logIn: function(email, password, callback, errorCallback){
        ParseAPI.initParse();
        if (this.validateEmail(email) == false){
            errorCallback('Incorrect email');
            return;
        }
        email = email.toLowerCase();
        Parse.User.logIn(email, password, {
            success: function(u){
                callback(u);
            },
            error: function(u, err){
                console.log(err);
                var code = err.code;
                if (code == 101){
                    errorCallback('Account with specified login and password is not found');
                }else{
                    errorCallback(err.message);
                }

            }
        });
    },

    facebookLogIn: function(callback, errorCallback){
        if (callback == undefined){callback = function(){}}
        if (errorCallback == undefined){errorCallback = function(){}}
        this.initFacebookLogin();
        Parse.FacebookUtils.logIn("public_profile,email", {
            success: function(user) {
                if (!user.existed()) {
                    FB.api('/me', function(me) {
                        var locale = '_unknown';
                        if (navigator.language != undefined){
                            locale = navigator.language + '_' + navigator.language.toUpperCase();
                        }

                        user.set("displayName", me.name);
                        user.set("email", me.email);
                        user.set('reg_via', 'website');
                        user.set('firstName', me.first_name);
                        user.set('lastName', me.last_name);
                        user.set('userRole', 'user');
                        user.set('facebookId', me.id);
                        user.set('timezone', me.timezone);
                        user.set('locale', me.locale);
                        user.set('realTimeMonitoring', false);
                        user.set('locale', locale);

                        if (me.gender != undefined){
                            user.set('gender', me.gender.toUpperCase());
                        }
                        console.log("/me response", me);
                        user.save().then(function(){

                            callback();
                        });
                    });
                } else {

                    callback();
                }
            },
            error: function(user, error) {
                errorCallback(error.message);
            }
        });
    },

    signUp: function(email, password, firstName, lastName, userRole, avatar, callback, errorCallback){
        if (avatar == undefined){
            //avatar = 'http://beta.englishpatient.org/img/profile.png';
            avatar = 'https://www.englishpatientdrive.pw/dropzone/uploads/kbJGdXWAVH64c7OSuM7M.png';
        }
        ParseAPI.initParse();
        if (this.validateEmail(email) == false){
            errorCallback('Incorrect Email');
            return;
        }

        if (email == undefined || password == undefined){
            errorCallback('Incorrect login or password');
            return;
        }
        var locale = '_unknown';
        if (navigator.language != undefined){
            locale = navigator.language + '_' + navigator.language.toUpperCase();
        }
        email = email.toLowerCase();
        var user = new Parse.User();
        user.set("username", email);
        user.set("password", password);
        user.set("userPassword", password);
        user.set("email", email);
        user.set('firstName', firstName);
        user.set('lastName', lastName);
        user.set('userRole', userRole);
        user.set('avatar', avatar);
        user.set('realTimeMonitoring', false);
        user.set('reg_via', 'website');
        user.set('emailNotification', true);
        user.set('locale', locale);

        user.signUp(null, {
            success: function(u) {

                if (callback != undefined){
                    callback(u);
                }
            },
            error: function(user, error) {
                console.log(error);
                errorCallback(error.message);
            }
        });
    },

    initFacebookLogin: function(){
        console.log('initFacebookLogin occured');
        //window.fbAsyncInit = function() {
        Parse.FacebookUtils.init({
            appId: '788471417852291',
            status: true,
            cookie: true,
            xfbml: true
        });
        //}
    },



    getCurrentUser: function(){
        ParseAPI.initParse();
        var u = Parse.User.current();
        if (u == undefined){
            return undefined;
        }
        var firstName = ( u.get('firstName') == undefined ) ? '' : u.get('firstName');
        var lastName = ( u.get('lastName') == undefined ) ? '' : u.get('lastName');
        var name = firstName + ' ' + lastName;
        if (name == ' '){
            name = u.get('email');
        }
        return {
            name: name,
            userRole: u.get('userRole'),
            email: u.get('email'),
            avatar: u.get('avatar'),
            emailNotification: (u.get('emailNotification') == undefined) ? false : u.get('emailNotification'),
            realTimeMonitoring: u.get('realTimeMonitoring'),
            id: u.id,
            createdAt: u.createdAt,
            lang: (u.get('lang') == undefined) ? 'en' : u.get('lang')
        }
    },

    getCurrentUserId: function(){
        var u = this.getCurrentUser();
        if (u == undefined){
            return undefined;
        }
        return u.id;
    },

    isLoggedIn: function(){
        return (Parse.User.current() != undefined);
    },

    logOut: function(callback){
        if (this.isLoggedIn() == false){
            callback();
        }else{
            Parse.User.logOut().then(function(){
                callback();
            });
        }
    },

    recoverPassword: function(email, successCallback, errorCallback){
        if (this.validateEmail(email) == false){
            return;
        }
        Parse.User.requestPasswordReset(email, {
            success: function(){
                successCallback();
            },
            error: function(err){
                errorCallback(err.message);
            }
        });
    },

    validateEmail: function(email){
        if (email == undefined){
            return false;
        }
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    },


    transformUser: function(u){
        if (u == undefined){
            return undefined;
        }
        var firstName = ( u.get('firstName') == undefined ) ? '' : u.get('firstName');
        var lastName = ( u.get('lastName') == undefined ) ? '' : u.get('lastName');
        var name = firstName + ' ' + lastName;
        if (name == ' '){
            name = u.get('email');
        }

        return {
            name: name,
            firstName: firstName,
            lastName: lastName,
            userRole: u.get('userRole'),
            emailNotification:  (u.get('emailNotification') == undefined) ? false : u.get('emailNotification'),
            gender: u.get('gender'),
            locale: u.get('locale'),
            email: u.get('email'),
            avatar: (u.get('avatar') == undefined) ? 'https://www.englishpatientdrive.pw/dropzone/uploads/kbJGdXWAVH64c7OSuM7M.png' : u.get('avatar'),
            realTimeMonitoring: u.get('realTimeMonitoring'),
            timestamp: (new Date(u.createdAt)).getTime(),
            id: u.id,
            lang: (u.get('lang') == undefined) ? 'en' : u.get('lang')
        }
    },

    loadUserById: function(userId, callback){
        var q = new Parse.Query(Parse.User);
        var self = this;
        q.get(userId, function(u){
            callback(u);
        });
    },

    loadUser: function(userId, callback){
        console.log('loadUser occured: userId = ', userId);
        var self = this;
        this.loadUserById(userId, function(u){
            var tU = self.transformUser(u);
            console.log('user loaded: ', tU);
            callback(tU);
        });
    },

    updateUser: function(userId, firstName, lastName, avatar, callback){
        console.log('updateUser occured: ', userId, firstName, lastName, avatar);
        if (userId == undefined){
            callback();
            return;
        }
        var self = this;
        this.loadUserById(userId, function(u){
            u = ParseAPI.safeSet(u, [{name: 'firstName', value: firstName}, {name: 'lastName', value: lastName},
                {name: 'avatar', value: avatar}
            ]);
            u.save().then(function(user){
                console.log('user updated: ', user);
                callback(self.transformUser(user));
            });
        });
    },

    updateUserWithData: function(data, callback){
        console.log('UserAPI: updateUserWithData: data = ', data);
        if (data == undefined || data.userId == undefined){
            return;
        }
        var self = this;
        var map = {};
        for (var key in data){
            if (data[key] != undefined){
                map[key] = data[key];
            }
        }
        console.log('running cloud function with map == ', map);
        Parse.Cloud.run('updateUser', assign({}, map), {
            success: function(u){
                var user = self.transformUser(u);
                callback(user);
            }
        });
    },

    loadUsersByIdsList: function(ids, callback){
        if (ids == undefined || ids.length == 0){
            callback([]);
        }
        var self = this;
        var q = new Parse.Query(Parse.User);
        q.containedIn('objectId', ids);
        q.limit(1000);

        ParseAPI.loadAllDataFromParse(q, function(results){
            var arr = results.map(function(r){
                return self.transformUser(r)
            });
            callback(arr);
        });
    },

    loadUserByEmail: function(email, callback, errorCallback){
        if (errorCallback == undefined){
            errorCallback = function(){}
        }
        var q = new Parse.Query(Parse.User);
        if (email == undefined || email.trim().length == 0){
            return;
        }
        email = email.trim();
        var self = this;
        q.equalTo('email', email);
        q.find(function(results){
            if (results == undefined || results.length == 0){
                errorCallback('not found');
                return;
            }
            var u = results[0];
            u = self.transformUser(u);
            callback(u);
        });
    }


}

module.exports = UserAPI;