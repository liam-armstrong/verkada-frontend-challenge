# Camera Placement Application

### Try the app at https://verkada.liam-armstrong.com/

Hi! Welcome to my submission for the Verkada Frontend Tech Challenge.

I used `React` and `Three.js` to build an interactive, 3d simulation of the floorplan input

The user can fly around their given floorplan and visualize camera placements and the range they cover

Finally, the locations of all of their cameras are exported in JSON format

## Documentation

Component Tree is as follows:

```
                     App
              --------|--------
       FloorplanCanvas       Logo
     --------|---------------------
 Box (3js)    Camera (3js)   CameraDrawer
                                  |
                          CameraDrawerListItem
```

* `App` handles initial loading of input, and mounts Canvas for 3js objects
* `FloorplanCanvas` converts the input grid into a list of 3d coords, creates the related boxs as walls, and maintains a mapping of camera locations
* `Box` and `Camera` represent ThreeJS Boxs, Spheres and Lights. They handle onClick and onHover events for location of the cursor camera, and placement and deletion of set cameras.
* `CameraDrawer` and `CameraDrawerListItem` represent the menu on the left hand side. They interact with the ThreeJS objects by changing state of the camera map.
