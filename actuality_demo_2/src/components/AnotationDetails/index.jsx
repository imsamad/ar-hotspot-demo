import { Button, Typography } from "@mui/material";
import { memo, useEffect, useRef } from "react";

import "./style.css";

const Annotation = memo(
  ({
    annot: { dataPosition, dataNormal, label, cameraTarget, cameraOrbit },
  }) => {
    const hotspotBtnRef = useRef();
    const hotspotViewer = useRef();
    const myModelRef = useRef();

    useEffect(() => {
      myModelRef.current = hotspotBtnRef.current.closest("model-viewer");

      hotspotViewer.current = hotspotBtnRef.current
        .closest("model-viewer")
        .querySelector(".hotspotViewer");
    }, []);

    // const hotspotViewer = hotspotBtnRef.current
    //   .closest("model-viewer")
    //   .querySelector(".hotspotViewer");

    const handleOpenLabel = () => {
      // myModelRef.current.setAttribute("camera-orbit", "0 75deg 300%");
      myModelRef.current.setAttribute("camera-target", cameraTarget);
      myModelRef.current.setAttribute("camera-orbit", cameraOrbit);
      myModelRef.current.zoom(5);
      // I already open
      if (hotspotBtnRef.current.classList.contains("active")) return;
      // Activate Hotspot Btn
      hotspotBtnRef.current.classList.add("active");
      // Activate Hotspot Viewer
      hotspotViewer.current.classList.add("active");
      // stuffed hotspotViewer
      hotspotViewer.current.innerHTML = createLabels();
    };

    const createLabels = () => `
  <button class='exitBtn'>X</button>
  <h1>${label}</h1>
  <p>Aliquam eget finibus ante, non facilisis lectus. </p>
  `;

    const handleCloseLabel = () => {
      hotspotBtnRef.current.classList.remove("active");
      hotspotViewer.current.classList.remove("active");
      // hotspotViewer.current.innerHTML = "";
    };

    const handleClickAwayClose = (e) => {
      // if no any hotspotViewer is opened.
      if (!hotspotBtnRef.current.classList.contains("active")) return;

      // if active hotspotBtn itself is being clicked
      if (hotspotBtnRef.current.contains(e.target)) return;

      // if active hotspotLabelViewer is clicked
      if (hotspotViewer.current.contains(e.target)) {
        // but exitBtn not been clicked
        const hotspotViewerExitBtn =
          hotspotViewer.current.querySelector(".exitBtn");

        if (hotspotViewerExitBtn != e.target) return;
      }

      handleCloseLabel();
    };

    useEffect(() => {
      document.addEventListener("mousedown", handleClickAwayClose);
      return () => {
        document.removeEventListener("mousedown", handleClickAwayClose);
      };
    }, []);

    return (
      <>
        <button
          ref={hotspotBtnRef}
          className={"annotBtn"}
          slot={`hotspot-${label}`}
          data-position={dataPosition}
          data-normal={dataNormal}
          onClick={(e) => {
            handleOpenLabel();
          }}
        >
          <div className={"annotLabel"}>
            <Typography variant="h6">{label}</Typography>
            <hr />
            <Typography variant="body1">
              Aliquam eget finibus ante, non facilisis lectus.
            </Typography>
          </div>
        </button>
      </>
    );
  }
);

export default Annotation;
