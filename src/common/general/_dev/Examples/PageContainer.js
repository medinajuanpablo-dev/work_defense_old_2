import React from "react";

import { PageContainer } from "@common/index";

import { PAGES as PGK } from "@static/values/keys";

function PageContainerExample() {
  return (
    <>
      <PageContainer subNavPages={[PGK.REDUX_EXAMPLE]}>
        Content of some page over there
      </PageContainer>
    </>
  );
}

export default PageContainerExample;
