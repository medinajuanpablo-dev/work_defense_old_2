import React from "react";

import { useCustomizableStyles } from "@static/react";

import GenericTopBar from "./Generic";
import TopBarButton from "./Button";

/**
 * @param {Object} props
 * @param {{Icon: React.Component, text: string, otherProps: any, onClick: () => void}} props.leftButton
 * @param {{Icon: React.Component, text: string, otherProps: any, onClick: () => void}} props.rightButton
 */
function TwoButtons({ leftButton, rightButton }) {
  const styles = {
    left: useCustomizableStyles(STYLES.leftButton, leftButton?.customStyles),
    right: useCustomizableStyles(STYLES.rightButton, rightButton?.customStyles),
  };

  return (
    <GenericTopBar>
      {leftButton && (
        <TopBarButton
          customStyles={styles.left}
          Icon={leftButton.Icon}
          text={leftButton.text}
          {...leftButton.otherProps}
          onClick={leftButton.onClick}
        />
      )}

      {rightButton && (
        <TopBarButton
          customStyles={styles.right}
          Icon={rightButton.Icon}
          text={rightButton.text}
          {...rightButton.otherProps}
          onClick={rightButton.onClick}
        />
      )}
    </GenericTopBar>
  );
}

const STYLES = {
  leftButton: {
    button: "flex-1 justify-center border-r-2",
    icon: "transform flip mr-1",
  },
  rightButton: {
    button: "flex-1 justify-center",
    icon: "mr-2",
  },
};

export default TwoButtons;
