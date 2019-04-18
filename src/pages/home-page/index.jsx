import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, ListGroup } from 'react-bootstrap';
import films from '../../atoms/json-files/films';
import InputSearch from '../../molecules/input-search';
import MovieContainer from '../../molecules/movie-container';

class HomePage extends Component {

  state = {
    nameFilm: '',
    countFilms: 10,
  }

  getFovoritsInStorage(){
  let favorits = JSON.stringify(this.props.favorits);
  localStorage.setItem("myMarkedFilm", favorits);
}

  updateData(value){ // для бумеранга с поисковиком
    this.setState({nameFilm: value});
  }

  handleShowMore(){
    this.setState(prevState => ({
      countFilms: prevState.countFilms + 10,
    }))
  }

  render(){
    const { nameFilm, countFilms } = this.state;
    console.log(nameFilm);
    this.getFovoritsInStorage();
    const filterFilm = () =>{
      if(nameFilm !== ''){
        return films.filter(item => item.title === nameFilm)
      } return films;
    }
    //ещё фильтр
    
    const renderMovieContainers = filterFilm().slice(0, countFilms).map(item =>(
      <MovieContainer
        key={item.title} 
        movieTitle={item.title}
        tags={item.tags} />
    ))
    console.log(filterFilm().length);
    return(
      <div>
        <h1>Фильмы : </h1>
        <InputSearch updateData={this.updateData.bind(this)} />
        <Card style={{ width: '90%', margin: '0 auto' }}>
          <ListGroup variant="flush">
            {renderMovieContainers}
          </ListGroup>
        </Card>
        {filterFilm().length >=11 ?
        <button onClick={this.handleShowMore.bind(this)}>Показать еще</button> :
        null}
      </div> 
    );
  }
}

const mapStateToProps = state => ({
  favorits: state.favorits,
})

export default connect(mapStateToProps, null)(HomePage);

