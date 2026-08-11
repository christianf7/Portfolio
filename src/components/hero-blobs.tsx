"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const scrollState = { progress: 0 };

export function setScrollProgress(v: number) {
    scrollState.progress = v;
}

const terrainVertex = `
  uniform float uTime;
  uniform float uScroll;

  varying float vElevation;
  varying vec2 vUv;
  varying float vFog;

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
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vUv = uv;

    vec3 pos = position;

    // constant forward flow + scroll boost
    float zTravel = uScroll * 20.0 + uTime * 1.2;
    vec3 noisePos = vec3(pos.x * 0.3, pos.z * 0.3 + zTravel, uTime * 0.15);

    float n1 = snoise(noisePos);
    float n2 = snoise(noisePos * 2.2 + 10.0) * 0.4;
    float n3 = snoise(noisePos * 4.5 + 25.0) * 0.15;

    // pulsing wave that ripples across the terrain
    float pulse = sin(pos.z * 0.4 + uTime * 2.0) * 0.3;
    float pulse2 = sin(pos.x * 0.3 + uTime * 1.5 + 1.0) * 0.2;

    float elevation = (n1 + n2 + n3) * 1.8 + pulse + pulse2;
    pos.y += elevation;

    vElevation = elevation;

    // fog based on distance from camera
    vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
    vFog = smoothstep(2.0, 25.0, -mvPos.z);

    gl_Position = projectionMatrix * mvPos;
  }
`;

const terrainFragment = `
  uniform float uTime;
  uniform float uScroll;

  varying float vElevation;
  varying vec2 vUv;
  varying float vFog;

  void main() {
    float phase = uScroll * 6.28318;

    // base color from elevation
    vec3 low = vec3(0.02, 0.08, 0.20);
    vec3 mid = mix(
      vec3(0.05, 0.35, 0.65),
      vec3(0.30, 0.15, 0.55),
      sin(phase) * 0.5 + 0.5
    );
    vec3 high = mix(
      vec3(0.22, 0.72, 0.95),
      vec3(0.55, 0.35, 0.90),
      sin(phase + 1.5) * 0.5 + 0.5
    );
    vec3 peak = mix(
      vec3(0.50, 0.90, 1.00),
      vec3(0.75, 0.55, 1.00),
      sin(phase + 3.0) * 0.5 + 0.5
    );

    float e = (vElevation + 1.8) / 3.6;
    vec3 color = mix(low, mid, smoothstep(0.0, 0.35, e));
    color = mix(color, high, smoothstep(0.35, 0.65, e));
    color = mix(color, peak, smoothstep(0.65, 1.0, e));

    // grid lines glow
    color += peak * 0.15;

    // fade to black at distance
    color = mix(color, vec3(0.0), vFog);

    // fade edges of the plane
    float edgeFade = smoothstep(0.0, 0.15, vUv.x) * smoothstep(1.0, 0.85, vUv.x);
    color *= edgeFade;

    gl_FragColor = vec4(color, (1.0 - vFog) * edgeFade * 0.9);
  }
`;

const particleVertex = `
  uniform float uTime;
  uniform float uScroll;

  attribute float aRandom;
  attribute float aSpeed;

  varying float vAlpha;
  varying float vColor;

  void main() {
    vec3 pos = position;

    float scroll = uScroll;
    float t = uTime;

    // continuous orbital + upward drift
    float angle = t * aSpeed * 0.6 + aRandom * 6.28;
    pos.x += sin(angle) * (1.0 + aRandom * 1.5);
    pos.y += mod(t * aSpeed * 0.8 + aRandom * 10.0, 10.0) - 5.0;
    pos.z += cos(angle * 0.7) * (0.8 + aRandom) + mod(scroll * 15.0 + aRandom * 20.0, 30.0) - 15.0;

    // pulsing brightness
    float pulse = sin(t * 2.0 + aRandom * 6.28) * 0.3 + 0.7;
    vAlpha = smoothstep(10.0, 2.0, length(pos)) * (0.3 + aRandom * 0.7) * pulse;
    vColor = aRandom;

    vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = (30.0 * aRandom + 10.0) / -mvPos.z;
    gl_Position = projectionMatrix * mvPos;
  }
`;

const particleFragment = `
  uniform float uScroll;

  varying float vAlpha;
  varying float vColor;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;

    float strength = 1.0 - smoothstep(0.0, 0.5, d);
    strength = pow(strength, 2.0);

    float phase = uScroll * 6.28318;
    vec3 colA = mix(vec3(0.3, 0.7, 1.0), vec3(0.6, 0.4, 1.0), sin(phase) * 0.5 + 0.5);
    vec3 colB = mix(vec3(0.5, 0.9, 1.0), vec3(0.8, 0.5, 1.0), sin(phase + 2.0) * 0.5 + 0.5);
    vec3 color = mix(colA, colB, vColor);

    gl_FragColor = vec4(color, strength * vAlpha);
  }
`;

function Terrain() {
    const meshRef = useRef<THREE.Mesh>(null);

    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uScroll: { value: 0 },
        }),
        []
    );

    useFrame((state) => {
        uniforms.uTime.value = state.clock.elapsedTime;
        uniforms.uScroll.value = scrollState.progress;

        if (meshRef.current) {
            meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.05) * 0.03;
        }
    });

    return (
        <mesh ref={meshRef} rotation={[-Math.PI * 0.35, 0, 0]} position={[0, -1.5, -5]}>
            <planeGeometry args={[30, 30, 200, 200]} />
            <shaderMaterial
                vertexShader={terrainVertex}
                fragmentShader={terrainFragment}
                uniforms={uniforms}
                transparent
                wireframe
                depthWrite={false}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
}

function Particles() {
    const pointsRef = useRef<THREE.Points>(null);
    const count = 500;

    const { positions, randoms, speeds } = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const randoms = new Float32Array(count);
        const speeds = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 16;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5;
            randoms[i] = Math.random();
            speeds[i] = 0.2 + Math.random() * 0.8;
        }

        return { positions, randoms, speeds };
    }, []);

    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uScroll: { value: 0 },
        }),
        []
    );

    useFrame((state) => {
        uniforms.uTime.value = state.clock.elapsedTime;
        uniforms.uScroll.value = scrollState.progress;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
                <bufferAttribute attach="attributes-aRandom" args={[randoms, 1]} />
                <bufferAttribute attach="attributes-aSpeed" args={[speeds, 1]} />
            </bufferGeometry>
            <shaderMaterial
                vertexShader={particleVertex}
                fragmentShader={particleFragment}
                uniforms={uniforms}
                transparent
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

function CameraRig() {
    const { camera } = useThree();

    useFrame((state) => {
        const t = state.clock.elapsedTime;
        const sp = scrollState.progress;

        camera.position.x = Math.sin(t * 0.15) * 1.2 + Math.cos(t * 0.08) * 0.5;
        camera.position.y = 2.5 - sp * 1.5 + Math.sin(t * 0.2) * 0.4 + Math.cos(t * 0.12) * 0.2;
        camera.position.z = 5 - sp * 3 + Math.sin(t * 0.07) * 0.3;

        const lookX = Math.sin(t * 0.06) * 0.8;
        const lookY = -0.5 - sp * 0.5 + Math.cos(t * 0.09) * 0.3;
        camera.lookAt(lookX, lookY, -8 - sp * 5);
    });

    return null;
}

function Scene() {
    return (
        <>
            <CameraRig />
            <Terrain />
            <Particles />
            <fog attach="fog" args={["#000000", 5, 25]} />
        </>
    );
}

export default function HeroBlobs() {
    return (
        <Canvas
            camera={{ position: [0, 2.5, 5], fov: 60 }}
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
            <Scene />
        </Canvas>
    );
}
