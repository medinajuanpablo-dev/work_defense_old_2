import React from "react";

import { BgContainer } from "@common/index";

function BgContainerExample() {

  return (
    <>
     
        <BgContainer bgClassName="bg-cover bg-center" className="h-screen-6/12 flex items-center justify-center" overlay="medium" imgSrc="https://morixe.com.ar/files/recetas/thumbs/pizzamorixe000002.jpg"  >
          <p className="text-5xl text-slate-100 border-1 border-slate-100 rounded-md w-10/12 text-center">Pizza is extremely overrated</p>
        </BgContainer>
      
    </>
  );
}

export default BgContainerExample;
