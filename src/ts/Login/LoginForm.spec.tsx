import 'mocha';
import * as React from 'react';
import * as chai from 'chai';
import { shallow } from 'enzyme';
import * as sinon from 'sinon';
require('sinon-stub-promise')(sinon);
import * as sinonChai from 'sinon-chai';
chai.use(sinonChai);
const expect = chai.expect;
import { formsyContext } from '../helpers/test-theme';
import { browserHistory } from 'react-router';
import * as api from './api';
import LoginForm from './LoginForm';

const user = {
  email: 'viking.garage.app@gmail.com',
  password: 'secret',
  remember: true,
}

const response = {
  data: {
    user,
    token: 'uuid-token',
  }
}

describe('Login: <LoginForm />', () => {
  let wrapper;
  let instance;
  let push;
  beforeEach(() => {
    wrapper = shallow(<LoginForm />, formsyContext());
    instance = wrapper.instance();
    push = sinon.stub(browserHistory, 'push', () => {});
  });

  afterEach(() => {
    push.restore();
  });

  it('check for inner components', () => {
    expect(wrapper.find('FormsyText')).to.have.length(2);
    expect(wrapper.find('[name="email"]')).to.have.length(1);
    expect(wrapper.find('[name="password"]')).to.have.length(1);

    expect(wrapper.find('FormsyCheckbox')).to.have.length(1);
    expect(wrapper.find('[name="remember"]')).to.have.length(1);

    expect(wrapper.find('button.submit')).to.have.length(1);
  });

  it('check if submit action get user info properly', () => {
    const login = sinon.stub(api, 'login', (params) => {
      expect(params).to.be.deep.equal(user)
      return Promise.resolve('ok');
    });
    instance['submit'](user);
    login.restore();
  });

  it('check if submit action works properly', () => {
    const login = sinon.stub(api, 'login')['returnsPromise']();
    const storage = sinon.stub(localStorage, 'setItem');

    instance['submit'](user);
    login.resolves(response);

    expect(push).to.have.been.calledOnce;
    expect(push).to.have.been.calledWith('/');

    expect(storage).to.have.been.calledTwice;
    login['restore']();
    storage.restore();
  });

  it('check if response with JWT is saved in localStorage', () => {
    const login = sinon.stub(api, 'login')['returnsPromise']();
    const storage = sinon.stub(localStorage, 'setItem', (type, item) => {
      if (type === 'jwt') {
        expect(item).to.be.equal(response.data.token);
      }
      if (type === 'user') {
        expect(item).to.be.equal(JSON.stringify(response.data.user))
      }
    });

    instance['submit'](user);
    login.resolves(response);
    expect(storage).to.have.been.calledTwice;
    login['restore']();
    storage.restore();
  });

  it('check if submit action show backend error', () => {
    const login = sinon.stub(api, 'login')['returnsPromise']();
    instance.setState = sinon.spy(instance.setState);
    expect(instance.setState).to.not.have.been.called;
    expect(instance.state.openDialog).to.be.false;
    expect(instance.state.networkErr).to.be.false;

    instance['submit']();
    login.resolves({ err: 'no internet connection'});

    expect(instance.setState).to.have.been.calledTwice;
    expect(instance.state.openDialog).to.be.true;
    expect(instance.state.networkErr).to.be.false;
    login['restore']();
  });

  it('check if submit action show unexpected network error', () => {
    const login = sinon.stub(api, 'login')['returnsPromise']();
    instance.setState = sinon.spy(instance.setState);
    expect(instance.setState).to.not.have.been.called;
    expect(instance.state.openDialog).to.be.false;
    expect(instance.state.networkErr).to.be.false;

    instance['submit']();
    login.rejects('something gone wrong');

    expect(instance.setState).to.have.been.calledTwice;
    expect(instance.state.openDialog).to.be.false;
    expect(instance.state.networkErr).to.be.true;
    login['restore']();
  });
});
