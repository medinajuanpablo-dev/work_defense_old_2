import { useCustomizableStyles } from "@static/react";

function ChildrenExample({ customStyles }) {
  const styles = useCustomizableStyles(CHILDREN_STYLES, customStyles);

  return (
    <div className={styles.ct}>
      <span className={styles.message}>I am purple by default!</span>
    </div>
  );
}

const CHILDREN_STYLES = {
  ct: "text-center mt-16 px-8 md:px-32 lg:px-64 xl:px-96",
  message: "text-xl text-purple-700 border-b-1 border-purple-700 pb-1",
};

function UseCustomizableStylesExample() {
  return <ChildrenExample customStyles={STYLES.children} />;
}

const STYLES = {
  children: {
    message: "text-gray-700 border-gray-700",
  },
};

export default UseCustomizableStylesExample;
