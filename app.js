// Person storage

const getPersonStorage = () => JSON.parse(localStorage.getItem('personStorage')) ?? []
const setLocalStorage = (personStorage) => localStorage.setItem("personStorage", JSON.stringify(personStorage))

const createPerson = (person) => {
    const personStorage = getPersonStorage()
    personStorage.push (person)
    setLocalStorage(personStorage)
}

