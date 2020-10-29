const add = document.getElementsByClassName('add')[0];
const submit = document.getElementsByTagName('button')[1];
const display = document.getElementsByClassName('debug')[0];
const form = document.getElementsByTagName('form')[0];

let person = {};
let family = [];

add.addEventListener('click', function(e) {
    e.preventDefault();
    let age = document.getElementsByName('age')[0].value;
    let rel = document.getElementsByName('rel')[0].value;
    let smoker = document.getElementsByName('smoker')[0].checked;

    //Age Validation
    if(!age) {
        alert('Please enter their age.');
    } else if(age <= 0) {
        alert('Their age needs to be at least 1 year old.');
    } 

    //Relationship Validation
    if(!rel) {
        alert('Please enter your relationship.');
    } 

    //Assigning Values
    person = {
        'id' : Math.floor(Math.random()*100),
        'age' : age,
        'rel' : rel,
        'smoker' : smoker
    }

    //Assign Person to Family
    family.push(person);

    //Reset Form
    form.reset();

    display.style.display = 'block';

    displayFamily();
});

//Display Family
function displayFamily() {
    let i;
    let output = []

    for(i=0; i < family.length; i++) {
        console.log(family);
        let input = `
        <div>
            <h4>Member ${i+1}</h4>
            <p>Age: ${family[i].age}</p>
            <p>Relationship: ${family[i].rel}</p>
            <p>Do they Smoke? ${family[i].smoker}</p>
            <button id='delete' 
        </div>
        `
        output.push(input);
    }
    display.innerHTML = output;
}

// submit.addEventListener('click', function(e) {
//     e.preventDefault();
//     let output = JSON.stringify(family);
//     display.innerHTML = family;
//     console.log(family);
// })





