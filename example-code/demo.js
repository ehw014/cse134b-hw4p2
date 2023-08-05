const collegeCourses = [

    { code: 'ENG101', name: 'English Composition' },
    { code: 'MATH202', name: 'Calculus II' },
    { code: 'HIST110', name: 'World History' },
    { code: 'CS301', name: 'Introduction to Computer Science' },
  ];
  
// Convert the object to a JSON string using JSON.stringify()
const jsonString = JSON.stringify(collegeCourses);

// Set the JSON string in local storage
localStorage.setItem('collegeCourses', jsonString);

// Retrieve the JSON string from local storage
const storedJsonString = localStorage.getItem('collegeCourses');

// Convert the JSON string back to a JavaScript object using JSON.parse()
const storedCollegeCourses = JSON.parse(storedJsonString);

console.log(storedCollegeCourses);