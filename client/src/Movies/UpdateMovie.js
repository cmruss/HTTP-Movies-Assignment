import React, { useState, useEffect } from "react";
import axios from "axios";

const initialState = {
    id: null,
    title: "",
    director: "",
    metascore: "",
    stars: []
}

const UpdateMovie = props => {
    const [movie, setMovie] = useState(initialState);
    console.log(props);

 
    useEffect(() => {    
        const movieToEdit = props.movies.find(
            movie => `${movie.id}` === props.match.params.id
        );
        if (movieToEdit) {
            setMovie(movieToEdit);
        }
    }, [props.match.params.id]);

    const handleChange = e => {
        e.persist();
        let value = e.target.value;
        if (e.target.name === "metascore") {
            value = parseInt(value, 10);
        }

        setMovie({
            ...movie,
            [e.target.name]: value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
            .then(res => {
                props.updateMovies(...props.movies,res.data);
                props.history.push(`/`);
            })
            .catch(err => console.log('No dice.', err))
        
       
    }

    return (
        <div className="save-wrapper">
            <div className="movie-card">
                <form onSubmit={handleSubmit}>
                    <div className="movie-title">
                        <input
                            type="text"
                            name="title"
                            placeholder="title"
                            onChange={handleChange}
                            value={movie.title}
                        />
                    </div>
                    <div className="movie-metascore">
                        <input
                            type="text"
                            name="director"
                            placeholder="director"
                            onChange={handleChange}
                            value={movie.director}
                        />
                    </div>
                    <div className="movie-metascore">
                        <input
                            type="text"
                            name="metascore"
                            placeholder="metascore"
                            onChange={handleChange}
                            value={movie.metascore}
                        />
                    </div>
                    {movie.stars.map(star => (
                        <input 
                            key={star}
                            type="text"
                            name="star"
                            placeholder="star"
                            value={star} 
                            className="movie-star"
                            onChange={handleChange}
                        />))}
                     <div className="save-button" onClick={handleSubmit}>
                       Save
                     </div>
                </form>
            </div>
        </div>
    )

}

export default UpdateMovie;