import $ from 'jquery';
import * as THREE from 'three'

export default function background() {
    const $window = $(window);
    let cameraY = 0;
    let cameraZ = 0;
    let renderer, scene, camera, circle, skelet, particle;

    function boot() {
        renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
        renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
        renderer.setSize($window.width(), $window.height());
        renderer.autoClear = false;
        renderer.setClearColor(0x000000, 0.0);

        document.getElementById('main-background').appendChild(renderer.domElement);

        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);

        scene.add(camera);

        circle = new THREE.Object3D();
        skelet = new THREE.Object3D();
        particle = new THREE.Object3D();

        scene.add(circle);
        scene.add(skelet);
        scene.add(particle);

        let geometry = new THREE.TetrahedronGeometry(2, 0);
        let geom = new THREE.IcosahedronGeometry(7, 1);
        let geom2 = new THREE.IcosahedronGeometry(15, 1);
        let material = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            shading: THREE.FlatShading
        });

        for (let i = 0; i < 100; i++) {
            let mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
            mesh.position.multiplyScalar(90 + (Math.random() * 700));
            mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
            particle.add(mesh);
        }

        let mat = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            shading: THREE.FlatShading
        });

        let mat2 = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            wireframe: true,
            side: THREE.DoubleSide
        });

        let planet = new THREE.Mesh(geom, mat);
        planet.scale.x = planet.scale.y = planet.scale.z = 16;
        circle.add(planet);

        let planet2 = new THREE.Mesh(geom2, mat2);
        planet2.scale.x = planet2.scale.y = planet2.scale.z = 10;
        skelet.add(planet2);

        let ambientLight = new THREE.AmbientLight(0xFF0065);
        scene.add(ambientLight);

        let lights = [];
        lights[0] = new THREE.DirectionalLight(0xFFB200, 1);
        lights[0].position.set(1, -0.5, 0);
        lights[1] = new THREE.DirectionalLight(0xFFC083, 1);
        lights[1].position.set(0.75, -1, 0.5);

        scene.add(lights[0]);
        scene.add(lights[1]);
    }

    function bind() {
        $window.resize(onWindowSizeChange);
        $window.scroll(onScrollPositionChange);

        onWindowSizeChange();
        onScrollPositionChange();

        animate();
    }

    function onScrollPositionChange() {
        let top = $window.scrollTop() <= 500 ? $window.scrollTop(): 500;

        cameraY = (top * 0.4) * -1;
        cameraZ = 350 - (top * 0.5);
    }

    function onWindowSizeChange() {
        camera.aspect = $window.width() / $window.height();
        camera.updateProjectionMatrix();
        renderer.setSize($window.width(), $window.height());
    }

    function animate() {
        requestAnimationFrame(animate);
        camera.position.y = cameraY;
        camera.position.z = cameraZ;

        particle.rotation.x += 0.0000;
        particle.rotation.y -= 0.0040;
        circle.rotation.x -= 0.0020;
        circle.rotation.y -= 0.0030;
        skelet.rotation.x -= 0.0010;
        skelet.rotation.y += 0.0020;

        renderer.clear();
        renderer.render(scene, camera)
    }

    function init() {
        boot();
        bind();
    }

    return {
        init: init
    }
}
