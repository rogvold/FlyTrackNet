/**
 * Created by sabir on 06.03.16.
 */

/**
 * Created by sabir on 19.10.15.
 */

var React = require('react');
var assign = require('object-assign');

var DeleteButton = React.createClass({
    getDefaultProps: function () {
        return {
            buttonText: 'Delete',
            buttonClassName: 'ui red button',
            confirmationText: 'Are you sure?',
            okButtonName: 'Yes',
            icon: 'icon trash',
            noButtonName: 'No',
            onDelete: function(){
                alert('delete!');
            },
            style: {

            }
        }
    },

    getInitialState: function () {
        return {
            status: 'initial'
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    onDelete: function(){
        this.setState({
            status: 'active'
        });
    },

    onReject: function(){
        this.setState({
            status: 'initial'
        });
    },

    onConfirm: function(){
        this.props.onDelete();
    },

    componentStyle: {
        placeholder: {
            display: 'inline-block'
        },

        confirmationPlaceholder: {
            display: 'inline-block'

        },

        confirmationText: {
            display: 'inline-block',
            marginRight: 15
        },

        confirmationButtonsPlaceholder: {
            display: 'inline-block',
            padding: 10
        },

        deleteButtonPlaceholder: {
            display: 'inline-block'
        }
    },

    render: function () {
        var st = assign({}, this.componentStyle.placeholder, this.props.style);
        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.confirmationPlaceholder} >

                    {this.state.status == 'initial' ?
                        <div style={this.componentStyle.deleteButtonPlaceholder} >
                            <button className={this.props.buttonClassName} onClick={this.onDelete} >
                                <i className={this.props.icon} ></i>
                                {this.props.buttonText}
                            </button>
                        </div>
                        :
                        <div style={this.componentStyle.confirmationButtonsPlaceholder} className={'ui icon negative message'} >
                            <div style={this.componentStyle.confirmationText} className={'content'} >
                                {this.props.confirmationText}
                            </div>
                            <button onClick={this.onConfirm} className={'ui negative button'} >{this.props.okButtonName}</button>
                            <button onClick={this.onReject} className={'ui positive button'} >{this.props.noButtonName}</button>
                        </div>
                    }

                </div>

            </div>
        );
    }

});

module.exports = DeleteButton;