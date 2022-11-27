import React from "react";

import { displayCuteAlert } from "@common/index";
import { ImFire } from "react-icons/im";
import { IoBandageSharp } from "react-icons/io5";

function CuteNotificationExample() {
  function onHotClick() {
    displayCuteAlert({
      title: "You burned your finger!",
      // body: "Labore dolor quis Lorem consectetur ullamco et sint adipisicing fugiat quis dolor proident. Laborum ad et in in duis aute. Occaecat ad veniam ut do nulla incididunt. Excepteur irure in nostrud mollit exercitation irure sunt aliquip sunt. Cillum ex laborum proident pariatur aliquip id pariatur sit.",
      Icon: ImFire,
      customStyles: {
        icon: "text-red-500",
        leftButton: "bg-red-500 border-none text-gray-100 hover:bg-red-700",
      },
      button: { text: "Help!" },
      secondButton: { text: "That's fine" },
      onClose: (reason) => {
        if (reason == "button") {
          displayCuteAlert({
            title: "We healed your finger :)",
            body: "Proident nulla ad aliqua nisi et ad est labore culpa fugiat nostrud ex. Anim anim enim nostrud eiusmod deserunt commodo duis occaecat laborum commodo elit deserunt velit incididunt. Minim est anim do sit et consequat ex ex occaecat nulla magna tempor deserunt.",
            Icon: IoBandageSharp,
            button: { text: "Thanks m8" },
            fadeSpeed: "fast",
            customStyles: {
              icon: "text-blue-500",
              leftButton:
                "bg-green-500 border-none text-gray-100 hover:bg-green-700",
            },
          });
        }
      },
    });
  }

  return (
    <>
      <div className="text-center mt-16">
        <div className="flex flex-col md:flex-row justify-around">
          <button
            onClick={onHotClick}
            className="mt-8 mb-8 text-xl px-8 py-2 rounded-md border-1 border-orange-500 hover:bg-orange-500 hover:text-gray-100"
          >
            Hot Button
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

export default CuteNotificationExample;
