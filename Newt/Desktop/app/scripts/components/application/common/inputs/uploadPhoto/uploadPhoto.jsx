var React = require('react');
var AvatarEditor = require('react-avatar-editor');

var MuiThemeContextMixin = require('components/mixins/MuiThemeContextMixin.js');

var uploadPhoto = React.createClass({

    mixins: [MuiThemeContextMixin],

    propTypes: {
        valid: React.PropTypes.bool,
        error: React.PropTypes.string,
        value: React.PropTypes.string,
        onChange: React.PropTypes.func,
        schema: React.PropTypes.object
    },

    getInitialState: function() {

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
            data_uri: this.props.value || null,
            preview: this.props.value || "assets/images/blank-profile-picture.svg",
            scale : 1,
            beforeErrorText: beforeErrorText,
            afterErrorText: afterErrorText,
            saved: false
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

    _handleFile: function(e){
        var that = this;
        var reader = new FileReader();
        var file = e.target.files[0];

        if (file.size > 2097152){
            this.setState({
                afterErrorText: 'Error! File size must be smaller than 2MB.'
            });

            return;
        }

        reader.onload = function(upload) {

            that.setState({
                data_uri: upload.target.result,
                afterErrorText: ''
                //   preview: upload.target.result
            });
        }

        reader.readAsDataURL(file);
    },

    _handleScale: function() {
        var scale = this.refs.scale.getDOMNode().value;
        this.setState({
            scale: scale,
        });
    },

    _handleSaveImage: function(){
        var img = this.refs.avatar.getImage();
        this.setState({
            preview: img,
            saved: true
        });

        this.props.onChange(img);

        var that = this;
        setTimeout(function(){
           that.setState({
               saved: false
           });
        }, 1500);
    },

    _onCancelUpload: function(){
        this.setState({
            data_uri : null,
            preview: "assets/images/blank-profile-picture.png"
        });
    },

    _renderBlank: function(){
        return(
            <div className="innerBlank row">
                <div className="col-md-6">
                    <input className="file-input" onChange={this._handleFile} type="file" accept="image/*" /><br /><br />
                </div>
                <div className="col-md-6 imageBlank">
                    <div className="preview">Preview</div>
                    <img ref="profileImage" src="assets/images/blank-profile-picture.svg" width="180px" />
                </div>
            </div>
        );
    },

    _renderUploaded: function(){

        var savedStyle = {display: 'none'};
        if (this.state.saved){
            savedStyle.display = 'block';
        }

        return(
            <div>
                <div className="upload-photo row">
                    <div className="col-md-6">
                        <AvatarEditor
                            onImageReady={this.handleSaveImage}
                            ref="avatar"
                            image={this.state.data_uri}
                            width={200}
                            height={200}
                            border={50}
                            color={[200, 200, 200, 0.6]} // RGBA
                            scale={this.state.scale} /><br />
                        <div className="image-control">
                            <input name="scale" type="range" ref="scale" onChange={this._handleScale} min="1" max="2" step="0.01" defaultValue="1" />
                            <span>&nbsp;&nbsp;</span>
                        </div>
                        <div className="cancel-upload">
                            <button onClick={this._onCancelUpload}>Cancel</button>
                            <button onClick={this._handleSaveImage}>Save</button>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="imagePreview">
                            <div className="preview">Preview</div>
                            <img ref="profileImage" src={this.state.preview} width="180px" />
                            <div style={savedStyle} className="saved">Photo Saved</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    },

    render : function(){

        var inner;
        if (this.state.data_uri == null) {
            inner = this._renderBlank();
        } else {
            inner = this._renderUploaded();
        }

        return (
            <div className="NUploadPhoto">
                <div className="label">
                    <label htmlFor={this.props.schema.key} >{this.props.schema.text}</label>
                </div>
                <div className="microcopy" dangerouslySetInnerHTML={{__html: this.props.schema.options.microcopy}} />
                <div className="input-error">{this.state.beforeErrorText}</div>
                <div className="inner">
                    {inner}
                </div>
                <div className="input-error">{this.state.afterErrorText}</div>
            </div>
        );
    }


});

module.exports = uploadPhoto;