import * as THREE from "https://threejs.org/build/three.module.js";

export default class MainScene {
    constructor({ parent }) {
        this.parent = parent || document.body;

        this.scene = new THREE.Scene(); // scene preperation
        this.camera = new THREE.PerspectiveCamera(20, this.SCREEN_ASPECT, 1, 1000); // camera

        this.meshGeometry = new THREE.BoxGeometry(1, 1, 1);
        this.meshMaterial = new THREE.MeshStandardMaterial({
            color: "grey",
            flatShading: true
        });
        console.log(this.meshGeometry);
        this.mesh = new THREE.Mesh(this.meshGeometry, this.meshMaterial);

        this.defaultPosition = new THREE.Vector3(0, 0, 0);
        this.defaultRotation = new THREE.Vector3(0, 0, 0);
        this.defaultScale = new THREE.Vector3(1, 1, 1);

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(this.SCREEN_WIDTH, this.SCREEN_HEIGHT)

        this.init();
        this.size();
        this.lights();

        this.subvide(this.meshGeometry)
    }
    // screen information
    get SCREEN_WIDTH() { return window.innerWidth }
    get SCREEN_HEIGHT() { return window.innerHeight }
    get SCREEN_ASPECT() { return this.SCREEN_WIDTH / this.SCREEN_HEIGHT }

    init() {
        //this.mesh.position.copy(this.defaultPosition);
        //this.mesh.rotation.copy(this.defaultRotation);
        //this.mesh.scale.copy(this.defaultScale);

        this.scene.add(this.camera, this.mesh);
        this.camera.position.z = 10;

        (this.parent || document.body).append(this.renderer.domElement);
    }
    lights() {
        this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        this.ambient = new THREE.AmbientLight("white");

        this.scene.add(this.ambient, this.directionalLight);
    }
    size() {
        this.camera.aspect = this.SCREEN_ASPECT;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(this.SCREEN_WIDTH, this.SCREEN_HEIGHT);
    }
    explode() { }
    subvide(geometry) {
        const faceIndices = ['a', 'b', 'c'];
        for (let i = 0; i < geometry.faces.length; i++) {
            const face = geometry.faces[i];
            for (let j = 0; j < 3; j++) {
                const vertexIndex = face[faceIndices[j]];
                const vertex = geometry.vertices[vertexIndex];
                switch (j) {
                    case 0:
                        vertex.x += 0.001;
                        vertex.y += 0.001;
                        vertex.z += 0.001;
                        break;
                    case 1:
                        vertex.x -= 0.001;
                        vertex.y -= 0.001;
                        vertex.z -= 0.001;
                        break;
                    case 2:
                        vertex.x = 0.001;
                        vertex.y = 0.001;
                        vertex.z = 0.001;
                        break;
                }
            }
        }
    }
    animate(delta) {
        this.meshGeometry.verticesNeedUpdate = true;
        this.meshGeometry.dynamic = true;
        this.mesh.matrixAutoUpdate = false;
        this.mesh.updateMatrix();

        this.subvide(this.mesh.geometry)
    }
    update(delta) {
        this.animate(delta);
        this.size();
        this.renderer.render(this.scene, this.camera)
        requestAnimationFrame(() => this.update(performance.now()));
    }
}

