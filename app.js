// Person storage

const getPersonStorage = () => JSON.parse(localStorage.getItem('personStorage')) ?? []
const setLocalStorage = (personStorage) => localStorage.setItem("personStorage", JSON.stringify(personStorage))

const createPerson = (person) => {
    const personStorage = getPersonStorage()
    personStorage.push (person)
    setLocalStorage(personStorage)
}

const deletePerson = (index) => {
    const personStorage = getPersonStorage()
    personStorage.splice(index, 1)
    setLocalStorage(personStorage)
}

const editperson = (index) => {
    const person = getPersonStorage()[index]
    person.index = index
    fillFields(person)
}


// Form interactivity

const fillFields = (person) => {
    document.getElementById('name').value = person.name
    document.getElementById('age').value = person.age
    document.getElementById('name').dataset.index = person.index
}

const clearFields = () => {
    const fields = document.querySelectorAll('.formField')
    fields.forEach(field => field.value = "")
    document.getElementById('name').dataset.index = 'new'
}

// Table interactivity

const createRow = (person, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
        <td>${person.name}</td>
        <td>${person.age}</td>
        <td>
            <button type="button" class="button red" id="delete-${index}" >Excluir</button>
            <button type="button" class="button yellow" id="edit-${index}" >Editar</button>
        </td>
    `
    document.querySelector('#tablePerson>tbody').appendChild(newRow)
}

const updateTable = (personStorage) => {
    clearTable()
    if (personStorage != null) personStorage.forEach(createRow)
}
const clearTable = () => {
    const rows = document.querySelectorAll('#tablePerson>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

// Event Handlers

const addPersonEvent = () => {
    if (isValidFields()) {
        const person = {
            name: document.getElementById('name').value,
            age: document.getElementById('age').value,
        }
        const index = document.getElementById('name').dataset.index
        createPerson(person)}
        updateTable(getPersonStorage())
        clearFields()
}

const isValidFields = () => {
    return document.getElementById('addPersonForm').reportValidity()
}

const editDeletePersonEvent = (event) => {
    if (event.target.type == 'button') {
        const [action, index] = event.target.id.split('-')
        const person = getPersonStorage()[index]
        if (action === 'delete') {
            const response = confirm(`Confirma exclusão de ${person.name}`)
            if (response) {
                deletePerson(index)
                updateTable(getPersonStorage())
            }
        }
        if (action === 'edit'){
            editperson(index)
            deletePerson(index)
            updateTable(getPersonStorage())
        }
    }
}

// Event Listeners

document.getElementById('addPerson')
    .addEventListener('click', addPersonEvent)

document.querySelector('#tablePerson>tbody')
.addEventListener('click', editDeletePersonEvent)


// Run on start to show people in local storage from previous session

updateTable(getPersonStorage())