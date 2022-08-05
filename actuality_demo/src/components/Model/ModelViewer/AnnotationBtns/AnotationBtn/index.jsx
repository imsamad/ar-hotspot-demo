import { memo, useRef } from "react";

import "./style.css";

const AnotationBtn = memo((props) => {
  const {
    annot: { dataPosition, dataNormal, title },
    handleActivate_Model_Container,
  } = props;

  const hotspotBtnRef = useRef();

  const handleOpenLabel = () => {
    // if (hotspotBtnRef.current.classList.contains("active")) return;

    hotspotBtnRef.current.classList.add("active");

    handleActivate_Model_Container(
      {
        ...props.annot,
      },
      () => {
        hotspotBtnRef.current.classList.add("visited");
        hotspotBtnRef.current.classList.remove("active");
      }
    );
  };

  return (
    <button
      ref={hotspotBtnRef}
      className={"annotBtn"}
      slot={`hotspot-${title}`}
      data-position={dataPosition}
      data-normal={dataNormal}
      onClick={(e) => {
        handleOpenLabel();
      }}
    />
  );
});

export default AnotationBtn;
