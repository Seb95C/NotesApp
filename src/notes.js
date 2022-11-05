const chalk = require('chalk')
const fs = require('fs')
const { title } = require('process')

const addNote = (title, body) => {
    const notes = loadNotes()
    //const duplicateNotes = notes.filter((note) => note.title === title)
    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green('New note added!'))
    } else {
        console.log (chalk.red('Note title taken'))
    }
}

const removeNote = (title) => {
    const notes = loadNotes() 
    const notesKept = notes.filter((note) => note.title !== title)
    if (notes.length != notesKept.length) {
        saveNotes(notesKept)
        console.log(chalk.yellow('Note "' + title + '" removed successfully!'))
    } else {
        console.log(chalk.red('No notes with title: "' + title + '"'))
    }
}

const listNotes = () => {
    console.log(chalk.green('Here are all the titles:'))
    loadNotes().forEach((note) => {
        console.log(note.title)
    })
}

const readNote = (title) => {
    const note = loadNotes().find((note) => note.title === title)
    if (note) {
    console.log(chalk.inverse(note.title))
    console.log(note.body)
    } else {
        console.log(chalk.bgRed('Error: Note not found!'))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('src/notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('src/notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }

    
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}