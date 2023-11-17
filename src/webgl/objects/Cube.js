import * as THREE from "three";
import AudioController from "../../utils/AudioController";

export default class Cube {
    constructor() {
        this.geometry = new THREE.BoxGeometry(1, 1, 1);
        // to change the colors
        this.material = new THREE.MeshNormalMaterial({});
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.group = new THREE.Group();
        this.group.add(this.mesh);
    }

    tick(deltaTime) {
        this.mesh.rotation.x += 0.001 * deltaTime;
        this.mesh.rotation.z += 0.001 * deltaTime;

        const remapped = AudioController.fdata[0] / 255;

        // set attend les 3 axes
        this.mesh.scale.set(1 + remapped, 1 + remapped, 1 + remapped);
    }
}