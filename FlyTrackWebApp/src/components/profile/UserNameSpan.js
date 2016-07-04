/**
 * Created by sabir on 30.04.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var UserAPI = require('../../api/UserAPI');

var UserNameSpan = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('UsersStore')],
    getDefaultProps: function(){
        return {
            userId: undefined,
            isShortName: false

        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        var store = flux.store('UsersStore');
        var userId = this.props.userId;
        if (userId == undefined){
            userId = UserAPI.getCurrentUserId();
        }
        var user = store.getUser(userId);
        return {
            loading: store.loading,
            user: user
        }
    },

    getInitialState: function(){
        return {

        }
    },

    componentWillReceiveProps: function(nextProps){

    },

    componentDidMount: function(){
        var userId = this.props.userId;
        if (userId == undefined){
            userId = UserAPI.getCurrentUserId();
        }
        var store = this.getFlux().store('UsersStore');
        var user = store.getUser(userId);
        if (user == undefined){
            this.getFlux().actions.loadUser(userId);
        }
    },

    componentStyle: {
        placeholder: {
            display: 'inline-block'
        }
    },

    getUserName: function(){
        var user = this.state.user;
        if (user == undefined){
            return '';
        }
        var isShort = this.props.isShortName;
        if (isShort == false){
            console.log('returning full name');
            return (user.firstName + ' ' + user.lastName);
        }
        return (user.firstName + ' ' + user.lastName[0] + '.');
    },

    render: function(){
        var name = this.getUserName();
        var user = this.state.user;

        return (
            <div style={this.componentStyle.placeholder} >

                {user == undefined ?
                    <span>
                        загрузка...
                    </span> :
                    <span>
                        {name}
                    </span>
                }

            </div>
        );
    }

});

module.exports = UserNameSpan;