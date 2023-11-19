import * as THREE from "three";
import { gsap } from "gsap";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import Stats from "three/examples/jsm/libs/stats.module.js";
import Cube from "./objects/Cube";
import Line from "./objects/Line";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import pane from "../utils/Pane";
import LogoIut from "./objects/LogoIut";
import Board from "./objects/Board";
import Cover from "./objects/Cover";

class SCENE {
  setup(canvas) {
    this.width = window.innerWidth/0.775;
    this.height = window.innerHeight;
    this.canvas = canvas;

    this.setupScene();
    this.setupCamera();
    this.setupControls();
    this.setupStats();
    this.setupRenderer();
    this.setupPostProcessing();
    this.setupGLTFLoader()
    this.setupTextureLoader();

    this.addObjects();
    this.addEvents();
  }

  setupGLTFLoader(){
    this.gltfLoader = new GLTFLoader();
    this.gltfLoader.load("/logo-iut.glb", (gltf) => {
      console.log(gltf.scene);
    })
  }

  setupTextureLoader(){
    this.textureLoader = new THREE.TextureLoader();
  }

  setupScene() {
    this.scene = new THREE.Scene();
  }

  setupCamera() {
    this.camera = new THREE.PerspectiveCamera(
      28,
      this.width / this.height,
      0.1,
      10000
    );

    this.camera.position.z = 100;
  }

  setupControls() {
    this.controls = new OrbitControls(this.camera, this.canvas);
  }

  setupStats() {
    this.stats = new Stats();
    document.body.appendChild(this.stats.dom);
  }

  setupRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: false,
      powerPreference: "high-performance",
      stencil: false,
      depth: false,
      // alpha: true
    });

    this.renderer.toneMapping = THREE.NoToneMapping;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;

    this.renderer.setClearColor(0x000000);
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  setupPostProcessing() {
    this.BLOOM_PARAMS = {
      strength: 1,
      radius: 0,
      threshold: 0
    }

    this.composer = new EffectComposer(this.renderer);
    this.scenePass = new RenderPass(this.scene, this.camera);
    this.bloomPass = new UnrealBloomPass(new THREE.Vector2(this.width / this.height), this.BLOOM_PARAMS.strength, this.BLOOM_PARAMS.radius, this.BLOOM_PARAMS.threshold);
    this.composer.addPass(this.scenePass);
    this.composer.addPass(this.bloomPass);

    this.postProcessFolder = pane.addFolder({
      title: "Post process",
    });

    this.postProcessFolder.addBinding(this.BLOOM_PARAMS, "strength", {
      min: 0,
      max: 10,
      step: 0.01,
      label: "Intensité"
    }).on('change', (e) => {
      this.bloomPass.strength = e.value;
    });

    this.postProcessFolder.addBinding(this.BLOOM_PARAMS, "radius", {
      min: 0,
      max: 10,
      step: 0.01,
      label: "Radius"
    }).on('change', (e) => {
      this.bloomPass.radius = e.value;
    });

    this.postProcessFolder.addBinding(this.BLOOM_PARAMS, "threshold", {
      min: 0,
      max: 1,
      step: 0.01,
      label: "Seuil"
    }).on('change', (e) => {
      this.bloomPass.threshold = e.value;
    });
  }

  addEvents() {
    gsap.ticker.add(this.tick);

    window.addEventListener('resize', () => this.onResize());
  }

  onResize() {
    // update size
    this.width = window.innerWidth/0.775;
    this.height = window.innerHeight;

    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.width, this.height);
  }

  addObjects() {
    this.cube = new Cube();
    // this.scene.add(this.cube.mesh);

    this.line = new Line();
    this.logoIut = new LogoIut();
    this.board = new Board();
    this.cover = new Cover();
    
    this.selectedObject = this.cube;
    this.scene.add(this.selectedObject.group);
    this.bloomPass.strength = 0.1;
  }

  changeVisualizer(index){
    this.scene.remove(this.selectedObject.group);
    switch (index) {
      case 0:
        this.selectedObject = this.cube;
        this.camera.position.z = 20;
        this.bloomPass.strength = 1;
        break;
      case 1:
        this.selectedObject = this.line;
        this.camera.position.z = 1000;
        this.bloomPass.strength = 1;
        break;
      case 2:
        this.selectedObject = this.logoIut;
        this.camera.position.z = 20;
        this.bloomPass.strength = 1;
        break;
      case 3:
        this.selectedObject = this.board;
        this.camera.position.z = 60;
        this.bloomPass.strength = 0.1;
        break;
      case 4:
        this.selectedObject = this.cover;
        this.camera.position.z = 100;
        this.bloomPass.strength = 0;
        break;
      default:
        break;
    }
    this.controls.update();
    this.scene.add(this.selectedObject.group);
  }

  tick = (time, deltaTime, frame) => {
    this.stats.begin();

    // this.cube.tick();
    this.selectedObject.tick(deltaTime);

    // this.scene.add(this.line.group);

    this.composer.render();
    
    this.stats.end();
  };
}

const Scene = new SCENE();
export default Scene;