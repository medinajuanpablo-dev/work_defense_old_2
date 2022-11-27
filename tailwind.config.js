function generateExtensions() {
  const ext = {};

  //transitionDuration
  ext.transitionDuration = {};
  for (let ms = 0; ms <= 300; ms += 10) ext.transitionDuration[ms] = `${ms}ms`;
  for (let ms = 300; ms <= 1000; ms += 50)
    ext.transitionDuration[ms] = `${ms}ms`;
  for (let ms = 1000; ms <= 10000; ms += 250)
    ext.transitionDuration[ms] = `${ms}ms`;

  //border.
  ext.borderWidth = {
    1: "1px",
    3: "3px",
  };

  //translate. This is safelisted when purging, so don't add more than needed.
  ext.translate = {
    5.5: "1.375rem",
    7: "1.75rem",
    9: "2.25rem",
    "-5.5": "-1.375rem",
    "-7": "-1.75rem",
    "-9": "-2.25rem",
  };

  ext.maxWidth = {
    "screen-2xl": "1366px",
    "screen-3/4": "75vh",
  };

  //spacing
  ext.spacing = {
    auto: "auto",
    0: "0%",
    "1/12": "8.33%",
    "2/12": "16.67%",
    "3/12": "25%",
    "4/12": "33.33%",
    "5/12": "41.67%",
    "6/12": "50%",
    "7/12": "58.33%",
    "8/12": "66.67%",
    "9/12": "75%",
    "10/12": "83.33%",
    "11/12": "91.67%",

    "3/24": "12.5%",
    "5/24": "20.83%",
    "7/24": "29.17%",
    "9/24": "37.5%",
    "11/24": "45.83%",
    "13/24": "54.17%",
    "15/24": "62.5%",
    "17/24": "70.83%",
    "19/24": "79.17%",
    "21/24": "87.5%",
    "23/24": "95.83%",
  };

  //height by screen height.
  ext.height = {
    "screen-1/12": "8.33vh",
    "screen-2/12": "16.67vh",
    "screen-3/12": "25vh",
    "screen-4/12": "33.33vh",
    "screen-5/12": "41.67vh",
    "screen-6/12": "50vh",
    "screen-7/12": "58.33vh",
    "screen-8/12": "66.67vh",
    "screen-9/12": "75vh",
    "screen-10/12": "83.33vh",
    "screen-11/12": "91.67vh",
  };

  //width by screen width.
  ext.width = {
    "screen-1/12": "8.33vw",
    "screen-2/12": "16.67vw",
    "screen-3/12": "25vw",
    "screen-4/12": "33.33vw",
    "screen-5/12": "41.67vw",
    "screen-6/12": "50vw",
    "screen-7/12": "58.33vw",
    "screen-8/12": "66.67vw",
    "screen-9/12": "75vw",
    "screen-10/12": "83.33vw",
    "screen-11/12": "91.67vw",
  };

  for (let rem = 1; rem <= 200; rem += 1)
    ext.spacing[rem] = `${(rem * 0.25).toPrecision(3)}rem`;

  for (let px = 1; px <= 50; px += 1) ext.spacing[`${px}px`] = `${px}px`;

  return ext;
}

function generateDefinitions() {
  const gg = {};

  /** ### Breakpoints
   *  They indicate the minimum width of that category. The whole app should be wrapped
   * in a `container` (an element with `className="container"`).
   *
   * - **Super small devices (ss)**: Less than 350px. Small phones.
   * - **Extra small devices (xs)**: Between 350px and 500px. Phones.
   * - **Small devices (sm)**: Between 500px and 768px. Vertical tablets.
   * - **Medium devices (md)**: Between 768px and 1024px. Horizontal tablets.
   * - **Large devices (lg)**: Between 1024px and 1280px. Laptops.
   * - **Very large devices (xl)**: Between 1280px and 1500px. Wide laptops.
   * - **Super large devices (sl)**: More than 1500px. Monitors.
   */
  gg.screens = {
    //WARNING: When editing this, the `useBreakpoints` hook must be updated.
    //ss: "0px", // This isn't explict.
    xs: "350px",
    sm: "500px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    sl: "1500px",
  };

  //fontSize
  gg.fontSize = {
    unset: "none",
    ss: ".7rem",
    xs: ".75rem",
    sm: ".875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "2.5xl": "1,687rem",
    "3xl": "1.875rem",
    "3.5xl": "2rem",
    "4xl": "2.25rem",
    "4.5xl": "2.687rem",
  };
  for (let xl = 5; xl <= 20; xl += 0.5) gg.fontSize[`${xl}xl`] = `${xl - 2}rem`;

  //scale
  gg.scale = {};
  for (let sc = 0; sc <= 100; sc += 5) {
    gg.scale[sc] = `${(sc / 100).toPrecision(5)}`;
  }
  for (let sc = 100; sc <= 500; sc += 20) {
    gg.scale[sc] = `${(sc / 100).toPrecision(5)}`;
  }

  //rotate
  gg.rotate = { 0: "0deg" };
  for (let ro = 10; ro <= 720; ro += 10) {
    gg.rotate[ro] = `${ro}deg`;
    gg.rotate[`-${ro}`] = `-${ro}deg`;
  }
  gg.rotate["45"] = "45deg";

  gg.zIndex = {};
  for (let z = 0; z < 1000; z += 10) gg.zIndex[z] = z;

  return gg;
}

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    ...generateDefinitions(),
    extend: generateExtensions(),
  },
};
