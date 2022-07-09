import Sidebar from './Sidebar.vue'
import Panel from './Panel.vue'
import UploadAvatar from './UploadAvatar'
export default {
    install( Vue ){
        Vue.component('CsSidebar', Sidebar)
        Vue.component('CsPanel', Panel)
        Vue.component('CsAvatar', UploadAvatar)
    }
}