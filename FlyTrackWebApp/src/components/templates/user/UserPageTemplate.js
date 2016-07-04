/**
 * Created by sabir on 22.02.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var BackgroundImageContainer = require('../../image/BackgroundImageContainer');

var CurrentUserMenu = require('./CurrentUserMenu');

var UserNameSpan = require('../../profile/UserNameSpan');

var UserAPI = require('../../../api/UserAPI');

var UserPageTemplate = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('UsersStore', 'ClubStore')],
    getDefaultProps: function(){
        return {
            logo: 'assets/images/cardiofirst_logo.png',
            content: undefined,
            contentStyle: {

            },

            centerLinksContent: null
        }
    },


    getInitialState: function(){
        return {

        }
    },

    getStateFromFlux: function(){
        var store = this.getFlux().store('UsersStore');
        var clubStore = this.getFlux().store('ClubStore');
        var loading = (clubStore.loading || store.loading);
        return {
            loading: loading
        }
    },

    componentWillReceiveProps: function(nextProps){

    },

    componentDidMount: function(){

    },

    componentStyle: {
        placeholder: {

        },

        headerPlaceholder: {
            height: 40,
            //backgroundColor: '#564a41'
            backgroundColor: 'white',
            borderBottom: '1px solid #EFF0F1',
            position: 'fixed',
            zIndex: 10,
            width: '100%',
            top: 0,
        },

        header: {
            width: 960,
            margin: '0 auto',
            position: 'relative'
        },

        logoPlaceholder: {
            position: 'absolute',
            top: 0,
            left: 0
        },

        logo: {
            height: 30,
            width: 132,
            marginTop: 5,
            display: 'inline-block',
            cursor: 'pointer'
        },

        linksPlaceholder: {
            position: 'absolute',
            top: 0,
            right: 0
        },

        content: {
            width: 1000,
            height: '100%',
            maxHeight: '100%',
            paddingTop: 40,
            margin: '0 auto',
            overflowY: 'auto'
        },

        currentUserMenu: {

        }
    },

    onLogoClick: function(){

    },

    onLogOutClick: function(){
        this.getFlux().actions.logOut();
    },



    getNameComponent: function(){
        var currentUser = UserAPI.getCurrentUser();

        return (
            <div style={{display: 'inline-block'}}>

                <span style={{opacity: 0.6}} >
                    <UserNameSpan />
                </span>
            </div>
        );
    },

    render: function(){
        var contentStyle = assign({}, this.componentStyle.content);
        contentStyle = assign({}, contentStyle, this.props.contentStyle);


        return (
            <div style={this.componentStyle.placeholder} >

                <div style={this.componentStyle.headerPlaceholder}>

                    <div style={assign({}, this.componentStyle.header)}>

                        <div style={this.componentStyle.logoPlaceholder}>
                            <div style={this.componentStyle.logo} onClick={this.onLogoClick} >
                                <BackgroundImageContainer image={this.props.logo} />
                            </div>
                        </div>

                        <div style={{marginLeft: 200}} >
                            {this.props.centerLinksContent}
                        </div>

                        <div style={this.componentStyle.linksPlaceholder}>

                            {true == true ? null :
                                <div style={this.componentStyle.currentUserMenu}>
                                    <CurrentUserMenu />
                                </div>
                            }

                            <div style={{display: 'inline-block', marginRight: 30}} >
                                {this.getNameComponent()}
                            </div>

                            <div className={'topHeaderLink '} style={{marginRight: 0}} onClick={this.onLogOutClick} >
                                <i className={'icon sign out'} ></i>
                                Выход
                            </div>

                        </div>

                    </div>

                </div>

                <div style={contentStyle}>
                    {this.props.content}
                </div>

            </div>
        );
    }

});

module.exports = UserPageTemplate;