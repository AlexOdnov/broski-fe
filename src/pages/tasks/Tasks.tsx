import { defineComponent } from 'vue'

import style from './HelloWorld.module.css'

const TasksPage = defineComponent({
	name: 'TasksPage',
	setup() {
		return () => <div>Tasks Page</div>
	}
})

export default TasksPage
