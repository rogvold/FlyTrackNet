/**
 * Created by sabir on 10.10.15.
 */
var React = require('react');
var assign = require('object-assign');

var DialogOverlay = require('./DialogOverlay');
var DialogPanel = require('./DialogPanel');

var Dialog = React.createClass({
    getDefaultProps: function () {
        return {
            visible: true,
            content: undefined,
            header: undefined,
            footer: undefined,
            headerText: undefined,
            onClose: function(){
                console.log('onClose occured');
            },
            dialogPanelStyle: {

            },

            footerStyle: {

            },

            overlayStyle: {

            },

            transparent: true,

            closeOnClickOutside: false,
            level: 1
        }
    },

    getInitialState: function () {
        return {}
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {
            cursor: 'default'
        }
    },

    onClose: function(){
        this.props.onClose();
    },

    getContent: function(){
        console.log('getContent: this.props.dialogPanelStyle = ', this.props.dialogPanelStyle);
        return (
            <DialogPanel  style={this.props.dialogPanelStyle} footerStyle={this.props.footerStyle}
                          headerText={this.props.headerText} content={this.props.content}
                          footer={this.props.footer} header={this.props.header} level={this.props.level}
                          onClose={this.onClose} closeOnClickOutside={this.props.closeOnClickOutside} />
        );
    },

    render: function () {
        var content = this.getContent();
        console.log('rendering dialog content = ', content);
        return (
            <div style={this.componentStyle.placeholder}>
                <DialogOverlay level={this.props.level} overlayStyle={this.props.overlayStyle}
                               transparent={this.props.transparent}
                               visible={this.props.visible} content={content} />
            </div>
        );
    }

});


module.exports = Dialog;