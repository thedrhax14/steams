<template>
  <div class="small">
    <h>
      <button @click="popularbikes">Bikes</button>
      <button @click="hours">Busy Hours</button>
      <button @click="location">Busy Locations</button>
    </h>
    <bar-chart :chart-data="MostPopularBikes"></bar-chart>
    <line-chart :chart-data="PopularHours"></line-chart>
    <pie-chart :chart-data="PopularLoc"></pie-chart>
  </div>
</template>

<script>
  import BarChart from './BarChart.js'
  import LineChart from './LineChart.js'
  import PieChart from './PieChart.js'

  export default {
    components: {
      BarChart,
      LineChart,
      PieChart
    },
    data () {
      return {
        MostPopularBikes: null,
        PopularHours: null,
        PopularLoc: null
      }
    },
    mounted () {
      this.popularbikes()
      this.hours(),
      this.location()
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
          labels: ['h', 'i'],
          datasets: [
            {
              label: 'Busy Hours',
              backgroundColor: '#f87679',
              data: [this.count(), this.count()]
            }
          ]
        }
      },
      location () {
        this.PopularLoc = {
          labels: ['h', 'i', 'j', 'k'],
          datasets: [
            {
              label: 'Busy Locations',
              backgroundColor: '#f87479',
              data: [this.count(), this.count(), this.count(), this.count()]
            }
          ]
        }
      },
      count () {
        return Math.random() * (12)
      },
      getTime () {
        return this.startTime()
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