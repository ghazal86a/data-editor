<template>
  <div class="export-json">
    <button @click="exportToJson()">Export to Json</button>
    <span class="no-data-error" v-show="rows.length === 0 && showError">No data to export!</span>
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
    exportToJson () {
      if (this.rows.length > 0) {
        console.log(JSON.stringify(this.rows))
        const data = JSON.stringify(this.rows)
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
