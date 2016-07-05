/**
 * Created by sabir on 21.06.16.
 */
var ECR = require('cloud/helpers/ErrorCodesRegistry');
var CommonHelper = require('cloud/helpers/CommonHelper');

var UsersModule = {

    transformUser: function(u){
        if (u == undefined){
            return undefined;
        }
        return {
            id: u.id,
            email: u.get('email'),
            nickname: u.get('nickname'),
            firstName: u.get('firstName'),
            lastName: u.get('lastName'),
            phone: u.get('phone'),
            timestamp: new Date(u.createdAt).getTime(),
            birthdayTimestamp: new Date(u.get('birthdayTimestamp')).getTime()
        }
    },

    loadUser: function(userId, callback, shouldTransform){
        shouldTransform = (shouldTransform == undefined) ? false : shouldTransform;
        if (userId == undefined){
            callback(undefined);
            return;
        }
        var q = new Parse.Query(Parse.User);
        var self = this;
        q.get(userId, {
            success: function(u){
                if (shouldTransform == true){
                    u = self.transformUser(u);
                }
                callback(u);
            },
            error: function(){
                callback(undefined);
            }
        });
    },

    loadUserByEmail: function(email, callback, notFoundCallback){
        var q = new Parse.Query(Parse.User);
        q.equalTo('email', email);
        var self = this;
        q.find({
            success: function(results){
                if (results == undefined || results.length == 0){
                    notFoundCallback();
                    return;
                }
                callback(self.transformUser(results[0]));
            }
        });
    },

    createUser: function(data, success, error){
        if (data == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'data is not defined'});
            return;
        }
        if (data.firstName == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'firstName is not defined'});
            return;
        }
        if (data.lastName == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'lastName is not defined'});
            return;
        }

        if (data.password == undefined || data.password.length < 3){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'password is not defined or too short'});
            return;
        }


        if (data.email == undefined || CommonHelper.validateEmail(data.email) == false){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'email is not valid'});
            return;
        }

        if (data.userRole == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'userRole is not defined'});
            return;
        }

        var self = this;
        this.loadUserByEmail(data.email, function(foundUser){
            error({code: ECR.USER_WITH_SPECIFIED_EMAIL_ALREADY_EXISTS.code, message: 'user with specified email already exists'});
        }, function(){
            var user = new Parse.User();
            user.set('username', data.email);
            user.set('email', data.email);
            user.set('password', data.password);
            user.set('firstName', data.firstName);
            user.set('lastName', data.lastName);
            user.set('phone', data.phone);
            user.set('userRole', data.userRole);
            if (data.nickname != undefined){
                user.set('nickname', data.nickname);
            }
            if (data.birthTimestamp != undefined){
                user.set('birthdayTimestamp', data.birthdayTimestamp);
            }
            user.signUp(null, {
                success: function(user){
                    success(self.transformUser(user));
                },
                error: function(err){
                    error({code: ECR.UNKNOWN_ERR.code, message: 'some problems during signing up'});
                }
            });
        });
    },

    updateUser: function(data, success, error){
        if (data == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'data is not defined'});
            return;
        }
        if (data.userId == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'userId is not defined'});
            return;
        }
        var self = this;
        this.loadUser(data.userId, function(u){
            for (var key in data){
                if (key == 'userId'){
                    continue;
                }
                u.set(key, data[key]);
            }
            u.save().then(function(updatedUser){
                success(self.transformUser(updatedUser));
            });
        });
    }

};

module.exports = UsersModule;