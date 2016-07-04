/**
 * Created by sabir on 25.06.16.
 */

var React = require('react');
var assign = require('object-assign');

var UserUpdateProfileForm = React.createClass({
    getDefaultProps: function () {
        return {
            firstName: undefined,
            lastName: undefined,
            phone: undefined,

            onSubmit: function(data){

            }

        }
    },

    getInitialState: function () {
        return {
            isChanged: false,
            firstName: this.props.firstName,
            lastName: this.props.lastName,
            phone: this.props.phone
        }
    },

    componentWillReceiveProps: function (nextProps) {
        this.setState({
            firstName: nextProps.firstName,
            lastName: nextProps.lastName,
            phone: nextProps.phone,
            isChanged: false
        });
    },

    componentDidMount: function () {

    },

    onFirstNameChange: function(evt){
        this.setState({
            firstName: evt.target.value,
            isChanged: true
        });
    },

    onLastNameChange: function(evt){
        this.setState({
            lastName: evt.target.value,
            isChanged: true
        });
    },

    onPhoneChange: function(evt){
        this.setState({
            phone: evt.target.value,
            isChanged: true
        });
    },

    getSubmitData: function(){
        return {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            phone: this.state.phone
        }
    },

    isEmpty: function(s){
        return (s == undefined || s.trim() == '');
    },

    canSubmit: function(){
        if (this.state.isChanged == false){
            return false;
        }
        var d = this.getSubmitData();
        if (this.isEmpty(d.firstName) || this.isEmpty(d.lastName) || this.isEmpty(d.phone)){
            return false;
        }

        return true;
    },

    componentStyle: {
        placeholder: {

        },

        inputPlaceholder: {
            marginTop: 10
        },

        buttonPlaceholder: {
            marginTop: 10,
            textAlign: 'right'
        }
    },

    onSubmit: function(){
        var data = this.getSubmitData();
        this.props.onSubmit(data);
    },

    render: function () {
        var canSubmit = this.canSubmit();

        return (
            <div style={this.componentStyle.placeholder}>

                <div className={'ui form'} >

                    <div style={this.componentStyle.inputPlaceholder} className={'field'} >
                        <label>
                            Имя
                        </label>
                        <input type={'text'} onChange={this.onFirstNameChange} value={this.state.firstName} placeholder={'Имя'} />
                    </div>

                    <div style={this.componentStyle.inputPlaceholder} className={'field'} >
                        <label>
                            Фамилия
                        </label>
                        <input type={'text'} onChange={this.onLastNameChange} value={this.state.lastName} placeholder={'Фамилия'} />
                    </div>

                    <div style={this.componentStyle.inputPlaceholder} className={'field'} >
                        <label>
                            Телефон
                        </label>
                        <input type={'text'} onChange={this.onPhoneChange} value={this.state.phone} placeholder={'Телефон'} />
                    </div>

                </div>

                <div style={this.componentStyle.buttonPlaceholder}>
                    <button disabled={!canSubmit} className={'ui patientPrimary mini button'} onClick={this.onSubmit} >
                        <i className={'icon save'} ></i>
                        Сохранить
                    </button>
                </div>

            </div>
        );
    }

});

module.exports = UserUpdateProfileForm;