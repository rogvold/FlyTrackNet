/**
 * Created by sabir on 24.01.16.
 */

var React = require('react');
var assign = require('object-assign');

var CoolPreloader = require('../preloader/CoolPreloader');

var UserAPI = require('../../api/UserAPI');

var RecoverPasswordDialog = React.createClass({
    getDefaultProps: function () {
        return {

            onClose: function(){

            },

            onRecovered: function(){

            }

        }
    },

    getInitialState: function () {
        return {
            email: undefined,
            message: undefined,
            loading: false
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {

        },

        overlay: {
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            backgroundColor: 'black',
            opacity: 0.8
        },

        overlayPanel: {
            zIndex: 101,
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            paddingTop: 200
        },

        panelPlaceholder: {
            position: 'relative',
            width: 600,
            margin: '0 auto',
            backgroundColor: 'white',
            border: '1px solid #EFF0F1',
            borderRadius: 2,
            padding: 10
        },

        closeButtonPlaceholder: {
            padding: 10,
            position: 'absolute',
            zIndex: 102,
            top: 0,
            right: 0,
            color: 'white'
        },

        submitButtonPlaceholder: {
            paddingTop: 5,
            textAlign: 'right'
        },

        messagePlaceholder: {

        }

    },

    submit: function(){
        var email = this.state.email;
        if (UserAPI.validateEmail(email) == false){
            this.setState({
                message: 'Неверный email'
            });
            return;
        }
        var self = this;
        this.setState({
            loading: true
        });
        UserAPI.recoverPassword(email, function(){
            self.setState({
                loading: false,
                message: 'Проверьте вашу почту!'
            });
            self.props.onRecovered();
        }, function(message){
            self.setState({
                loading: false,
                message: message
            });
        });
    },

    onEmailChange: function(evt){
        var val = evt.target.value;
        if (val == ''){
            val = undefined;
        }
        this.setState({
            email: val,
            message: undefined
        });
    },

    render: function () {
        var submitEnabled = UserAPI.validateEmail(this.state.email);

        var overlaySt = assign({}, this.componentStyle.overlay);
        var overlayPanelSt = assign({}, this.componentStyle.overlayPanel);

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={overlaySt}></div>

                <div style={this.componentStyle.closeButtonPlaceholder} >
                    <button style={{padding: 10, borderRadius: 100, width: 35}} onClick={this.props.onClose} className={'ui inverted button'} >
                        <i style={{margin: 0}} className={'icon remove'} ></i>
                    </button>
                </div>

                <div style={overlayPanelSt}>

                    <div style={this.componentStyle.panelPlaceholder}>
                        <div className={'ui form'} >
                            <input placeholder={'Email'}
                                   value={this.state.email}
                                   onChange={this.onEmailChange} />
                        </div>

                        <div style={this.componentStyle.submitButtonPlaceholder} onClick={this.submit} >
                            <button disabled={!submitEnabled} className={'ui button patientPrimary'} >
                                <i className={'icon wizard'}></i> reset password
                            </button>
                        </div>

                        {this.state.message == undefined ? null :
                            <div style={this.componentStyle.messagePlaceholder} className={'ui message'} >
                                {this.state.message}
                            </div>
                        }

                    </div>

                </div>


                {this.state.loading == false ? null :
                    <CoolPreloader />
                }

            </div>
        );
    }

});

module.exports = RecoverPasswordDialog;