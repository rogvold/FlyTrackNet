/**
 * Created by sabir on 05.07.16.
 */

var ECR = require('cloud/helpers/ErrorCodesRegistry');
var CommonHelper = require('cloud/helpers/CommonHelper');

var AircraftsModule = {

    transformAircraft: function(a){
        if (a == undefined){
            return undefined;
        }
        return {
            id: a.id,
            userId: a.get('userId'),
            timestamp: (new Date(a.createdAt)).getTime(),
            aircraftId: a.get('aircraftId'),
            aircraftType: a.get('aircraftType'),
            callName: a.get('callName'),
            deleted: a.get('deleted'),
            name: a.get('name')
        }
    },

    createAircraft: function(data, success, error){
        if (data == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'data is not defined'});
            return;
        }
        if (data.userId == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'userId is not defined'});
            return;
        }
        if (data.name == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'name is not defined'});
            return;
        }
        if (data.aircraftType == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'aircraftType is not defined'});
            return;
        }
        if (data.aircraftId == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'aircraftId is not defined'});
            return;
        }
        if (data.callName == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'callName is not defined'});
            return;
        }
        var Aircraft = Parse.Object.extend('Aircraft');
        var a = new Aircraft();
        a.set('userId', data.userId);
        a.set('name', data.name);
        a.set('aircraftType', data.aircraftType);
        a.set('aircraftId', data.aircraftId);
        a.set('callName', data.callName);
        a.set('deleted', false);
        var self = this;
        a.save().then(function(savedAircraft){
            success(self.transformAircraft(savedAircraft));
        });
    },


    loadUsersAircrafts: function(data, success, error){
        if (data == undefined || data.userId == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'loadUsersAircrafts: userId is not defined'});
            return;
        }
        var q = new Parse.Query('Aircraft');
        q.equalTo('userId', data.userId);
        q.equalTo('deleted', false);
        q.addDescending('createdAt');
        q.limit(1000);
        var self = this;
        q.find(function(results){
            if (results == undefined){
                results = [];
            }
            var arr = results.map(function(r){
                return self.transformAircraft(r);
            });
            success(arr);
        });
    },

    deleteAircraft: function(data, success, error){
        if (data == undefined || data.id == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'deleteAircraft: id is not defined'});
            return;
        }
        var q = new Parse.Query('Aircraft');
        var self = this;
        q.get(data.id, {
            success: function(foundAircraft){
                foundAircraft.set('deleted', true);
                foundAircraft.save().then(function(savedAircraft){
                    success(self.transformAircraft(savedAircraft));
                });
            },
            error: function(){
                error({code: ECR.AIRCRAFT_IS_NOT_FOUND, message: 'Aircraft with id = "' + data.id +'" is not found'});
            }
        });
    },

    updateAircraft: function(data, success, error){
        if (data == undefined || data.id == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'updateAircraft: id is not defined'});
            return;
        }
        var q = new Parse.Query('Aircraft');
        var self = this;
        q.get(data.id, {
            success: function(foundAircraft){
                for (var key in data){
                    if (key == 'id' || key == 'deleted'){
                        continue;
                    }
                    foundAircraft.set(key, data[key]);
                }
                foundAircraft.save().then(function(savedAircraft){
                    success(self.transformAircraft(savedAircraft));
                });
            },
            error: function(){
                error({code: ECR.AIRCRAFT_IS_NOT_FOUND, message: 'Aircraft with id = "' + data.id +'" is not found'});
            }
        });
    }

};

module.exports = AircraftsModule;