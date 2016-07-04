/**
 * Created by sabir on 02.10.15.
 */
var React = require('react');

var LoginForm = require('./LoginForm');
var SignupForm = require('./SignupForm');

var RecoverPasswordButton = require('./RecoverPasswordButton');

var AuthForm = React.createClass({
    getDefaultProps: function () {
        return {
            topText: undefined,
            onLogin: function(){

            },

            roleSelectorEnabled: false,

            confirmPasswordMode: true,

            loginFirst: true,

            facebookEnabled: true,

            signUpEnabled: true

        }
    },

    getInitialState: function () {
        return {
            login: this.props.loginFirst
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {
            width: 250,
            display: 'block',
            margin: '0 auto'
        },

        formPlaceholder:{

        },

        togglerPlaceholder: {
            paddingTop: 10,
            //marginTop: 15,
            //borderTop: '1px solid lightgrey',
            fontSize: '14px',
            //textAlign: 'right',
            textAlign: 'center',
            paddingRight: 8
        },

        toggler: {
            cursor: 'pointer',
            textDecoration: 'underline',
            color: '#45619D'
        },

        togglerButton: {
            marginTop: 10
        },

        togglerLabel: {
            opacity: 0.6
        }

    },

    toggle: function(){
        this.setState({
            login: !this.state.login
        });
    },

    onLogin: function(){
        this.props.onLogin();
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.formPlaceholder}>

                    {this.state.login ?
                        <LoginForm onLogin={this.onLogin} facebookEnabled={this.props.facebookEnabled} />
                        :
                        <SignupForm
                            facebookEnabled={this.props.facebookEnabled}
                            confirmPasswordMode={this.props.confirmPasswordMode}
                            roleSelectorEnabled={this.props.roleSelectorEnabled} onSignUp={this.onLogin} />
                    }

                </div>

                <div style={this.componentStyle.togglerPlaceholder}>

                    <div>
                        {this.state.login
                            ?
                            <div>

                                {this.props.signUpEnabled == false ? null :
                                    <div>
                                        <span style={this.componentStyle.togglerLabel}>
                                            Not registered?
                                        </span>

                                            <br/>
                                        <span onClick={this.toggle} style={this.componentStyle.toggler}>
                                            <button style={this.componentStyle.togglerButton} className={' ui blue basic button '} >
                                                Sign up
                                            </button>
                                        </span>
                                    </div>
                                }


                                <br/>

                                <div style={{marginTop: 10, paddingTop: 10, borderTop: '1px solid lightgrey'}}>
                                    <RecoverPasswordButton style={{opacity: 0.6}} buttonName={'забыли пароль?'} />
                                </div>

                            </div>
                            :
                            <div>
                                <span style={this.componentStyle.togglerLabel}>
                                    Already registered?
                                </span>

                                <br/>
                                <span onClick={this.toggle} style={this.componentStyle.toggler}>
                                    <button style={this.componentStyle.togglerButton}  className={' ui blue basic button '} >
                                        Sign in
                                    </button>
                                </span>

                            </div>
                        }
                    </div>

                </div>

            </div>
        );

    }

});

module.exports = AuthForm;