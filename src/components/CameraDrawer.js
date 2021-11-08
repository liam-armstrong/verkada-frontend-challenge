import { useState } from 'react'
import Modal from 'react-modal';
import '../App.css'
import CameraListItem from './CameraListItem'
import { modalStyles } from '../helpers/Helpers'

export default function CameraDrawer({cameras, setCameras, setInput, export3D, exportJSON}) {
    const [modalIsOpen, setIsOpen] = useState(false)

    const onHover = (id, hovering) => {
        if(hovering) {
            setCameras({...cameras, [id]: {...cameras[id], 'highlight': true }})
        } else {
            setCameras({...cameras, [id]: {...cameras[id], 'highlight': false }})
        }
    }

    const onClick = id => {
        const {[id]: x, ...cams} = cameras
        setCameras(cams)
    }

    const hasCameras = Object.keys(cameras).length !== 0;
    const cameraList = hasCameras ? Object.entries(cameras).map(c => 
        <CameraListItem key={c[0]} camera={c} handleHover={onHover} handleClick={onClick}></CameraListItem>) : <br/>

    return (
        <div className='camera-drawer'>
            <h4>Cameras</h4>
            { !hasCameras && <div className='instructions'>
                    <p>No Cameras Placed Yet!<br/></p>
                    <p>Cameras can be placed by clicking on an inner wall of the floorplan<br/></p>
                    <p>Click and drag to move the floorplan around<br/></p>
                    <p>Click on a placed camera on the map or in the list to delete it<br/></p>
                </div>
            }
            { hasCameras && <div className='camera-list'>
                {cameraList}
            </div> }
            <div style={{'display': 'flex', 'marginTop': 'auto'}}>
                <button className='button-primary' onClick={() => {setInput(false)}}>Clear Input</button>
                <span style={{'flexGrow': '2'}}></span>
                <button className='button-primary' onClick={() => {exportJSON(); setIsOpen(true)}}>Export</button>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => {setIsOpen(false)}}
                style={modalStyles}
            >
                <h4>Success! Exported wall and camera locations to console.</h4>
            </Modal>
        </div>
    )
}