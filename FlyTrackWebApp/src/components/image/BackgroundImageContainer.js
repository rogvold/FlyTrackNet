/**
 * Created by sabir on 22.02.16.
 */

var React = require('react');
var assign = require('object-assign');

var BackgroundImageContainer = React.createClass({
    getDefaultProps: function () {
        return {
            //image: undefined,
            image: 'http://www.englishpatient.org/app/assets/images/new_course.png',

            style: {

            }
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
            width: '100%',
            height: '100%',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat'
        }
    },

    render: function () {
        var st = assign({}, this.componentStyle.placeholder, {backgroundImage: 'url(\'' + this.props.image + '\')'});
        st = assign({}, st, this.props.style);

        return (
            <div style={st}>

            </div>
        );
    }

});

module.exports = BackgroundImageContainer;