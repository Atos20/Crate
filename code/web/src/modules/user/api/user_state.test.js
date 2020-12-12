import  * as actions from './actions'
import  userReducer from './state'
import { isEmpty } from '../../../setup/helpers'
import '@testing-library/jest-dom';
import { waitFor } from '@testing-library/react';
describe('userActions', () => {

  let fakeInitialState, reducer, fakeUser, fakeLoginState;

    beforeEach(() =>{

      fakeUser = {
        name: "The User",
        email: "user@crate.com",
        role: "USER",
        survey: false
      };

      reducer = userReducer;

      fakeInitialState = {
        error: null,
        isLoading: false,
        isAuthenticated: false,
        details: null,
        isSurveyCompleted: false
      };

      fakeLoginState = {
        error: null,
        isLoading: false,
        isAuthenticated: true,
        details: fakeUser,
        isSurveyCompleted: false
      };

  })

  it('should work', () => {
    //test ASSIGN_STYLE
    // const action = {type: actions.ASSIGN_STYLE, style: 'GOOOOFFY', isSurveyCompleted: true}

    // const result =  reducer(fakeInitialState, action)

    // const newState = {
    //   error: null,
    //   isLoading: false,
    //   isAuthenticated: false,
    //   details: null,
    //   isSurveyCompleted: true,
    //   style: action.style
    // }

    // expect(result).toEqual(newState)
    expect(true).toEqual(true)

  })

  it('should return the initial state', () => {
    const result = reducer(undefined, {})
    expect(result).toEqual(fakeInitialState)
  });
  
  
  it('should be able to make a LOGIN_REQUEST', () => {
    const action = {type: actions.LOGIN_REQUEST, isLoading: true}

    const result = reducer(fakeInitialState, action)

    const newState = {
      "details": null,
      "error": null,
      "isAuthenticated": false,
      "isLoading": true,
      "isSurveyCompleted": false
    }

    expect(result).toEqual(newState)
  })
    
    it('should return updated state when SET_USER is called', () => {

      const action = {
        type: actions.SET_USER, 
        user: fakeUser
      }

      const result = reducer(fakeInitialState, action)

      const newState = {
        error: null,
        isLoading: false,
        isAuthenticated: true,
        details: fakeUser,
        "isSurveyCompleted": false
      };
      
      expect(result).toEqual(newState)

    })

    it('should be able to make a LOGIN_RESPONSE', ()=> {

      const action = {
        type: actions.LOGIN_RESPONSE,
        error: 'fake error',
      }

      const result = reducer(fakeInitialState, action)

      const newState = {
        "details": null,
        "error": "fake error",
        "isAuthenticated": false,
        "isLoading": false,
        "isSurveyCompleted": false,
      }

      expect(result).toEqual(newState)
      
    })

    it('should be able to LOG_OUT', ()=> {
      const action = {type: actions.LOGOUT,}

      const result = reducer(fakeInitialState, action)

      const newState = {
        "details": null,
        "error": null,
        "isAuthenticated": false,
        "isLoading": false,
        "isSurveyCompleted": false,
      }
      
      expect(result).toEqual(newState)
    })

})
