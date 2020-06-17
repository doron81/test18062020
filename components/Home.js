import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator,Button } from 'react-native';
import axios from 'axios'; 
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { increaseCount, decreaseCount ,addPopularMovies} from '../actions/Counter'
// import getPopularMovies from './PopularMovies';
class Home extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      popularMovies: null,
      movieDetails: null,
    }
    this.getPopularMovies = this.getPopularMovies.bind(this);
    this.getMovieDetails = this.getMovieDetails.bind(this);
  }
  
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
      increaseCount, decreaseCount , addPopularMovies,
    },
    dispatch
    )
    }
    
    getMovieDetails = async (movie_id) => {
      console.log(movie_id);
      const result = await axios.get(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=2ec4080e6d814fb7a6395919b623a252&language=en-US`);
        console.log(`https://image.tmdb.org/t/p/w500/${result.data.poster_path}`);
        let moviedetails = <View style={{ width: 300, height: 800 , marginVertical: 50 , marginHorizontal: 50 }} >
                              <Text>Title: {result.data.title}</Text>
                              <Text>Overview: {result.data.overview}</Text>
                              <Image style={{ width: 200, height: 200 , marginVertical: 20 }}
          source={{uri: `https://image.tmdb.org/t/p/w500/${result.data.poster_path}`}} />
                            <Text>Vote Average: {result.data.vote_average}</Text>
                            </View>
        this.setState({moviedetails})
    }
   getPopularMovies = async () => {
        const result = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=2ec4080e6d814fb7a6395919b623a252&language=en-US&page=1`);
          const movieList = result.data.results;
          let movies = movieList.map(movie => {
            return  <Button title={movie.title} key={movie.id} onPress={() => this.getMovieDetails(movie.id)}/>;
          })

          this.setState({popularMovies: movies})
      }

  render(){
    if(this.state.moviedetails){
      return <View>
        {this.state.moviedetails}
      </View>
    }else{
    return (
      <View style={styles.container}>
      <View >
        
            <Image
              style={{ width: 200, height: 200, borderRadius: 50 }}
              source={{ uri: this.props.pictureUrl }} 
              onLoadEnd={() => this.setState({ImageLoadStatus: true})} />
              <ActivityIndicator size="large" color="#0000ff" animating={!this.props.name} style={{ position: "absolute" }} />
            
            <Text style={{ fontSize: 22, marginVertical: 10 }}>Hi {this.props.name}!</Text>
            
            <Button title="רשימת סרטים" onPress={() => this.getPopularMovies()} />   
           
          </View> 
          <View>
            {this.state.popularMovies}
            
          </View>
          <TouchableOpacity style={styles.logoutBtn} onPress={this.logoutFacebook}>
              <Text style={{ color: "#fff" }}>Logout</Text>
            </TouchableOpacity> 
          </View>
          
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
  Home.mapStateToProps,
  Home.mapDispatchToProps
  )(Home)