import React, { Component } from 'react';
import s from './MarkedPage.module.css';
import { connect } from 'react-redux';
import { Card, ListGroup } from 'react-bootstrap';
import Title from '../../atoms/title';
import films from '../../atoms/json-files/films';
import MovieContainer from '../../molecules/movie-container';

class MarkedPage extends Component {

  getFovoritsInStorage(){
  let favorits = JSON.stringify(this.props.favorits);
  localStorage.setItem("myMarkedFilm", favorits);
}

  render(){
    const { favorits } = this.props;
    console.log(favorits);
    this.getFovoritsInStorage();
    const filterFilm = favorits.filter(v => {
      return films.some(v2 => {
        return v.title === v2.title;
      })
    });
    const renderMovieContainers = filterFilm.map(item =>(
      <MovieContainer
        key={item.title} 
        movieTitle={item.title}
        tags={item.tags} />
    ));
    console.log(filterFilm);
    return(
      <div style={{minHeight: '100%'}}>
      <Title title="Закладки :" />
        <Card className={s.card}>
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

export default connect(mapStateToProps, null)(MarkedPage);