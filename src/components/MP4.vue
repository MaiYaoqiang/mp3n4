<template>
	<div class="container">
		<el-card>
			<el-menu default-active="">
				<el-menu-item @click="setMp4(item)" v-for="(item,index) in mp4List" :key="index" :index="index.toString()">{{item}}</el-menu-item>
			</el-menu>
			<video :src="mp4Src" controls="controls">
				<source :src="mp4Src" type="video/ogg">
				<source :src="mp4Src" type="video/mp4">
				<source :src="mp4Src" type="video/webm" /> 浏览器暂时只支持ogg MP4 webm3种格式
			</video>
		</el-card>
	</div>
</template>

<script>
	export default {
		created() {
				this.getFileList();
			},
			data() {
				return {
					mp4List: ['Javascript之VueJS第一讲（1）.mp4', 'Javascript之VueJS第一讲（2）.mp4', '上午01-课程安排.avi'],
					mp4Src: './mp4/Javascript之VueJS第一讲（1）.mp4'
				};
			},
			methods: {
				setMp4(item) {
					//					this.mp4Src = path.join(dirname, 'mp4', item);
					this.mp4Src = './mp4/' + item;
					//					console.log(this.mp4Src);
				},
				getFileList() {
					//					fs.readdir(dirname + '/mp4', (err, files) => {
					//						this.mp4List = files;
					//					})
				}
			}
	}
</script>

<style scoped>

</style>