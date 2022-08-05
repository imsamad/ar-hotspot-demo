import React, { useRef } from "react";
import "@google/model-viewer";
import "./style.css";

import Annotations from "../Annotations";
import { Button } from "@mui/material";

const ModelViewer = (props) => {
  const modelRef = useRef();
  const handleClickRef = useRef();

  const handleClick = ({ clientX, clientY }) => {
    if (!modelRef.current) return;

    const annotCords = modelRef.current.positionAndNormalFromPoint(
      clientX,
      clientY
    );
    if (!annotCords) return;
    const cameraTarget = modelRef.current.getCameraTarget().toString();
    const cameraOrbit = modelRef.current.getCameraOrbit().toString();

    const isAdded = handleClickRef.current.handleClick(
      annotCords,
      cameraTarget,
      cameraOrbit
    );

    if (isAdded) modelRef.current.setAttribute("camera-target", "0 0 0");
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={() => {
          modelRef.current.setAttribute("camera-target", "0 0 0");
        }}
      >
        Reset Positions
      </Button>
      <model-viewer
        src="/shared-assets/models/Astronaut.glb"
        // src="/assets/gbl/ruubik2.glb"
        ar
        ar-modes="webxr quick-look scene-viewer"
        onClick={handleClick}
        skybox-image="/shared-assets/environments/spruit_sunrise_1k_LDR.jpg"
        ref={(ref) => {
          modelRef.current = ref;
        }}
        enable-pan
        camera-controls
        alt="A 3D model of an astronaut."
      >
        <div className="hotspotViewer" />
        <Annotations ref={handleClickRef} />
      </model-viewer>
    </>
  );
};

export default ModelViewer;
