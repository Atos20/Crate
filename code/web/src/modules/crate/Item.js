// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

// UI Imports
import Card from '../../ui/card/Card'
import Button from '../../ui/button/Button'
import H4 from '../../ui/typography/H4'
import Icon from '../../ui/icon'
import { white, grey2, black } from '../../ui/common/colors'

// App Imports
import { APP_URL } from '../../setup/config/env'
import userRoutes from '../../setup/routes/user'
import { messageShow, messageHide } from '../common/api/actions'
import { create } from '../subscription/api/actions'
// import the style survey component that will render when a user clicks on subscribe

// Component
class Item extends PureComponent {

  constructor(props) {
    super(props)

    // A local state for the Item component of Crate to show the user conditionally rendered messages based on isLoading state.
    this.state = {
      isLoading: false
    }
  }

  // when a user clicks on the subscribe button, this method is invoked
  onClickSubscribe = (crateId) => {
    this.setState({
      isLoading: true
    })

    // shows a message to the user that they are subscribing for feedback
    this.props.messageShow('Subscribing, please wait...')

    // Launch style survey here before the create method is called. Create method will have to be modified in order to make the new feature work as intended.
    // When a user clicks, they are directed to the /style-preferences route (should be part of userRoutes)
    // When the user starts the survey, they will only be able to complete a survey once
    // The create method will add a new subscrition to the database, registering a new subscrition for a user to a crate that they clicked subscribe for
    // If it is not recorded to DB successfuly, will show the user a message on why it failed, else it will render subscribed successfully.
    // messageShow will show a modal on the page that will update the user the status of the action they just performed.
    this.props.create({ crateId })
      .then(response => {
        if (response.data.errors && response.data.errors.length > 0) {
          this.props.messageShow(response.data.errors[0].message)
        } else {
          this.props.messageShow('Subscribed successfully.')

          // This will redirect the user to the userRoutes.subscriptions route
          this.props.history.push(userRoutes.subscriptions.path)
        }
      })
      .catch(error => {
        this.props.messageShow('There was some error subscribing to this crate. Please try again.')
      })
      .then(() => {
        this.setState({
          isLoading: false
        })

        // This will show the message modal for 5 seconds before making it disappear.
        window.setTimeout(() => {
          this.props.messageHide()
        }, 5000)
      })
  }

  render() {
    // desconstruct the id, name, description and isLoading from parent elements
    const { id, name, description } = this.props.crate
    const { isLoading } = this.state

    return (
      // This is from the UI folder and will render a Card component that has been custom created through storybook to render to the page with the styles that is has been specified with. This cleans up the HTML a lot as each component that is being used in the website is using the same foundational structure through the storybook and ui components
      <Card style={{ width: '18em', backgroundColor: white }}>
        <p style={{ padding: '2em 3em 0 3em' }}>
          <img src={`${ APP_URL }/images/crate.png`} alt={name} style={{ width: '100%' }}/>
        </p>

        <div style={{ padding: '1em 1.2em' }}>
          <H4 font="secondary" style={{ color: black }}>{name}</H4>

          <p style={{ color: grey2, marginTop: '1em' }}>{description}</p>

          <p style={{ textAlign: 'center', marginTop: '1.5em', marginBottom: '1em' }}>
            <Button
              theme="primary"
              onClick={this.onClickSubscribe.bind(this, id)}
              type="button"
              disabled={ isLoading }
            >
              <Icon size={1.2} style={{ color: white }}>add</Icon> Subscribe
            </Button>
          </p>
        </div>
      </Card>
    )
  }
}

// Component Properties
// propTypes specifies what individual modules should be part of props and expects everything to be there as they are required. It also specifies the data type that it is supposed to be.
Item.propTypes = {
  crate: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  messageShow: PropTypes.func.isRequired,
  messageHide: PropTypes.func.isRequired
}

// Component State
// Redux is doing a custom mapStateToProps here to render the initial state for user to be equal to state.user. A user must be logged in to see this part of the website and will assign the user that is currently logged in here.
function itemState(state) {
  return {
    user: state.user
  }
}

// mapDispatchToProps is desconstructing from create, messageShow and messageHide. The dispatch is built within those specific method calls as opposed to here inside the file. withRouter will pass updated match, location and history props to this Item component. Connect is allowing the initial state, any actions that are being called within this component to link up with Redux store and have access to the reducers for which action is invoked.
export default connect(itemState, { create, messageShow, messageHide })(withRouter(Item))
