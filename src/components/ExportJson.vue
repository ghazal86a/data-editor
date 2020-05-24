<template>
  <div class="export-json">
    <button @click="exportToJson(rows)">Export to Json</button>
    <span class="no-data-error" v-if="rows.length === 0 && showError">No data to export!</span>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ExportJson',
  data () {
    return {
      showError: false
    }
  },
  computed: {
    ...mapState(['rows'])
  },
  methods: {
    exportToJson (rows) {
      if (rows.length > 0) {
        const data = JSON.stringify(rows)
        var fileURL = window.URL.createObjectURL(new Blob([data]))
        var fileLink = document.createElement('a')

        fileLink.href = fileURL
        fileLink.setAttribute('download', 'csv_data.json')
        document.body.appendChild(fileLink)

        fileLink.click()
      } else {
        this.showError = !this.showError
      }
    }
  }
}
</script>
