import React, { useState } from 'react';
import { Button, View } from 'react-native';
import * as Google from 'expo-google-app-auth';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { increaseCount, decreaseCount ,addPopularMovies} from '../actions/Counter'

class  GoogleComponent extends React.Component{

  static mapStateToProps = state => {
    return {
      count: state.count,
      name: state.name,
      pictureUrl: state.pictureUrl,
      list: state.list
    }
    }
    static mapDispatchToProps = dispatch => {
    return bindActionCreators({
    increaseCount,
    decreaseCount,  
    addPopularMovies
    },
    dispatch
    )
    }


   signIn = async () => {
    const { increaseCount, decreaseCount } = this.props
    try {
      const result = await Google.logInAsync({
        androidClientId:
          "1026180986297-su1321ht7tvjptnq94gsbaq6gnt2qoti.apps.googleusercontent.com",
        //iosClientId: YOUR_CLIENT_ID_HERE,  <-- if you use iOS
        scopes: ["profile", "email"]
      })

      if (result.type === "success") {
          increaseCount(result);
          // setGoogleLoggedinStatus(true);
          // setUserData(result.user.name);
          // setPhotoUrl(result.user.photoUrl);
        
      } else {
        console.log("cancelled")
      }
    } catch (e) {
      console.log("error", e)
    }
  }

   logoutGoogle = () => {
    // setGoogleLoggedinStatus(false);
    // setUserData(null);
    // setImageLoadStatus(false);
  }

 render(){
    return (
      <View>
        <Button title="Sign in with Google" onPress={() => this.signIn()} />
      </View>
    )
 }
}
 

export default connect(
  GoogleComponent.mapStateToProps,
  GoogleComponent.mapDispatchToProps
  )(GoogleComponent)