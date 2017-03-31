import * as React from 'react';
import { browserHistory } from 'react-router';
import { Form } from 'formsy-react';
import { FormsyText } from 'formsy-material-ui/lib';
import i from '../i18n';
import Container from '../Container';
import NetworkError from '../Dialogs/NetworkError';
import { reset } from './api';
import debug from 'debug';
const log = debug('app:Reset');

export default class Reset extends React.Component<any, any> {

  constructor(props) {
    super(props);
    this.state = {
      canSubmit: false,
      networkErr: false,
    };
    this.submit = this.submit.bind(this);
  }

  submit(email) {
    this.setState({ canSubmit: false });
    reset(email)
      .then((res) => {
        if (res['err']) return this.setState({ openDialog: true });
        browserHistory.push('/check');
      })
      .catch(err => this.setState({ networkErr: true }));
  }

  render() {
    return (
      <Container className="cont">
        <div className="form">
          <h1 className="title">{i('Reset your password')}</h1>
          <div className="title-sub">
            {i('Please provide your e-mail address.')}
            <br />
            {i('We will send you a message with further instructions.')}
          </div>
          <div className="inputs">
            <Form
              onValid={() => this.setState({ canSubmit: true })}
              onInvalid={() => this.setState({ canSubmit: false })}
              onSubmit={this.submit}
            >
              <div className="reset">
                <FormsyText
                  name="email"
                  value="viking.garage.app@gmail.com"
                  required={true}
                  fullWidth={true}
                  validations="isEmail"
                  floatingLabelText={i('E-mail')}
                  validationError={i('Wrong e-mail address!')}
                />
              </div>
              <button
                className="submit"
                disabled={!this.state.canSubmit}
              >
                {i('Reset password')}
              </button>
              <NetworkError
                open={this.state.networkErr}
                close={() => this.setState({ networkErr: false })}
              />
            </Form>
          </div>
        </div>
      </Container>
    );
  }
}
