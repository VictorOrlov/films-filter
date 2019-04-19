import React, { Component, Fragment } from 'react';
import tags from '../../atoms/json-files/tags';
import { Form } from 'react-bootstrap';

class TagFiltering extends Component {

  state = {
    options: [],
  }

  onChangeChecked(e) {
    const options = this.state.options;
    let index;
    if(e.target.checked){
      options.push(e.target.name);
    } else {
      index = options.indexOf(e.target.name)
      options.splice(index, 1)
    }
    this.setState({ options: options })
    this.props.updateData(this.state.options); //переброс св-ва в род.компонент
  }

  render(){
    const renderCheck = tags.map(item => (
      <Form.Check 
        inline 
        key={item}
        label={item} 
        name={item} 
        type="checkbox" 
        onChange={this.onChangeChecked.bind(this)}
        id={`inline-${item}`} />
    ))
    return(
      <Fragment>
        <Form>
          <div>
            {renderCheck}
          </div>
        </Form>
        {/* <button onClick={}>фильтровать по жанрам</button> */}
      </Fragment>
    )
  }
}

export default TagFiltering;