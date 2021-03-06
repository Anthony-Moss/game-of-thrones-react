import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Character from './Character';

// To do Ajax in a React app:
// 0. optional: install axios
// 1. you need a class component
// 2. add ajax requests (componentDidMount is the "earliest")

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pageNumber: 1,
      characters: []     // By default, set your state to an empty version of what you expect
    };
  }

  componentDidMount() {
    // 1. ^^^ what is this
    //  it's a 'React Lifecycle Method'

    // 2. Whaat is it called?
    // React will call methos for you

    // 3. Who calls is?
    // React will call the method for you

    // 4. When do I need it?
    // Its usefull for starting timers (using setInterval or requestAnimationFrame)
    // or if you're fetching data from an API to load to the component's state
    // or any time you need to call .setState for the first time for a component

    
    console.log(`componentDidMount`);
    this._getCharactersForPage();
  }

  render() {
    console.log(`render!`);
    return (
      <div>
        <button onClick={this._decrementPageNumber}>previous</button>
        <button onClick={this._incrementPageNumber}>next</button>
        {this.state.characters.map(c => <Character data={c}/>)}
      </div>
    );
  }

  _getCharactersForPage = async () => {
    const response = await axios.get(`https://www.anapioficeandfire.com/api/characters?page=${this.state.pageNumber}&pageSize=10`);
    // console.log(response.data);
    console.log(`_getCharactersForPage`);
    this.setState({
      characters: response.data
    }, () => {
      console.log('done setting state');
    });
  }

  _incrementPageNumber = () => {
    console.log(`_incrementPageNumber`);
    this.setState({
      pageNumber: this.state.pageNumber + 1   
    }, () => {
      this._getCharactersForPage();
    });
  }
  _decrementPageNumber = () => {
    console.log(`_decrementPageNumber`);
    // let whatToChange = {
    //   pageNumber: this.state.pageNumber - 1   
    // };
    // let whatToDoAfter = this._getCharactersForPage();
    // this.setState(whatToChange, whatToDoAfter);    // equivalent alternative version to the one in _incrementPageNumber

    this.setState({
      pageNumber: this.state.pageNumber - 1   
    }, this._getCharactersForPage);    // equivalent alternative version to the one in _incrementPageNumber
  }

}


export default App;
