/**
 * Created by sabir on 24.01.16.
 */

var React = require('react');
var assign = require('object-assign');

var RecoverPasswordDialog = require('./RecoverPasswordDialog');

var RecoverPasswordButton = React.createClass({
    getDefaultProps: function () {
        return {
            buttonClassName: '',
            buttonName: 'Восстановить пароль',
            icon: undefined,

            style: {

            },

            onRecovered: function(){

            }
        }
    },

    getInitialState: function () {
        return {
            dialogVisible: false
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    show: function(){
        this.setState({
            dialogVisible: true
        });
    },

    onClose: function(){
        this.setState({
            dialogVisible: false
        });
    },

    componentStyle: {
        placeholder: {
            display: 'inline-block'
        },

        buttonStyle: {
            display: 'inline-block',
            cursor: 'pointer'
        }
    },

    render: function () {

        var st = assign({}, this.componentStyle.buttonStyle, this.props.style);

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={st} className={this.props.buttonClassName} onClick={this.show} >
                    {this.props.icon == undefined ? null :
                        <i className={this.props.icon} ></i>
                    }
                    {this.props.buttonName}
                </div>

                {this.state.dialogVisible == false ? null :
                    <RecoverPasswordDialog onClose={this.onClose} />
                }

            </div>
        );
    }

});

module.exports = RecoverPasswordButton;