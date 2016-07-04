/**
 * Created by sabir on 02.10.15.
 */

var React = require('react');
var UserAPI = require('../../api/UserAPI');
var RoleSelector = require('./RoleSelector');

var assign = require('object-assign');

var SignupForm = React.createClass({
    getDefaultProps: function () {
        return {
            buttonText: 'Sign up',
            emailPlaceholder: 'Email',
            passwordPlaceholder: 'Password',
            passwordConfirmPlaceholder: 'Confirm password',
            firstNamePlaceholder: 'First name',
            lastNamePlaceholder: 'Last name',
            formName: 'Sign up',

            loginMode: false,

            onSignUp: function(u){
                console.log('onLogin occured: u = ', u);
            },

            onLogin: function(u){

            },

            userRole: 'user',

            confirmPasswordMode: true,

            roleSelectorEnabled: false,

            nameFormStyle: {

            }
        }
    },

    getInitialState: function () {
        return {
            email: '',
            password: '',
            confirmPassword: '',
            firstName: '',
            lastName: '',
            messageIsVisible: false,
            errorMessage: undefined,
            loading: false,
            userRole: this.props.userRole
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {
            padding: 5,
            width: 250,
            margin: '0 auto'
        },

        namePlaceholder: {
            fontSize: '20px',
            textAlign: 'center',
            paddingBottom: 10
        },

        inputsPlaceholder: {
            width: '100%'
        },

        emailPlaceholder: {
            marginBottom: 10
        },


        passwordPlaceholder: {
            marginBottom: 10
        },

        confirmPasswordPlaceholder: {
            paddingBottom: 10,
            borderBottom: '1px solid lightgrey',
            marginBottom: 15
        },

        firstNamePlaceholder: {

        },

        lastNamePlaceholder: {

        },

        buttonPlaceholder: {
            //textAlign: 'right',
            textAlign: 'center',
            marginTop: 10
        },

        errorPlaceholder: {
            color: 'firebrick',
            borderRadius: 5,
            padding: 5,
            marginBottom: 10,
            marginTop: 10,
            textAlign: 'center',
            border: '1px dotted firebrick',
            fontSize: '14px',
            backgroundColor: 'lemonchiffon'
        },

        button: {
            marginTop: 5
        }
    },

    onEmailChange: function(evt){
        var val = evt.target.value;
        this.setState({
            email: val
        });
    },

    onPasswordChange: function(evt){
        var val = evt.target.value;
        this.setState({
            password: val
        });
    },

    onFirstNameChange: function(evt){
        var val = evt.target.value;
        this.setState({
            firstName: val
        });
    },

    onLastNameChange: function(evt){
        var val = evt.target.value;
        this.setState({
            lastName: val
        });
    },

    onConfirmPasswordChange: function(evt){
        var val = evt.target.value;
        this.setState({
            confirmPassword: val
        });
    },

    logIn: function(email, password, callback){
        UserAPI.logIn(email, password, function(u){
            callback(u);
        });
    },

    signUp: function(){
        var email = this.state.email;
        var password = this.state.password;
        var confirmPassword = this.state.confirmPassword;


        if (this.props.confirmPasswordMode == false){
            confirmPassword = password;
        }

        if (password != confirmPassword){
            this.setState({
                errorMessage: 'Password and password confirmation are not equal'
            });
            return;
        }

        var firstName = this.state.firstName;
        var lastName = this.state.lastName;


        this.setState({
            loading: true
        });
        var self = this;
        UserAPI.signUp(email, password, firstName, lastName, this.state.userRole, undefined, function(u){
            this.props.onSignUp(u);
            if (this.props.loginMode == false){
                this.setState({
                    loading: false
                });
                return;
            }
            this.logIn(email, password, function(use){
                self.setState({
                    loading: false
                });
                self.props.onLogin(use);
            });

        }.bind(this), function(err){
            this.setState({
                errorMessage: err,
                loading: false
            });
        }.bind(this));
    },

    onClick: function(){
        this.signUp();
    },

    onRoleChange: function(role){
        this.setState({
            userRole: role
        });
    },

    render: function () {
        var errorMessage = this.state.errorMessage;

        var nameSt = assign({}, this.componentStyle.namePlaceholder, this.props.nameFormStyle);

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={nameSt} >
                    {this.props.formName}
                </div>

                <div style={this.componentStyle.inputsPlaceholder} className={'ui form'}>
                    <div style={this.componentStyle.emailPlaceholder} className={'field'}>
                        <input type="text" placeholder={this.props.emailPlaceholder} onChange={this.onEmailChange} value={this.state.email} />
                    </div>

                    <div style={this.componentStyle.passwordPlaceholder}>
                        <input type={'password'} placeholder={this.props.passwordPlaceholder} onChange={this.onPasswordChange} value={this.state.password} />
                    </div>

                    {this.props.confirmPasswordMode == false ? null :
                        <div style={this.componentStyle.confirmPasswordPlaceholder}>
                            <input type={'password'} placeholder={this.props.passwordConfirmPlaceholder} onChange={this.onConfirmPasswordChange} value={this.state.confirmPassword} />
                        </div>
                    }

                    <div style={this.componentStyle.firstNamePlaceholder} className={'field'}>
                        <input type="text" placeholder={this.props.firstNamePlaceholder} onChange={this.onFirstNameChange} value={this.state.firstName} />
                    </div>
                    <div style={this.componentStyle.lastNamePlaceholder} className={'field'}>
                        <input type="text" placeholder={this.props.lastNamePlaceholder}
                               onChange={this.onLastNameChange} value={this.state.lastName} />
                    </div>

                    {this.props.roleSelectorEnabled == false ? null :
                        <div className={'field'} style={{textAlign: 'center'}} >
                            <RoleSelector onChange={this.onRoleChange} />
                        </div>
                    }

                </div>

                {errorMessage == undefined ? null :
                    <div style={this.componentStyle.errorPlaceholder}>
                        {errorMessage}
                    </div>
                }

                <div style={this.componentStyle.buttonPlaceholder}>
                    <div className={'ui patientPrimary fluid button ' +  (this.state.loading ? ' disabled ' : ' ')} onClick={this.onClick} >
                        <i className={'ui sign in icon'}></i>
                        {this.props.buttonText}
                    </div>
                </div>

            </div>
        );
    }

});

module.exports = SignupForm;