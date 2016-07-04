/**
 * Created by sabir on 16.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var UserMixin = require('../../mixins/UserMixin');

var SelfLoadingUserSpan = React.createClass({
    getDefaultProps: function () {
        return {
            userId: undefined
        }
    },

    getInitialState: function () {
        return {
            loading: false,
            user: undefined
        }
    },

    componentWillReceiveProps: function (nextProps) {
        this.load();
    },

    componentDidMount: function () {
        this.load();
    },

    load: function(){
        var userId = this.props.userId;
        if (userId == undefined){
            return;
        }
        this.setState({
            loading: true
        });
        UserMixin.loadUser(userId, function(u){
            this.setState({
                loading: false,
                user: u
            });
        }.bind(this));
    },

    componentStyle: {
        placeholder: {
            display: 'inline-block'
        }
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>
                {this.state.user == undefined ? null :
                    <span>{this.state.user.name}</span>
                }
            </div>
        );
    }

});

module.exports = SelfLoadingUserSpan;