import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, ListGroup } from 'react-bootstrap';
import films from '../../atoms/json-files/films';
import InputSearch from '../../molecules/input-search';
import TagFiltering from '../../molecules/tag-filtering';
import MovieContainer from '../../molecules/movie-container';

class HomePage extends Component {

  state = {
    nameFilm: '',
    dataTags: [],
    countFilms: 10,
  }

  getFovoritsInStorage(){
  let favorits = JSON.stringify(this.props.favorits);
  localStorage.setItem("myMarkedFilm", favorits);
}

  updateNameData(value){ // для бумеранга с поисковиком
    this.setState({nameFilm: value});
  }

  updateTagsData(value){ // для бумеранга с чекбоксами
    this.setState({dataTags: value});
  }

  handleShowMore(){
    this.setState(prevState => ({
      countFilms: prevState.countFilms + 10,
    }))
  }

  render(){
    const { nameFilm, countFilms, dataTags } = this.state;
    this.getFovoritsInStorage();
    const filterFilm = () =>{
      if(nameFilm !== ''){
        return films.filter(item => item.title === nameFilm)
      } return films;
    }
    //ещё фильтр
    const filterTags = () => {
      if(dataTags.length !== 0){
        return filterFilm().filter(item =>
          dataTags.every(tag =>
            item.tags.some(v => v === tag)
            )
          );
      } return filterFilm();
    }
    
    const renderMovieContainers = filterTags().slice(0, countFilms).map(item =>(
      <MovieContainer
        key={item.title} 
        movieTitle={item.title}
        tags={item.tags} />
    ))
    return(
      <div>
        <h1>Фильмы : </h1>
        <InputSearch updateData={this.updateNameData.bind(this)} />
        <TagFiltering updateData={this.updateTagsData.bind(this)} />
        <Card style={{ width: '90%', margin: '0 auto' }}>
          <ListGroup variant="flush">
            {renderMovieContainers}
          </ListGroup>
        </Card>
        {filterTags().length >=11 ?
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

