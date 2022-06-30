<template>
  <div>
    <cs-panel>
      <!-- 新增嵌套表单弹层 -->
      <el-dialog 
      :title="(action === 'add'?'新增' : '修改')+'用户'" 
      :visible.sync="visible" 
      :close-on-click-modal="false"
      append-to-body
      width="430px" >
        <el-form :model="form" ref="myform" label-width="60px" :rules="rules">
          <el-form-item label="账户" prop="username">
            <el-input v-model="form.username" :readonly="action==='edit'" placeholder="请输入账户"></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="password" :rules="{required: action==='add', message:'请输入密码！'}" >
            <el-input v-model="form.password" type="password" show-password :placeholder="action==='edit' && '不修改为空'"></el-input>
          </el-form-item>

          <el-form-item label="昵称" prop="nickname">
            <el-input v-model="form.nickname" ></el-input>
          </el-form-item>

          <el-form-item label="手机" prop="mobile">
            <el-input v-model="form.mobile" :readonly="action==='edit'"></el-input>
          </el-form-item>

          <el-form-item label="头像" >
            <el-input v-model="form.avatar" ></el-input>
          </el-form-item>

          <el-form-item label="角色" prop="roleid">
            <el-select v-model="form.roleid" placeholder="请选角色" >
              <el-option 
              :label="item.name"
              v-for="item in roles"
              :key="item.id"
              :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="visible = false">取 消</el-button>
          <el-button type="primary" @click="save">确 定</el-button>
        </div>
      </el-dialog>
      
      <div class="panel-search">
        <div class="filter">
            <el-button 
            type="danger"
            size="small"
            v-if="ids.length"
            @click="remove( ids )"
            >批量删除</el-button>

            <el-select
            placeholder="是否审核"
            style="width: 120px"
            clearable
            v-model="form.status"
            size="small">
              <el-option :value="1" label="未审核" />
              <el-option :value="2" label="已审核" />
            </el-select>

            <el-input
            size="small"
            style="width: 180px"
            clearable
            placeholder="请输入手机/昵称"
            v-model="form.keyword"
            ></el-input>
          </div>
            <el-button
            size="small"
            type="danger"
            icon="el-icon-plus"
            @click="add"
            >新增</el-button>
      </div>
      <el-table
        :row-class-name="rowClassName"
        @selection-change="seletionChange"
        class="panel-table"
        :data="searchData"
        ref="mytable"
        stripe>
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="头像"
          prop="avatar"
          v-slot="scope"
          width="100">
           <el-avatar :size="40" :src="scope.row.avatar" fit="contain"></el-avatar>
        </el-table-column>
        <el-table-column
          prop="username"
          label="账号">
        </el-table-column>

        <el-table-column
          prop="rolename"
          label="角色"
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          prop="nickname"
          label="昵称"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="手机"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          v-slot="scope"
          label="审核">
          <el-switch
          :active-value="2"
          :inactive-value="1"
          @change="qstate( scope.row)"
          v-model="scope.row.state" />
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作"
          v-slot="scope"
          width="150">
          <el-button size="mini" @click="edit( scope.row)">修改</el-button>
          <el-button size="mini" type="danger" @click="remove( [scope.row.id] )">删除</el-button>
        </el-table-column>
      </el-table>
      <!-- 分页代码 -->
      <el-pagination
        class="rowClassName"
        background
        layout="prev, pager, next, total, sizes"
        :total="searchData.length"
        :page-sizes="[1,2,3,4,5]"
        :page-size.sync="condition.pagesize"
        :current-page.sync="condition.page">
        
      </el-pagination>
    </cs-panel>
  </div>
</template>

<script>
export default {
  data() {
      return {
        formLabelWidth: '120px',
        condition:{
          state:'',
          keyword:'',
          page: 1,
          pagesize: 2,
          start(){
          return (this.page-1) * this.pagesize;
          },
          end(){
            return this.start() + this.pagesize;
          }
        },
        tableData: [],
        // 定义根据id删除数据
        ids: [],
         start(){
          return (this.page-1) * this.pagesize;
        },
        end(){
          return this.start() + this.pagesize;
        },
        // 控制弹框显示
        visible: false,
        // 修改动作标识
        action: 'add',
        // 收集数据
        form: {},
        rules:{
          username: {required: true, message:'账号不能为空'},
          mobile: {required: true, message:'手机不能为空'},
          roleid: {required: true, message:'请选择角色'}
        },
        roles: []
      };
    },
    computed:{
      searchData(){
        let { state, keyword } = this.condition;
        return this.tableData.filter( item => {

          return (state ? item.state === state : true) && 
                  ( item.nickname.includes(keyword)  || item.mobile.includes(keyword));
        })
      }
    },
    created(){
        this.read()
        this.findRoles()
    },

    methods: {
      read(){
        this.$http.get('admin/list').then( res => {
          // mock数据
          if(res.result.err > 0){
            this.$message.error(res.desc)
          }else{
              this.tableData = res.result;
          }

          // 数据库获取数据
          /* if(res.err > 0){
            this.$message.error('获取数据失败')
          }else{
            this.tableData = res.result
          }
          console.log(res.result); */
          
        })
      },
      rowClassName( {rowIndex} ){
        return { visible: rowIndex >= this.condition.start() && rowIndex < this.condition.end()}
      },
      seletionChange( data ){
        this.ids = data.map(item => item.id).slice(this.condition.start(), this.condition.end())
      },
      remove( ids ){
      this.$confirm('您确定要上出所选项吗？','提示').then( () => {
        this.$http.post('admin/delete', {ids: ids}).then(res => {
          if(res.err >0 ){
            this.$message.error( res.desc);
          }else{
            // 重新刷新页面
            this.read()
          }
        })
        
      }).catch( () => {
        this.$refs.mytable.clearSelection();
      })
      },
      qstate( { id, state }){
        this.$http.post('admin/state', { id, state }).then(res => {
          if(res.err >0 ){
            this.$message.error( res.desc);
          }else{
            this.$message.success( '状态已改变')
          }
        })
        /* this.$http.post('http://localhost:3030/changeState', { id, state }).then(res => {
          if(res.err >0 ){
            this.$message.error( res.desc);
          }else{
            this.$message.success( '状态已改变')
          }
          console.log(res);
        }) */
      },
      // 新增用户
      add(){
        this.visible = true
        this.form = {}
        this.action = 'add';
      },
      edit(row ){
        this.visible = true;
        this.form = {...row}
        this.action = 'edit';
      },
      save(){
        this.$refs.myform.validate((valid) => {
          if(valid){
            this.$http.post('admin/'+this.action, this.form).then(res => {
              if(res.err > 0){
                this.message.error( res.desc )
              }else{
                this.read();
                this.$message.success( res.desc)
              }
            })

            this.visible = false;
          }
        })
      },
      findRoles(){
        this.$http.get('role/list').then(res=> {
          if(res.err > 0){
                this.message.error( res.desc )
              }else{
                this.roles = res.result
              }
        })
      }
    },
    
}
</script>

<style>

</style>
