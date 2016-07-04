/**
 * Created by sabir on 20.06.16.
 */

var Fluxxor = require('fluxxor');
var constants = require('../FluxConstants');

var AlertsStore = Fluxxor.createStore({
    self: this,

    initialize: function(){
        this.timeout = 20000;
        this.notifications = [];

        this.bindActions(
            constants.SHOW_ALERT_NOTIFICATION, this.showAlertNotification,
            constants.HIDE_ALERT_NOTIFICATION, this.hideAlertNotification
        );
    },

    showAlertNotification(payload){
        var notificationType = (payload.notificationType == undefined) ? 'info' : payload.notificationType;
        var message = payload.message;
        var title = payload.title;
        this.notifications.push({
            message: message,
            title: title,
            notificationType: notificationType,
            id: this.notifications.length
        });
        this.emit('change');
        this.delayedDestroy();
    },

    delayedDestroy: function(){
        setTimeout(function(){
            this.notifications = [];
            this.emit('change');
        }.bind(this), this.timeout);
    },

    hideAlertNotification: function(payload){
        var arr = [];
        var id = payload.id;
        var list = this.notifications;
        for (var i in list){
            if (list[i].id == id){
                continue;
            }
            arr.push(list[i]);
        }
        this.notifications = arr;
        this.emit('change');
    },

    getState: function(){
        return {

        }
    }

});

module.exports = AlertsStore;