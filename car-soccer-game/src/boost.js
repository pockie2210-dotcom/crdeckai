import * as CANNON from 'cannon-es';
import * as THREE from 'three';
import { world } from './physics.js';

export class BoostPickup {
    constructor(scene, position) {
        this.scene = scene;
        this.respawnTime = 10000; // 10 seconds
        this.isAvailable = true;
        this.radius = 1;

        // Visuals
        const geo = new THREE.TorusGeometry(this.radius, 0.1, 16, 100);
        this.material = new THREE.MeshBasicMaterial({ color: 0xffcc00 });
        this.mesh = new THREE.Mesh(geo, this.material);
        this.mesh.position.copy(position);
        this.mesh.position.y = 0.5;
        this.mesh.rotation.x = Math.PI / 2;
        scene.add(this.mesh);

        // Light
        this.light = new THREE.PointLight(0xffcc00, 1, 5);
        this.light.position.copy(this.mesh.position);
        scene.add(this.light);
    }

    update(carPosition, car) {
        if (!this.isAvailable) return;

        this.mesh.rotation.z += 0.05;

        const dist = carPosition.distanceTo(this.mesh.position);
        if (dist < 3) {
            this.collect(car);
        }
    }

    collect(car) {
        this.isAvailable = false;
        this.mesh.visible = false;
        this.light.visible = false;
        car.boost = Math.min(100, car.boost + 25);

        setTimeout(() => {
            this.isAvailable = true;
            this.mesh.visible = true;
            this.light.visible = true;
        }, this.respawnTime);
    }
}
