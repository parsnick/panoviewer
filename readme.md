# work-in-progress

## equirectangular panorama viewer with three.js

Displaying panoramas is simple enough (in theory): create a sphere, stick the image to the inside of the sphere, add a camera in the center. And there's a few examples of that around, e.g. http://threejs.org/examples/webgl_panorama_equirectangular

This repo is a rough draft of a panorama viewer with support for image tiling and showing higher resolution images at higher zooms (image pyramid).

Requirements:

* display an equirectangular panorama image
* click and drag to change angle of view
* allow slicing of the image into smaller, more bandwidth-friendly tiles
* load only the tiles visible in viewport
* support multiple zoom levels and show images with greater resolution at greater zoom levels
* smooth transitions between zoom levels and between panoramas
* show links to nearby panoramas
* allow overlays on the panorama image

Demo (of limited progress so far): [parsnick.github.io/panoviewer](http://parsnick.github.io/panoviewer)

