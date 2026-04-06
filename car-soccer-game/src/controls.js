export const keys = {
    forward: false,
    backward: false,
    left: false,
    right: false,
    jump: false,
    boost: false,
    airRoll: false,
};

window.addEventListener('keydown', (e) => {
    switch(e.code) {
        case 'KeyW': case 'ArrowUp': keys.forward = true; break;
        case 'KeyS': case 'ArrowDown': keys.backward = true; break;
        case 'KeyA': case 'ArrowLeft': keys.left = true; break;
        case 'KeyD': case 'ArrowRight': keys.right = true; break;
        case 'Space': keys.jump = true; break;
        case 'ShiftLeft': keys.boost = true; break;
        case 'KeyQ': keys.airRoll = true; break;
    }
});

window.addEventListener('keyup', (e) => {
    switch(e.code) {
        case 'KeyW': case 'ArrowUp': keys.forward = false; break;
        case 'KeyS': case 'ArrowDown': keys.backward = false; break;
        case 'KeyA': case 'ArrowLeft': keys.left = false; break;
        case 'KeyD': case 'ArrowRight': keys.right = false; break;
        case 'Space': keys.jump = false; break;
        case 'ShiftLeft': keys.boost = false; break;
        case 'KeyQ': keys.airRoll = false; break;
    }
});
