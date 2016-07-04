/**
 * Created by sabir on 20.06.16.
 */

var Parse = require('parse').Parse;
var constants = require('../Constants');

var ParseAPI = {

    initParse: function(){
        var appId = constants.PARSE_APP_ID;
        var jsKey = constants.PARSE_JS_KEY;
        Parse.initialize(appId, jsKey);
        var currentUser = Parse.User.current();
        if (currentUser != undefined){
            currentUser.fetch();
        }
    },

    loadClassItem: function(classNameOrParseClass, objectId, callback, errorCallback){
        this.initParse();
        if ((typeof classNameOrParseClass) == 'string'){
            this.loadClassItemById(classNameOrParseClass, objectId, callback, errorCallback);
        }else{
            this.loadClassItemByParseClass(classNameOrParseClass, objectId, callback, errorCallback);
        }
    },

    loadClassItemById: function(className, objectId, callback, errorCallback){
        var parseClass = Parse.Object.extend(className);
        this.loadClassItemByParseClass(parseClass, objectId, callback, errorCallback);
    },

    loadClassItemByParseClass: function(parseClass, objectId, callback, errorCallback){
        var q = new Parse.Query(parseClass);
        q.get(objectId, {
            success: function(o){
                callback(o);
            },
            error: function(){
                if (errorCallback != undefined){
                    errorCallback();
                }
            }
        });
    },

    createParseObject: function(className, fields, callback){
        this.initParse();
        var A = Parse.Object.extend(className);
        var a = new A();
        for (var i in fields){
            var f = fields[i];
            a.set(f.name, f.val);
        }
        a.save().then(function(obj){
            callback(obj);
        });
    },

    updateParseObject: function(parseObject, fields, callback){
        this.initParse();
        if (parseObject == undefined){
            return;
        }
        var a = parseObject;
        for (var i in fields){
            var f = fields[i];
            a.set(f.name, f.val);
        }
        a.save().then(function(obj){
            callback(obj);
        });
    },

    /**
     *
     * @param parseObject - Parse Object
     * @param items - [name: '', val: '']
     */
    safeSet: function(parseObject, items){
        console.log('safeSet occured: items = ', items);
        if (parseObject == undefined || items == undefined || items.length == 0){
            return parseObject;
        }
        for (var i in items){
            var name = items[i].name;
            var val = items[i].value;
            if (name == undefined){
                continue;
            }
            if (val == undefined){
                parseObject.unset(name);
            }else{
                parseObject.set(name, val);
            }
        }
        return parseObject;
    },

    loadAllDataFromParseRecursively: function (q, page, createdAt, results, callback){
        console.log('loadAllDataFromParseRecursively occured: q = ', q);
        if (q == undefined){
            callback({error: 'q is not defined'});
            return;
        }
        q.limit(1000);
        q.skip(page * 1000);
        q.greaterThan('createdAt', createdAt);
        q.addAscending('createdAt');
        var self = this;
        q.find(function(list){
            if (list == undefined){
                list = [];
            }
            if (page > 8){
                page = 0;
                createdAt = results[results.length - 1].createdAt;
            }
            page = page + 1;
            results = results.concat(list);
            if (list.length < 1000){
                callback(results);
                return;
            }
            self.loadAllDataFromParseRecursively(q, page, createdAt, results, callback);
        });
    },

    loadAllDataFromParse: function(q, callback){
        this.loadAllDataFromParseRecursively(q, 0, new Date(0), [], callback);
    },

    loadDataFromParseMax10kRec: function(q, page, results, callback){
        console.log('loadDataFromParseMax10kRec occured');
        if (q == undefined){
            callback({error: 'q is not defined'});
            return;
        }
        q.limit(1000);
        q.skip(page * 1000);
        var self = this;
        q.find(function(list){
            if (list == undefined){
                list = [];
            }
            page = page + 1;
            results = results.concat(list);
            if (list.length < 1000){
                callback(results);
                return;
            }
            self.loadDataFromParseMax10kRec(q, page, results, callback);
        });
    },

    loadDataFromParseMax10k: function(q, callback){
        this.loadDataFromParseMax10kRec(q, 0, [], callback);
    },

    runCloudFunction: function(functionName, data, success, error){
        console.log('runCloudFunction uccured: ', functionName, data);
        if (functionName == undefined){
            return;
        }
        if (data == undefined){
            console.log('data is not defined');
            return;
        }
        if (success == undefined){
            success = function(){}
        }
        if (error == undefined){
            error = function(){}
        }
        Parse.Cloud.run(functionName, {data: data}, {
            success: function(successData){
                console.log('functionName: success: ', successData);
                success(successData);
            },
            error: function(respErr){
                console.log('functionName: error: ', respErr);
                var err = respErr.message;
                if (typeof  respErr.message == 'string'){
                    err = JSON.parse(err);
                }
                error(err);
            }
        });

    }

}


module.exports = ParseAPI;