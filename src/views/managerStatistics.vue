<template>
  <div class="small">
    <line-chart :chart-data="MostPopularBikes"></line-chart>
    <pie-chart :chart-data="Popularhours"></pie-chart>
    <button @click="popularbikes">Bikes</button>
    <button @click="hours">Busy Hours</button>
  </div>
</template>

<script>
  import LineChart from './LineChart.js'
  import PieChart from './PieChart.js'

  export default {
    components: {
      LineChart,
      PieChart
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
              data: [this.count()]
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
        return Math.floor(Math.random(0)) + 2
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