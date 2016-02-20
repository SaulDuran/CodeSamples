var React = require('react');

var MuiThemeContextMixin = require('components/mixins/MuiThemeContextMixin.js');

var selectAvatar = React.createClass({

    mixins: [MuiThemeContextMixin],

    propTypes: {
        valid: React.PropTypes.bool,
        error: React.PropTypes.string,
        value: React.PropTypes.string,
        onChange: React.PropTypes.func,
        schema: React.PropTypes.object
    },


    getInitialState: function(){

        var beforeErrorText = '';
        var afterErrorText = '';
        if ( this.props.valid == false ){
            if (this.props.error.position == 'before'){
                beforeErrorText = this.props.error.message;
            }else{
                afterErrorText = this.props.error.message;
            }
        }

        return {
            selectedImage: this.props.value,
            beforeErrorText: beforeErrorText,
            afterErrorText: afterErrorText
        };
    },

    componentWillReceiveProps: function( newProps )
    {
        var beforeErrorText = '';
        var afterErrorText = '';
        if ( newProps.valid == false ){
            if (this.props.error.position == 'before'){
                beforeErrorText = newProps.error.message;
            }else{
                afterErrorText = newProps.error.message;
            }
        }

        this.setState({
            beforeErrorText: beforeErrorText,
            afterErrorText: afterErrorText
        });
    },

    setImageValue: function(e){

        var value = $(e.target).attr('data-image-number');

        this.setState({
            selectedImage: value
        });

        this.props.onChange(value);
    },

    renderImages: function(i){

        var classes = 'avatar-image ';

        if ( this.state.selectedImage == i ){
            classes += 'avatar-image-active';
        }

        return(
            <span>
                <img className={classes} data-image-number={i} onClick={this.setImageValue} src={"assets/images/avatar/avatar (" + i + ").png"} />
            </span>
        );

    },

    render: function(){

        var selectedImage = "assets/images/blank-profile-picture.svg";

        if (this.state.selectedImage && this.state.selectedImage > 0) {
            selectedImage = "assets/images/avatar/avatar (" + this.state.selectedImage + ").png";
        }

        return(
            <div className="NSelectAvatar">
                <div className="label">
                    <label htmlFor={this.props.schema.key} >{this.props.schema.text}</label>
                </div>
                <div className="microcopy" dangerouslySetInnerHTML={{__html: this.props.schema.options.microcopy}} />
                <div className="input-error">{this.state.beforeErrorText}</div>
                <div className="inner">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="selectedAvatar">
                                <img width="75" src={selectedImage} /><br />
                                <i>Your Selected Avatar</i>
                            </div>
                        </div>
                        <div className="col-md-8">
                            {_.map(_.range(1, 57), this.renderImages)}
                        </div>
                    </div>
                </div>
                <div className="input-error">{this.state.afterErrorText}</div>
            </div>
        );
    }
});

module.exports = selectAvatar;