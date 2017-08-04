<template>
	<div id="app">
		<header-view></header-view>
			<transition name="el-fade-in">
				<keep-alive>
					<router-view class="Router" style="margin-top:60px;"></router-view>
				</keep-alive>
			</transition>
	</div>
</template>

<script>
import headerView from './components/headerView.vue'

	export default {
		name: 'app',
		data() {
			return {
				
			};
		},
		components: {
			headerView
		}
	}
</script>

<style>
	
	
</style>