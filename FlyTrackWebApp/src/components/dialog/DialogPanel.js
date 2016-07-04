/**
 * Created by sabir on 10.10.15.
 */
var React = require('react');
var assign = require('object-assign');

var DialogPanel = React.createClass({
    mixins: [
        //require('react-onclickoutside')
    ],
    getDefaultProps: function () {
        return {
            onClose: function(){

            },
            header: undefined,
            content: undefined,
            footer: undefined,
            headerText: undefined,
            style: {

            },
            level: 1,

            footerStyle: {

            },
            closeOnClickOutside: false
        }
    },

    handleClickOutside: function(){
        if (this.props.closeOnClickOutside == false){
            return;
        }
        this.props.onClose();
    },


    getInitialState: function () {
        return {}
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    // 0Zindex - 10*level + 102

    componentStyle: {
        placeholder: {
            position: 'relative',
            width: '72%',
            margin: '0 auto',
            height: '96vh',
            marginTop: '4vh',
            backgroundColor: 'white',
            borderTopLeftRadius: 3,
            borderTopRightRadius: 3,
            overflowY: 'auto',
            textAlign: 'left'
        },

        headerPlaceholder: {
            minHeight: 40,
            borderBottom: '1px solid #EFF0F1',
            position: 'absolute',
            top: 0,
            zIndex: 3,
            width: '100%',
            backgroundColor: 'white'
        },

        customHeaderPlaceholder: {
            width: '100%'
        },

        closeButtonPlaceholder: {
            width: 20,
            top: 5,
            right: 5,
            marginRight: 0,
            textAlign: 'right',
            position: 'absolute',
            backgroundColor: 'white',
            zIndex: '102',
            lineHeight: '18px',
            borderRadius: 2
        },

        closeButton: {
            cursor: 'pointer',
            fontSize: '18px',
            opacity: 0.8,
            color: 'rgba(0, 0, 0, 0.870588)'
        },

        contentPlaceholder: {
            //height: React.findDOMNode(this).offsetHeight,
            //backgroundColor: 'white',
            paddingBottom: 70,
            paddingTop: 40,
            overflowY: 'auto',
            height: '100%',
            boxSizing: 'border-box'
        },

        footerPlaceholder: {
            borderTop: '1px solid #EFF0F1',
            minHeight: 70,
            position: 'absolute',
            width: '100%',
            bottom: 0,
            backgroundColor: '#F8F8F9'
        },

        textHeader: {
            fontSize: '22px',
            padding: 8,
            textAlign: 'center'
        }

    },

    onCloseClick: function(){
        console.log('onCloseClick occured');
        this.props.onClose();
    },

    getTextHeader: function(){
        var text = this.props.headerText;
        if (text == undefined){
            return null;
        }
        return (
            <div style={this.componentStyle.textHeader}>
                {text}
            </div>
        );
    },

    render: function () {
        var textHeader = this.getTextHeader();
        var st = assign({}, this.componentStyle.placeholder, this.props.style);

        //console.log('rendering dialog panel this.props.style = ', this.props.style);

        var contentPlaceholderStyle = assign({}, this.componentStyle.contentPlaceholder);
        if (this.props.footer == undefined){
            contentPlaceholderStyle = assign(contentPlaceholderStyle, {paddingBottom: 0});
        }
        if (this.props.header == undefined && this.props.headerText == undefined){
            contentPlaceholderStyle = assign(contentPlaceholderStyle, {paddingTop: 0});
        }

        var footerStyle = assign({}, this.componentStyle.footerPlaceholder, this.props.footerStyle);
        var headerPlaceholderStyle = assign({}, this.componentStyle.headerPlaceholder, {zIndex: 103 + 10*this.props.level});
        var closeButtonPlaceholderStyle = assign({}, this.componentStyle.closeButtonPlaceholder, {zIndex: 104 + 10*this.props.level});

        return (
            <div style={st}>

                {this.props.header == undefined && textHeader == undefined ? null :
                    <div style={headerPlaceholderStyle} className={'headerPlaceholder'} >

                        {this.props.header == undefined ? null :
                            <div style={this.componentStyle.customHeaderPlaceholder}>
                                {this.props.header}
                            </div>
                        }

                        {this.props.header != undefined ? null :
                            <div>
                                {textHeader == undefined ? null :
                                    <div style={this.componentStyle.customHeaderPlaceholder}>
                                        {textHeader}
                                    </div>
                                }
                            </div>
                        }

                    </div>
                }


                <div style={closeButtonPlaceholderStyle} onClick={this.onCloseClick}>
                    <i style={this.componentStyle.closeButton} className={'icon remove'}  ></i>
                </div>


                <div style={contentPlaceholderStyle}>
                    {this.props.content}
                </div>


                {this.props.footer == undefined ? null :
                    <div style={footerStyle}>
                        {this.props.footer}
                    </div>
                }



            </div>
        );
    }

});

module.exports = DialogPanel;