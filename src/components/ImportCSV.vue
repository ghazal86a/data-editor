<template>
  <div class="container">
    <div class="panel">
      <div class="panel-heading">
        <h4>CSV Import</h4>
      </div>
      <div class="panel-body">
        <div class="form-group">
          <div class="checkbox-header">
            <label for="checkbox">Please check if your CSV has headers</label>
            <input type="checkbox" id="checkbox" v-model="hasHeader" />
          </div>
          <div class="file_input">
            <label for="csv-file" class="control-label">CSV file to import</label>
            <input type="file" data-cy="file-input" id="csv-file" name="csv-file" class="form-control" @change="getData($event, hasHeader)">
          </div>
        </div>
      </div>
    </div>
    <div class="csv-table" v-if="rows">
      <table>
        <thead v-if="hasHeader">
          <tr>
            <th v-for="(h,i) in header" :key="i">
              {{ h }}
            </th>
          </tr>
        </thead>
        <tr v-for="(row,index) in rows" :key="index">
          <td v-for="(cell,key) in row" :key="key">
            <input class="cell-input" v-model="row[key]" @change="handleChange(index, key, row[key])"/>
          </td>
        </tr>
      </table>
    </div>
  <exportJson />
  </div>
</template>

<script>
import exportJson from './ExportJson.vue'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'ImportCSV',
  data () {
    return {
      hasHeader: false
    }
  },
  components: {
    exportJson
  },
  computed: {
    ...mapState(['header', 'rows'])
  },
  methods: {
    ...mapActions([
      'loadCSV',
      'changeValue'
    ]),
    getData (e, hasHeader) {
      let payload = {e, hasHeader}
      this.loadCSV(payload)
    },
    handleChange (index, key, newValue) {
      let payload = {index, key, newValue}
      this.changeValue(payload)
    }
  }
}
</script>
