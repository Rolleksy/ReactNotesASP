import React, { Component } from 'react';

export class ListNotes extends Component {
    state = {
        notes: [],
    };

    componentDidMount() {
        this.fetchNotes();
    }

    fetchNotes = () => {
        fetch('http://localhost:5209/api/Notes') // Dostosuj adres URL do rzeczywistego adresu, na którym działa Twoje API
            .then(response => response.json())
            .then(data => this.setState({ notes: data }))
            .catch(error => console.error('Error fetching notes:', error));
    };

    editNote = (noteId) => {
        // Tutaj możesz umieścić kod do otwierania formularza edycji notatki
        console.log(`Edit note with ID: ${noteId}`);
    };

    deleteNote = (noteId) => {
        // Tutaj możesz umieścić kod do usuwania notatki
        fetch(`http://localhost:5209/api/notes/${noteId}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(data => {
                console.log('Note deleted successfully:', data);
                this.fetchNotes(); // Zaktualizuj listę notatek po usunięciu
            })
            .catch(error => console.error('Error deleting note:', error));
    };

    render() {
        return (
            <div>
                {/* Wyświetl notatki tutaj */}
                {this.state.notes.map((note) => (
                    <div key={note.noteId}>
                        <p>{note.noteTitle}</p>
                        <p>{note.noteText}</p>
                        <button onClick={() => this.editNote(note.noteId)}>Edit</button>
                        <button onClick={() => this.deleteNote(note.noteId)}>Delete</button>
                    </div>
                ))}
            </div>
        );
    }
}
