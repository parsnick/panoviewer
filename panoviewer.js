(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Panoviewer = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Panoviewer = function () {
    function Panoviewer(element, options) {
        var _this = this;

        _classCallCheck(this, Panoviewer);

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

        requestAnimationFrame(function () {
            return _this.render();
        });
    }

    _createClass(Panoviewer, [{
        key: 'init',
        value: function init() {
            var _this2 = this;

            this.scene = new THREE.Scene();
            this.camera = new THREE.PerspectiveCamera(75, null, 1, 100);
            this.renderer = new THREE.WebGLRenderer();

            this.element.appendChild(this.renderer.domElement);
            this.resize();

            this.camera.position.z = 1;

            this.controls = new THREE.OrbitControls(this.camera, this.element);
            this.controls.addEventListener('change', function () {
                return _this2.render();
            });
            this.controls.enableZoom = false;

            //this.element.addEventListener('mousewheel', (e) => console.log(e))

            window.addEventListener('resize', function () {
                _this2.resize();
                _this2.render();
            });
        }
    }, {
        key: 'render',
        value: function render() {
            this.renderer.render(this.scene, this.camera);
        }
    }, {
        key: 'createSphereForZoom',
        value: function createSphereForZoom(level) {
            var tilesRequired = Math.pow(2, level);

            for (var x = 0; x < tilesRequired; ++x) {
                for (var y = 0; y < tilesRequired; ++y) {
                    this.createMeshForTile(level, x, y);
                }
            }
        }
    }, {
        key: 'createMeshForTile',
        value: function createMeshForTile(zoom, tileX, tileY) {
            var segmentsX = Math.pow(2, zoom);
            var segmentsY = Math.pow(2, zoom);

            var phiLength = Math.PI * 2 / segmentsX;
            var thetaLength = Math.PI / segmentsY;

            var geometry = new THREE.SphereGeometry(10 * (zoom + 1), 16, 16, phiLength * tileX, phiLength, thetaLength * tileY, thetaLength);
            geometry.scale(-1, 1, 1);
            var material = new THREE.MeshBasicMaterial({
                map: new THREE.TextureLoader().load('tiles/1/' + zoom + '_' + tileX + '_' + tileY + '.jpg')
            });
            var sphere = new THREE.Mesh(geometry, material);

            this.scene.add(sphere);
        }
    }, {
        key: 'resize',
        value: function resize() {
            this.camera.aspect = this.element.offsetWidth / this.element.offsetHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(this.element.offsetWidth, this.element.offsetHeight);
        }
    }]);

    return Panoviewer;
}();

exports.default = Panoviewer;
module.exports = exports['default'];

},{}]},{},[1])(1)
});