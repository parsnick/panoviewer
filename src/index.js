export default class Panoviewer {

    constructor(element, options) {

        this.element = element;
        this.options = Object.assign({
            tileSize: [512, 256],
            worldSize: [8192, 4096]
        }, options);

        this.init();

        //this.createSphereForZoom(0);
        //this.createSphereForZoom(1);
        this.createSphereForZoom(2);
        //this.createSphereForZoom(3);
        //this.createSphereForZoom(4);

        requestAnimationFrame(() => this.render());
    }

    init() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, null, 1, 100);
        this.renderer = new THREE.WebGLRenderer();

        this.element.appendChild(this.renderer.domElement);
        this.resize();

        this.camera.position.z = 1;

        this.controls = new THREE.OrbitControls(this.camera, this.element);
        this.controls.addEventListener('change', () => this.render());
        this.controls.enableZoom = false;

        //this.element.addEventListener('mousewheel', (e) => console.log(e))

        window.addEventListener('resize', () => {
            this.resize();
            this.render()
        });
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }

    createSphereForZoom(level) {
        let tilesRequired = Math.pow(2, level);

        for (let x = 0; x < tilesRequired; ++x) {
            for (let y = 0; y < tilesRequired; ++y) {
                this.createMeshForTile(level, x, y);
            }
        }
    }

    createMeshForTile(zoom, tileX, tileY) {
        let segmentsX = Math.pow(2, zoom);
        let segmentsY = Math.pow(2, zoom);

        let phiLength = (Math.PI * 2) / segmentsX;
        let thetaLength = Math.PI / segmentsY;

        var geometry = new THREE.SphereGeometry(10 * (zoom + 1), 16, 16, phiLength * tileX, phiLength, thetaLength * tileY, thetaLength);
        geometry.scale(-1, 1, 1);
        var material = new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load('tiles/1/'+zoom+'_'+tileX+'_'+tileY+'.jpg')
        });
        var sphere = new THREE.Mesh(geometry, material);

        this.scene.add(sphere);
    }

    resize() {
        this.camera.aspect = this.element.offsetWidth / this.element.offsetHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.element.offsetWidth, this.element.offsetHeight);
    }
}

