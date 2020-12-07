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

// Component
class Item extends PureComponent {

  constructor(props) {
    super(props)

    this.state = {
      isLoading: false
    }
  }

  onClickSubscribe = (crateId) => {//the user suscribes to a crate and changes the state.isLoading to true
    this.setState({
      isLoading: true
    })

    this.props.messageShow('Subscribing, please wait...')
    //the state message gets updated

    this.props.create({ crateId })//activates a mutation to add a crate to the users subscription's list which is a []
      .then(response => {//then returns the user's crates
        if (response.data.errors && response.data.errors.length > 0) {//checks for erros 
          this.props.messageShow(response.data.errors[0].message)// if they are any errrors then display then 
        } else {
          this.props.messageShow('Subscribed successfully.')//if there are no errros the it was a suscessful subscription

          this.props.history.push(userRoutes.subscriptions.path)//a
        }
      })
      .catch(error => {
        this.props.messageShow('There was some error subscribing to this crate. Please try again.')
      })
      .then(() => {
        this.setState({
          isLoading: false
        })//after getting the crates then the app is no longer loadings

        window.setTimeout(() => {//clears out the message in common/message.text
          this.props.messageHide()
        }, 5000)
      })
  }

  render() {
    const { id, name, description } = this.props.crate//destructuring store  props
    const { isLoading } = this.state // desctructuring component props

    return (
      // <Card is a compoenent that renders a subscription>
      <Card style={{ width: '18em', backgroundColor: white }}>
        <p style={{ padding: '2em 3em 0 3em' }}>
          <img src={`${ APP_URL }/images/crate.png`} alt={name} style={{ width: '100%' }}/>
        </p>

        <div style={{ padding: '1em 1.2em' }}>
          <H4 font="secondary" style={{ color: black }}>{name}</H4>

          <p style={{ color: grey2, marginTop: '1em' }}>{description}</p>
          {/*⬆️ rate descrioption*/}

          <p style={{ textAlign: 'center', marginTop: '1.5em', marginBottom: '1em' }}>
            <Button
              theme="primary"
              // add a conditional when, if the user has not fillout the survey it will
              //redirect to the Style surve other wise it will just add the crate to the 
              //user's profile
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
Item.propTypes = {
  crate: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  messageShow: PropTypes.func.isRequired,
  messageHide: PropTypes.func.isRequired
}

// Component State
function itemState(state) {
  return {
    user: state.user
  }
}

export default connect(itemState, { create, messageShow, messageHide })(withRouter(Item))
