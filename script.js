'use strict';
let data, petId, petName, petAge, petType, petWeight, petLength, petColor, petBreed, petVaccinated, petDewormed, petSterilized;
const tableBodyEl = document.getElementById('tbody')
const btnCalculate = document.getElementById('calculate-btn')
const init = () => {
    petId = Number(document.getElementById('input-id').value)
    petName = document.getElementById('input-name').value
    petAge = Number(document.getElementById('input-age').value)
    petType = document.getElementById('input-type').value
    petWeight = Number(document.getElementById('input-weight').value)
    petLength = Number(document.getElementById('input-length').value)
    petColor = document.getElementById('input-color-1').value
    petBreed = document.getElementById('input-breed').value
    petVaccinated = document.getElementById('input-vaccinated').checked;
    petDewormed = document.getElementById('input-dewormed').checked;
    petSterilized = document.getElementById('input-sterilized').checked;
    data = {
        id: petId,
        name: petName,
        age: petAge,
        type: petType,
        weight: petWeight,
        petLength: petLength,
        color: petColor,
        breed: petBreed,
        vaccinated: petVaccinated,
        dewormed: petDewormed,
        sterilized: petSterilized,
        date: new Date()
    }
}
// initialized data
const petArr = [
    {
        id: 1,
        name: "micky",
        age: 3,
        type: "Cat",
        weight: 8,
        petLength: 90,
        color: "#234521",
        breed: "Tabby",
        bmi:"?",
        vaccinated: true,
        dewormed: true,
        sterilized: true,
        date: new Date()
    },
    {
        id: 2,
        name: "Donal",
        age: 3,
        type: "Dog",
        weight: 12,
        petLength: 90,
        color: "red",
        bmi:"?",
        breed: "Tabby",
        vaccinated: true,
        dewormed: false,
        sterilized: true,
        date: new Date()
    }
]

//validate 
let validate = true
const validateData = function () {
    let petIdArr = [];
    for (let i = 0; i < petArr.length; i++) {
        petIdArr.push(petArr[i].id)
    }
    if (petIdArr.indexOf(petId) !== -1) {
        validate = false
        alert("ID must unique!")
    } else if (petId == "" || petAge == "" || petWeight == "" || petLength == "") {
        validate = false
        alert("Please input value")
    } else if (petAge < 1 || petAge > 15) {
        validate = false
        alert("Age must be between 1 and 15!")
    } else if (petWeight < 1 || petWeight > 15) {
        validate = false
        alert("Weight must be between 1 and 15!")
    } else if (petLength < 1 || petLength > 100) {
        validate = false
        alert("Length must be between 1 and 100!")
    } else if (petType === "") {
        validate = false
        alert("Please select Type!")
    } else if (petBreed === "Select Breed") {
        validate = false
        alert("Please select Breed!");
    } else {
        validate = true
    }

}
//delete input data
const clearInput = function () {
    document.getElementById('input-id').value = ""
    document.getElementById('input-name').value = ""
    document.getElementById('input-age').value = ""
    document.getElementById('input-type').value = "Select Type"
    document.getElementById('input-weight').value = ""
    document.getElementById('input-length').value = ""
    document.getElementById('input-color-1').value = ""
    document.getElementById('input-breed').value = "Select Breed"
    document.getElementById('input-vaccinated').checked = false
    document.getElementById('input-dewormed').checked = false
    document.getElementById('input-sterilized').checked = false
}

// delete pet
const deletePet = (id) => {
    console.log(id)
    // Confirm before deletePet
    if (confirm('Are you sure?')) {
        for (let i = 0; i < petArr.length; i++) {
            if (id == petArr[i].id) {
                petArr.splice(i, 1)
                renderTableData(petArr)
            }
        }
    }
}

// check pet healthy 
const btnHealthy = document.getElementById('healthy-btn')
let healthyCheck = true
let healthyPetArr = []
const showHealthyPet = () => {
    if (healthyCheck) {
        btnHealthy.innerText = "Show All Pet"
        // btnHealthy.setAttribute('click',"showAllPet")
        for (let i = 0; i < petArr.length; i++) {
            if (petArr[i].vaccinated && petArr[i].dewormed && petArr[i].sterilized && !healthyPetArr.includes(petArr[i])) {
                healthyPetArr.push(petArr[i])
            }
        }
        renderTableData(healthyPetArr)
        healthyCheck = false
    } else {
        renderTableData(petArr)
        btnHealthy.innerText = "Show Healthy Pet"
        healthyCheck = true
    }

}
btnHealthy.addEventListener('click', showHealthyPet)

//BMI calculate
const calculate = function(){
    let BMI;
    for(let i=0; i< petArr.length; i++) {
        if(petArr[i].type ==="Cat"){
            BMI = ((petArr[i].weight * 886) / petArr[i].petLength ** 2).toFixed(2)
            console.log(BMI);
            petArr[i].bmi = BMI
        } else{
            BMI = ((petArr[i].weight * 703) / petArr[i].petLength ** 2).toFixed(2)
            petArr[i].bmi = BMI
        }
    }
    renderTableData(petArr)
}
btnCalculate.addEventListener('click', calculate)

//table render function
const renderTableData = function (petArr) {
    tableBodyEl.innerText = ''
    for (let i = 0; i < petArr.length; i++) {
        const row = document.createElement('tr')
        row.innerHTML = `
        <th scope="row">${petArr[i].id} </th>
        <td> ${petArr[i].name} </td>
        <td>  ${petArr[i].age}  </td>
        <td>  ${petArr[i].type}  </td>
        <td>  ${petArr[i].weight}  kg</td>
        <td>  ${petArr[i].petLength} cm</td>
        <td>  ${petArr[i].breed}</td>
        <td>
        <i class="bi bi-square-fill" style="color: ${petArr[i].color}"></i>
        </td>
        <td> <i class="bi ${petArr[i].vaccinated === true ? "bi-check-circle-fill": "bi-x-circle-fill"}"></i></td>
        <td> <i class="bi ${petArr[i].dewormed === true ? "bi-check-circle-fill": "bi-x-circle-fill"}"></i></td>
        <td> <i class="bi ${petArr[i].sterilized === true ? "bi-check-circle-fill": "bi-x-circle-fill"}"></i></td>

        <td>  ${petArr[i].bmi}</td>
        <td> ${petArr[i].date.getDate()}/${petArr[i].date.getMonth()+1 }/${petArr[i].date.getFullYear()}</td>
         <td><button class="btn btn-danger" onclick="deletePet(${petArr[i].id})">Delete</button>
        </td>`;
        tableBodyEl.appendChild(row)
    }
}
renderTableData(petArr)

// submit the data
const handleSubmit = function () {
    init()
    validateData()
    if (validate) {
        petArr.push(data)
        renderTableData(petArr)
        clearInput()
        console.log(petArr);
    }
}
document.getElementById('submit-btn').addEventListener('click', handleSubmit)
