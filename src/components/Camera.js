import React, { useRef, useState, useEffect } from 'react'
import { useThree } from '@react-three/fiber'

export default function Camera({position, placed, setCursorHoverCoords, id, deleteCamera, highlight}) {
  const [hover, setHover] = useState(false)
  const [x, y, z, normal] = position

  const { scene } = useThree();
  const ref = useRef();
  const light = useRef();
  const obj = useRef();
  useEffect(() => {
    scene.add(light.current.target);
    scene.add(obj.current);
    light.current.target = obj.current;
  }, [scene, light]);

  const handleHover = (evt, hovering) => {
    if(placed) {
        evt.stopPropagation()
        setHover(hovering)
            if(hovering) {
                setCursorHoverCoords(false)
            }
        }
    }

    const handleClick = (evt) => {
      if(placed && hover) {
          evt.stopPropagation()
          deleteCamera(id)
      }
    } 

  return (
      <spotLight 
        ref={light} 
        position={[x, y, z]} 
        color='red'
        distance={2.5}
      >
        <object3D ref={obj} position={[x + normal.x, -0.25, z + normal.z]} />
        <mesh
          position={[0, 0, 0]}
          ref={ref}
          onPointerOver={(e) => {handleHover(e, true)}}
          onPointerLeave={(e) => {handleHover(e, false)}}
          onClick={(e) => {handleClick(e)}}
        >
      <sphereGeometry args={[0.1, 32, 16]} />
      <meshStandardMaterial color={(hover || highlight) ? 'red' : placed ? 'black' : 'blue'} />
      </mesh>
      </spotLight>
    
  )
}