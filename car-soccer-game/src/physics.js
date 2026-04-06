import * as CANNON from 'cannon-es';

// Physics World Setup
const world = new CANNON.World();
world.gravity.set(0, -9.82, 0); // Standard gravity
world.broadphase = new CANNON.SAPBroadphase(world);
world.defaultContactMaterial.friction = 0.1;

// Default Material
const groundMaterial = new CANNON.Material('groundMaterial');
const wheelMaterial = new CANNON.Material('wheelMaterial');
const carMaterial = new CANNON.Material('carMaterial');
const ballMaterial = new CANNON.Material('ballMaterial');

// Contact Materials
const wheelGroundContactMaterial = new CANNON.ContactMaterial(
    wheelMaterial,
    groundMaterial,
    {
        friction: 0.3,
        restitution: 0,
        contactEquationStiffness: 1000,
    }
);
world.addContactMaterial(wheelGroundContactMaterial);

const ballGroundContactMaterial = new CANNON.ContactMaterial(
    ballMaterial,
    groundMaterial,
    {
        friction: 0.4,
        restitution: 0.8, // Bouncy ball
    }
);
world.addContactMaterial(ballGroundContactMaterial);

// Ground Plane
const groundShape = new CANNON.Plane();
const groundBody = new CANNON.Body({
    mass: 0,
    material: groundMaterial
});
groundBody.addShape(groundShape);
groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
world.addBody(groundBody);

export { world, groundMaterial, wheelMaterial, carMaterial, ballMaterial };
