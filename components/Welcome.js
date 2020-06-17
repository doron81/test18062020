import React , { useState }  from 'react';
import { Text, View, Image , StyleSheet , Button} from 'react-native';
import FacebookComponent from './FacebookLogin';
import GoogleComponent from './GoogleLogin';
import Home from './Home';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { increaseCount, decreaseCount ,addPopularMovies} from '../actions/Counter'

class Welcome extends React.Component{
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
        addPopularMovies,
        },
        dispatch
        )
        }
    render(){
        console.log("ffffffffffffff");
        console.log("name",this.props.name);
       if(!this.props.count){
            return(
                <View style={styles.container}>
                    <Text>Welcome Stranger</Text>
                    <Image style={{ width: 200, height: 200, borderRadius: 50, marginVertical: 20 }}
                        source={require("../assets/emptyProfile.png")} />
                    <Text>Please log in to continue to the awesomness</Text>
                    <FacebookComponent />
                    <GoogleComponent />
                </View>
            
             )
        }else{
            return(
                <Home/>
         )
        }
    
    
    }
    }
  const styles = StyleSheet.create({
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
  export default connect(
    Welcome.mapStateToProps,
    Welcome.mapDispatchToProps
    )(Welcome)
