import React from 'react'
import PropTypes from "prop-types"
import { Link } from 'react-router-dom'
import { Input, Label, Box } from 'rebass'


class AccountForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
    }
  }

  render() {
    if (this.props.loggedIn) {
      return null
    }
    return (
      <Box width={1/2} m={"auto"}>
        <form onSubmit={submitEvent => {
          submitEvent.preventDefault()
          this.props.submitForm(
            this.state.username,
            this.state.password)
        }}>
          <h3>{this.props.formLabel}</h3>

          <Label>
            Username
            <Input
              type="text"
              onChange={e => this.setState({username: e.target.value})}
            />
          </Label>

          <Label>
            Password
            <Input
              type="password"
              onChange={e => this.setState({password: e.target.value})}
            />
          </Label>

          <Input type="submit" value={this.props.submitLabel}/>
        </form>

        {!this.props.signup && (
            <Link to="/signup">Signup for an account</Link>
        )}
      </Box>
    );
  }

}

AccountForm.propTypes = {
  formLabel: PropTypes.string,
  submitLabel: PropTypes.string,
  submitForm: PropTypes.func,
  loggedIn: PropTypes.bool,
  signup: PropTypes.bool,
}

export default AccountForm
