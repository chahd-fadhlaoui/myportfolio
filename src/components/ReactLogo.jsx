import { Float, useGLTF } from "@react-three/drei";

const url =
  "https://res.cloudinary.com/dq9nv66tj/image/upload/v1779620466/react_adjorg.glb";

const ReactLogo = (props) => {
  const { nodes, materials } = useGLTF(url);

  if (!nodes || !materials) return null;

  return (
    <Float floatIntensity={1}>
      <group position={[8, 8, 0]} scale={0.3} {...props} dispose={null}>
        <mesh
          geometry={nodes?.["React-Logo_Material002_0"]?.geometry}
          material={materials?.["Material.002"]}
          position={[0, 0.079, 0.181]}
          rotation={[0, 0, -Math.PI / 2]}
          scale={[0.392, 0.392, 0.527]}
        />
      </group>

      useGLTF.preload(url)
    </Float>
  );
};

export default ReactLogo;