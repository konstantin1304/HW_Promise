

function acceptMark(person){
    let row = document.getElementById(`${person.id}`);
    var td1 = document.createElement("TD");
    td1.setAttribute("style", "background: green; color: white");
    row.appendChild(td1);
}
function declineMark(person){
    let row = document.getElementById(`${person.id}`);
    var td1 = document.createElement("TD");
    td1.appendChild(document.createTextNode(`-`));
    row.appendChild(td1);
    row.setAttribute("style", "background: red; color: white");
}


function MigrationService(persons){
    let i=0;
    let j;

    while(i<persons.length){
        j=i+1;
        while(j<persons.length){
            if(persons[i].name==persons[j].name){
                console.log("Migration error Duplicate person:");
                console.log(persons[j]);
                persons=persons.splice(j,1);
            }
            else j++;
        }
        if(i>=persons.length) break;
        ProcessPerson(persons[i]);
        i++;
    }
}

function ProcessPerson(person){
    return PoliceDepartment(person).then(MedicalDepartment).then(BankDepartment).then(GiveVisa)
        .catch(function (person) {
            console.log('No visa given to person:');
            console.log(person);
        });
}
function PersonPromiseNew(person,condition,actionComplete, actionFailed, timeout){
    return new Promise((resolve, reject) => {
        setTimeout(() =>{
            if(condition){
                actionComplete();
                resolve(person);
            }
            else{
                actionFailed();
                reject(person);
            }
        }, timeout);
    });
}


function element(id){
    for(let i = 0; i < persons.length; i++) {
        var tbody = document.getElementById(id).getElementsByTagName("TBODY")[0];
        var row = document.createElement("TR");
        var td1 = document.createElement("TD");
        row.setAttribute("id",`${persons[i].id}`);
        td1.appendChild(document.createTextNode(`${persons[i].name}`));
        row.appendChild(td1);
        tbody.appendChild(row);
    }
}

function FailElement(className){
    let arr=["sub_police1","sub_police2","sub_police3",
        "sub_medicine1","sub_medicine2",
        "sub_bank1",
        "give_visa"
    ];
    let start=0;
    while(arr[start]!=className&& start<arr.length)
        start++;
    for(let i=start; i<arr.length; i++){
        let el=	document.getElementsByClassName(arr[i]);
        el[0].innerHTML+='<div>-<div>';
    }
}

function PoliceDepartment1(person){
    return PersonPromiseNew(person,
        person.age>18,
        ()=>{
            acceptMark(person);
        },
        ()=>{
            declineMark(person);
        },
        1000);
}

function PoliceDepartment2(person){
    return PersonPromiseNew(person,
        (person.gender=='male'&&person.age>22)||(person.gender=='female'&&person.age>18),
        ()=>{
            acceptMark(person);
        },
        ()=>{
            declineMark(person);
        },
        1000);
}

function PoliceDepartment3(person){
    return PersonPromiseNew(person,
        person.isHasPassport,
        ()=>{
            acceptMark(person);

        },
        ()=>{
            declineMark(person);
        },
        1000);
}

function MedicalDepartment1(person){
    return PersonPromiseNew(person,
        person.health>75,
        ()=>{
            acceptMark(person);
    },
    ()=>{
        declineMark(person);
    },
        1000);
}

function MedicalDepartment2(person){
    return PersonPromiseNew(person,
        (person.gender=='male'&&person.health>75)||(person.gender=='female'&&person.health>85),
        ()=>{
            acceptMark(person);
        },
        ()=>{
            declineMark(person);
        },
        1000);
}

function BankDepartment1(person){
    return PersonPromiseNew(person,
        (person.gender=='male'&&person.payment>1000)||(person.gender=='female'&&person.payment>950),
        ()=>{
            acceptMark(person);
        },
        ()=>{
            declineMark(person);
        },
        1000);
}

function PoliceDepartment(person){

    return PoliceDepartment1(person).then(PoliceDepartment2).then(PoliceDepartment3);
}

function MedicalDepartment(person){
    return MedicalDepartment1(person).then(MedicalDepartment2);
}

function BankDepartment(person){
    return BankDepartment1(person);
}

function GiveVisa(person){
    return new Promise((resolve, reject) => {
        acceptMark(person);
        console.log("VISA GIVEN TO PERSON:");
        console.log(person);
        resolve(person);
    });
}

/*var persons=
    [
        {
            id : "asdfaasds",
            name:'Vasya',
            age:25,
            isHasPassport:true,
            gender:'male',
            payment: 1100,
            healthy: 80
        },
        {
            id : "asdfasfd",
            name: 'Petya',
            age:30,
            isHasPassport:true,
            gender:'male',
            payment: 1000,
            healthy: 80
        },
        {
            id : "asdfasasd",
            name: 'Zina',
            age:15,
            isHasPassport:true,
            gender:'male',
            payment: 1000,
            healthy: 80
        }
    ];
*/