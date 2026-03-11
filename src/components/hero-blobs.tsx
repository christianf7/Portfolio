"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
  uniform float uTime;
  uniform float uSpeed;
  uniform float uNoiseStrength;
  uniform float uFrequency;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying float vDisplacement;

  //	Simplex 3D Noise by Ian McEwan, Ashima Arts
  vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

  float snoise(vec3 v){
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;

    i = mod(i, 289.0);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    float n_ = 1.0/7.0;
    vec3  ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);

    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;

    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vPosition = position;
    
    float noise = snoise(position * uFrequency + uTime * uSpeed);
    float noise2 = snoise(position * uFrequency * 1.5 + uTime * uSpeed * 0.7 + 100.0);
    float combinedNoise = noise * 0.7 + noise2 * 0.3;
    
    vDisplacement = combinedNoise;
    
    vec3 newPosition = position + normal * combinedNoise * uNoiseStrength;
    
    vNormal = normalMatrix * normal;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`;

const fragmentShader = `
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  uniform float uTime;
  uniform float uOpacity;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying float vDisplacement;

  void main() {
    vec3 light = normalize(vec3(0.5, 0.8, 1.0));
    float diffuse = dot(vNormal, light) * 0.5 + 0.5;
    
    float mixFactor1 = vDisplacement * 0.5 + 0.5;
    float mixFactor2 = sin(vPosition.y * 2.0 + uTime * 0.3) * 0.5 + 0.5;
    
    vec3 color = mix(uColor1, uColor2, mixFactor1);
    color = mix(color, uColor3, mixFactor2 * 0.4);
    
    float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.5);
    color += fresnel * 0.3;
    
    color *= diffuse * 0.6 + 0.4;
    
    gl_FragColor = vec4(color, uOpacity);
  }
`;

interface BlobProps {
    position: [number, number, number];
    scale: number;
    color1: string;
    color2: string;
    color3: string;
    speed: number;
    noiseStrength: number;
    frequency: number;
    opacity: number;
    floatAmplitude: [number, number, number];
    floatSpeed: [number, number, number];
    rotationSpeed: [number, number];
    detail: number;
}

function Blob({
    position,
    scale,
    color1,
    color2,
    color3,
    speed,
    noiseStrength,
    frequency,
    opacity,
    floatAmplitude,
    floatSpeed,
    rotationSpeed,
    detail,
}: BlobProps) {
    const meshRef = useRef<THREE.Mesh>(null);

    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uSpeed: { value: speed },
            uNoiseStrength: { value: noiseStrength },
            uFrequency: { value: frequency },
            uColor1: { value: new THREE.Color(color1) },
            uColor2: { value: new THREE.Color(color2) },
            uColor3: { value: new THREE.Color(color3) },
            uOpacity: { value: opacity },
        }),
        []
    );

    useFrame((state) => {
        if (!meshRef.current) return;
        const t = state.clock.elapsedTime;

        uniforms.uTime.value = t;

        meshRef.current.position.x =
            position[0] + Math.sin(t * floatSpeed[0]) * floatAmplitude[0];
        meshRef.current.position.y =
            position[1] + Math.cos(t * floatSpeed[1]) * floatAmplitude[1];
        meshRef.current.position.z =
            position[2] + Math.sin(t * floatSpeed[2] + 1.0) * floatAmplitude[2];

        meshRef.current.rotation.x = t * rotationSpeed[0];
        meshRef.current.rotation.y = t * rotationSpeed[1];
    });

    return (
        <mesh ref={meshRef} scale={scale}>
            <icosahedronGeometry args={[1, detail]} />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                transparent
                depthWrite={false}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
}

function BlobScene() {
    return (
        <>
            <Blob
                position={[-2.5, 1.0, -2]}
                scale={2.2}
                color1="#0ea5e9"
                color2="#38bdf8"
                color3="#7dd3fc"
                speed={0.18}
                noiseStrength={0.45}
                frequency={1.2}
                opacity={0.35}
                floatAmplitude={[0.6, 0.4, 0.3]}
                floatSpeed={[0.15, 0.2, 0.12]}
                rotationSpeed={[0.03, 0.04]}
                detail={64}
            />

            <Blob
                position={[2.8, -0.5, -3]}
                scale={2.8}
                color1="#0284c7"
                color2="#0369a1"
                color3="#38bdf8"
                speed={0.12}
                noiseStrength={0.55}
                frequency={0.9}
                opacity={0.25}
                floatAmplitude={[0.5, 0.6, 0.4]}
                floatSpeed={[0.12, 0.08, 0.15]}
                rotationSpeed={[0.02, -0.03]}
                detail={64}
            />

            <Blob
                position={[0.5, 2.5, -4]}
                scale={1.8}
                color1="#7dd3fc"
                color2="#bae6fd"
                color3="#e0f2fe"
                speed={0.22}
                noiseStrength={0.35}
                frequency={1.5}
                opacity={0.2}
                floatAmplitude={[0.8, 0.3, 0.5]}
                floatSpeed={[0.1, 0.18, 0.08]}
                rotationSpeed={[-0.02, 0.05]}
                detail={48}
            />

            <Blob
                position={[-1.0, -2.0, -2.5]}
                scale={1.5}
                color1="#38bdf8"
                color2="#0ea5e9"
                color3="#0284c7"
                speed={0.25}
                noiseStrength={0.4}
                frequency={1.8}
                opacity={0.18}
                floatAmplitude={[0.4, 0.7, 0.3]}
                floatSpeed={[0.2, 0.1, 0.14]}
                rotationSpeed={[0.04, -0.02]}
                detail={48}
            />

            <Blob
                position={[3.5, 2.0, -5]}
                scale={1.2}
                color1="#e0f2fe"
                color2="#bae6fd"
                color3="#7dd3fc"
                speed={0.15}
                noiseStrength={0.5}
                frequency={1.3}
                opacity={0.15}
                floatAmplitude={[0.6, 0.5, 0.6]}
                floatSpeed={[0.08, 0.15, 0.1]}
                rotationSpeed={[-0.03, 0.02]}
                detail={32}
            />
        </>
    );
}

export default function HeroBlobs() {
    return (
        <Canvas
            camera={{ position: [0, 0, 6], fov: 50 }}
            dpr={[1, 1.5]}
            gl={{
                antialias: true,
                alpha: true,
                powerPreference: "high-performance",
            }}
            style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
            }}
        >
            <BlobScene />
        </Canvas>
    );
}
