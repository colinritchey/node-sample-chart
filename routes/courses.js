var express = require('express');
var router = express.Router();
let data = require('../public/sample_data.json')

/* GET users listing. */
router.get('/:year', function(req, res, next) {
  res.send(reduceByCourse(data, req.params.year));
});

function reduceByCourse(data, year = 'all'){
  // console.log(year)
  return data.reduce((memo, el) => {
    if(year !== 'all' && el.year !== parseInt(year)){
      return memo
    }

    if(typeof memo[el.course] !== 'undefined'){
      memo[el.course] += el.students
    }else{
      memo[el.course] = el.students
    }

    return memo;
  }, {});
}

module.exports = router;
