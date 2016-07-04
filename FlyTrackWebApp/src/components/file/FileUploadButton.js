/**
 * Created by sabir on 16.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var FileUploader = require('./FileUploader');

var FileUploadButton = React.createClass({
    getDefaultProps: function () {
        return {
            className: 'ui button fluid basic',
            icon: undefined,
            buttonName: undefined,
            style: {

            },
            onFileUploaded: function(url){

            }
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
            position: 'relative',
            display: 'inline-block'
        },

        uploaderPlaceholder: {
            opacity: 0,
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        }
    },

    render: function () {
        var st = assign({}, this.componentStyle.placeholder, this.props.style);

        return (
            <div style={st} className={this.props.className} >
                {this.props.icon == undefined ? null :
                    <i className={this.props.icon} ></i>
                }
                {this.props.buttonName == undefined ? null :
                    <span>{this.props.buttonName}</span>
                }

                <div style={this.componentStyle.uploaderPlaceholder}>
                    <FileUploader hiddenMode={true} onFileUploaded={this.props.onFileUploaded} />
                </div>

            </div>
        );
    }

});

module.exports = FileUploadButton;