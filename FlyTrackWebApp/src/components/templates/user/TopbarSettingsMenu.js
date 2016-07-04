/**
 * Created by sabir on 22.02.16.
 */
var React = require('react');
var assign = require('object-assign');
const enhanceWithClickOutside = require('react-click-outside');

var TopbarSettingsMenu = React.createClass({
    mixins: [
        //require('react-onclickoutside')
    ],
    getDefaultProps: function () {
        return {
            items: [{
                name: 'Settings',
                icon: 'icon settings',
                onClick: function(){
                    console.log('Settings clicked');
                }
            },{
                name: 'Log Out',
                icon: 'icon sign out',
                onClick: function(){
                    console.log('LogOut clicked');
                }
            }],
            visible: false,
            onClose: function(){
                console.log('onClose occured');
            }
        }
    },

    handleClickOutside: function(){
        this.props.onClose();
    },

    getInitialState: function () {
        return {

        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    onItemClick: function(n){
        var items = this.props.items;
        if (items == undefined || items.length == 0 || n == undefined){
            return;
        }
        if (n > items.length - 1){
            return;
        }
        var func = items[n].onClick;
        if (typeof func != "function"){
            return;
        }
        func();
    },

    componentStyle: {
        placeholder: {
            backgroundColor: 'white',
            //border: '1px solid #A1A4AA',
            border: '1px solid #EFF0F1',
            //width: 240,
            minWidth: '160px',
            //position: 'fixed',
            position: 'absolute',
            //zIndex: 1,
            zIndex: 100,
            top: 40,
            right: 0,
            padding: 2,
            borderRadius: 2
        },
        itemPlaceholder: {
            padding: 10,
            fontSize: '14px',
            cursor: 'pointer',
            paddingLeft: 20,
            color: '#5C5C5C',
            borderTop: '1px solid #EFF0F1',
            //opacity: 0.8
            opacity: 1
        }
    },

    render: function () {
        var list = this.props.items;

        return (
            <div style={this.componentStyle.placeholder}>
                {list.map(function(item, n){
                    var key = 'top-bar-menu-item-' + n;
                    var onClick = this.onItemClick.bind(this, n);
                    var name = item.name;
                    var st = assign({}, this.componentStyle.itemPlaceholder);
                    var content = item.content;
                    var icon = item.icon;
                    if (n == 0){
                        st = assign({}, st, {borderTop: 'none'});
                    }
                    return (
                        <div key={key} style={st} onClick={onClick}>
                            {icon == undefined || icon == '' ? null :
                                <i className={icon} ></i>
                            }
                            {name}

                            {content == undefined ? null : content}
                        </div>
                    );
                }, this)}
            </div>
        );
    }

});

module.exports = enhanceWithClickOutside(TopbarSettingsMenu);