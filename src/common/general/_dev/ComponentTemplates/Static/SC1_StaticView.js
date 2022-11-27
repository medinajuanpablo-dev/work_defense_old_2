import React from "react";

//Interface with fully static styles: elements styles are never gonna change with events and styles are
//statically defined.

function StaticView() {
  return <div className={STYLES.ct}>Something</div>;
}

const STYLES = {
  ct: "p-2",
};

export default StaticView;
