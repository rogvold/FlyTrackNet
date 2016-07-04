/**
 * Created by sabir on 29.04.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var BackgroundImageContainer = require('../image/BackgroundImageContainer');

var FileUploadButton = require('../file/FileUploadButton');

var CoolPreloader = require('../preloader/CoolPreloader');

var UserUpdateProfilePanel = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('UsersStore')],
    getDefaultProps: function(){
        return {
            userId: undefined,

            hasRealtime: false
        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        var store = flux.store('UsersStore');

        return {
            loading: store.loading
        }
    },

    getInitialState: function(){
        return {
            firstName: undefined,
            lastName: undefined,
            avatar: undefined,
            realTimeMonitoring: undefined,
            emailNotification: undefined,
            changed: false
        }
    },

    componentWillReceiveProps: function(nextProps){

    },

    componentDidMount: function(){
        this.initForm();
    },

    initForm: function(){
        var user = this.getFlux().store('UsersStore').usersMap[this.props.userId];
        this.setState({
            firstName: user.firstName,
            lastName: user.lastName,
            avatar: user.avatar,
            realTimeMonitoring: user.realTimeMonitoring,
            emailNotification: user.emailNotification
        });
    },

    getValFromEvt: function(evt){
        var val = evt.target.value;
        if (val == undefined || val.trim() == ''){
            return undefined;
        }
        return val;
    },

    onFirstNameChange: function(evt){
        var self = this;
        this.setState({
            firstName: self.getValFromEvt(evt),
            changed: true
        });
    },

    onLastNameChange: function(evt){
        var self = this;
        this.setState({
            lastName: self.getValFromEvt(evt),
            changed: true
        });
    },

    onSave: function(){
        var data = {
            userId: this.props.userId,
            avatar: this.state.avatar,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            realTimeMonitoring: this.state.realTimeMonitoring,
            emailNotification: this.state.emailNotification
        }
        this.getFlux().actions.updateUser(data);
        //alert('save');
    },

    onAvatarUploaded: function(avatar){
        this.setState({
            avatar: avatar,
            changed: true
        });
    },

    onRealTimeMonitoringChange: function(newMode){
        if (this.props.hasRealtime == false){
            this.getFlux().actions.showAlertNotification('Not available for you', 'Only your doctor can change the realtime mode');
            return;
        }
        this.setState({
            realTimeMonitoring: newMode,
            changed: true
        });
    },

    onEmailNotificationChange: function(newMode){
        this.setState({
            emailNotification: newMode,
            changed: true
        });
    },


    componentStyle: {
        placeholder: {
            width: 600,
            margin: '0 auto',
            position: 'relative'
        },

        left: {
            display: 'inline-block',
            verticalAlign: 'top',
            width: 130,
            padding: 5
        },

        right: {
            display: 'inline-block',
            verticalAlign: 'top',
            width: 460,
            marginLeft: 10,
            padding: 5,
            //paddingTop: 14
            paddingTop: 4
        },

        buttonPlaceholder: {
            marginTop: 10,
            padding: 5,
            textAlign: 'right'
        },

        avatar: {
            width: 110,
            height: 110,
            margin: '0 auto'
        },

        uploadButtonPlaceholder: {
            marginTop: 5
        },

        switch: {
            cursor: 'pointer',
            marginLeft: 5,
            fontWeight: 'bold'
        }

    },

    render: function(){
        var avatar = (this.state.avatar == undefined || this.state.avatar.trim() == '') ? 'https://www.englishpatientdrive.pw/dropzone/uploads/kbJGdXWAVH64c7OSuM7M.png' : this.state.avatar;

        return (
            <div style={this.componentStyle.placeholder} >

                <div style={this.componentStyle.left}>

                    <div style={{backgroundColor: 'white',
                                border: '1px solid #EFF0F1',
                                borderRadius: 3, width: 120, height: 120, padding: 5}} >
                        <div style={this.componentStyle.avatar}>
                            <BackgroundImageContainer image={avatar} />
                        </div>
                    </div>

                    <div style={this.componentStyle.uploadButtonPlaceholder}>
                        <FileUploadButton className={'ui button mini fluid basic'}
                            onFileUploaded={this.onAvatarUploaded} icon={'icon upload'} buttonName={'Upload avatar'} />
                    </div>

                </div>

                <div style={this.componentStyle.right}>
                    <div className={'ui form'} >

                        <div>
                            <label>Имя</label>
                            <input placeholder={'Имя'} onChange={this.onFirstNameChange} value={this.state.firstName} />
                        </div>

                        <div style={{marginTop: 10}} >
                            <label>Фамилия</label>
                            <input placeholder={'Фамилия'} onChange={this.onLastNameChange} value={this.state.lastName} />
                        </div>

                        <div style={{display: 'inline-block', marginRight: 10}}>
                            Email уведомления:
                            {this.state.emailNotification == true ?
                                <span style={this.componentStyle.switch} onClick={this.onEmailNotificationChange.bind(this, false)} >ON <i className={'icon checkmark box'} ></i> </span> : null
                            }

                            {this.state.emailNotification == false ?
                                <span style={this.componentStyle.switch} onClick={this.onEmailNotificationChange.bind(this, true)} >OFF <i className={'icon square outline'} ></i> </span> : null
                            }
                        </div>


                    </div>
                </div>

                <div style={this.componentStyle.buttonPlaceholder}>
                    <button className={'ui button patientPrimary'} disabled={!this.state.changed} onClick={this.onSave} >
                        <i className={'icon save'} ></i> Сохранить
                    </button>
                </div>

                {this.state.loading == false ? null :
                    <CoolPreloader />
                }

            </div>
        );
    }

});

module.exports = UserUpdateProfilePanel;