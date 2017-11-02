var express = require('express');
var router = express.Router();
let data = require('../public/sample_data.json')

/* GET users listing. */
router.get('/:courseId/year/:year', function(req, res, next) {
  res.send(reduceByTeacher(data,req.params.year, req.params.courseId));
});

function reduceByTeacher(data, year = 'all', courseId){
  let courses = [
    "English 1A: Freshman Composition",
    "English 1B: Argument & Analysis",
    "English 1C: Applied Composition"
  ]

  let courseName = courses.filter((el) => el.toLowerCase().includes(courseId))[0];

  // console.log(year)
  return data.reduce((memo, el) => {
    if((year !== 'all' && el.year !== parseInt(year)) || courseName !== el.course){
      return memo
    }

    if(typeof memo[el.instructor] !== 'undefined'){
      memo[el.instructor] += el.students
    }else{
      memo[el.instructor] = el.students
    }

    return memo;
  }, {});
}

module.exports = router;
