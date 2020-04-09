import React from 'react';
import './App.css';
import Sidebar from './Components/Sidebar';
import Content from './Components/Content';
import Header from './Components/Header';
import ErrorComp from './Components/Error';
import api from './api';
import DataContext from './DataContext';

class App extends React.Component {
  state = {
    notes: [],
    folders: [],
    addFolder: false,
    addNote: false,
  }

  handleDeleteNote = noteId => {
    let currentState = { ...this.state };
    let note = currentState.notes.find(n => n.id === noteId);
    let index = currentState.notes.indexOf(note);
    currentState.notes.splice(index, 1);
    this.setState(currentState);
  }

  handleAddNote =() => {
    this.setState({
      addNote: true
    })
  }

  handleAddFolder = () => {
    this.setState({
      addFolder: true
    })
  }

  handleSubmitFolder = () => {
    this.setState({
      addFolder: false
    })
    this.updateFolders()
  }

  handleSubmitNote = () => {
    this.setState({
      addNote: false
    })
    this.updateNotes()
  }

  handleCancelAdd = () => {
    this.setState({
      addFolder: false,
      addNote: false,
    })
  }

  updateFolders() {
    api.getFolders()
    .then(data => {
      this.setState({ folders: data });
    })
    .catch(err => {
      console.error(err);
    })
  }

  updateNotes() {
    api.getNotes()
      .then(data => {
          this.setState({ notes: data });
        })
      .catch(err => {
          console.error(err);
        })
  }

  componentDidMount() {
    this.updateFolders()
    this.updateNotes()
  }

  render() {
    const contextValue = {
      data: this.state,
      addFolderFn: this.handleAddFolder,
      addNoteFn: this.handleAddNote,
      cancelAdd: this.handleCancelAdd,
      submitFolder: this.handleSubmitFolder,
      submitNote: this.handleSubmitNote,
      deleteNote: this.handleDeleteNote
    }

    return (
      <ErrorComp>
        <DataContext.Provider value={contextValue}>
          <div className="app">
            <Header />
            <main>
              <Sidebar />
              <Content />
            </main>
          </div>
        </DataContext.Provider>
      </ErrorComp>
    );
  }

}





export default App;
