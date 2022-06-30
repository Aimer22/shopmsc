<script>
export default {
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  computed: {
    defaultActive () {
      // const path = this.$route?.path || 'dashboard'
      // return path.slice(path.lastIndexOf('/') + 1)
      return this.$route?.path || '/control/dashboard';
    }
  },
  render () {
    // 该插件使用了JSX语法实现，它是一个递归组件
    const treeMenu = data => {
      return data.map(item => {
        const hasChildren = item.children && item.children.length
        return hasChildren
          ? (
          <el-submenu index={ 'submenu' + item.id }>
            <template slot="title">
              <i class={ item.icon } />
              <span slot="title">{ item.name }</span>
            </template>
            { treeMenu(item.children) }
          </el-submenu>)
          : (
          <el-menu-item index={ item.path }>
            <i class={ item.icon } />
            <span slot="title">{ item.name }</span>
          </el-menu-item>
            )
      })
    }

    return (
      <el-menu
      class="sidebar"
      default-active={this.defaultActive}
      collapse={this.$store.state.isCollapse}
      unique-opened
      router
      >
        {treeMenu(this.data)}
      </el-menu>
    )
  }
}
</script>

<style lang="less">
.sidebar{
  border-right: none;
  &:not(.el-menu--collapse){
    width: 200px;
  }
}
</style>
