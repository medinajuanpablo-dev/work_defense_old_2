import React from "react";

import { CuteCheckbox } from "@common/index";

function CuteCheckboxExample() {
  const [checked, setChecked] = React.useState(false);

  return (
    <>
      <div className="flex justify-center mt-16 px-8 md:px-32 lg:px-64 xl:px-96">
        <CuteCheckbox
          label="Soy Macho"
          checked={checked}
          onChange={(isChecked) =>
            setChecked(isChecked) || console.log(isChecked)
          }
          customDirSty={{ check: "text-gray-700" }}
        />
      </div>
      <button
        className="ml-4 mt-8 border-gray-500 border-1 px-4 py-2"
        onClick={() => setChecked(!checked)}
      >
        Externally {checked ? "uncheck" : "check"}
      </button>
    </>
  );
}

export default CuteCheckboxExample;
