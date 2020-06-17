import React, { useState } from 'react';
import axios from 'axios'; 
import { View , Button} from 'react-native';


const getPopularMovies = async () => {

    const result = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=2ec4080e6d814fb7a6395919b623a252&language=en-US&page=1`);
    // console.log(result.data.results);
      const movieList = result.data.results;
      let movies = movieList.map(movie => {
        return  <Button title={movie.title} key={movie.id} onPress={() => this.getMovieDetails(movie.id)}/>;
      })
      console.log(movies);
      //popularMovies(movies);

      return(
        <View>
          {movies}
        </View>
      )
  }
export default getPopularMovies;