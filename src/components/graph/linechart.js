//import axios from 'axios'
import {Line} from 'vue-chart.js'
//
export default Line.extend({
  mounted () {
    this.renderChart({

      labels: ['S','A','V','A'],

      datasets: [
      {label: 'Activity', backgroundColor: '#dd4b39', data: [9,8,7,9,0]}
      ]
    }, {responsive: true, maintainAspectRatio: false})
  }
})