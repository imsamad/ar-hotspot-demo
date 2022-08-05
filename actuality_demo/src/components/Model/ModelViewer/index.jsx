import "@google/model-viewer";

import { IconButton } from "@mui/material";
import { useRef } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import FooterLogo from "./FooterLogo";
import AnnotationBtns from "./AnnotationBtns";
import { HotspotDrawerBox, ModelBox, ModelContainer, ExitBtn } from "./UI";
import BrandLogo from "./BrandLogo";
import ContentStyleWrapper from "./ContentStyleWrapper";
import AddAnnotaions from "./AddAnnotaions";

const ModelViewer = ({
  src,
  alt,
  modelId,
  enableAddAnnotations,
  brandLogoSrc,
  brandLogoAlt,
}) => {
  // console.log(`ModelViewer`);
  const modelRef = useRef();

  const modelBoxRef = useRef(); // Left Box
  const hotspotDrawerRef = useRef(); // Right Box

  const drawer_title_Ref = useRef();
  const drawer_Content_Ref = useRef();

  const handleAddHotspot_Fun_Ref = useRef(null);

  return (
    <ModelContainer>
      <ModelBox ref={modelBoxRef}>
        <BrandLogo src={brandLogoSrc} alt={brandLogoAlt} />

        <AddAnnotaions ref={handleAddHotspot_Fun_Ref} />

        <model-viewer
          src={src}
          alt={alt ?? ""}
          ar
          touch-action="none"
          ar-modes="webxr quick-look scene-viewer"
          onClick={handleAddHotspot}
          ref={(ref) => {
            modelRef.current = ref;
          }}
          enable-pan
          camera-controls
          field-of-view="45deg"
          max-field-of-view="45deg"
          interpolation-decay="200"
          min-camera-orbit="auto auto 5%"
        >
          <AnnotationBtns
            handleActivate_Model_Container={handleActivate_Model_Container}
          />
        </model-viewer>
        <FooterLogo ref={modelRef} />
      </ModelBox>
      <HotspotDrawerBox ref={hotspotDrawerRef}>
        <ExitBtn className="exitBtn" onClick={handleClose_Drawer_Model}>
          <IconButton>
            <ArrowForwardIosIcon fontSize="large" />
          </IconButton>
        </ExitBtn>

        <div className="title" ref={drawer_title_Ref} />
        <ContentStyleWrapper>
          <div className="content ck-content" ref={drawer_Content_Ref} />
        </ContentStyleWrapper>
      </HotspotDrawerBox>
    </ModelContainer>
  );

  function handleAddHotspot({ clientX, clientY }) {
    // handleAddHotspot_Fun_Ref.current.log();
    if (!enableAddAnnotations) return;
    const annotCords = modelRef.current.positionAndNormalFromPoint(
      clientX,
      clientY
    );

    if (!annotCords) return;

    const cameraTarget = modelRef.current.getCameraTarget().toString();
    const cameraOrbit = modelRef.current.getCameraOrbit().toString();

    const newAnnotCords = {
      annotCords,
      cameraTarget,
      cameraOrbit,
    };

    const isAdded = handleAddHotspot_Fun_Ref.current.handleClick(newAnnotCords);
    if (isAdded)
      /* Re-center model or reset model position */
      modelRef.current.setAttribute("camera-target", "0 0 0");
  }

  var cbOnCloseRef = null;

  function handleActivate_Model_Container(annot, cbOnClose) {
    /* Animate Model */
    const { cameraTarget, cameraOrbit, zoom = 12 } = annot;

    modelRef.current.zoom(zoom);
    modelRef.current.setAttribute("camera-target", cameraTarget);
    modelRef.current.setAttribute("camera-orbit", cameraOrbit);
    modelRef.current.setAttribute("zoom", zoom);
    /* Animate Model End */

    /* Activate ModelContainer Left Box OR Or squeeze the box */
    modelBoxRef.current.classList.add("active");

    /*
     * 1.) Activate Hotspot Drawer
     * 2.) Stuffed relevent content
     */
    hotspotDrawerRef.current.classList.add("active");

    const { title, content, label } = annot;

    drawer_title_Ref.current.innerHTML = `<h1>${title || label}</h1>`;
    drawer_Content_Ref.current.innerHTML = `${content}`;
    cbOnCloseRef = cbOnClose;
  }

  function handleClose_Drawer_Model() {
    hotspotDrawerRef.current.classList.remove("active");
    modelBoxRef.current.classList.remove("active");
    // console.log("cbOnCloseRef ", cbOnCloseRef);
    cbOnCloseRef && cbOnCloseRef();
    // drawer_Heading_Ref.current.innerHTML = ``;
    // drawer_Content_Ref.current.innerHTML = ``;
  }
};

export default ModelViewer;
