<template>
  <div class="charts">
    <div class="b">
      <button @click="hours">Busy Hours</button>
      <bar-chart :chart-data="PopularHours"></bar-chart>
    </div>
     <div class="a">
      <button @click="popularbikes">Bikes</button>
      <pie-chart :chart-data="MostPopularBikes"></pie-chart>
    </div>
    <div class="c">
      <button @click="location">Busy Locations</button>
      <line-chart :chart-data="PopularLoc"></line-chart>
    </div>
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
   /* options: {
        legend: {
            display: true,
            position: 'top',
            labels: {
                fontColor: 'rgb(255, 99, 132)'
                ['hello']
            }
        }
    },*/
    mounted () {
      this.popularbikes()
      this.hours(),
      this.location()
    },
    methods: {
      popularbikes () {
        this.MostPopularBikes= {
          labels: ['CB', 'MB','HB', 'RB', 'TB'],
          datasets: [
            {
              label: 'Most Popular Bikes',
              backgroundColor: '#f87979',
              borderColor: '#fff',
              hoverBackgroundColor: 'red',
              data: [this.count(), this.count(), this.count(), this.count(), this.count()]
            }
          ]
        }
      },
      hours() {
        this.PopularHours = {
          labels: ['10am', '12pm' , '2pm', '4pm', '6pm'],
          datasets: [
            {
              label: 'Busy Hours',
              backgroundColor: '#f87679',
              data: [this.count(), this.count(),this.count(), this.count(), this.count()]
            }
          ]
        }
      },
      location () {
        this.PopularLoc = {
          labels: ['Hendersons', 'Old Town', 'Crewe Rd.', 'Queen St.' ,'Parsons Green Primary'],
          datasets: [
            {
              label: 'Busy Locations',
              backgroundColor: '#f87479',
              data: [this.count(), this.count(), this.count(), this.count(), this.count()]
            }
          ]
        }
      },
      count () {
        return Math.random() * (12)
      },
      //getTime () {
        //return this.startTime()
      //}
    },
  }
</script>

<style>
  .small {
    max-width: 100%;
  }
  .b {
    max-width: 40%;
    margin-right: auto;
    margin-left: auto;
    
  }
  .a {
    max-width: 40%;
    margin-right: auto;
    margin-left: auto;
  }
  .c {
    max-width: 40%;
    margin-right: auto;
    margin-left: auto;
  }
</style>