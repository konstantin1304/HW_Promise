let persons = [];
const quantityPerson = document.getElementById("quantity");
const inpName = document.getElementById("name");
const inpAge = document.getElementById("age");
const inpGender = document.getElementById("gender");
const inpPassport = document.getElementById("passport");
const inpPayment = document.getElementById("payment");
const inpHealth = document.getElementById("health");

function SinglePerson () {
    this.name = inpName.value;
    this.age = +inpAge.value;
    this.isHasPassport = inpPassport.value;
    this.gender = inpGender.value;
    this.payment = +inpPayment.value;
    this.health = +inpHealth.value;
}

function createGroup () {
    let quantity = +quantityPerson.value;
    const firstPerson = new SinglePerson();
    let count = 1;
    persons.push(new Person(count,firstPerson.name, firstPerson.age, firstPerson.isHasPassport, firstPerson.gender, firstPerson.payment, firstPerson.health));

    if(quantity>1){
        for (let i = 1; i < quantity; i++) {
            persons.push(new Person(++count));
        }
    }
    MigrationService(persons);
    element("myTable");
}

function Person(countPerson, name, age, isHasPassport, health, payment, gender){
    this.id = countPerson+"_"+this.myUniqueID();
    this.name = name || faker.name.firstName(gender)+" "+faker.name.lastName(gender);
    this.age =  age || this.randomValue(16,25);
    this.isHasPassport = isHasPassport || !(this.randomValue(0,1));
    this.health = health || this.randomValue(65,95);
    this.payment = payment || this.randomValue(90,110)*10;
    this.gender = gender || !(this.randomValue(0,1)) ? "male" : "female";
}

Person.prototype.randomValue = function(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
};
Person.prototype.myUniqueID = function(){
    const date = new Date();
    let timestamp = "" + date.getTime();
    timestamp = timestamp.slice(-6);
    return timestamp;
};


