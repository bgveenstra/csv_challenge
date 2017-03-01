var fs = require('fs');

var file = 'sample/pipe.txt';

function readlinesSync(filename){
  return fs.readFileSync(filename, {encoding: 'utf-8'}).split('\n');
}

function Student(options){
  this.first = options.firstName;
  this.last = options.lastName;
  this.gender = options.gender;
  this.dob = options.birthDate;
  this.middleInitial = options.middleInitial;
  this.favortieColor = options.color;
}

function createStudentFromString(infoString, delimiter, keyIndices){
  var infoParts = infoString.split(delimiter);
  return new Student({
    firstName: infoParts[keyIndices.firstName],
    lastName: infoParts[keyIndices.lastName],
    gender: infoParts[keyIndices.gender],
    birthDate: infoParts[keyIndices.birthDate],
    middleInitial: infoParts[keyIndices.middleInitial],
    color: infoParts[keyIndices.color]
  });
}

function createStudentsFromFile(filename, delimiter, keyIndices){
  var lines = readlinesSync(filename);
  var students = [];
  lines.forEach(function(line){
    var student = createStudentFromString(line, delimiter, keyIndices);
    students.push(student);
  });
  console.log(students);
}

var pipeConfig = {
  keyIndices: {
    'lastName': 0,
    'firstName': 1,
    'middleInitial': 2,
    'gender': 3,
    'color': 4,
    'birthDate': 5
  },
  delimiter: ' | '
};

createStudentsFromFile(file, pipeConfig.delimiter, pipeConfig.keyIndices);

// Smith | Steve | D | M | Red | 3-3-1985
