import React, { Component } from 'react';
import { connect } from 'react-redux';
import s from './MovieContainer.module.css';
import { ListGroup, Row, Col } from 'react-bootstrap';
import star from '../../images/star.svg';
import nostar from '../../images/nostar.svg';

class MovieContainer extends Component {

  state = {
    isLove: false,
  }

  onClickStar = () => {
    const { movieTitle, tags } = this.props;
    const { isLove } = this.state;
    this.setState(prev =>({
      isLove: !prev.isLove
    }));
    // Добавляем и удаляем id фото в store
    if(!isLove){
      return this.props.onAddFavorit(movieTitle, tags);
    } return this.props.onDeleteFavorit(movieTitle);
  };
  
  // Сохраняет лайк после перезагрузки
  func1 = () => {
    const { movieTitle } = this.props;
    if(this.props.favorits.some(item => item.title === movieTitle)){
      this.setState({isLove: true});
    }
  }
  
  componentDidMount() {
    this.func1();
  }
  
  render(){
    const { movieTitle, tags, key } = this.props;
    const { isLove } = this.state;
    const renderTags = tags.map((tag, i) =>(
      <span key={i} className={s.tags} >
        {tag}
      </span>
    ))
    return(
      <ListGroup.Item 
        key={key}
        className={s.listItem}
        >
        <Row>
          <Col sm={12} md={10} className={s.nameFilm}>
            <h5>{movieTitle}</h5>
            
            <div><span>Теги: </span>{renderTags}</div>
          </Col>
          <Col sm={12} md={2} className={s.starFilm}>
            <div className={s.star} onClick={this.onClickStar} >
              <img src={isLove?star:nostar} alt=""/>
            </div>
          </Col>
        </Row>
      </ListGroup.Item>
  );
  }
}

const mapStateToProps = state => ({
  favorits: state.favorits,
});

const mapDispatchToProps = dispatch => ({
  onAddFavorit: (movieTitle, tags) => {
    const payload = {
      title: movieTitle,
      tags: tags
    };
    dispatch({ type: 'ADD_FAVORIT', payload });
  },
  onDeleteFavorit: movieTitle => dispatch({ type: 'DELETE_FAVORIT', payload: movieTitle })
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieContainer);