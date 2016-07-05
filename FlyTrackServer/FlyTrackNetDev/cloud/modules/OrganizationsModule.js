/**
 * Created by sabir on 05.07.16.
 */

var ECR = require('cloud/helpers/ErrorCodesRegistry');
var CommonHelper = require('cloud/helpers/CommonHelper');

var OrganizationsModule = {

    transformOrganization: function(org){
        if (org == undefined){
            return undefined;
        }
        return {
            id: org.id,
            timestamp: (new Date(org.createdAt)).getTime(),
            adminId: (org.get('adminId') == undefined) ? org.get('dispatcherId') : org.get('adminId'), //todo: improve that
            name: org.get('name'),
            description: org.get('description'),
            freq: org.get('freq'),
            lat: org.get('lat'),
            lon: org.get('lon'),
            alt: org.get('alt'),
            backgroundImg: org.get('backgroundImg'),
            code: org.get('code')
        }
    },

    createOrganization: function(data, success, error){
        if (data == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'data is not defined'});
            return;
        }
        if (data.adminId == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'adminId is not defined'});
            return;
        }
        if (data.name == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'name is not defined'});
            return;
        }
        if (data.code == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'code is not defined'});
            return;
        }
        if (data.lat == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'lat is not defined'});
            return;
        }
        if (data.lon == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'lon is not defined'});
            return;
        }
        if (data.alt == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'alt is not defined'});
            return;
        }
        var Organization = Parse.Object.extend('Organization');
        var org = new Organization();
        org.set('name', data.name);
        org.set('description', data.description);
        org.set('adminId', data.adminId);
        org.set('code', data.code);
        org.set('lat', data.lat);
        org.set('lon', data.lon);
        org.set('alt', data.alt);
        org.save().then(function(savedOrg){
            success(self.transformOrganization(savedOrg));
        });
    },

    updateOrganization: function(data, success, error){
        if (data == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'data is not defined'});
            return;
        }
        if (data.id  == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'id is not defined'});
            return;
        }
        var q = new Parse.Query('Organization');
        var self = this;
        q.get(data.id, {
            success: function(foundOrg){
                for (var key in data){
                    if (key == 'id' || key == 'deleted'){
                        continue;
                    }
                    foundOrg.set(key, data[key]);
                }
                foundOrg.save().then(function(savedOrg){
                    success(self.transformOrganization(savedOrg));
                });
            },
            error: function(){
                error({code: ECR.AIRCRAFT_IS_NOT_FOUND, message: 'Organization with id = "' + data.id +'" is not found'});
            }
        });
    },

    loadOrganization: function(data, success, error){
        if (data == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'data is not defined'});
            return;
        }
        if (data.id  == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'loadOrganization: id is not defined'});
            return;
        }
        var q = new Parse.Query('Organization');
        var self = this;
        q.get(data.id, {
            success: function(org){
                success(self.transformOrganization(org));
            },
            error: function(){
                error({code: ECR.AIRCRAFT_IS_NOT_FOUND, message: 'Organization with id = "' + data.id +'" is not found'});
            }
        });
    },

    loadAllOrganizations: function(data, success, error){
        var q = new Parse.Query('Organization');
        q.addDescending('createdAt');
        q.limit(1000);
        var self = this;
        q.find(function(results){
            if (results == undefined){
                results = [];
            }
            var arr = results.map(function(r){return self.transformOrganization(r)});
            success(arr);
        });
    }

};

module.exports = OrganizationsModule;