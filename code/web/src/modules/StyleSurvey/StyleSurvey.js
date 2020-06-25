
//This file could potentially be  better placed inside the user folder 
// and let the user/api/action and user/api/state handle the functionality 

// Double check with team, because  this coulsd also be a different page???

//need to import React from 'react'
//need to import Hooks if we decide to use them

//create a state tore property for 
//isSurveyFineshed = false
//create a ract functionalcompoentn called StyleCurvey => <StyledSurvey>
//the sotre should be able to provide the app's state for
//error, isLoading and isSurveyFinshed
//declare the state of the form 
//

/*
this.state = {

}
*/

/*
List of files need to be updated

A StyleSurve will be creates
-  setup/routes/user.js
    => to add the path to the styleSurvey
- web/src/modules/crate/iItem
    => add route to the <StyleSurvey/> if the form hasn't been filled out, "/style-preferences"
- web/src/modules/user/state
    => add property to keep track of status of form isSurveyCompleted = false
- web/src/modules/user/api/actions/js
    => within the user reducer add a case for UPDATE_SURVEY that whill save the users answers
    => add a new property to the user state called suerveyAnswers = {}
            =>  this property will be an object that will keep track of the user's information 
                - body shape
                - size
                - dislikes
                - Outfit and ocasion
                - places you shop
                - price

    => this property will track all the user answers

- web/src/modules/user/api/actions/js
most of the functions in this file can be reused to post the user's answers to the database

*/

/*
Reuse compoenent such as 
<Grid> for container
<GridCell> for cells
<Item> for elements within the GridCell
<Card> 
<H1> Header
<H3> Header
<H4> Header
<Button> well, fto click on something
<Tile> for images
<Modal> to render more information for the user if necessary
*/


import React, { Component } from 'react'

//UI Imports
import { H5, H6 } from '../../ui/typography'
import { grey, grey2 } from '../../ui/common/colors'
import { Helmet } from 'react-helmet'
import { white } from '../../ui/common/colors'
import { textLevel1 } from '../../ui/common/shadows'
import { level1 } from '../../ui/common/shadows'

//App Imports
import Grid from '../../ui/grid/Grid'
import { GridCell } from '../../ui/grid'
import ImageTile from '../../ui/image/Tile'
import Button from '../../ui/button'
class StyleSurvey extends Component {
    constructor(props){
        super(props)

        this.state = {
            currentAnswer: null,
            userAnswers : [],
            images: ['https://images.unsplash.com/photo-1525490829609-d166ddb58678?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHw%3D&auto=format&fit=crop&w=500&q=60',
                    'https://images.unsplash.com/photo-1549849171-09f62448709e?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHw%3D&auto=format&fit=crop&w=500&q=60',
                    'https://images.unsplash.com/photo-1570997491915-47ade51fed9f?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTJ8fHxlbnwwfHx8&auto=format&fit=crop&w=500&q=60'
                    ]
            }
        }
        
        displayImages = () => {
            if (!this.state.images || this.props.isLoading) {
                return <div> Loading...</div>
            } else {
              return this.state.images.map((image, i) => {
                return <ImageTile 
                    onClick={(e) => {this.collectAnswer(e)}}
                    key={i} 
                    id={i}//category instead of an id
                    margin={'.5em'}
                    width={200} 
                    height={200} 
                    image={image} />
              })
            }
        }

    collectAnswer = (e) => {
        console.log(e.target.id)
    }

    render() {
        return (
          <>
            <Helmet>
                <title>Style Survey -Crates</title>
            </Helmet>

            <Grid 
              alignCenter={true} 
              style={{backgroundColor: grey}} >


              <GridCell style={{ padding: '2em', textAlign: 'center'}}>

                <H5>Let's find out your perfect Style.</H5>
                <p style={{ marginTop: '1em', color: grey2 }}>Select the answers that better describe your personality </p>
              </GridCell>

            </Grid>


            <div style={{ margin: '5em', backgroundColor: 'gold', height: '80vh', height: '60vh' }}>

              <Grid justifyCenter={true} >
                {/* if the answers.length === 0 */}
              <Button style={{ margin: '1.5em 1.5em 1.5em 2.5em', height: '37px' }} theme="secondary">
                Back
              </Button>
                <GridCell style={{margin: '.3em', textAlign: 'center'}}>
                        <H6 font="primary" style={{ textShadow: textLevel1, marginTop: '1em', fontSize: '2em'}}
                        >
                        Question 1</H6>
                        <p style={{ margin: '1em'}}>Select your answer</p>
                </GridCell>

                <Button theme="secondary" style={{ height: '37px', margin: '1.5em',}} >
                Next
              </Button>
              </Grid>

              <Grid alignCenter={true}>
                    <GridCell  justifyCenter style={{ display: 'inline-flex'}}>
                        {this.displayImages()}
                       
                    </GridCell>
              </Grid>



            </div>
        </>
        )
    }
}

export default StyleSurvey;
