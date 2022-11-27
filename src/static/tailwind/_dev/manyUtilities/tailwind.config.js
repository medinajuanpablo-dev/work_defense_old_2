function generateExtensions() {
  const ext = {};

  //transitionDuration
  ext.transitionDuration = {};
  for (let ms = 0; ms <= 300; ms += 10) ext.transitionDuration[ms] = `${ms}ms`;
  for (let ms = 300; ms <= 1000; ms += 50)
    ext.transitionDuration[ms] = `${ms}ms`;
  for (let ms = 1000; ms <= 10000; ms += 250)
    ext.transitionDuration[ms] = `${ms}ms`;

  //height.
  ext.height = {
    "screen-1/2": "50vh",
    "screen-1/3": "33vh",
    "screen-2/3": "66vh",
    "screen-1/4": "25vh",
    "screen-3/4": "75vh",
    "screen-1/5": "20vh",
    "screen-2/5": "40vh",
    "screen-3/5": "60vh",
    "screen-4/5": "80vh",
    "screen-1/6": "16.6vh",
    "screen-5/6": "83.3vh",
  };

  //border.
  ext.borderWidth = {
    1: "1px",
    3: "3px",
  };

  //translate
  ext.translate = {
    7: "1.75rem",
    9: "2.25rem",
    "-7": "-1.75rem",
    "-9": "-2.25rem",
  };

  return ext;
}

function generateDefinitions() {
  const gg = {};

  /** ### Breakpoints
   *  They indicate the minimum width of that category. The whole app should be wrapped
   * in a `container` (an element with `className="container"`).
   *
   * - **Very small devices (xs)**: Less than 500px. Small phones.
   * - **Small devices (sm)**: Between 500px and 768px. Big phones and Vertical tablets.
   * - **Medium devices (md)**: Between 768px and 1024px. Horizontal tablets and Netbooks (small laptop).
   * - **Large devices (lg)**: Between 1024px and 1280px. Notebooks (large laptop).
   * - **Very large devices (xl)**: More than 1280px. Monitors.
   */
  gg.screens = {
    sm: "500px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
  };

  //fontSize
  gg.fontSize = {
    unset: "none",
    xs: ".75rem",
    sm: ".875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
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

  //inset
  gg.inset = {
    auto: "auto",
    0: "0%",
    "1/2": "50%",
    "1/3": "33%",
    "2/3": "66%",
    "1/4": "25%",
    "3/4": "75%",
    "1/5": "20%",
    "2/5": "40%",
    "3/5": "60%",
    "4/5": "80%",
    "1/6": "16.6%",
    "5/6": "83.3%",
    "-1/2": "-50%",
    "-1/3": "-33%",
    "-2/3": "-66%",
    "-1/4": "-25%",
    "-3/4": "-75%",
    "-1/5": "-20%",
    "-2/5": "-40%",
    "-3/5": "-60%",
    "-4/5": "-80%",
    "-1/6": "-16.6%",
    "-5/6": "-83.3%",
  };

  for (let rem = 0; rem < 50; rem += 1) {
    gg.inset[rem] = `${(rem * 0.25).toPrecision(3)}rem`;
    gg.inset[`-${rem}`] = `-${(rem * 0.25).toPrecision(3)}rem`;
  }

  for (let rem = 50; rem < 200; rem += 5) {
    gg.inset[rem] = `${(rem * 0.25).toPrecision(3)}rem`;
    gg.inset[`-${rem}`] = `-${(rem * 0.25).toPrecision(3)}rem`;
  }

  return gg;
}

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    ...generateDefinitions(),
    extend: generateExtensions(),
  },
  variants: ["responsive", "focus", "hover"],
  plugins: [],
};
