const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: '4cmor3',
  e2e: {
    setupNodeEvents (on, config) {
      // the URL will set by the first test
      let data
      let emailCookies
      let DMCookies
      let url
      on('task', {
        saveData (newData) {
          data = newData
          return null
        },
        getData () {
          return data
        },
        saveEmailCookies (newData) {
          emailCookies = newData
          return null
        },
        getEmailCookies () {
          return emailCookies
        },
        saveDMCookies (newData) {
          DMCookies = newData
          return null
        },
        getDMCookies () {
          return DMCookies
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
