import * as CANNON from 'cannon-es';
import * as THREE from 'three';
import { world, groundMaterial } from './physics.js';

export class Arena {
    constructor(scene) {
        this.scene = scene;
        this.width = 60;
        this.length = 100;
        this.height = 30;
        this.goalSize = 15;

        // Visuals
        const arenaGeo = new THREE.BoxGeometry(this.width, this.height, this.length);
        const arenaMat = new THREE.MeshStandardMaterial({
            color: 0x001122,
            side: THREE.BackSide,
            transparent: true,
            opacity: 0.3,
            roughness: 0,
            metalness: 1
        });
        const arenaMesh = new THREE.Mesh(arenaGeo, arenaMat);
        arenaMesh.position.y = this.height / 2;
        scene.add(arenaMesh);

        // Neon Edges
        const edges = new THREE.EdgesGeometry(arenaGeo);
        const lineMat = new THREE.LineBasicMaterial({ color: 0x00e5ff });
        const line = new THREE.LineSegments(edges, lineMat);
        line.position.copy(arenaMesh.position);
        scene.add(line);

        // Physics Walls
        this.createWall(this.width, this.height, new CANNON.Vec3(0, this.height/2, this.length/2));  // Back
        this.createWall(this.width, this.height, new CANNON.Vec3(0, this.height/2, -this.length/2)); // Front
        this.createWall(this.length, this.height, new CANNON.Vec3(this.width/2, this.height/2, 0), Math.PI/2); // Right
        this.createWall(this.length, this.height, new CANNON.Vec3(-this.width/2, this.height/2, 0), Math.PI/2); // Left
        this.createWall(this.width, this.length, new CANNON.Vec3(0, this.height, 0), Math.PI/2, 0); // Ceiling
    }

    createWall(w, h, pos, angle = 0, angleX = 0) {
        const shape = new CANNON.Box(new CANNON.Vec3(w/2, h/2, 0.5));
        const body = new CANNON.Body({ mass: 0, material: groundMaterial });
        body.addShape(shape);
        body.position.copy(pos);
        if (angle !== 0) body.quaternion.setFromEuler(0, angle, 0);
        if (angleX !== 0) body.quaternion.setFromEuler(angleX, 0, 0);
        world.addBody(body);
    }

    checkGoal(ballPosition) {
        // Simple goal detection
        if (Math.abs(ballPosition.x) < this.goalSize / 2) {
            if (ballPosition.z > this.length / 2) return 'blue';
            if (ballPosition.z < -this.length / 2) return 'orange';
        }
        return null;
    }
}
