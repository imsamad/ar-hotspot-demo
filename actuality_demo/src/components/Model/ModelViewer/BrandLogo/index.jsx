import styled from "@emotion/styled";
import { useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";

const LogoContainer = styled(Box)({
  padding: "1rem",
  paddingBottom: 0,
});
const BrandLogo = ({ src, alt }) => {
  const isMobileOrTablet = useMediaQuery((theme) =>
    theme.breakpoints.down("md")
  );
  return (
    <LogoContainer>
      <img
        src={src}
        alt={alt || "Actuality.live New Generation AR"}
        width={isMobileOrTablet ? "42px" : "92px"}
        height={isMobileOrTablet ? "42px" : "92px"}
      />
    </LogoContainer>
  );
};

export default BrandLogo;
