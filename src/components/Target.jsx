import { useGLTF } from '@react-three/drei';
import React, { useRef } from 'react'

const Target = () => {
    const targetRef = useRef();

  return (
   <mesh {...props} ref={targetRef} rotation={[0, Math.PI / 5, 0]} scale={1.5}>
      <primitive object={scene} />
    </mesh>
  )
}

export default Target
