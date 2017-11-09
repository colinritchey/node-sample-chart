import React from 'react';
import PieChart from './PieChart';
import Teachers from './Teachers';

class App extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      data: {},
      year: 'all',
      selectedCourse: ''
    }

    this.isChecked = this.isChecked.bind(this);
    this.updateYear = this.updateYear.bind(this);
    this.selectOneCourse = this.selectOneCourse.bind(this);
  }

  componentDidMount(){
    this.fetchCourses();
  }

  selectOneCourse(course){
    this.setState({selectedCourse: course})
  }

  isChecked(value){
    // console.log('value', value);
    // console.log('this.state.year', this.state.year);
    return value === this.state.year ? true : false;
  }

  fetchCourses(){
    fetch(`http://localhost:3000/api/courses/${this.state.year}`)
      .then((r) => r.json())
      .then((data) => this.setState({data: data}))
  }

  updateYear(value){
    this.setState({ year: value}, this.fetchCourses)
  }

  render(){

    return(
      <div className='app'>
        <h1>Students by Courses {this.state.year}</h1>

        <label>Years:</label>
        <label>
          <input type='radio' value='all'
            onChange={() => this.updateYear('all')}
            checked={this.isChecked('all')}/>All
        </label>
        <label>
          <input type='radio' value='2015'
            onChange={() => this.updateYear('2015')}
            checked={this.isChecked('2015')}/>2015
        </label>
        <label>
          <input type='radio' value='2016'
            onChange={() => this.updateYear('2016')}
            checked={this.isChecked('2016')}/>2016
        </label>

        <div className='charts'>
          <PieChart
          selectOneCourse={this.selectOneCourse}
          data={this.state.data}/>

          <Teachers
          year={this.state.year}
          course={this.state.selectedCourse}/>
        </div>

      </div>
    )
  }
}

export default App;
