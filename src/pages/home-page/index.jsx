import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, ListGroup } from 'react-bootstrap';
import films from '../../atoms/json-files/films';
import InputSearch from '../../molecules/input-search';
import MovieContainer from '../../molecules/movie-container';

class HomePage extends Component {

  state = {
    nameFilm: '',
  }

  getFovoritsInStorage(){
  let favorits = JSON.stringify(this.props.favorits);
  localStorage.setItem("myMarkedFilm", favorits);
}

  updateData(value){
    this.setState({nameFilm: value});
  }

  render(){
    const { nameFilm } = this.state;
    console.log(nameFilm);
    this.getFovoritsInStorage();
    const filterFilm = () =>{
      if(nameFilm !== ''){
        return films.filter(item => item.title === nameFilm)
      } return films;
    }
    const renderMovieContainers = filterFilm().map(item =>(
      <MovieContainer
        key={item.title} 
        movieTitle={item.title}
        tags={item.tags} />
    ))
    return(
      <div>
        <h1>HomePage</h1>
        <InputSearch updateData={this.updateData.bind(this)} />
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

