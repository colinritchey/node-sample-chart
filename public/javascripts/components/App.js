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
    this.setState({ selectedCourse: course })
  }

  isChecked(value){
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
          {['all', '2015', '2016'].map((year) => {
            return(
              <label key={year}>
                <input type='radio' value={year}
                  onChange={() => this.updateYear(year)}
                  checked={this.isChecked(year)}/>{year}
              </label>
            )
          })}

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
