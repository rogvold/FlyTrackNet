/**
 * Created by sabir on 10.10.15.
 */
var React = require('react');
var assign = require('object-assign');

var DialogOverlay = React.createClass({
    getDefaultProps: function () {
        return {
            visible: false,
            content: undefined,
            level: 1,
            overlayStyle: {

            },
            transparent: true
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
            //width: '100vw',
            //height: '100vh',
            //position: 'fixed',
            //zIndex: '100',
            //top: 0,
            //bottom: 0,
            //left: 0,
            //right: 0
        },



        transparentLayer: {
            backgroundColor: '#676D76',
            opacity: 0.8,
            position: 'fixed',
            zIndex: '101',
            bottom: 0,
            left: 0,
            right: 0,
            top: 0
        },

        block: {
            position: 'fixed',
            zIndex: '102',
            bottom: 0,
            left: 0,
            right: 0,
            top: 0
        }
    },

    //0Zindex - 101 + 10*level

    render: function () {
        console.log('rendering dialog overlay');

        var level = (this.props.level == undefined) ? 1 : this.props.level;
        var transparentLayerStyle = assign({}, this.componentStyle.transparentLayer,
            {zIndex: '' + (101 + 10*level)}, this.props.overlayStyle);
        if (this.props.transparent == false){
            transparentLayerStyle = assign(transparentLayerStyle, {opacity: 1});
        }

        var blockStyle = assign({}, this.componentStyle.block, {zIndex: '' + (102 + 10*level)});


        return (
            <div style={this.componentStyle.placeholder}>

                {this.props.visible == false ? null :
                    <div>
                        <div style={transparentLayerStyle} ></div>

                        <div style={blockStyle} >
                            {this.props.content}
                        </div>
                    </div>
                }

            </div>
        );
    }

});
module.exports = DialogOverlay;