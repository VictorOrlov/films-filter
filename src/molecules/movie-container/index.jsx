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
    const { movieTitle } = this.props;
    const { isLove } = this.state;
    this.setState(prev =>({
      isLove: !prev.isLove
    }));
    // Добавляем и удаляем id фото в store
    if(!isLove){
      return this.props.onAddFavorit(movieTitle);
    } return this.props.onDeleteFavorit(movieTitle);
  };
  
  // Сохраняет лайк после перезагрузки
  func1 = () => {
    const { movieTitle } = this.props;
    if(this.props.favorits.some(item => item.movieTitle === movieTitle)){
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
      <ListGroup.Item key={key}>
        <Row>
          <Col md={10}>
            <h5>{movieTitle}</h5>
            <div>Теги: {renderTags}</div>
          </Col>
          <Col md={2} style={{borderLeft: '1px solid silver'}}>
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
  onAddFavorit: (movieTitle) => {
    const payload = {
      movieTitle: movieTitle
    };
    dispatch({ type: 'ADD_FAVORIT', payload });
  },
  onDeleteFavorit: movieTitle => dispatch({ type: 'DELETE_FAVORIT', payload: movieTitle })
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieContainer);