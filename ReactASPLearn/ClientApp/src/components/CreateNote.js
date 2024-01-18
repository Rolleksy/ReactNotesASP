import React, { Component } from 'react';
import './CreateNote.module.css';
export class CreateNote extends Component {
    constructor(props) {
        super(props);

        this.state = {
            noteTitle: '',
            noteText: ''
        };
    }

    handleTitleChange = (event) => {
        this.setState({ noteTitle: event.target.value });
    }

    handleTextChange = (event) => {
        this.setState({ noteText: event.target.value });
    }

    AddNote = () => {
        const { noteTitle, noteText } = this.state;

        // Utwórz obiekt z danymi notatki
        const noteData = {
            noteTitle: noteTitle,
            noteText: noteText,
            noteDate: new Date().toISOString()
        };

        // Wyślij żądanie POST do backendu
        fetch('http://localhost:5209/api/Notes', { // Uwaga: Dostosuj adres API do rzeczywistego adresu, na którym działa Twoje API
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(noteData)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Note added successfully:', data);
                // Tutaj możesz zaktualizować stan lub podjąć inne działania po dodaniu notatki
            })
            .catch(error => {
                console.error('Error adding note:', error);
            });
    }


    render() {
        return (
            <>
                <div className="note-wrapper" >
                    <div className="title-container">
                        <label>TITLE YOUR NOTE:</label>
                        <input type="text" className="noteTitle" onChange={this.handleTitleChange} />
                    </div>
                    <div className="note-editor-container">
                        <label>TYPE YOUR THOUGHTS:</label>
                        <input type="text" className="noteText" onChange={this.handleTextChange} />
                        <button className="addnote-btn" onClick={this.AddNote}>ADD NOTE</button>
                    </div>
                </div>
                
            </>
        );
    }
}
