/**
 * Created by sabir on 02.10.15.
 */
var React = require('react');
var assign = require('object-assign');

var AuthForm = require('./AuthForm');

var AuthOverlay = React.createClass({
    getDefaultProps: function () {
        return {
            isVisible: false,
            onClose: function(){

            },
            onLogin: function(){

            }
        }
    },

    getInitialState: function () {
        return {
            isVisible: false
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    onClose: function(){
        this.setState({
            isVisible: false
        });
        this.props.onClose();
    },

    componentStyle: {
        placeholder: {
            position: 'fixed',
            zIndex: 1000000,
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'whitesmoke',
            opacity: 0.99
        },

        closePlaceholder: {
            width: '100%',
            textAlign: 'right',
            paddingRight: '10px',
            paddingTop: '10px'
        },

        closeButton:{
            fontSize: '30px',
            cursor: 'pointer'
        },

        formPlaceholder: {
            //marginTop: 100
            marginTop: 70
        }
    },

    render: function () {
        var st = assign({}, this.componentStyle.placeholder);
        if (this.props.isVisible == false){
            st = assign({}, st, {display: 'none'});
        }

        return (
            <div style={st}>
                <div style={this.componentStyle.closePlaceholder}>
                    <div style={this.componentStyle.closeButton}  onClick={this.onClose} >
                        <i className={'ui remove icon'} ></i>
                    </div>
                </div>

                <div style={this.componentStyle.formPlaceholder}>
                    <AuthForm onLogin={this.props.onLogin} />
                </div>

            </div>
        );
    }

});

module.exports = AuthOverlay;