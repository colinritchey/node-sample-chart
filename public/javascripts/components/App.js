import React from 'react';
import PieChart from './PieChart';

class App extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      data: {}
    }
  }

  componentDidMount(){
    fetch('http://localhost:3000/api/courses/all')
      .then((r) => r.json())
      .then((data) => this.setState({data: data}))
  }

  render(){
    // debugger;

    return(
      <div>
        <PieChart data={this.state.data}/>
      </div>
    )
  }
}

export default App;
