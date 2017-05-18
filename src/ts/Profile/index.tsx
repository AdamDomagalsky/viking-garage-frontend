import * as React from 'react';
import {
  Paper,
} from 'material-ui';
import { Form } from 'formsy-react';
import * as moment from 'moment';
import i from '../i18n';
import {
  get,
  put,
} from './api';
import Container from '../Container';
import UserMenu from './UserMenu';
import UserSide from './UserSide';
import UserPhoto from './UserPhoto';
import UserRequrired from './UserRequired';
import UserOptional from './UserOptional';

import SaveError from '../Dialogs/SaveError';
import SaveSuccess from '../Dialogs/SaveSuccess';
import NetworkError from '../Dialogs/NetworkError';

export default class UserEdit extends React.Component<any, any> {
  state = {
    user: null,
    canSubmit: false,
    saveError: false,
    saveSuccess: false,
    networkError: false,
  }

  componentDidMount() {
    get()
      .then(res => {
        if (res['err']) return this.setState({ networkError: true });
        this.setState({ user: res['data'] });
      })
      .catch(err => this.setState({ networkError: true }))
  }

  submit = (user) => {
    put(user)
      .then(res => {
        if (res['err']) return this.setState({ saveError: true });
        this.setState({ saveSuccess: true });
      })
      .catch(err => this.setState({ networkError: true }))
  }

  onValid = () => this.setState({ canSubmit: true })

  onInvalid = () => this.setState({ canSubmit: false })

  saveErrorClose = () => this.setState({ saveError: false });

  saveSuccessClose = () => this.setState({ saveSuccess: false });

  networkErrClose = () => this.setState({ networkError: false });

  render() {
    return (
      <Container close={true}>
        <UserMenu />
        <div className="user-wrap">
          <UserSide />
          <div className="user-edit">
            <UserPhoto />
            <Form
              onValid={this.onValid}
              onInvalid={this.onInvalid}
              onSubmit={this.submit}
            >
              <UserRequrired user={this.state.user} />
              <UserOptional user={this.state.user} />
              <button
                className="submit"
                disabled={!this.state.canSubmit}
              >
                {i('Save')}
              </button>
            </Form>
          </div>
        </div>
        <SaveError
          open={this.state.saveError}
          close={this.saveErrorClose}
        />
        <SaveSuccess
          open={this.state.saveSuccess}
          close={this.saveSuccessClose}
        />
        <NetworkError
          open={this.state.networkError}
          close={this.networkErrClose}
        />
      </Container>
    );
  }
}
