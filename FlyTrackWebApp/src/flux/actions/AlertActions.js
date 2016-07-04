/**
 * Created by sabir on 20.06.16.
 */

var assign = require('object-assign');
var constants = require('../FluxConstants');

var AlertActions = {

    showAlertNotification: function(title, message, notificationType){
        this.dispatch(constants.SHOW_ALERT_NOTIFICATION, {
            title: title,
            message: message,
            notificationType: notificationType
        });
    },

    hideAlertNotification: function(id){
        this.dispatch(constants.HIDE_ALERT_NOTIFICATION, {id: id});
    }

}

module.exports = AlertActions;