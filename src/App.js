import React, { Component } from 'react';
import './App.css';
import PhoneForm from './components/PhoneForm';
import PhoneInfoList from './components/PhoneInfoList';

class App extends Component {
  id = 2
  state = {
    information : [
      {
        id: 0,
        name: '둘리',
        phone: '010-1111-2222'
      },
      {
        id: 1,
        name: '고길동',
        phone: '010-2222-3333'
      }
    ],
    keyword: ''
  }
  handleChange = (e) => {
    //const { keyword } = this.state;
    this.setState({
      keyword: e.target.value
    });
  }
  handleCreate = (data) => {
    const { information } = this.state;
    this.setState({
      information : information.concat({id: this.id++, ...data})
    })
  }
  handleRemove = (id) => {
    const { information } = this.state;
    this.setState({
      information: information.filter(info => info.id !== id)
    });
  }
  handleUpdate = (id, data) => {
    const { information } = this.state;
    this.setState({
      information: information.map(
        info => id === info.id
          ? {...info, ...data}  // 새 객체를 만들어 기존의 값과 전달받은 data를 덮어씀
          : info                // 기존의 값을 그대로 유지
      )
    });
  }
  render() {
    console.log('render App');
    const { information, keyword} = this.state;
    const filteredList = information.filter(
      info => info.name.indexOf(keyword) !== -1
    );
    return (
      <div>
        <PhoneForm 
          onCreate={this.handleCreate}        
        />
        <p>
          <input
            placeholder="검색 할 이름을 입력하세요 : "
            onChange={this.handleChange}
            value={this.state.keyword}
          />
        </p>
        <hr/>
        <PhoneInfoList 
          data={filteredList}
          onRemove={this.handleRemove}        
          onUpdate={this.handleUpdate}
        />
      </div>
    );
  }
}

export default App;
