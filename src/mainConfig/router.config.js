import MP3 from '../components/MP3.vue'
import MP4 from '../components/MP4.vue'

export default [{
	path: '/MP3',
	name: 'MP3',
	component: MP3,
}, {
	path: '/MP4',
	name: 'MP4',
	component: MP4,
}, {
	path: '*',
	redirect: '/MP3'
}]