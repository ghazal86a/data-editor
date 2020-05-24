
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    header: [],
    rows: []
  },
  mutations: {
    SET_DATA (state, parsedCSV) {
      state.header = parsedCSV.headers
      state.rows = parsedCSV.result
    },
    SET_NEW_VALUE (state, payload) {
      state.rows[payload.index][payload.key] = payload.newValue
    }
  },
  actions: {
    loadCSV (context, payload) {
      if (window.FileReader) {
        let reader = new FileReader()
        reader.readAsText(payload.e.target.files[0])
        // Handle errors load
        reader.onload = event => {
          let csv = event.target.result
          let parsedCSV = store.convertCSVToJson(csv, payload.hasHeader)
          console.log(parsedCSV)
          context.commit('SET_DATA', parsedCSV)
        }
        reader.onerror = evt => {
          if (evt.target.error.name === 'NotReadableError') {
            alert('Cannot read file !')
          }
        }
      } else {
        alert('FileReader are not supported in this browser.')
      }
    },
    changeValue (context, payload) {
      context.commit('SET_NEW_VALUE', payload)
    }
  }
})

store.convertCSVToJson = (csv, hasHeader) => {
  let lines = csv.split('\n')
  let headers = lines[0].split(',')
  let result = []

  lines.map((line, index) => {
    // going through each line of the csv to create an array of objects out of csv
    if (index === 0 && hasHeader) return // skip header
    let obj = {}
    let items = line.split(',')

    // if data has headers the obj will have header items as keys
    // otherwise the keys are going to be numbers

    headers.map((header, i) => {
      if (hasHeader) {
        obj[header] = items[i]
      } else {
        obj[i] = items[i]
      }
    })
    result.push(obj)
  })
  return {headers, result}
}

export default store
