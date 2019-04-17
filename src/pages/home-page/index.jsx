import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, ListGroup } from 'react-bootstrap';
import films from '../../atoms/json-files/films';
import MovieContainer from '../../molecules/movie-container';

class HomePage extends Component {

  getFovoritsInStorage(){
  let favorits = JSON.stringify(this.props.favorits);
  localStorage.setItem("myMarkedFilm", favorits);
}

  render(){
    console.log(films);
    this.getFovoritsInStorage();
    const renderMovieContainers = films.map(item =>(
      <MovieContainer
        key={item.title} 
        movieTitle={item.title}
        tags={item.tags} />
    ))
    return(
      <div>
        <h1>HomePage</h1>
        <Card style={{ width: '90%', margin: '0 auto' }}>
          <ListGroup variant="flush">
            {renderMovieContainers}
          </ListGroup>
        </Card>
      </div> 
    );
  }
}

const mapStateToProps = state => ({
  favorits: state.favorits,
})

export default connect(mapStateToProps, null)(HomePage);

