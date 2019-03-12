<template>
  <div id="home">
    <img alt="Vue logo" src="../assets/images/SPINlogowhite.png">
    <InstalledPlugins v-bind:biketypeid="1234567890"/>
  </div>
</template>

<script>
// @ is an alias to /src
import InstalledPlugins from '@/components/InstalledPlugins.vue'

export default {
	name: 'home',
	components: {
		InstalledPlugins
	}
}
</script>
