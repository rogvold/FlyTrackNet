/**
 * Created by sabir on 28.04.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var CoolPreloader = require('../preloader/CoolPreloader');

var moment = require('moment');

var BackgroundImageContainer = require('../image/BackgroundImageContainer');

var UserUpdateProfileButton = require('../profile/UserUpdateProfileButton');

var UserInfoHeader = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('UsersStore')],
    getDefaultProps: function(){
        return {
            userId: undefined,

            style: {

            },

            editMode: true
        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        var store = flux.store('UsersStore');
        var user = store.usersMap[this.props.userId];
        return {
            loading: store.loading,
            user: user
        }
    },

    getInitialState: function(){
        return {

        }
    },

    componentWillReceiveProps: function(nextProps){
        this.assertLoading();
    },

    componentDidMount: function(){
        this.assertLoading();
    },

    assertLoading: function(){
        var map = this.getFlux().store('UsersStore').usersMap;
        var user = map[this.props.userId];
        if (user == undefined){
            setTimeout(function(){
                this.getFlux().actions.loadUser(this.props.userId);
            }.bind(this), 50);
        }

    },

    componentStyle: {
        placeholder: {
            position: 'relative',
            minHeight: 110,
            padding: 10,
            textAlign: 'left',
            position: 'relative'
        },

        left: {
            width: 102,
            display: 'inline-block',
            verticalAlign: 'top',
            marginRight: 10,
            backgroundColor: 'white',
            border: '1px solid #EFF0F1',
            borderRadius: 3,
            padding: 5
        },

        right: {
            display: 'inline-block',
            verticalAlign: 'top',
            paddingTop: 10
        },

        name: {
            fontSize: 18,
            fontWeight: 'bold',
            lineHeight: '20px',
            marginBottom: 10
        },

        email: {
            opacity: 0.5,
            marginBottom: 5
        },

        date: {
            opacity: 0.5
        },

        avatar: {
            width: 90,
            height: 90,
            margin: '0 auto'
        }

    },

    render: function(){
        var user = this.state.user;
        var sDate = (user == undefined) ? null : moment(user.timestamp).format('LL');
        var st = assign({}, this.componentStyle.placeholder, this.props.style);
        var avatar = (user == undefined) ? 'https://www.englishpatientdrive.pw/dropzone/uploads/kbJGdXWAVH64c7OSuM7M.png' : user.avatar;
        avatar = (avatar == undefined) ? 'https://www.englishpatientdrive.pw/dropzone/uploads/kbJGdXWAVH64c7OSuM7M.png' : avatar;

        return (
            <div style={st} >

                {user == undefined ? null :
                    <div>
                        <div style={this.componentStyle.left}>
                            <div style={this.componentStyle.avatar}>
                                <BackgroundImageContainer image={avatar} />
                            </div>
                        </div>

                        <div style={this.componentStyle.right}>

                            <div style={this.componentStyle.name}>
                                {user.name}
                            </div>

                            <div style={this.componentStyle.email}>
                                <i className={'icon envelope'} ></i> {user.email}
                            </div>

                            <div style={this.componentStyle.date}>
                                <i className={'icon wait'} ></i> {sDate}
                            </div>

                            {this.state.editMode == false ? null :
                                <div style={{position: 'absolute', top: 25, right: 10}} >
                                    <UserUpdateProfileButton hasRealtime={true} userId={this.props.userId} />
                                </div>
                            }

                        </div>
                    </div>
                }


                {this.state.loading == false ? null :
                    <CoolPreloader />
                }

            </div>
        );
    }

});

module.exports = UserInfoHeader;