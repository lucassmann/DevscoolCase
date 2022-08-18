// Person storage

const getPersonStorage = () => JSON.parse(localStorage.getItem('personStorage')) ?? []
const setLocalStorage = (personStorage) => localStorage.setItem("personStorage", JSON.stringify(personStorage))

const createPerson = (person) => {
    const personStorage = getPersonStorage()
    personStorage.push (person)
    setLocalStorage(personStorage)
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
}

const isValidFields = () => {
    return document.getElementById('addPersonForm').reportValidity()
}

// Event Listeners

document.getElementById('addPerson')
    .addEventListener('click', addPersonEvent)