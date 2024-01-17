import React, { Component } from 'react';
import Modal from 'react-modal';

export class ListNotes extends Component {
    state = {
        notes: [],
        showModal: false,
        editedNoteId: null,
        editedNoteTitle: '',
        editedNoteText: '',
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

    editNote = (noteId, noteTitle, noteText, noteDate) => {
        this.setState({
            showModal: true,
            editedNoteId: noteId,
            editedNoteTitle: noteTitle,
            editedNoteText: noteText,
            editedNoteDate: noteDate,
        });
    };

    closeModal = () => {
        // Zamknij modal i zresetuj stan edycji
        this.setState({
            showModal: false,
            editedNoteId: null,
            editedNoteTitle: '',
            editedNoteText: '',
        });
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

    saveAndCloseModal = () => {
        const { editedNoteId, editedNoteTitle, editedNoteText, editedNoteDate } = this.state;

        // Wyślij żądanie PUT do backendu
        fetch(`http://localhost:5209/api/Notes/${editedNoteId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                noteTitle: editedNoteTitle,
                noteText: editedNoteText,
                noteDate: editedNoteDate,

            })
        })
            .then(response => response.json())
            .then(data => {
                console.log('Note updated successfully:', data);
                this.fetchNotes(); // Zaktualizuj listę notatek po zaktualizowaniu
                this.closeModal(); // Zamknij modal po edycji
            })
            .catch(error => console.error('Error updating note:', error));
    };

    render() {
        const { showModal, editedNoteTitle, editedNoteText } = this.state;

        return (
            <div>
                {/* Wyświetl notatki tutaj */}
                {this.state.notes.map((note) => (
                    <div key={note.noteId}>
                        <p>{note.noteTitle}</p>
                        <p>{note.noteDate}</p>
                        <button onClick={() => this.editNote(note.noteId, note.noteTitle, note.noteText, note.noteDate)}>Edit</button>
                        <button onClick={() => this.deleteNote(note.noteId)}>Delete</button>
                    </div>
                ))}
                <Modal
                    isOpen={showModal}
                    onRequestClose={this.closeModal}
                    contentLabel="Edit Note Modal"
                >
                    <h2>Edit Note</h2>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={editedNoteTitle}
                        onChange={(e) => this.setState({ editedNoteTitle: e.target.value })}
                    />
                    <label>Text:</label>
                    <input
                        type="text"
                        value={editedNoteText}
                        onChange={(e) => this.setState({ editedNoteText: e.target.value })}
                    />
                    <button onClick={this.saveAndCloseModal}>Save</button>
                    <button onClick={this.closeModal}>Cancel</button>
                </Modal>
            </div>
        );
    }
}
