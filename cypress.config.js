const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents (on, config) {
      // the URL will set by the first test
      let data
      let cookies
      let url
      on('task', {
        saveData (newData) {
          data = newData
          return null
        },
        getData () {
          return data
        },
        saveCookies (newData) {
          cookies = newData
          return null
        },
        getCookies () {
          return cookies
        },
        saveURL (newData) {
          url = newData
          return null
        },
        getURL () {
          return url
        },
      })
    },
    "experimentalSessionAndOrigin": true,
  },
});
