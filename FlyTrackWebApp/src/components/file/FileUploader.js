/**
 * Created by sabir on 13.10.15.
 */

var React = require('react');
var assign = require('object-assign');

var DropzoneComponent = require('react-dropzone-component');

var ReactDOMServer = require('react-dom/server');

var FileUploader = React.createClass({
    getDefaultProps: function () {
        return {
            containerClassName: 'ui brown message',
            iconFiletypes: ['.png', '.jpg', '.gif'],
            uploadFileMessage: 'Загрузить файл',
            uploadScript: 'https://www.englishpatientdrive.pw/dropzone/upload.php',
            //uploadScript: 'http://beta.englishpatient.org/dropzone/upload.php',
            uploadDir: 'https://www.englishpatientdrive.pw/dropzone/uploads/',
            //uploadDir: 'http://beta.englishpatient.org/dropzone/uploads/',

            onFileUploaded: function(url){
                console.log('--->>> UPLOADED FILE ', url);
            },
            onFileRemoved: function(){

            },
            customIconClassName: 'icon file image outline',
            style:{

            },

            hiddenMode: false
        }
    },

    selfImage: this,

    getInitialState: function () {
        return {}
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {
            //minWidth: 165,
            //height: 60,
            height: 40,
            position: 'relative',
            textAlign: 'center',
            padding: 2,
            marginTop: 0,
            marginBottom: 0
        },

        previewPlaceholder: {
            width: '100%',
            height: '100%',
            border: '1px solid lightgrey',
            backgroundColor: '#2E3C54',
            borderRadius: '3px',
            position: 'relative'
        },

        dzFilename: {
            position: 'absolute',
            top: 10,
            padding: 5,
            textAlign: 'center',
            width: '100%'
        },

        dzName: {
            backgroundColor: 'white',
            opacity: 0.8,
            borderRadius: 2,
            padding: 2,
            display: 'block',
            margin: '0 auto',
            fontSize: '10px',
            maxWidth: '50%',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            display: 'none'
        },

        dzSize: {
            backgroundColor: 'white',
            opacity: 0.8,
            borderRadius: 2,
            display: 'block',
            margin: '0 auto',
            fontSize: '10px',
            fontSize: '12px',
            maxWidth: 60,
            color: 'black',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap'
        },

        dzProgress: {
            top: 0,
            position: 'absolute',
            width: '100%',
            height: '100%'
        },

        dzUpload: {
            //backgroundColor: '#FC636B',
            backgroundColor: '#21BA45',
            display: 'block',
            opacity: 0.3,
            height: '100%'
        },



        img: {
            display: 'block',
            margin: '0 auto',
            height: '100%'
        },

        errorMark: {
            position: 'absolute',
            width: '100%',
            top: 36,
            opacity: 0.8,
            textAlign: 'center',
            display: 'none'
        },

        dzRemove: {
            color: 'white',
            fontSize: '10px',
            padding: 2,
            backgroundColor: '#FC636B'
        },

        dzDetails: {
            height: '100%'
        },

        dzMessage: {
            position: 'absolute',
            top: 0
        },

        dzErrorMessage: {
            position: 'absolute',
            top: 5,
            color: 'white'
        },

        customIcon: {
            fontSize: '16px'
        }

    },

    render: function () {

        var djsConfig = {
            previewTemplate: ReactDOMServer.renderToStaticMarkup(

                <div>
                    {this.props.hiddenMode == true ? null :

                            <div style={this.componentStyle.previewPlaceholder} className="dz-preview dz-file-preview ">


                                <div className="dz-details" style={this.componentStyle.dzDetails}>
                                    <div style={this.componentStyle.dzFilename} className="dz-filename">
                                        <span data-dz-name style={this.componentStyle.dzName}></span>

                                        <div className="dz-size" data-dz-size style={this.componentStyle.dzSize}></div>
                                    </div>


                                    <img style={this.componentStyle.img} data-dz-thumbnail/>
                                </div>


                                <div className="dz-progress" style={this.componentStyle.dzProgress}>
                                    <span className="dz-upload" style={this.componentStyle.dzUpload}
                                          data-dz-uploadprogress></span>
                                </div>


                                <div className="dz-error-mark" style={this.componentStyle.errorMark}>
                                    <span>
                                        <a className="dz-remove" style={this.componentStyle.dzRemove}
                                           href="javascript:undefined;" data-dz-remove="">
                                            удалить
                                        </a>
                                    </span>
                                </div>

                                <div style={this.componentStyle.dzErrorMessage} className="dz-error-message">
                                    <span data-dz-errormessage></span>
                                </div>

                            </div>

                        }

                    </div>
            )
        };

        var componentConfig = {
            iconFiletypes: this.props.iconFiletypes,
            showFiletypeIcon: true,
            maxFiles: 1,
            dictDefaultMessage: this.props.uploadFileMessage
            // Notice how there's no postUrl set here
        };

        var self = this;

        var eventHandlers = {
            drop: function(){
                console.log('drop');
            },
            success: function(a, b){
                console.log('success: ', b);
                if (a == undefined || b == undefined){
                    return;
                }
                self.props.onFileUploaded(self.props.uploadDir + b);
                //console.log(a.xhr.response);
            },
            removedfile: function(a, b){
                console.log('removedfile: ', a, b);

                self.props.onFileRemoved();
            },
            canceled: function(a, b){
                console.log('canceled: ',a , b);

                self.props.onFileRemoved();
            }
        };

        var uploadsUrl = this.props.uploadScript;

        return (
            <div style={this.componentStyle.placeholder} className={this.props.containerClassName} >
                <div style={this.componentStyle.customIcon} className={'customIcon'} style={{display: 'none'}} >
                    <i className={this.props.customIconClassName}></i>
                </div>
                <DropzoneComponent config={componentConfig}
                                   action={uploadsUrl}
                                   dictDefaultMessage={this.props.uploadFileMessage}
                                   eventHandlers={eventHandlers}
                                   djsConfig={djsConfig} />
            </div>
        );
    }

});

module.exports = FileUploader;