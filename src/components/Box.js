import React, { useRef, useState } from 'react'
import { useThree } from '@react-three/fiber'
import { pointOnInnerWall } from '../helpers/Helpers'

export default function Box({color, size, addCam, hoverCam, hideCursor, height, width, ...props}) {
  const ref = useRef()
  const [x, y , z] = size ? size : [1, 1, 1]
  const { raycaster } = useThree()
  const [obj, setObj] = useState(false)
  const [intersection, setIntersection] = useState({})

  const handleMouseMove = () => {
    if(obj){
        const point = raycaster.intersectObjects([obj])[0].point
        const normal = raycaster.intersectObjects([obj])[0].face.normal
        if(pointOnInnerWall(point, width, height)){
            hoverCam(point, normal)
            setIntersection({...point, normal: normal})
            hideCursor(true)
        } else {
            hideCursor(false)
        }
    }
  }

  const handleInitialMouseover = event => {
    event.stopPropagation()
    setObj(event.object)
    hideCursor(true)
  }

  const handleClick = event => {
    event.stopPropagation()
    if(pointOnInnerWall(intersection, width, height)){
      console.log(intersection)
      addCam(intersection)
    }
  }

  return (
    <mesh
        {...props}
        ref={ref}
        onClick={handleClick}
        onPointerOver={handleInitialMouseover}
        onPointerMove={handleMouseMove}
        onPointerLeave={() => {setObj(false); hideCursor(false)}}
    >
    <boxGeometry args={[x, y, z]} />
    <meshStandardMaterial color={color} />
    </mesh>
  )
}