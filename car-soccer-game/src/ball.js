import * as CANNON from 'cannon-es';
import * as THREE from 'three';
import { world, ballMaterial } from './physics.js';

export class Ball {
    constructor(scene) {
        this.radius = 1.5;
        
        // Physics
        const shape = new CANNON.Sphere(this.radius);
        this.body = new CANNON.Body({
            mass: 2,
            material: ballMaterial,
            linearDamping: 0.1,
            angularDamping: 0.1
        });
        this.body.addShape(shape);
        this.body.position.set(0, 5, -10);
        world.addBody(this.body);

        // Visuals
        const geo = new THREE.IcosahedronGeometry(this.radius, 2);
        const mat = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            emissive: 0x444444,
            wireframe: false,
            roughness: 0.2,
            metalness: 0.5
        });
        this.mesh = new THREE.Mesh(geo, mat);
        this.mesh.castShadow = true;
        scene.add(this.mesh);

        // Neon structure on the ball
        const wireGeo = new THREE.IcosahedronGeometry(this.radius + 0.05, 1);
        const wireMat = new THREE.MeshBasicMaterial({ color: 0x00e5ff, wireframe: true });
        const wireMesh = new THREE.Mesh(wireGeo, wireMat);
        this.mesh.add(wireMesh);
    }

    update() {
        this.mesh.position.copy(this.body.position);
        this.mesh.quaternion.copy(this.body.quaternion);
    }

    reset() {
        this.body.position.set(0, 5, -10);
        this.body.velocity.set(0, 0, 0);
        this.body.angularVelocity.set(0, 0, 0);
    }
}
