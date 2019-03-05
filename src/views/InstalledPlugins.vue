<template>
  <div id="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <InstalledPlugins msg="Welcome to STEAMS"/>
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
