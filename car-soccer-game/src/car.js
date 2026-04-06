import * as CANNON from 'cannon-es';
import * as THREE from 'three';
import { world, carMaterial, wheelMaterial } from './physics.js';

export class Car {
    constructor(scene) {
        this.scene = scene;
        
        // Car Body Physics
        const chassisShape = new CANNON.Box(new CANNON.Vec3(1, 0.5, 2));
        this.chassisBody = new CANNON.Body({
            mass: 150,
            material: carMaterial,
            linearDamping: 0.1,
            angularDamping: 0.5
        });
        this.chassisBody.addShape(chassisShape);
        this.chassisBody.position.set(0, 2, 0);
        
        this.boost = 100;
        this.isGrounded = false;
        this.jumpCount = 0;
        this.maxJumps = 2;
        
        // Raycast Vehicle Implementation
        this.vehicle = new CANNON.RaycastVehicle({
            chassisBody: this.chassisBody,
            indexForwardAxis: 2,
            indexRightAxis: 0,
            indexUpAxis: 1
        });

        // Wheel Options
        const options = {
            radius: 0.5,
            directionLocal: new CANNON.Vec3(0, -1, 0),
            suspensionStiffness: 30,
            suspensionRestLength: 0.3,
            frictionSlip: 5,
            dampingRelaxation: 2.3,
            dampingCompression: 4.4,
            maxSuspensionForce: 100000,
            rollInfluence: 0.01,
            axleLocal: new CANNON.Vec3(-1, 0, 0),
            chassisConnectionPointLocal: new CANNON.Vec3(1, 1, 0),
            maxSuspensionTravel: 0.3,
            customSlidingRotationalSpeed: -30,
            useCustomSlidingRotationalSpeed: true
        };

        // Add 4 wheels
        const wheelPositions = [
            new CANNON.Vec3(-1, 0, 1.5), // Front Left
            new CANNON.Vec3(1, 0, 1.5),  // Front Right
            new CANNON.Vec3(-1, 0, -1.5), // Back Left
            new CANNON.Vec3(1, 0, -1.5)   // Back Right
        ];

        wheelPositions.forEach(pos => {
            options.chassisConnectionPointLocal.copy(pos);
            this.vehicle.addWheel(options);
        });

        this.vehicle.addToWorld(world);

        // Visuals (Three.js)
        const chassisGeo = new THREE.BoxGeometry(2, 1, 4);
        const chassisMat = new THREE.MeshStandardMaterial({ 
            color: 0x00e5ff, 
            emissive: 0x003344,
            roughness: 0.2,
            metalness: 0.8
        });
        this.mesh = new THREE.Mesh(chassisGeo, chassisMat);
        this.mesh.castShadow = true;
        scene.add(this.mesh);

        this.wheelVisuals = [];
        this.vehicle.wheelInfos.forEach(() => {
            const wheelGeo = new THREE.CylinderGeometry(0.5, 0.5, 0.4, 20);
            wheelGeo.rotateZ(Math.PI / 2);
            const wheelMat = new THREE.MeshStandardMaterial({ color: 0x111111 });
            const wheelMesh = new THREE.Mesh(wheelGeo, wheelMat);
            wheelMesh.castShadow = true;
            scene.add(wheelMesh);
            this.wheelVisuals.push(wheelMesh);
        });
    }

    update(dt, keys) {
        this.mesh.position.copy(this.chassisBody.position);
        this.mesh.quaternion.copy(this.chassisBody.quaternion);

        // Ground check
        this.isGrounded = false;
        for (let i = 0; i < this.vehicle.wheelInfos.length; i++) {
            this.vehicle.updateWheelTransform(i);
            const t = this.vehicle.wheelInfos[i].worldTransform;
            this.wheelVisuals[i].position.copy(t.position);
            this.wheelVisuals[i].quaternion.copy(t.quaternion);
            
            if (this.vehicle.wheelInfos[i].raycastResult.isInContact) {
                this.isGrounded = true;
            }
        }

        if (this.isGrounded) {
            this.jumpCount = 0;
        }

        // Aerial Controls
        if (!this.isGrounded) {
            this.handleAerialControls(dt, keys);
        }

        // Boost Logic
        if (keys.boost && this.boost > 0) {
            this.applyBoost(dt);
        }
    }

    handleAerialControls(dt, keys) {
        const torque = 200;
        const rollTorque = 150;
        
        const localForward = new CANNON.Vec3(0, 0, 1);
        const localRight = new CANNON.Vec3(1, 0, 0);
        const localUp = new CANNON.Vec3(0, 1, 0);
        
        const worldForward = this.chassisBody.quaternion.vmult(localForward);
        const worldRight = this.chassisBody.quaternion.vmult(localRight);
        const worldUp = this.chassisBody.quaternion.vmult(localUp);

        // Pitch (W/S)
        if (keys.forward) {
            this.chassisBody.angularVelocity.vadd(worldRight.scale(-torque * dt), this.chassisBody.angularVelocity);
        }
        if (keys.backward) {
            this.chassisBody.angularVelocity.vadd(worldRight.scale(torque * dt), this.chassisBody.angularVelocity);
        }

        // Yaw (A/D)
        if (!keys.airRoll) {
            if (keys.left) {
                this.chassisBody.angularVelocity.vadd(worldUp.scale(torque * dt), this.chassisBody.angularVelocity);
            }
            if (keys.right) {
                this.chassisBody.angularVelocity.vadd(worldUp.scale(-torque * dt), this.chassisBody.angularVelocity);
            }
        } else {
            // Roll (A/D while holding Air Roll)
            if (keys.left) {
                this.chassisBody.angularVelocity.vadd(worldForward.scale(-rollTorque * dt), this.chassisBody.angularVelocity);
            }
            if (keys.right) {
                this.chassisBody.angularVelocity.vadd(worldForward.scale(rollTorque * dt), this.chassisBody.angularVelocity);
            }
        }
    }

    applyBoost(dt) {
        const boostForce = 3000;
        const localForward = new CANNON.Vec3(0, 0, -1);
        const worldForward = this.chassisBody.quaternion.vmult(localForward);
        
        this.chassisBody.applyForce(worldForward.scale(boostForce), this.chassisBody.position);
        this.boost -= 20 * dt;
        if (this.boost < 0) this.boost = 0;
    }

    applyEngineForce(force) {
        this.vehicle.applyEngineForce(force, 2); // Rear wheels
        this.vehicle.applyEngineForce(force, 3);
    }

    setSteeringValue(value) {
        this.vehicle.setSteeringValue(value, 0); // Front wheels
        this.vehicle.setSteeringValue(value, 1);
    }

    setBrake(force) {
        this.vehicle.setBrake(force, 0);
        this.vehicle.setBrake(force, 1);
        this.vehicle.setBrake(force, 2);
        this.vehicle.setBrake(force, 3);
    }

    jump() {
        if (this.jumpCount < this.maxJumps) {
            const jumpImpulse = this.jumpCount === 0 ? 8 : 6;
            const up = new CANNON.Vec3(0, 1, 0);
            this.chassisBody.quaternion.vmult(up, up);
            
            // Apply upward impulse
            this.chassisBody.velocity.vadd(up.scale(jumpImpulse), this.chassisBody.velocity);
            this.jumpCount++;
        }
    }
}
