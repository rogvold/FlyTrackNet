/**
 * Created by sabir on 20.06.16.
 */

var React = require('react');
var assign = require('object-assign');


var CoolPreloader = require('../../components/preloader/CoolPreloader');

var UserPageTemplate = require('../../components/templates/user/UserPageTemplate');
var UserHeaderLinks = require('../../components/templates/header/UserHeaderLinks');

var UserProfilePanel = require('../../components/profile/UserProfilePanel');


var UserDocsApp = React.createClass({

    getDefaultProps: function(){
        return {

        }
    },

    getInitialState: function(){
        return {

        }
    },



    componentWillReceiveProps: function(nextProps){

    },

    componentDidMount: function(){

    },

    componentStyle: {
        placeholder: {

        },

        panel: {
            padding: 10,
            border: '1px solid #EFF0F1',
            backgroundColor: 'white',
            borderRadius: 3,
            margin: '0 auto',
            width: 960,
            marginTop: 10,
            minHeight: 500
        }
    },

    getContent: function(){

        return (
            <div style={this.componentStyle.placeholder} >

               <div style={this.componentStyle.panel}>
                   <h4>
                       Lorem ipsum
                    </h4>
                   <p>
                       Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                   </p>

                   <h4>
                       Lorem ipsum
                   </h4>
                   <p>
                       Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                   </p>

                   <h4>
                       Lorem ipsum
                   </h4>
                   <p>
                       Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                   </p>

                   <h4>
                       Lorem ipsum
                   </h4>
                   <p>
                       Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                   </p>

                   <p>
                       <i>
                           Этот раздел будет подгружаться
                       </i>
                   </p>

               </div>

            </div>
        );
    },

    getCenterLinksContent: function(){

        return (
            <div>
                <UserHeaderLinks active={'docs'} />
            </div>
        );
    },

    render: function(){
        var centerLinksContent = this.getCenterLinksContent();
        console.log('UserIndexApp: render: this.state.loading = ', this.state.loading);

        return (
            <div style={this.componentStyle.placeholder} >

                <UserPageTemplate
                    centerLinksContent={centerLinksContent}
                    contentStyle={{width: '100%'}}
                    content={this.getContent()}
                    />

            </div>
        );
    }

});

module.exports = UserDocsApp;