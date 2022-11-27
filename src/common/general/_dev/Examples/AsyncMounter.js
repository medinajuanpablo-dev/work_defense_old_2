import React from "react";
import { BsQuestionCircle } from "react-icons/bs";
import { IoWarningOutline } from "react-icons/io5";

import { AsyncMounter, CuteActionNotice } from "@common/index";

function AsyncMounterExample() {
  const [renderAsync, setRenderAsync] = React.useState(false);
  const [rendering, setRendering] = React.useState(false);

  const [renderNormal, setRenderNormal] = React.useState(false);

  return (
    <>
      <div className="mt-16 px-8 md:px-32 lg:px-64 xl:px-96 pb-16 lg:flex">
        <p className="text-center text-xl text-gray-800">
          Async Mounter Example
        </p>

        <div className="text-center">
          <button
            onClick={() => {
              setRenderAsync(!renderAsync);
              setRendering(!renderAsync);
            }}
            className="mt-8 border-1 border-gray-700 hover:bg-gray-700 hover:text-gray-100 text-gray-700 rounded-md px-4 py-2"
          >
            {rendering
              ? "Mounting..."
              : renderAsync
              ? "Unmount"
              : "Async Mounting"}
          </button>
        </div>

        {renderAsync && (
          <div className="flex flex-col text-center mt-8 border-1 border-purple-500 p-4 rounded-md">
            <p className="text-purple-500 text-sm mb-2">
              Asynchronously Mounted
            </p>

            <AsyncMounter
              onMount={(index) => console.log(`Mounted chunk ${index}`)}
              onFinish={() => setRendering(false)}
              mountDelay={400}
              renderSecuence={Array(10)
                .fill(0)
                .map((x, index) => (
                  <div key={index} className="flex justify-center my-1">
                    {Array(7)
                      .fill(0)
                      .map((x, index) => (
                        <CuteActionNotice
                          key={index}
                          ButtonIcon={BsQuestionCircle}
                          Icon={IoWarningOutline}
                          title="Warning!"
                          body="Excepteur exercitation tempor irure non et amet."
                          position="left"
                          customDirSty={{
                            ct: "mx-1 ",
                            buttonIcon: "text-blue-600",
                            noticeTitle: "text-red-500",
                            noticeCt: "border-blue-600",
                            noticeTextCt: "text-left",
                          }}
                        />
                      ))}
                  </div>
                ))}
              elementsPerChunk={3}
            />
          </div>
        )}

        <div className="text-center">
          <button
            onClick={() => {
              setRenderNormal(!renderNormal);
            }}
            className="mt-8 border-1 border-gray-700 hover:bg-gray-700 hover:text-gray-100 text-gray-700 rounded-md px-4 py-2"
          >
            {renderNormal ? "Unmount" : "Slow Simultaneous Mounting"}
          </button>
        </div>

        {renderNormal && (
          <div className="flex flex-col mt-8 border-1 border-gray-500 p-4 rounded-md">
            <p className="text-gray-500 text-center text-sm mb-2">
              Simultaneously Mounted
            </p>

            {Array(10)
              .fill(0)
              .map((x, index) => (
                <div key={index} className="flex justify-center my-1">
                  {Array(7)
                    .fill(0)
                    .map((x, index) => (
                      <CuteActionNotice
                        key={index}
                        ButtonIcon={BsQuestionCircle}
                        Icon={IoWarningOutline}
                        title="Warning!"
                        body="Excepteur exercitation tempor irure non et amet."
                        position="left"
                        customDirSty={{
                          ct: "mx-1 ",
                          buttonIcon: "text-blue-600",
                          noticeTitle: "text-red-500",
                          noticeCt: "border-blue-600",
                        }}
                      />
                    ))}
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  );
}

export default AsyncMounterExample;
