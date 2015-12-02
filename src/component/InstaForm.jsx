import React from 'react';
import ReactDOM,{findDOMNode} from 'react-dom';
import Message from './Message';
import {Form,Input} from 'antd/lib/form';
import Checkbox from 'antd/lib/checkbox';
import Button from 'antd/lib/Button';
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
class InstaForm extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      formData: {},
      checkbox: true,
    };
    [
      'handleSubmit',
      'onChange',
    ].forEach((method) => this[method] = this[method].bind(this));
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

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state.formData);
    let m;
    if (!this.state.checkbox) {
      m = Message.success({content: 'Checked like to follow @InstaBot for updates'});
      setTimeout(()=> {
        const _comp = m.component;
        if (!_comp.state.children.length) {
          m.remove();
        }
      }, 3000);
      return;
    }
    const _data = this.state.formData;
    const userData = this.props.userData;
    if (!userData) {
      m = Message.success({content: 'User data is not loaded'});
      setTimeout(()=> {
        const _comp = m.component;
        if (!_comp.state.children.length) {
          m.remove();
        }
      }, 3000);
    }
    _data.uid = userData.user_detail.uid;
    _data.session = userData.user_detail.session;
    console.log(_data)
    $.ajax({
      type: 'POST',
      url: 'http://139.162.27.27:8080/bind',
      data: _data,
      success: (data)=> {
        m = Message.success({content: data.msg});
        if (Number(data.code) === 200) {
          //成功
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
        m = Message.success({content: 'Server connection error'});
        setTimeout(()=> {
          const _comp = m.component;
          if (!_comp.state.children.length) {
            m.remove();
          }
        }, 3000)
      }
    });
  }

  onChange() {
    this.setState({
      checkbox: !this.state.checkbox
    })
  }

  render() {
    const formData = this.state.formData;
    const props = this.props;
    return <Form inline onSubmit={this.handleSubmit.bind(this)}>
      <FormItem id="ig_account">
        <label>Instagram Username</label>
        <Input type='userName' id="ig_account" name="ig_account" onChange={this.setValue.bind(this, 'ig_account')} value={formData.ig_account}/>
      </FormItem>
      <FormItem id="ig_pwd">
        <label>Password</label>
        <Input type="password" id="ig_pwd" name="ig_pwd" onChange={this.setValue.bind(this, 'ig_pwd')} value={formData.ig_pwd}/>
      </FormItem>
      <FormItem>
        <Button type="primary" htmlType="submit" className='green-button no-radius'>Login</Button>
        <div className='login-check'>
          <label>
            <Checkbox defaultChecked={this.state.checkbox} onChange={this.onChange}/>
            <p>Yes, I’d like to follow @InstaBot for updates</p>
          </label>
        </div>
      </FormItem>
    </Form>
  }
}

InstaForm.propTypes = {
  callback: React.PropTypes.func,
  userData: React.PropTypes.object,
};

InstaForm.defaultProps = {
  callback: ()=> {
  },
  userData: null,
};
export default InstaForm;