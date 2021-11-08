export const wallLocationtoCoords = (val, x, y, h, l) => {
    const xVal = x - (h/2)
    const yVal = y - (l/2)
    return val === 1 ? [xVal, yVal] : null
} 

export const cameraConfig = (input) => {
    return {
        position: [input.width*0.75, input.height*0.75, Math.max(input.height, input.width)*0.75],
        fov: 45,
        aspect: window.innerWidth / window.innerHeight,
        near: 1,
        far: 10000
    }
  };

export const pointOnInnerWall = (point, w, h) => {
  return point.y < 0.45 && point.y > -0.49 &&
         point.x > (-w/2 - 0.44) && point.x < (w/2 - 0.55) &&
         point.z > (-h/2 - 0.44) && point.z < (h/2 - 0.55)
}

// From https://stackoverflow.com/a/50633328
export const CheckObjectForProperties = (obj, arraryOfStringProperties) => {
  for(let i = 0; i < arraryOfStringProperties.length; i++)
  {
    let key = arraryOfStringProperties[i];
    if(!obj[key])
    {
      throw new Error('Member not Found in Given Object.');
    }
  }
}

export const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}

export const defaultInput = {
  "width": 10,
  "height": 10,
  "floorplan": [
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,0,0,0,1,0,1,1],
    [1,0,0,0,0,0,0,0,1,1],
    [1,0,1,1,1,1,1,0,1,1],
    [1,0,0,1,0,0,0,0,1,1],
    [1,0,0,1,0,0,0,0,0,1],
    [1,1,0,1,0,1,1,1,0,1],
    [1,1,0,0,0,0,0,1,0,1],
    [1,1,0,0,0,0,0,1,1,1],
    [1,1,1,1,1,1,1,1,1,1],
  ]
}