import React from 'react';
import films from '../../atoms/json-files/films';
import Select from 'react-select';
import s from './InputSearch.module.css';
  
class InputSearch extends React.Component {
  state = {
    selectedOption: null,
  };

  

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    this.props.updateData(selectedOption.value); //переброс св-ва в род.компонент
  }
  
  render() {
    const { selectedOption } = this.state;
    const fetchTopics = films.map(elem => {return { value: elem.title, label: elem.title }});
    return (
      <Select 
        className={s.select}
        value={selectedOption} 
        options={ fetchTopics } 
        onChange={this.handleChange}
      />
    );
  }
}

export default InputSearch;