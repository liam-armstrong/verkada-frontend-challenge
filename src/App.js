import { useState } from 'react';
import './App.css'
import FloorplanCanvas from './components/FloorplanCanvas'
import Logo from './components/Logo'
import { CheckObjectForProperties, modalStyles, defaultInput } from './helpers/Helpers';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function App() {
  const [input, setInput] = useState(JSON.stringify(defaultInput))
  const [modalIsOpen, setIsOpen] = useState(false)
  const [inputError, setInputError] = useState("")
  const [floorplan, setFloorplan] = useState(false)

  const handleSubmit = () => {
    let userInputObject;
    try {
      userInputObject = JSON.parse(input)
      CheckObjectForProperties(userInputObject, ['floorplan', 'height', 'width'])
    } catch (error) {
      console.error(error)
      setInputError("JSON was invalid. Check console for more details")
      return
    }
    setFloorplan(userInputObject)
    setIsOpen(false)
  }

  return (
    <div className="App" style={{'height': '100vh'}}>
      <Logo />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => {setIsOpen(false)}}
        style={modalStyles}
      >
        <div className='modal-content'>
          <h4>Enter your own input or use the provided default</h4>
          { inputError ? <p style={{'color': 'red'}}>{inputError}</p> : <p>Valid JSON required</p>}
          <textarea 
            style={{'width': '80%', 'height': '40vh'}}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
          ></textarea>
          <button 
            className="button-primary" 
            style={{'marginTop': '20px'}}
            onClick={() => {handleSubmit()}}>Submit</button>
        </div>
      </Modal>
      { floorplan && 
        <FloorplanCanvas input={floorplan} setInput={setFloorplan}/>}
      { !floorplan && 
        <div className='centered' style={{'width': '100%', 'height': '100%'}}>
          <button className="button-primary" onClick={() => {setIsOpen(true)}}>Enter an input to begin</button>
        </div>
      }
    </div>
  );
}

export default App;
