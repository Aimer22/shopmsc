<template>
    <!-- 产品分类管理 -->
  <div>
    <cs-panel>
      <!-- 新增嵌套表单弹层 -->
      <el-dialog 
      :title="(action === 'add'?'新增' : '修改')+'类别'" 
      :visible.sync="visible" 
      :close-on-click-modal="false"
      append-to-body
      width="430px" >
        <el-form :model="form" ref="myform" label-width="100px" :rules="rules">

          <el-form-item label="类别名称" prop="name">
            <el-input v-model="form.name" />
          </el-form-item>

          <el-form-item label="类别图片" >
            <el-upload
              class="myupload"
              :on-success="uploadSuccess"
              :before-upload="beforeUpload"
              id="my_avatar"
              action="http://cloud.scnew.com.cn/api/user/upload"
              :headers="headers"
              style="width: 260px; height: 85px"
              :auto-upload="true">
              <img v-if="form.picurl" :src="form.picurl">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

        <el-form-item label="排序" prop="ordeid">
            <el-input-number v-model="form.ordeid" />
        </el-form-item>

        <el-form-item label="审核" prop="orderid">
            <el-switch v-model="form.ordeid" 
                :active-value="2"
                :inactive-value="1"/>
        </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="visible = false">取 消</el-button>
          <el-button type="primary" @click="save">确 定</el-button>
        </div>
      </el-dialog>
      
      <!-- 修改头像弹层 -->
      <el-dialog title="修改头像" :visible.sync="openEditAvatar">
        <el-form :model="form">
          <!-- 插入上传头像组件 -->
          <cs-avatar ref="my_avatar"></cs-avatar>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="danger" @click="openEditAvatar= false">取 消</el-button>
          <el-button type="primary" @click="uploadConfirm">确 定</el-button>
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
        :default-sort="{prop: 'orderid', order: 'ascending'}"
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
          prop="orderid"
          label="排序"
          width="55">
        </el-table-column>
        <el-table-column
          label="类别图片"
          v-slot="scope"
          ref='ownavatar'
          width="200">
            <el-image :src="scope.row.picurl" fit='cover'></el-image>
        </el-table-column>
        <el-table-column
          prop="name"
          label="类别名称">
        </el-table-column>

        <el-table-column
          prop="addtime"
          label="注册日期"
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
        openEditAvatar: false,
        // 修改动作标识
        action: 'add',
        // 收集数据
        form: {},
        rules:{
          name: {required: true, message:'产品名称不能为空'},
          orderid: {required: true, message:'请输入排序号码'}
        },
        roles: [],
        // 存放上传头像组件的数据
        avatarList:{
          avatarid: '',
          // 后台返回的图片地址
          avatarPath:''
        },
        // 头像上传信息
        headers:{'SC-Token': 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIyOSIsImF1ZCI6InRlc3QiLCJpYXQiOjE2MTg0NzU3MjQsInJvbGVzIjoiNCIsImV4cCI6MTk3ODQ3NTcyNH0.19x5PJCUsO6PEX5verFFmuPpQYMkxsShoTRkvW2w_2w'}
      };
    },
    computed:{
      searchData(){
        let { state, keyword } = this.condition;
        return this.tableData.filter( item => {
            let reg = new RegExp(keyword,'ig');
          return (state ? item.state === state : true) && reg.test(item.name);
        })
      }
    },
    created(){
        this.read()
        // this.findRoles()
    },

    methods: {
      read(){
        this.$http.get('productcate/list').then( res => {
          // mock数据
          if(res.result.err > 0){
            this.$message.error(res.desc)
          }else{
            console.log(res);
              this.tableData = res.result;
          }
        })
          // 数据库获取数据
          /* this.$http.get('http://localhost:3030/getUser').then( res => {
            if(res.err > 0){
              this.$message.error('获取数据失败')
            }else{
              this.tableData = res.result
              // 将所有的头像地址设置成项目相对地址
              this.tableData.map(item => {
                if(item.avatar){
                  return item.avatar = 'http://localhost:3030'+item.avatar.split('public')[1];
                  
                }
                
              })
            }
            console.log(this.tableData);
          
        }) */
      },
      rowClassName( {rowIndex} ){
        return { visible: rowIndex >= this.condition.start() && rowIndex < this.condition.end()}
      },
      seletionChange( data ){
        this.ids = data.map(item => item.id).slice(this.condition.start(), this.condition.end())
      },
      remove( ids ){
      this.$confirm('您确定要上出所选项吗？','提示').then( () => {
        this.$http.post('productcate/delete', {ids: ids}).then(res => {
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
        this.$http.post('productcate/state', { id, state }).then(res => {
          if(res.err >0 ){
            this.$message.error( res.desc);
          }else{
            this.$message.success( '状态已改变')
          }
        })
        console.log({id, state});
        // 数据获取数据
       /*  this.$http.post('http://localhost:3030/changeState', {id, state}).then(res => {
          if(res.err >0 ){
            this.$message.error( '执行错误');
          }else{
            this.$message.success( res.desc)
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
            this.$http.post('productcate/'+this.action, this.form).then(res => {
              if(res.err > 0){
                this.$message.error( res.desc )
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
                this.$message.error( res.desc )
              }else{
                this.roles = res.result
              }
        })
      },
      editAvatar( {id}  ){
        this.openEditAvatar = true
        this.avatarList.avatarid = id;
      },
      // 确认上传头像
      uploadConfirm(){
        let param = new FormData()
        console.log(this.$refs.my_avatar.filelist[0]);
        
        this.$refs.my_avatar.filelist.forEach(item => {
          console.log(item.raw);
          param.append('file', item.raw)
        })
        param.append('avatarid',this.avatarList.avatarid)
        this.$http.post('http://localhost:3030/uploadAvatar', param).then(res => {
          if(res.err > 0){
            this.$message.error(res.desc)
          }else{
            console.log(res.avatarImg);
            this.avatarList.avatarPath = this.avatarImg
            this.$message.success('保存成功！')
          }
        })
        
        
        
      },
      beforeUpload( file ){
         const ext = file.type.split('/')[1].toLowerCase();
          const isPic = ['jpeg', 'png', 'gif', 'jpg', 'webp']
          const isLt2M = file.size / 1024 / 1024 < 2
          if ( !isPic.includes(ext) ) this.$message.error('上传图片只能是 ' + isPic + ' 格式!')
          if ( !isLt2M ) this.$message.error('上传图片大小不能超过 2MB!')
          return isPic && isLt2M
      },
      uploadSuccess( res ) {
        if ( res.err > 0 ) {
          this.$message.error( res.desc )
        } else {
          this.$message.success( res.desc )
          this.$set(this.form, 'picurl', res.result)
        }
      },
    },
    
}
</script>

<style>

</style>
