import '../App.css';
import Box from './Box'
import Camera from './Camera'
import OrbitCameraControls from './OrbitCameraControls';
import CameraDrawer from './CameraDrawer';
import { wallLocationtoCoords, cameraConfig } from '../helpers/Helpers'
import React, { useState, useEffect} from 'react'
import { Canvas, extend } from '@react-three/fiber'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Object3D } from 'three'
import { v4 as uuidv4 } from 'uuid';

extend({ OrbitControls })
extend({ Object3D })

function FloorplanCanvas({input, setInput}) {
  const [walls, setWalls] = useState([])
  const [cameras, setCameras] = useState({})
  const [hoverCoords, setHoverCoords] = useState(false)
  const [hideCursor, setHideCursor] = useState(false)

  const addCamera = point => {
    const camId = uuidv4()
    setCameras({...cameras, [camId]: {'highlight': false, ...point}})
  }

  const deleteCamera = id => {
    const { [id]: x, ...cams } = cameras
    setCameras(cams)
  }

  const printJSON = () => {
    console.log(JSON.stringify({walls: walls, cameras: cameras}))
  }

  const wallHover = ({x, y, z}, normal) => {
    setHoverCoords([x, y, z, normal])
  }
    
  useEffect(() => {
    setWalls(
      input.floorplan.map((walls, y) => walls
        .map((wall, x) => wallLocationtoCoords(wall, x, y, input.height, input.width))
        .filter(Boolean))
      .reduce((pre, curr) => pre.concat(curr))
    )
  }, [input.floorplan, input.height, input.width])

  const wallBoxes = walls.map(([xVal, yVal]) => 
    <Box 
      position={[xVal, 0, yVal]} 
      addCam={addCamera} 
      hoverCam={wallHover} 
      hideCursor={setHideCursor}
      height={input.height}
      width={input.width}
      key={String(xVal) + " " + String(yVal)}
    ></Box>)

  const placedCameras = Object.entries(cameras).map(([k, {x, y, z, highlight, normal}]) => 
    <Camera 
      position={[x, y, z, normal]} 
      placed={true} 
      setCursorHoverCoords={setHoverCoords} 
      key={k}
      id={k}
      deleteCamera={deleteCamera}
      highlight={highlight}>
    </Camera>
  )

  return (
    <div className={"App" + (hideCursor ? " nocursor" : "")}>
      <div className='canvas-parent'>
        <Canvas camera={cameraConfig(input)} raytracer={{ filter: items => [items[0]]}}>
          <OrbitCameraControls />
          <ambientLight intensity={0.15}/>
          <pointLight intensity={0.5} position={[input.width*1.5, input.height*1.5, Math.max(input.height, input.width)*1.5]} />
          <pointLight intensity={0.5} position={[input.width*1.5, input.height*1.5, -Math.max(input.height, input.width)*1.5]} />
          <Box 
            position={[-0.5,-0.5,-0.5]} 
            color={'grey'} 
            size={[input.height - 0.25, 0.1, input.width - 0.25]} 
            addCam={() => {}}
            hoverCam={() => {}}
            hideCursor={() => {}}>
          </Box> 
          { wallBoxes }
          { hoverCoords && <Camera position={hoverCoords} setCursorHoverCoords={() => {}}></Camera> }
          { placedCameras }
        </Canvas>
      </div>
      <CameraDrawer 
        cameras={cameras} 
        setCameras={setCameras} 
        setInput={setInput}
        exportJSON={printJSON}
      />
    </div>
  );
}

export default FloorplanCanvas;
