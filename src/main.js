var persons=
    [
        {
            name:'Vasya',
            age:25,
            isHasPassport:true,
            gender:'male',
            payment: 1100,
            healthy: 80
        },
        {
            name: 'Petya',
            age:30,
            isHasPassport:true,
            gender:'male',
            payment: 1000,
            healthy: 80
        },
        {
            name: 'Zina',
            age:15,
            isHasPassport:true,
            gender:'male',
            payment: 1000,
            healthy: 80
        }
    ];
window.onload = function()
{
    MigrationService(persons);
    element();
};
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
function PersonPromise(person,condition,messageComplete, messageFailed, timeout){
    return new Promise((resolve, reject) => {
        setTimeout(() =>{
            if(condition){
                console.log(messageComplete);
                console.log(person);
                resolve(person);
            }
            else{
                console.log(messageFailed);
                console.log(person);
                reject(person);
            }
        }, timeout);
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
function element(){
    for (let i = 0; i < persons.length; i++)
    {
        let el = document.getElementsByClassName("Name");
        el[0].innerHTML += `<div>${persons[i].name}<div>`;
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
            let el=	document.getElementsByClassName("sub_police1");
            el[0].innerHTML+='<div>+<div>';
        },
        ()=>{
            FailElement("sub_police1");
        },
        1000);
}

function PoliceDepartment2(person){
    return PersonPromiseNew(person,
        (person.gender=='male'&&person.age>22)||(person.gender=='female'&&person.age>18),
        ()=>{
            let el=	document.getElementsByClassName("sub_police2");
            el[0].innerHTML+='<div>+<div>';
        },
        ()=>{
            FailElement("sub_police2");
        },
        1000);
}

function PoliceDepartment3(person){
    return PersonPromiseNew(person,
        person.isHasPassport,
        ()=>{
            let el=	document.getElementsByClassName("sub_police3");
            el[0].innerHTML+='<div>+<div>';
        },
        ()=>{
            FailElement("sub_police3");
        },
        1000);
}

function MedicalDepartment1(person){
    return PersonPromiseNew(person,
        person.healthy>75,
        ()=>{
        let el=	document.getElementsByClassName("sub_medicine1");
        el[0].innerHTML+='<div>+<div>';
    },
    ()=>{
        FailElement("sub_medicine1");
    },
        1000);
}

function MedicalDepartment2(person){
    return PersonPromiseNew(person,
        (person.gender=='male'&&person.healthy>75)||(person.gender=='female'&&person.healthy>85),
        ()=>{
            let el=	document.getElementsByClassName("sub_medicine2");
            el[0].innerHTML+='<div>+<div>';
        },
        ()=>{
            FailElement("sub_medicine2");
        },
        1000);
}

function BankDepartment1(person){
    return PersonPromise(person,
        (person.gender=='male'&&person.payment>1000)||(person.gender=='female'&&person.payment>950),
        ()=>{
            let el=	document.getElementsByClassName("sub_bank");
            el[0].innerHTML+='<div>+<div>';
        },
        ()=>{
            FailElement("sub_bank");
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
        console.log("VISA GIVEN TO PERSON:");
        console.log(person);
        resolve(person);
    });
}