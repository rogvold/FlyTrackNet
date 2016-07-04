/**
 * Created by sabir on 20.06.16.
 */

var React = require('react');
var assign = require('object-assign');
var History = require('react-router').History;

var CommonHelper = require('../../../helpers/CommonHelper');

var HeaderLinks = React.createClass({
    mixins:  [History],
    getDefaultProps: function () {
        return {
            items: [{
                name: 'first',
                displayName: 'First Link',
                icon: '',
                url: '/first',
                onClick: function(){
                    console.log('First Link clicked');
                }
            },{
                displayName: 'Second Link',
                name: 'second',
                icon: '',
                url: '/second',
                onClick: function(){
                    console.log('Second Link clicked');
                }
            }],
            onItemClicked: function(){

            },
            active: 'first'
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
            marginLeft: 10,
            display: 'inline-block',
            height: '100%'
        },

        item: {
            height: '100%',
            boxSizing: 'borderBox',
            display: 'inline-block',
            marginRight: 25,
            //color: '#A1A4AA',
            color: '#2E3C54',
            //fontWeight: 'bold',
            paddingTop: 10,
            cursor: 'pointer'
        },

        active: {
            borderBottom: '3px solid #FC636B',
            color: '#1B2432'
        }
    },

    onItemClicked: function(n){
        var url = this.props.items[n].url;
        if (url == undefined){
            return;
        }else{
            console.log('redirecting to ' + url);
            this.history.pushState(null, url);
        }
    },

    render: function () {
        var list = this.props.items;
        console.log('rendering Header Links: active = ', this.props.active);
        console.log('items = ', list);

        return (
            <div style={this.componentStyle.placeholder} className={'headerLink'}>

                {list.map(function(item, n){
                    var key = 'top-item-' + n;
                    var boundClick = this.onItemClicked.bind(this, n);
                    var isActive = (this.props.active == item.name);
                    var className = 'topHeaderLink ' + (isActive == false ? '' : 'active');
                    var icon = item.icon;
                    return (
                        <div className={className} key={key} onClick={boundClick} >
                            {icon == undefined || icon == '' ? null :
                                <i className={icon} ></i>
                            }
                            {item.displayName}
                        </div>
                    );

                }, this)}

            </div>
        );
    }

});


module.exports = HeaderLinks;