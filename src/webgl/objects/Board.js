import * as THREE from "three";
import { Group } from "three";
import AudioController from "../../utils/AudioController";

export default class Board {
    constructor() {
        this.group = new Group();
        this.geometry = new THREE.BoxGeometry(1, 1, 1);

        // change material
        this.purpleMaterial = new THREE.MeshBasicMaterial({
            color: 0xD199F9
        })
        this.greenMaterial = new THREE.MeshBasicMaterial({
            color: 0xB7FCBF
        })

        for (let x = 0; x < 16; x++) {
            for (let y = 0; y < 16; y++) {
                let mesh; 

                if (x % 2 === y % 2){
                    mesh = new THREE.Mesh(this.geometry, this.purpleMaterial);
                } else {
                    mesh = new THREE.Mesh(this.geometry, this.greenMaterial);
                }

                mesh.position.set(x, y, 0);

                this.group.add(mesh);
                this.group.position.set(-8,-8,0)
            }
            
        }
    }

    tick(deltaTime) {
        for (let i = 0; i < this.group.children.length; i++) {
            this.group.children[i].scale.z = AudioController.fdata[i] / 10;
        }
    }
}