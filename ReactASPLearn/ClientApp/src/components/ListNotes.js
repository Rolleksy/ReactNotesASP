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
            <div className="listNotes-container">
                <div className="list-title">LIST OF YOUR NOTES</div>
                {/* Wyświetl notatki tutaj */}
                {this.state.notes.map((note) => (
                    <div className="listnote-display" key={note.noteId}>
                        <p className="listnote-title">{note.noteTitle}</p>
                        <p className="listnote-date">{note.noteDate}</p>
                        <div className="listnote-btn-wrapper">
                            <button className="listnote-btn" onClick={() => this.editNote(note.noteId, note.noteTitle, note.noteText, note.noteDate)}>Edit</button>
                            <button className="listnote-btn" onClick={() => this.deleteNote(note.noteId)}>Delete</button>
                        </div>
                       
                    </div>
                ))}
                <Modal
                    isOpen={showModal}
                    onRequestClose={this.closeModal}
                    contentLabel="Edit Note Modal"
                >

                    <div className="note-wrapper" >
                        <div className="title-container">
                            <label>EDIT YOUR TITLE:</label>
                            <input type="text" className="noteTitle" value={editedNoteTitle}
                                onChange={(e) => this.setState({ editedNoteTitle: e.target.value })}
                            />
                        </div>
                        <div className="note-editor-container">
                            <label>EDIT YOUR THOUGHTS:</label>
                            <input type="text" className="noteText" type="text"
                                value={editedNoteText}
                                onChange={(e) => this.setState({ editedNoteText: e.target.value })}
                            />
                            <div className="modal-btn-wrapper">
                                <button className="addnote-btn" onClick={this.saveAndCloseModal}>Save</button>
                                <button className="addnote-btn" onClick={this.closeModal}>Cancel</button>
                            </div>
                           
                        </div>
                    </div>
                   
                </Modal>
            </div>
        );
    }
}
