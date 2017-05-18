import * as React from 'react';
import {
  FontIcon,
  Paper,
} from 'material-ui';
import * as Dropzone from 'react-dropzone';

export default class ProfilePhoto extends React.Component<any, any> {
  state = {
    image: null,
  }
  dropZone: any;

  onDrop = (image, event) => {
    this.setState({ image });
  }

  onClick = () => {
    this.dropZone.open();
  }

  render() {
    const background = this.state.image ? { backgroundImage: `url(${this.state.image[0].preview})` } : {};
    const icon = this.state.image ? null : <FontIcon className="fa fa-camera" />;
    return (
      <Paper className="user-form">
        <div className="head">
          Profile Photo
        </div>
        <div className="user-photo">
          <Dropzone
            ref={(node) => {this.dropZone = node}}
            className="drop-area"
            activeClassName="over"
            multiple={false}
            accept="image/*"
            onDrop={this.onDrop}>
            <div className="image" style={background}>
              <div className="border">
                {icon}
              </div>
            </div>
          </Dropzone>
          <div className="photo-items">
            <div className="image-btn" onClick={this.onClick}>
              <div>
                Drop an image over camera icon
              </div>
              <div>
                or click here to choose it!
              </div>
            </div>
            <div className="image-desc">
              Upload a picture that shows your face. It’s so much nicer to communicate with a person, whose face is visible :)
            </div>
          </div>
        </div>
      </Paper>
    );
  }
}
