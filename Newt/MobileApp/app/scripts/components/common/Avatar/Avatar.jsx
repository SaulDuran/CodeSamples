var Router        = require('react');

//var img = "https://c1.staticflickr.com/3/2815/11467455614_dca1dbf5b5_z.jpg";

var Avatar = React.createClass({
	getInitialState: function()
	{
		return {
			img: '',
			data: '',
			colour: 'grey',
			classN: 'web-avatar',
			gender: 'm'
		}
	},
	componentWillReceiveProps: function(newProps){
		this.setState({img: newProps.img, data: newProps.data, classN: newProps.classN});
	},
	componentWillMount: function(){
		this.setState({img: this.props.img, data: this.props.data, classN: this.props.classN});
	},

	render: function()
	{
	    var avatar_img = {"background-image":""};
	    if(typeof(this.state.data) === 'undefined'){
	    	// check this.state.img and default otherwise
		    var avatar_img= {"background-image":"url('"+this.state.img+"')"};
	    } else if(this.state.data.length){
	    	avatar_img= {"background-image":"url(data:image/jpg;base64,"+this.state.data+")"};
	    }
	    if(avatar_img['background-image'].length === 0){
		    var avatar_img= {"background-image":"url('./images/avatar-generic.png')"};
	    }
		return (
			<div className={this.state.classN} style={avatar_img}></div>
		);
	}


});

module.exports = Avatar;
