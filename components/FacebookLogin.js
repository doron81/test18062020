import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import * as Facebook from 'expo-facebook';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { increaseCount, decreaseCount ,addPopularMovies} from '../actions/Counter'


  class FacebookComponent extends React.Component{
    
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

  facebookLogIn = async () => {
    const { increaseCount, decreaseCount } = this.props
    try {
      await Facebook.initializeAsync('2606782802866810');
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync('2606782802866810', {
        permissions: ['public_profile'],
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.height(500)`)
          .then(response => response.json())
          .then(data => {
        
            increaseCount(data);
            console.log(data)
          })
          .catch(e => console.log(e))
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }

  styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#e9ebee',
      alignItems: 'center',
      justifyContent: 'center',
    },
    loginBtn: {
      backgroundColor: '#4267b2',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 20
    },
    logoutBtn: {
      backgroundColor: 'grey',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 20,
      position: "absolute",
      bottom: 0
    },
  });
  render(){
   
      return (
        <View>
          <TouchableOpacity style={this.styles.loginBtn} onPress={this.facebookLogIn}>
              <Text style={{ color: "#fff" }}>Login with Facebook</Text>
            </TouchableOpacity>
        </View>
      )
    }
  }

  export default connect(
    FacebookComponent.mapStateToProps,
    FacebookComponent.mapDispatchToProps
    )(FacebookComponent)