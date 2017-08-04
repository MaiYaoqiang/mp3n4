import Vue from 'vue'
//*****element-ui组件引入开始
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
import {
	row,
	col,
	steps,
	step,
	upload,
	button,
	card,
	radio,
	select,
	option,
	checkboxGroup,
	checkbox,
	tag,
	menu,
	menuItem,
	input,
	pagination,
	dialog,
	datePicker,
	popover,
	loading,
	MessageBox,
	submenu,
	buttonGroup,
	dropdownMenu,
	dropdown,
	dropdownItem,
	slider
} from 'element-ui'
Vue.use(row)
Vue.use(col)
Vue.use(steps)
Vue.use(step)
Vue.use(upload)
Vue.use(button)
Vue.use(card)
Vue.use(radio)
Vue.use(select)
Vue.use(option)
Vue.use(checkboxGroup)
Vue.use(checkbox)
Vue.use(tag)
Vue.use(menu)
Vue.use(menuItem)
Vue.use(input)
Vue.use(pagination)
Vue.use(dialog)
Vue.use(datePicker)
Vue.use(CollapseTransition)
Vue.use(popover)
Vue.use(loading)
Vue.use(submenu)
Vue.use(buttonGroup)
Vue.use(dropdownMenu)
Vue.use(dropdown)
Vue.use(dropdownItem)
Vue.use(slider)


//原型上添加实例
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
	//*****element-ui组件引入结束