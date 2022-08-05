import React from "react";
import "@google/model-viewer";
import "./style.css";
const Demo = () => {
  return (
    <div>
      <model-viewer
        ar
        ar-modes="webxr scene-viewer quick-look"
        camera-controls
        src="/shared-assets/models/Astronaut.glb"
        alt="A 3D model of an astronaut"
      >
        <button slot="ar-button" className="arBtn">
          👋 Activate AR
        </button>
      </model-viewer>
    </div>
  );
};

export default Demo;
