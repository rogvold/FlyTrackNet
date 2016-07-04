/**
 * Created by sabir on 29.04.16.
 */
var React = require('react');
var assign = require('object-assign');

var Dialog = require('../dialog/Dialog');

var UserUpdateProfilePanel = require('./UserUpdateProfilePanel');

var UserUpdateProfileButton = React.createClass({
    getDefaultProps: function () {
        return {
            userId: undefined,

            buttonName: 'Edit',
            icon: 'icon pencil',
            buttonClassName: 'ui basic mini button',
            style: {

            },
            level: 10000000,
            hasRealtime: false
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

    componentStyle: {
        placeholder: {
            display: 'inline-block'
        },

        buttonStyle: {
            display: 'inline-block'
        },

        dialogPanelStyle: {
            width: 640,
            padding: 20
        }

    },

    getContent: function(){
        return (
            <div>
                <div style={{textAlign: 'center', padding: 0, fontWeight: 'bold',
                             fontSize: 18, padding: 10, paddingTop: 0}} >
                    Update profile
                </div>
                <UserUpdateProfilePanel hasRealtime={this.props.hasRealtime}
                    userId={this.props.userId} />
            </div>
        );
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

    render: function () {
        var st = assign({}, this.componentStyle.buttonStyle, this.props.style);
        var content = this.getContent();

        return (
            <div style={this.componentStyle.placeholder}>

                <span className={this.props.buttonClassName} style={st} onClick={this.show} >
                    <i className={this.props.icon} ></i> {this.props.buttonName}
                </span>

                {this.state.dialogVisible == false ? null :
                    <Dialog level={this.props.level} onClose={this.onClose}
                            content={content} dialogPanelStyle={this.componentStyle.dialogPanelStyle}
                        />
                }

            </div>
        );
    }

});

module.exports = UserUpdateProfileButton;