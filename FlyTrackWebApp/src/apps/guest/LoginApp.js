/**
 * Created by sabir on 20.06.16.
 */

var React = require('react');
var assign = require('object-assign');

var AuthForm = require('../../components/user/AuthForm');
var UserAPI = require('../../api/UserAPI')

var CommonHelper = require('../../helpers/CommonHelper');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);

var LoginApp = React.createClass({
    mixins: [FluxMixin],
    getDefaultProps: function () {
        return {
            onLogin: function(){

            }
        }
    },

    getInitialState: function () {
        return {}
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {
        document.title = 'FlyTrack';
    },

    onLogin: function(){
        console.log('onLogin occured - redirecting');
        //CommonHelper.forceTransitionTo('/#/');
        window.location.reload();
    },

    componentStyle: {
        placeholder: {

        },

        topBlock: {
            margin: '0 auto',
            marginTop: 20,
            marginBottom: 20,
            width: 300,
            textAlign: 'center'
        },

        logo: {
            width: 200
        }

    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.topBlock} >
                    <img style={this.componentStyle.logo}
                         src={'assets/images/flytrack_logo.png'} />

                </div>

                <AuthForm onLogin={this.onLogin} signUpEnabled={false}
                          facebookEnabled={false} roleSelectorEnabled={true} />
            </div>
        );
    }

});

module.exports = LoginApp;