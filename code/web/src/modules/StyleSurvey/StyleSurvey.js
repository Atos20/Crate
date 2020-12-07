
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