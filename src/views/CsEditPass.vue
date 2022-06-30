<template>
<!-- 我是修改密码页面 -->
    <cs-panel>
        <el-button @click="send()">测试</el-button>
    </cs-panel>
</template>

<script>
export default {
    methods:{
        send(){
            this.$http.get('admin/list').then( res => {
                console.log(res);
            })
        }
    }
}
</script>