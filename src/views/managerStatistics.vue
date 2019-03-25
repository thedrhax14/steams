<template>
  <div class="small">
    <bar-chart :chart-data="MostPopularBikes"></bar-chart>
   // <line-chart :chart-data="Popularhours"></line-chart>
    <button @click="popularbikes">Bikes</button>
    <button @click="hours">Busy Hours</button>
  </div>
</template>

<script>
  import BarChart from './BarChart.js'
  //import LineChart from './LineChart.js'

  export default {
    components: {
      BarChart,
     // LineChart
    },
    data () {
      return {
        MostPopularBikes: null
      }
    },
    mounted () {
      this.popularbikes()
      this.hours()
    },
    methods: {
      popularbikes () {
        this.MostPopularBikes = {
          labels: ['CB', 'MB','HB', 'RB', 'TB'],
          datasets: [
            {
              label: 'Most Popular Bikes',
              backgroundColor: '#f87979',
              data: [this.count(), this.count(), this.count(), this.count(), this.count()]
            }
          ]
        }
      },
      hours () {
        this.PopularHours = {
          labels: [this.getTime()],
          datasets: [
            {
              label: 'Busy Hours',
              backgroundColor: '#f87979',
              data: [this.count()]
            }
          ]
        }
      },
      count () {
        return Math.floor(Math.random() * (50 - 1 + 5)) + 5
      },
      getTime () {
        return this.$store.state.history.filter(
          startTime
        )
      }
    }
  }
</script>

<style>
  .small {
    max-width: 600px;
    margin:  150px auto;
  }
</style>