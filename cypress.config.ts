import { defineConfig } from "cypress";


export default defineConfig({
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
    specPattern: "**/*.{cy,test}.{js,jsx,ts,tsx}",
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: "**/*.e2e.{cy,test}.{js,jsx,ts,tsx}"
  },
});
