<template>
	<div class="head">
		<div class="container">
			<el-menu theme="dark" :default-active="currentActive" :router="true" class="el-menu-demo" mode="horizontal" @select="handleSelect">
				<el-menu-item index="/MP3">MP3</el-menu-item>
				<el-menu-item index="/MP4">MP4</el-menu-item>
			</el-menu>
		</div>

	</div>

</template>

<script>
	export default {
		data() {
				return {
					currentActive: '/MP3'
				};
			},
			created() {
				//初始化当前路径
				this.getCurrentActive(this.$route.fullPath);
			},
			methods: {
				handleSelect() {

				},
				getCurrentActive(path) {
					this.currentActive = path;
				}
			},
			watch: {
				$route: function() {
					//监测到$route改变时改变currentActive
					this.getCurrentActive(this.$route.fullPath);
				}
			}
	}
</script>

<style scoped>
	.head {
		background-color: #324157;
		position: fixed;
		width: 100%;
		z-index: 100;
		top:0;
	}
</style>