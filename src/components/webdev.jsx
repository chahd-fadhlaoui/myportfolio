import React from 'react';
import { useGLTF } from '@react-three/drei';

const WebDev = (props) => {
  // If you have a 3D model file
  // const { scene } = useGLTF('/path-to-your-model.glb');
  // return <primitive object={scene} {...props} />;
  
  // Or create a simple 3D object as placeholder
  return (
    <mesh {...props}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  );
};

export default WebDev;