import React from "react";

import { usgMessagesList } from "@common/index";
import { ImCross } from "react-icons/im";
import { IoSnowOutline, IoBandageSharp } from "react-icons/io5";

const displayCuteMessage = usgMessagesList({ maxItems: 3 });

function CuteMessagesListExample() {
  function onColdClick() {
    var helped = false;

    displayCuteMessage({
      replacingKey: "cold",
      Icon: IoSnowOutline,
      title: "Oh no! Your finger has stuck to the button!",
      lifeTime: 0,
      customDirSty: { icon: "text-blue-600" },
      button: {
        text: "Help me!",
        onClick: (closeFather) => {
          if (!helped) {
            displayCuteMessage({
              replacingKey: "cure",
              Icon: IoBandageSharp,
              title: "We've got you covered bro :)",
              body: "Minim nulla esse ipsum excepteur anim et eu et velit duis non fugiat minim.",
              button: {
                onClick: () => setTimeout(closeFather, 500),
                text: "Thanks!",
              },
              secondButton: { text: "Act culia" },
              closeOnClick: true,
              lifeTime: 0,
            });
            helped = true;
          }
        },
      },
    });
  }

  function onUnclickableClick() {
    displayCuteMessage({
      Icon: ImCross,
      title: "Bro, this button is unclickable.",
      body: "Be over with it.",
      closeOnClick: true,
      fadeSpeed: "fast",
      lifeTime: 0,
      button: { text: "Understood", onClick: () => console.log("Understood") },
    });
  }

  return (
    <>
      <div className="text-center mt-16">
        <div className="flex flex-col md:flex-row justify-evenly">
          <button
            onClick={onColdClick}
            className="mx-4 text-xl px-8 py-2 rounded-md border-blue-700 border-1 text-blue-700 hover:bg-blue-700 hover:text-gray-100"
          >
            Cold Button
          </button>
          <button
            onClick={onUnclickableClick}
            className="mx-4 text-xl px-8 py-2 rounded-md border-gray-700 border-1 text-gray-700 hover:bg-gray-700 hover:text-gray-100"
          >
            Unclickable button
          </button>
        </div>
      </div>
      {Array(5)
        .fill(0)
        .map((x, i) => (
          <div key={i} className="h-64"></div>
        ))}
    </>
  );
}

export default CuteMessagesListExample;
