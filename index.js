const add = document.getElementsByClassName("add")[0];
const submit = document.getElementsByTagName("button")[1];
const display = document.getElementsByClassName("debug")[0];
const form = document.getElementsByTagName("form")[0];

let person = {};
let family = [];

//Display Family Location on HTML
if (family.length == 0) {
    display.style.display = "block";
    display.innerHTML = 'Please Add a Family Member!';
}

//Add Family Member
add.addEventListener("click", function (e) {
    e.preventDefault();
    let age = document.getElementsByName("age")[0].value;
    let rel = document.getElementsByName("rel")[0].value;
    let smoker = document.getElementsByName("smoker")[0].checked;

    //Age Validation
    if (!age) {
        alert("Please enter their age.");
        form.reset();
        return;
    } else if (age <= 0) {
        alert("Their age needs to be at least 1 year old.");
    }

    //Relationship Validation
    if (!rel) {
        alert("Please enter your relationship.");
        form.reset();
        return;
    }

    //Assigning Values
    person = {
        age: age,
        rel: rel,
        smoker: smoker,
    };

    //Assign Person to Family
    family.push(person);

    //Reset Form
    form.reset();

    //Call Function
    displayFamily();
});

//Display Family
function displayFamily() {
    let output = [];

    for (i = 0; i < family.length; i++) {
        let input = `
        <div>
            <h4>Member ${i + 1}</h4>
            <p>Age: ${family[i].age}</p>
            <p>Relationship: ${family[i].rel}</p>
            <p>Smoker? ${family[i].smoker}</p>
            <button onclick='deleteElement(${i})'>Delete</button>
        </div>
        `;
        output.push(input);
    }
    display.innerHTML = output;
}

// Delete Family Member
function deleteElement(i) {
    let index = i;
    family.splice(index, 1);

    //Redisplay Family
    let x;
    let newOutput = [];
    for (x = 0; x < family.length; x++) {
        let input = `
        <div>
            <h4>Member ${x + 1}</h4>
            <p>Age: ${family[x].age}</p>
            <p>Relationship: ${family[x].rel}</p>
            <p>Do they Smoke? ${family[x].smoker}</p>
            <button onclick='deleteElement(${x})'>Delete</button>
        </div>
        `;
        newOutput.push(input);
    }
    if (family.length == 0) {
        display.style.display = "block";
        display.innerHTML = 'Please Add a Family Member!';
    } else {
        display.innerHTML = newOutput;
    }
}

//Submit Family to Mock Server
submit.addEventListener('click', function(e) {
    e.preventDefault();
    let xml = new XMLHttpRequest();
    let url = 'enterServerURLHere';
    let totalFamily = JSON.stringify(family);

    xml.onreadystatechange = function() {
        xml.open('POST', url, true);

        if(this.readyState == 4 && this.status == 200) {
            xml.send(totalFamily);
        } 
    }

    //Sense there is no server and this is mock test
    if (totalFamily == '[]') {
        alert('Your Family is empty. Please create some members.');
    } else {
        console.log('Sense there is no Sever here is what would have been sent', totalFamily);
        alert('Your Family was sent to our Mock Server! (check the console)');
    }
});
