import Sidebar from './Sidebar.vue'
import Panel from './Panel.vue'
export default {
    install( Vue ){
        Vue.component('CsSidebar', Sidebar)
        Vue.component('CsPanel', Panel)
    }
}