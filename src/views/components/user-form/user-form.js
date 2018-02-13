import React,{Component,Fragment} from 'react'
import ReduxForm from 'Components/redux-form'

class UserForm extends Component{
  constructor(){
    super(...arguments);

    this.state = {
      username: 'd'
    };

    this.handleUserChange = this.handleUserChange.bind(this);

  }

  render(){
    return (
      <Fragment>
        <ReduxForm onSubmit={()=>{alert('send')}}/>
        <div>name: <input type="text" defaultValue = {this.state.username} onChange = {this.handleUserChange}/></div>
      </Fragment>
    )
  }


  handleUserChange(ev){
    this.setState({
      username: ev.target.value
    })
  }
}

export default UserForm;