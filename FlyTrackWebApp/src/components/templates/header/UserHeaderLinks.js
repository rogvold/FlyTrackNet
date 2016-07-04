/**
 * Created by sabir on 20.06.16.
 */
var React = require('react');
var assign = require('object-assign');

var HeaderLinks = require('./HeaderLinks');

var UserHeaderLinks = React.createClass({
    getDefaultProps: function () {
        return {
            active: undefined
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
        placeholder: {}
    },

    render: function () {
        var links = [{
            name: 'calendar',
            displayName: 'Календарь',
            icon: '',
            url: '/'
        },
            {
                displayName: 'Профиль',
                name: 'settings',
                icon: '',
                url: '/settings'
            }

            //{
            //    displayName: 'Помощь',
            //    name: 'docs',
            //    icon: '',
            //    url: '/docs'
            //}

        ];

        return (
            <div style={this.componentStyle.placeholder}>
                <HeaderLinks items={links} active={this.props.active} />
            </div>
        );
    }

});

module.exports = UserHeaderLinks;