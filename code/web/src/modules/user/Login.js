// Imports
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { Helmet } from 'react-helmet'

// UI Imports
import { Grid, GridCell } from '../../ui/grid'
import Button from '../../ui/button'
import ImageTile from '../../ui/image/Tile'
import Input from '../../ui/input/Input'
import H3 from '../../ui/typography/H3'
import Icon from '../../ui/icon'
import { level1 } from '../../ui/common/shadows'
import { white } from '../../ui/common/colors'

// App Imports
import { APP_URL } from '../../setup/config/env'
import userRoutes from '../../setup/routes/user'
import { messageShow, messageHide } from '../common/api/actions'
import { login } from './api/actions'
import AuthCheck from '../auth/AuthCheck'

// Component
class Login extends Component {

  constructor(props) {
    super(props)

    this.state = {
      user: {
        email: '',
        password: '',
      }
    }

    // Function bindings
  }

  onChange = (event) => {
    let user = this.state.user
    user[event.target.name] = event.target.value//updates the values from the input fields

    this.setState({//updates the state with the received  input values
      user
    })
  }

  onSubmit = (event) => {
    event.preventDefault()//prevents the default behaivior of the form button

    this.props.messageShow('Logging in, please wait...')//an action creator method from Redux that updates the store state
    //the above method updates the the current mesage property from the sate to keep the user informed of what the status of the applications is
    this.props.login(this.state.user)
    //reducer method that updates the state
    //it takes the user credentials 
    //dispatch the action of LOGIN_REQUEST from user/action.js
    //where the payload is isLoading = true by default
    //when the reducer is invoked with the proper action.type
    //it makes an axios request to post the credentials where the return values are the user credentials and the token
    //here it handles the erros for when (response.data.errors && response.data.errors.length > 0)
    //and updates the error accordingly
    //if else (there is no error || (response.data.data.userLogin.token !== ''))
    //inside the login the action creator method setUser(token, user) is invoked 
    //saves the token and user credentials in local storage
    //this method updates the state with the returned credentials
      .then(response => { //ther will always be a response from the API
        if (this.props.user.error && this.props.user.error.length > 0) { //check if an error has been returned
          this.props.messageShow(this.props.user.error) //display the error

          window.setTimeout(() => {
            this.props.messageHide()
          }, 5000)//the error will dissapear after 5 seconds
        } else {
          this.props.messageHide()// hide message after a succesfull login
        }
      })
      .catch(error => {
        this.props.messageShow(this.props.user.error)// if there user has input incorrect information the user will see 
        //the following message => Sorry, the password you entered is incorrect. Please try again.

        window.setTimeout(() => {
          this.props.messageHide()
        }, 5000)//removes the message after 5 sec
      })
  }

  render() {
    const { isLoading, error } = this.props.user //it is not making use of  the error when exist, 
    //here is an apportunity to add more error handling 

    return (
      <Grid gutter={true} alignCenter={true} style={{ padding: '2em' }}>
        {/* SEO helmet helps changing the applications title dynamically*/}
        <Helmet> 
          <title>Login to your account - Crate</title>
        </Helmet>

        {/* Left Content - Image Collage */}
        {/* as a React.Children Grid allows to wrap other children elements*/}
        <GridCell>
          <Grid gutter={true} alignCenter={true}>
            <GridCell justifyCenter={true}>
              <ImageTile width={300} height={530} shadow={level1} image={`${ APP_URL }/images/stock/women/1.jpg`}/>
            </GridCell>

            <GridCell>
              <Grid>
                <GridCell justifyCenter={true}>
                  <ImageTile width={170} height={250} shadow={level1} image={`${ APP_URL }/images/stock/men/2.jpg`}/>
                </GridCell>
              </Grid>

              <Grid>
                <GridCell justifyCenter={true}>
                  <ImageTile width={170} height={250} shadow={level1} image={`${ APP_URL }/images/stock/men/3.jpg`}
                             style={{ marginTop: '1.9em' }}/>
                </GridCell>
              </Grid>
            </GridCell>
          </Grid>
        </GridCell>

        {/* Right Content */}
        <GridCell style={{ textAlign: 'center' }}>
          <H3 font="secondary" style={{ marginBottom: '1em' }}>Login to your account</H3>

          {/* Login Form*/}
          <form onSubmit={this.onSubmit}>
            <div style={{ width: '25em', margin: '0 auto' }}>
              {/* Email */}
              <Input
                type="email"
                fullWidth={true}
                placeholder="Email"
                required="required"
                name="email"
                value={this.state.user.email}
                onChange={this.onChange}
                style={{ marginTop: '1em' }}
              />

              {/* Password */}
              <Input
                type="password"
                fullWidth={true}
                placeholder="Password"
                required="required"
                name="password"
                value={this.state.user.password}
                onChange={this.onChange}
                style={{ marginTop: '1em' }}
              />
            </div>

            <div style={{ marginTop: '2em' }}>
              {/* Signup link */}
              <Link to={userRoutes.signup.path}>
                <Button type="button" style={{ marginRight: '0.5em' }}>Signup</Button>
              </Link>

              {/* Form submit */}
              <Button type="submit" theme="secondary" disabled={isLoading}>
                Login
                <Icon size={1.2} style={{ color: white }}>navigate_next</Icon></Button>
            </div>
          </form>
        </GridCell>

        {/* Auth Check */}
        {/* checks for the credential ROlES, if ADMIN, it is directed to the admin dasboard else crate.list.path */}
        <AuthCheck/>
        {/* {how is this checking for the ROLE} */}
      </Grid>
    )
  }
}

// Component Properties
//expected props
Login.propTypes = {
  user: PropTypes.object.isRequired,//object that is returned from the login function
  login: PropTypes.func.isRequired,// login method from the action creator
  messageShow: PropTypes.func.isRequired, // login method from the action creator
  messageHide: PropTypes.func.isRequired // login method from the action creator
}

// Component State
function loginState(state) {
  return {
    user: state.user
  }
}

export default connect(loginState, { login, messageShow, messageHide })(withRouter(Login))
