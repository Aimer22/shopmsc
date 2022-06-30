<template>
  <el-container style="height:100vh">
  <el-aside width="auto" >
    <router-link class="logo" to='/control'></router-link>
    <cs-sidebar :data="$store.state.sidenavs" />
    <!-- <el-row class="tac" >
        <el-menu
          class="my-menu"
          background-color="#545c64"
          text-color="#fff"
          :collapse="$store.state.isCollapse"
          unique-opened
          router
          active-text-color="#ffd04b">

          
          
          <el-submenu index="1-4">
            
            <template slot="title">
              <i class="el-icon-s-platform"></i>
              <span>控制面板</span>
            </template>

            <el-menu-item index="1-1">管理首页</el-menu-item>
            <el-submenu index="1-2">
              <template slot="title">
                <span>数据备份</span>
              </template>
              <el-menu-item index="1-2-1">三级栏目1</el-menu-item>
              <el-menu-item index="1-2-2">三级栏目2</el-menu-item>
            </el-submenu>
          </el-submenu>


          <el-submenu index="2-4">
            
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span>用户管理</span>
            </template>

            <el-menu-item index="2-1">管理首页</el-menu-item>
          </el-submenu>


          <el-submenu index="3-4">
            
            <template slot="title">
              <i class="el-icon-s-goods"></i>
              <span>产品管理</span>
            </template>

            <el-menu-item index="3-1">产品分类</el-menu-item>
            <el-menu-item index="3-1">产品列表</el-menu-item>
          </el-submenu>

          <el-submenu index="4-4">
            
            <template slot="title">
              <i class="el-icon-news"></i>
              <span>新闻管理</span>
            </template>

            <el-submenu index="4-1">
                <template slot="title">
                <span>新闻列表</span>
            </template>
              <el-menu-item index="4-1-1">公司新闻</el-menu-item>
              <el-menu-item index="4-1-2">行业新闻</el-menu-item>
            </el-submenu>
            <el-menu-item index="3-1">发布新闻</el-menu-item>
            
          </el-submenu>

          
        </el-menu>
    </el-row> -->
  </el-aside>
  <el-container>
    <el-header>
      <div class="search">
        <el-button class="btn" icon="el-icon-s-fold" size="mini" 
         @click="$store.commit('collapseAside')"
        />
        <el-input placeholder="请输入关键字" size="small" suffix-icon="el-icon-search" class="keyword"></el-input>
      </div>
      <div class="menu">
        <router-link to='/control'>
          <i class="el-icon-house"></i>
        </router-link>

        <el-badge :value="12">
          <i class="el-icon-bell"></i>
        </el-badge>

        <el-dropdown trigger="click" @command="onCommand">
          <span class="el-dropdown-link">
            <el-avatar shape="square" :size="30" :src="require('@/assets/img/avatar.jpg')"></el-avatar>
            曹帅
          </span>
          <el-dropdown-menu style="width:140px">
            <el-dropdown-item command="/control/setting" icon="el-icon-setting">个人设置</el-dropdown-item>
            <el-dropdown-item command="/control/editpass" icon="el-icon-lock">修改密码</el-dropdown-item>
            <el-dropdown-item command="/control/upgrade" icon="el-icon-refresh">在线升级</el-dropdown-item>
            <el-dropdown-item command="logout" icon="el-icon-switch-button">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
export default {
  methods:{
    onCommand( command){
      if( command === 'logout'){
        this.$confirm('您确定要退出当前账户吗?', '提示', {
          confirmButtonText: '退出',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 删除本地的token
          localStorage.removeItem('CS-Token');
          // 删除token后跳转到登录界面
          this.$router.replace('/login');
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });

      }else{
        this.$router.push(command)
      }
    }
  }
}
</script>

<style scope lang="less">
.el-header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, .1);
  .search {
    .btn{
      margin-right: 12px;
    }
    .keyword{
      width: 200px;
    }
  }
  .menu{
    display: flex;
    align-items: center;
    .el-badge{
      margin-left: 15px;
    }
    [class *= 'el-icon']{
      font-size: 18px;
      vertical-align: middle;
    }
    .el-dropdown{
      margin-left: 20px;
    }
    .el-dropdown-link{
      display: flex;
      align-items: center;
      cursor: pointer;
      .el-avatar{
        margin-right: 8px;
      }
    }
  }
}

.el-aside{
  background-color: white;
  box-shadow: 1px 0px 3px rgba(0, 0, 0, .1);
  z-index: 10;

}
.logo{
  display: block;
  height: 60px;
  background: url(../assets/img/logo_light.png) no-repeat 0 50%;
}

</style>
