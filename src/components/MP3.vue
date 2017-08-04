<template>
	<div style="margin-bottom:65px;">
		<div class="container">
			<el-card>
				<el-menu :default-active="activeMp3" @select="changeMp3" class="menu">
					<el-menu-item :name="item" @dblclick.native="play" v-for="(item,index) in mp3List" :key="index" :msg="index" :index="item">{{index+1}} . {{item}}</el-menu-item>
				</el-menu>
				<audio @timeupdate="timeupdate()" id="audio" @pause="pause" @play="play" @canplay="canplay" @ended="ended" :src="mp3Src"></audio>

			</el-card>
		</div>
		<div class="controls">
			<div class="container">
				<div flex class="buttonBox">
					<el-button-group style="vertical-align: top">
						<el-button type="primary" @click.native='prev' icon="d-arrow-left"></el-button>
						<el-button :disabled="!Boolean(activeMp3)" type="primary" @click.native="goAndStop"><i class="el-icon-caret-right" v-show="!isGo"></i><b v-show="isGo" style="width:14px; display: inline-block; height:14px;">||</b></el-button>
						<el-button type="primary" @click.native='next' icon="d-arrow-right"></el-button>
					</el-button-group>
					<el-dropdown style="overflow: visible;" trigger="click" @command="changeMode">
						<el-button type="primary">
							{{mode}}
							<i class="el-icon-caret-bottom el-icon--right"></i>
						</el-button>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item v-for="(item,index) in modeList" :command="item" :key="index">{{item}}</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
					<div style="overflow: visible;" flex-box="1">
						<div flex="dir:left main:justify">
							<div>{{activeMp3}}</div>
							<div>{{formatTooltip(currentTime)}}/{{formatTooltip(duration)}}</div>
						</div>
						<el-slider :disabled="!Boolean(activeMp3)" @mousedown.native="beginSeek($event)" @mouseup.native="seekEnd($event)" @change="currentTimeChange" :max="duration" v-model="currentTime" :format-tooltip="formatTooltip"></el-slider>
					</div>
					<div style="width:30px;text-align: center;">
						<el-popover placement="bottom" width="10px;" trigger="hover">
							<el-slider :max="1" :step="0.01" @change="setVolume" v-model="volume" vertical height="100px">
							</el-slider>
							<i slot="reference" @click="changeMuted" style="font-size: 20px;line-height: 34px;" :class="{fa:true,'fa-bell-o':!isMuted,'fa-bell-slash-o':isMuted}" aria-hidden="true"></i>
						</el-popover>
					</div>
				</div>
			</div>
		</div>

	</div>

</template>

<script>
	export default {
		mounted() {
			debugger;
				this.getFileList();
				this.audioObj = document.getElementById('audio');
				this.audioObj.volume = this.volume;
				this.lastVolume = this.volume;
				this.isGo = !this.audioObj.paused;
				//				this.mp3Src = './mp3/' + this.mp3List[this.currentIndex];
			},
			data() {
				return {
					mp3List: [],
					mp3Src: '',
					currentIndex: -1,
					isGo: null,
					audioObj: null,
					mode: '随机播放',
					modeList: ['单曲播放', '顺序播放', '列表循环', '随机播放'],
					historyList: [],
					currentTime: 0,
					duration: 0,
					isMuted: '',
					isSeeking: false,
					isMuted: false,
					volume: 1,
					lastVolume: null
				};
			},
			methods: {
				beginSeek(e){
					if((e.target.className.indexOf("el-slider__button")!==-1)&&(e.target.className.indexOf("el-tooltip")!==-1)){
						this.isSeeking=true;
					}
				},
				seekEnd(e){
					if((e.target.className.indexOf("el-slider__button")!==-1)&&(e.target.className.indexOf("el-tooltip")!==-1)){
						this.isSeeking=false;
					}
					
				},
				
				//设置音量
				setVolume(val) {
					this.audioObj.volume = val;
					this.volume = val;
					if(val === 0) {
						this.isMuted = true;
					} else {
						this.isMuted = false;
						this.lastVolume = val;
					}
				},
				//静音或取消静音
				changeMuted() {
					if(this.isMuted) {
						this.isMuted = false;
						this.audioObj.volume = this.lastVolume;
						this.volume = this.lastVolume;
					} else {
						this.isMuted = true;
						this.volume = 0;
					}
					this.audioObj.muted = this.isMuted;
				},
				//手动拖动进度条事件
				currentTimeChange(val) {
					if(val === Math.floor(this.audioObj.currentTime)) {
						//不干活
						return;
					}
					if(val === this.duration) {
						//如果拖动到结束，则直接下一首，否则play和pause同时执行有机会报错
						this.next();
					}
					this.audioObj.currentTime = val;
				},
				//进度条更新事件
				timeupdate() {
					//如果正在拖动则不更新先
					if(this.isSeeking) {
						return;
					}
					this.currentTime = Math.floor(this.audioObj.currentTime);
				},
				//设置当前时间
				setDuration() {
					this.duration = this.audioObj.duration;
				},
				//格式化进度条
				formatTooltip(val) {
					var min = Math.floor(val / 60);
					var sec = Math.floor(val % 60);
					if(sec < 10) {
						sec = '0' + sec;
					}
					return min + ':' + sec;
				},
				//停止播放
				pause() {
					this.audioObj.pause();
					this.isGo = false;
				},
				//开始播放
				play() {
					this.audioObj.play();
					this.isGo = true;
					this.setDuration();
					window.scrollTo(0,document.querySelector('[name="'+this.activeMp3+'"]').offsetTop);
				},
				//改变模式
				changeMode(mode) {
					this.mode = mode;
				},
				setMp3Info(src,index){
					this.mp3Src=src;
					this.currentIndex=index;
					this.setHistory(src,index);
				},
				//点击去换歌  并记录在mp3Src和currentIndex上
				changeMp3(item, itemPath, vueComponent) {
					this.setMp3Info(path.join(dirname, 'mp3', item),vueComponent.$attrs.msg);
					//					this.mp3Src = './mp3/' + item;
				},
				//获取文件列表
				getFileList() {
					fs.readdir(dirname + '/mp3', (err, files) => {
						this.mp3List = files;
					})
				},
				//是否可以开始播放
				canplay() {
					this.play();
				},
				//音乐播放完
				ended() {
					if(this.mode === '单曲播放') {
						this.currentTime = 0;
						return;
					}
					this.next(this.currentIndex);
				},
				//下一首
				next() {
					switch(this.mode) {
						case '单曲播放':
							(this.currentIndex === (this.mp3List.length - 1)) ? (this.currentIndex = 0) : this.currentIndex++;
							break;
						case '顺序播放':
							(this.currentIndex === (this.mp3List.length - 1)) ? (this.currentIndex = 0) : this.currentIndex++;
							break;
						case '列表循环':
							(this.currentIndex === (this.mp3List.length - 1)) ? (this.currentIndex = 0) : this.currentIndex++;
							break;
						case '随机播放':
							var index=null;
							do{
								index=parseInt(Math.random() * this.mp3List.length);
							}while(this.currentIndex===index);
							this.currentIndex = index;
							break;
						default:
							(this.currentIndex === (this.mp3List.length - 1)) ? (this.currentIndex = 0) : this.currentIndex++;
							break;
					}
					this.setMp3Info(path.join(dirname, 'mp3', this.mp3List[this.currentIndex]),this.currentIndex);
				},
				//上一首
				prev() {
					if(this.getHistory(1)) {
						var history=this.getHistory(1)
						this.mp3Src = history.mp3Src;
						this.currentIndex=history.currentIndex;
						this.historyList.pop();
					} else {
						(this.currentIndex < 1) ? (this.currentIndex = (this.mp3List.length - 1)) : this.currentIndex--;
						this.setMp3Info(path.join(dirname, 'mp3', this.mp3List[this.currentIndex]),this.currentIndex);
					}
				},
				//播放暂停按钮
				goAndStop() {
					if(this.isGo) {
						this.pause();
					} else {
						this.play();
					}
				},
				setHistory(src,index) {
					this.historyList.push({mp3Src:src,currentIndex:index});
				},
				getHistory(index) {
					return this.historyList[this.historyList.length - 1 - index];
				}
			},
			computed: {
				//保存当前选中的歌
				activeMp3: function() {
					return this.mp3List[this.currentIndex]?this.mp3List[this.currentIndex]:'';
				}
			}
	}
</script>

<style scoped>
	.menu {
		-moz-user-select: none;
		-webkit-user-select: none;
		-ms-user-select: none;
		margin-bottom: 20px;
		overflow: auto;
	}
	
	.controls {
		position: fixed;
		bottom: 0;
		left: 0px;
		padding: 10px 0 0;
		right: 0px;
		background: #FAFAFA;
	}
	
	.controls>.container {
		background: #FAFAFA;
	}
	
	.buttonBox>div {
		margin-right: 10px;
	}
</style>
<style>
	.el-popover {
		min-width: 0px;
	}
	
	.el-slider.is-vertical .el-slider__runway {
		margin: 0 6px;
	}
</style>