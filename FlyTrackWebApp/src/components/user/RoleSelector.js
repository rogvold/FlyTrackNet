/**
 * Created by sabir on 05.11.15.
 */

var React = require('react');
var assign = require('object-assign');

var RoleSelector = React.createClass({
    getDefaultProps: function () {
        return {
            onChange: function(role){
                console.log('onChange: ', role);
            }
        }
    },

    getInitialState: function () {
        return {
            value: 'user'
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    checkClicked: function(val){
        this.setState({
            value: val
        });
        this.props.onChange(val);
    },

    componentStyle: {
        placeholder: {

        },

        checkbox: {
            display: 'inline-block',
            cursor: 'pointer',
            marginRight: 10
        }
    },

    render: function () {
        var val = this.state.value;
        var studentChecked = (val == 'user');
        var teacherChecked = (val == 'doctor');

        return (
            <div style={this.componentStyle.placeholder} className={'inline field '} >

                <div style={this.componentStyle.checkbox} onClick={this.checkClicked.bind(this, 'doctor')} >
                    <i className={(teacherChecked == true) ? 'icon checkmark box' : 'icon square outline'} ></i>
                    Doctor
                </div>

                <div style={this.componentStyle.checkbox} onClick={this.checkClicked.bind(this, 'user')} >
                    <i className={(studentChecked == true) ? 'icon checkmark box' : 'icon square outline'} ></i>
                    User
                </div>

            </div>
        );
    }

});

module.exports = RoleSelector;