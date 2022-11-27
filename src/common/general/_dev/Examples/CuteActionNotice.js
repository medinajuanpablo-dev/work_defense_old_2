import React from "react";
import { IoWarningOutline } from "react-icons/io5";
import { BsQuestionCircle } from "react-icons/bs";

import { CuteActionNotice } from "@common/index";

function CuteActionNoticeExample() {
  const [active, setActive] = React.useState(false);

  return (
    <>
      <div className="flex items-center justify-end mt-16 px-8 md:px-32 lg:px-64 xl:px-96">
        <CuteActionNotice
          ButtonIcon={BsQuestionCircle}
          Icon={IoWarningOutline}
          title="Warning!"
          body="Excepteur exercitation tempor irure non et amet."
          position="left"
          showing={active}
          onSwitch={(showing) => setActive(showing)}
          behavior="focus"
        />
      </div>
      <button
        className="mt-8 border-1 border-gray-800 px-4 py-2"
        onClick={() => setActive(!active)}
      >
        Externally {active ? "hide" : "show"}
      </button>
    </>
  );
}

export default CuteActionNoticeExample;
