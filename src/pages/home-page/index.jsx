import React, { Component } from 'react';
import s from './HomePage.module.css';
import { connect } from 'react-redux';
import Title from '../../atoms/title';
import { Card, ListGroup, Button } from 'react-bootstrap';
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
      <div className={s.wrapper}>
        <Title title="Фильмы :" />
        <InputSearch updateData={this.updateNameData.bind(this)} />
        <TagFiltering updateData={this.updateTagsData.bind(this)} />
        <Card className={s.card}>
          <ListGroup variant="flush">
            {renderMovieContainers}
          </ListGroup>
        </Card>
        <div className={s.divButton}>
        {filterTags().length >=11 ?
          <Button 
            variant="outline-primary" 
            onClick={this.handleShowMore.bind(this)}
            >
            Показать еще
          </Button> :
          null}
        </div>
        
      </div> 
    );
  }
}

const mapStateToProps = state => ({
  favorits: state.favorits,
})

export default connect(mapStateToProps, null)(HomePage);

