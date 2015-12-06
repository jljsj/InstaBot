import React from 'react';
import ReactDOM,{findDOMNode} from 'react-dom';
import Message from './Message';
import {Form,Input} from 'antd/lib/form';
import Button from 'antd/lib/button';
import AsyncValidate from 'async-validator';
const FormItem = Form.Item;

function merge() {
  const ret = {};
  const args = [].slice.call(arguments, 0);
  args.forEach((a)=> {
    Object.keys(a).forEach((k)=> {
      ret[k] = a[k];
    });
  });
  return ret;
}

class signForm extends React.Component {
  constructor() {
    super(...arguments);
    this.formData = {};
    this.state = {
      formData: {},
      login_nameError: false,
      login_pwdError: false,
      re_pwdError: false,
      rePasswdError: false
    };
    [
      'handleSubmit',
      'onFocus',
      'onBlur'
    ].forEach((method) => this[method] = this[method].bind(this));
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.resetData !== nextProps) {
      this.setState({
        formData: {},
        login_nameError: false,
        login_pwdError: false,
        re_pwdError: false,
        rePasswdError: false
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const _formData = this.state.formData;
    if (!_formData.login_name || this.state.login_nameError) {
      Message.success({content: 'Enter a valid email.'});
      this.setState({
        login_nameError: true
      });
      return
    }
    if (!_formData.login_pwd) {
      Message.success({content: 'Enter a valid password.'});
      this.setState({
        login_pwdError: true
      });
      return
    }
    if (this.props.type === 'up' && _formData.login_pwd !== _formData.re_pwd) {
      Message.success({content: 'type the same password in both text boxe'});
      this.setState({
        rePasswdError: true,
        login_pwdError: false,
        re_pwdError: false,
      });
      return;
    }
    const formData = {};
    formData.login_name = _formData.login_name;
    formData.login_pwd = _formData.login_pwd;
    $.ajax({
      type: 'POST',
      url: 'http://139.162.27.27:8080/sign' + this.props.type,
      data: this.state.formData,
      success: (data)=> {
        const m = Message.success({content: data.msg});
        if (Number(data.code) === 200 && data.user) {
          //成功
          const _d = {uid: data.user.uid, session: data.user.session};
          $.cookie('InstaBot', JSON.stringify(_d), {expires: 365});
          this.props.callback(data);
        }
        setTimeout(()=> {
          const _comp = m.component;
          if (!_comp.state.children.length) {
            m.remove();
          }
        }, 3000)
      },
      error: ()=> {
        const m = Message.success({content: 'Server connection error'});
        setTimeout(()=> {
          const _comp = m.component;
          if (!_comp.state.children.length) {
            m.remove();
          }
        }, 3000)
      }
    });
  }

  onFocus(e) {
    const input = findDOMNode(e.target);
    const id = input.getAttribute('id');
    const state = this.state;
    state[id + 'Error'] = false;
    if (id === 'login_pwd' || id === 're_pwd') {
      state.rePasswdError = false;
    }
    this.setState(state);
  }

  onBlur(e) {
    const input = findDOMNode(e.target);
    const id = input.getAttribute('id');
    const name = id === 'login_name' ? 'email' : id === 'login_pwd' || id == 're_pwd' ? 'string' : null;
    var descriptor = {
      name: {type: "email", required: true}
    };
    descriptor.name.type = name;

    if (id === 'login_pwd' || id === 're_pwd') {
      descriptor.name.min = 6;
    }
    const values = {};
    const formData = this.state.formData;
    values.name = formData[id];
    var validator = new AsyncValidate(descriptor);
    validator.validate(values, (errors)=> {
      if (errors) {
        const state = this.state;
        state[id + 'Error'] = true;
        return this.setState(state);//this.errors
      }
    });
    if (id === 're_pwd' && formData['login_pwd'] !== formData[id]) {
      this.setState({
        rePasswdError: true,
        login_pwdError: false,
        re_pwdError: false,
      })
    }
  }

  setValue(field, e) {
    let v = e;
    const target = e && e.target;
    if (target) {
      if ((target.nodeName + '').toLowerCase() === 'input' &&
        target.type === 'checkbox') {
        v = target.checked;
      } else {
        v = e.target.value;
      }
    }
    const newFormData = {};
    newFormData[field] = v;
    this.setState({
      formData: merge(this.state.formData, newFormData),
    });
  }

  render() {
    const formData = this.state.formData;
    const props = this.props;
    return <Form inline onSubmit={this.handleSubmit.bind(this)}>
      <FormItem id="login_name">
        <label>Email address</label>
        <Input type='userName' id="login_name" name="login_name" className = {this.state.login_nameError ? 'ant-input error' : 'ant-input'} onChange={this.setValue.bind(this, 'login_name')} value={formData.login_name} onBlur={this.onBlur} onFocus={this.onFocus}/>
        <span className='error-text'>{this.state.login_nameError ? 'Your email is wrong.' : ''}</span>
      </FormItem>
      <FormItem id="login_pwd">
        <label>Password</label>
        <Input type="password" id="login_pwd" name="login_pwd" className = {this.state.login_pwdError || this.state.rePasswdError ? 'ant-input error' : 'ant-input'} onChange={this.setValue.bind(this, 'login_pwd')} value={formData.login_pwd} onBlur={this.onBlur} onFocus={this.onFocus}/>
        <span className='error-text'>{this.state.login_pwdError ? 'Password must be at least 6 character long' : ''}</span>
      </FormItem>
    {props.type === 'up' ? <FormItem id="re_pwd">
      <label>Type password again</label>
      <Input type="password" id="re_pwd" name="re_pwd" className = {this.state.re_pwdError || this.state.rePasswdError ? 'ant-input error' : 'ant-input'} onChange={this.setValue.bind(this, 're_pwd')} value={formData.re_pwd} onBlur={this.onBlur} onFocus={this.onFocus}/>
      <span className='error-text'>{this.state.re_pwdError ? 'Password must be at least 6 character long' : this.state.rePasswdError ? 'type the same password in both text boxes' : ''}</span>
    </FormItem> : ''}
      <FormItem>
        <Button type="primary" htmlType="submit" className={(props.type === 'in' ? 'green-button' : 'blue-button create-account') + ' no-radius'}>{props.type === 'in' ? 'Login' : 'Create my account'}</Button>
      {props.type === 'in' ? <a className='forgot' href="#">Forgot Parssword?</a> : ''}
      </FormItem>
    </Form>
  }
}

signForm.propTypes = {
  type: React.PropTypes.string,
  resetData: React.PropTypes.bool,
  callback: React.PropTypes.func,
};

signForm.defaultProps = {
  type: 'in',
  resetData: false,
  callback: ()=> {
  },
};

export default signForm;