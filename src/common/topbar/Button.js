import React from "react";

import { useCustomizableStyles } from "@static/react";

function TopBarButton({ customStyles, Icon, text, ...passProps }) {
  const styles = useCustomizableStyles(STYLES, customStyles);

  return (
    <button {...passProps} className={styles.button}>
      <Icon className={styles.icon} />
      <span className={styles.text}>{text}</span>
    </button>
  );
}

//prettier-ignore
const STYLES = {
  button: "flex justify-center items-center border-gray-100 py-2 h-12 text-gray-100 focus:bg-opacity-30 focus:outline-none focus:bg-gray-500",
  icon: "w-8 h-full",
  text: "",
};

export default TopBarButton;
