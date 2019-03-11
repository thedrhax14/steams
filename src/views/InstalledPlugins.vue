<template>
  <div id="home">
    <img alt="Vue logo" src="../assets/images/SPINlogowhite.png">
    <InstalledPlugins v-bind:msg="{
			content: 'nested object',
			userdata: {
				permission: 'Operator',
				displayname: 'Salva'
			}
		}
	"/>
  </div>
</template>

<script>
// @ is an alias to /src
import InstalledPlugins from '@/components/InstalledPlugins.vue'

export default {
	name: 'home',
	components: {
		InstalledPlugins
	},
	data () {
		return {
			msgdata: {
				
			}
		}
	}
}
</script>
