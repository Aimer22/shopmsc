<template>
  <div class="panel">
    <div class="panel-header">
      <h1>{{title || autoTitle}}</h1>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
        v-for="item in navs"
        :to="{ path: item.path }"
        :key=" item.path "
        >{{item.name}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="panel-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { findParentPath } from '../utils'
export default {
  props: {
    title: String
  },
  computed: {
    navs(){
      let sidenavs = this.$store?.state?.sidenavs || [];
      let path = this.$route?.path || 'dashboard';
      //path = path.slice(path.lastIndexOf('/') + 1);
      let arr=findParentPath(sidenavs, path) 
      let result = [{name: '后台首页',path: '/control'}].concat( arr|| {name:'404'} );
      return result
    },
    autoTitle(){
      return this.navs[this.navs.length-1]['name']
    }
  }
}
</script>

<style>
.el-breadcrumb__inner.is-link{
  font-weight: normal;
}
</style>

<style lang="less" scoped>
.panel{
  background-color: white;
  border-radius: 4px;
  padding: 20px;
  box-shadow: 0 0 4px rgba(0, 0, 0, .1);

  .panel-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    h1{
      font-size: 20px;
      color: black;
    }

  }
}
</style>
