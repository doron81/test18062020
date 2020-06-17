import React, { useState } from 'react';
import axios from 'axios'; 

export default getMovieDetails = async (movie_id) => {

    const [movieDetails, setMovieDetails] = useState(null);

    const result = await axios.get(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=2ec4080e6d814fb7a6395919b623a252&language=en-US`);
    const movie = result.data;
      console.log(movie);
      let moviedetails = <View>
                            <Text>{movie.title}</Text>
                            <Image style={{ width: 200, height: 200, borderRadius: 50, marginVertical: 20 }}
        source={movie.poster_path} />
                          </View>
      setMovieDetails(moviedetails)
  }