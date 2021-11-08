import React, { useRef } from 'react'
import { useThree, useFrame } from '@react-three/fiber'

export default function OrbitCameraControls() {
    const {
      camera,
      gl: { domElement },
    } = useThree()
  
    const controls = useRef()
    useFrame(() => controls.current.update())
    return (
      <orbitControls
        ref={controls}
        args={[camera, domElement]}
        enableZoom={true} 
      />
    );
  };
  
  