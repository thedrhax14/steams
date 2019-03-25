<template>
    <div v-if='datacollection' class="small">
        <line-chart :chart-data="datacollection"></line-chart>
        <button @click="fillData">Randomize</button>
    </div>
</template>

<script>
import LineChart from './LineChart.js'

export default {
    components: {
        LineChart
    },
    data () {
        return {
            datacollection: null
        }
    },
    mounted () {
        this.fillData()
    },
    methods: {
        fillData () {
            this.datacollection = {
                labels: ['S', 'V'],
                datasets: [
                {
                    label: 'Data One',
                    backgroundColor: '#f87979',
                    data: [5,6,7, 8]
                }
                ]
            }
        },
        getRandomInt () {
            return Math.floor(Math.random() * (50 - 5 + 1)) + 5
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