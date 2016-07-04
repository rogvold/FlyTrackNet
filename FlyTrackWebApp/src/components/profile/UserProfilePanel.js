/**
 * Created by sabir on 07.03.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var BackgroundImageContainer = require('../image/BackgroundImageContainer');

var UserInfoHeader = require('../user/UserInfoHeader');

var UserProfilePanel = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('UsersStore')],
    getDefaultProps: function(){
        return {
            userId: undefined
        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        var store = flux.store('UsersStore');
        var user = store.getUser(this.props.userId);
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
        var flux = this.getFlux();
        var store = flux.store('UsersStore');
        var user = store.getUser(this.props.userId);
        if (user == undefined){
            try{
                this.getFlux().actions.loadUser(this.props.userId);
            }catch(ee){
                setTimeout(function(){
                    this.getFlux().actions.loadUser(this.props.userId);
                }.bind(this), 300);
            }
        }
    },

    componentDidMount: function(){

    },

    componentStyle: {
        placeholder: {
            padding: 5,
            borderBottom: '1px solid #EFF0F1'
        },

        top: {
            padding: 5,
            textAlign: 'center'
        },

        avatarPlaceholder: {
            display: 'inline-block',
            width: 80,
            height: 80
        },

        namePlaceholder: {
            fontSize: 22,
            opacity: 0.95,
            fontWeight: 'bold',
            textAlign: 'center'
        }
    },

    onAvatarClick: function(){
        this.getFlux().actions.beatHeart();
    },

    render: function(){
        var user = this.state.user;
        var avatar = (user == undefined) ? undefined : user.avatar;
        avatar = (avatar == undefined || avatar == '') ? 'https://www.englishpatientdrive.pw/dropzone/uploads/kbJGdXWAVH64c7OSuM7M.png' : avatar;

        return (
            <div style={this.componentStyle.placeholder} >

                {user == undefined ? null :
                    <div style={this.componentStyle.top}>

                        <div style={this.componentStyle.avatarPlaceholder} onClick={this.onAvatarClick} >
                            <BackgroundImageContainer image={avatar} style={{borderRadius: '50%', border: '1px solid white'}} />
                        </div>

                        <div style={this.componentStyle.namePlaceholder}>
                            {user.name}
                        </div>

                    </div>
                }

            </div>
        );
    }

});

module.exports = UserProfilePanel;