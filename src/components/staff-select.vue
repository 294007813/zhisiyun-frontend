<template>
<el-dialog
    :visible="visible" :before-close="close"
    custom-class="staff-select" width="600px">
    <p slot="title" class="title">{{title}}</p>
    <div class="content">
        <el-button size="small" @click="reset(true)">展开全部</el-button>
        <el-button size="small" style="margin-right: 10px" @click="reset(false)">折叠全部</el-button>
        <el-input size="small" style="width: 300px" placeholder="搜索"
                  v-model="value" @change="query">
            <el-button slot="append" icon="el-icon-search" @click="query"></el-button>
        </el-input>

<!--        <el-tree class="tree" ref="tree" node-key="id" label="name"-->
<!--                 :render-after-expand="false"-->
<!--                 highlight-current show-checkbox v-if="show"-->
<!--                 :filter-node-method="queryMethod" :default-expand-all="expand" :data="tree">-->
<!--            <span class="tree-node" slot-scope="{ node, data }">-->
<!--                <i :class="data.type=='o' ?'fa fa-folder':'el-icon-user-solid'"></i>-->
<!--                <span>{{ node.label }}</span>-->
<!--            </span>-->
<!--        </el-tree>-->
        <g-tree
                class="tree" ref="tree"
                :setting="setting" :nodes="tree"></g-tree>
    </div>
    <p slot="footer" class="footer">
        <el-button plain size="small" @click="close">取消</el-button>
        <el-button type="primary" size="small" @click="ok">确认</el-button>
    </p>
</el-dialog>
</template>

<script>
/**
 * 员工选择树形组件
 * 点确定后向父组件触发"ok"事件，返回 参数1为被选中叶子节点id，2为被选中节点数据
 * 如果父级要调用其他树方法，调用"method"方法传入树方法名
 * **/
import GTree from "vue-giant-tree";
export default {
    name: "staff-select",
    components:{ GTree},
    props:{
        title:{default: '选择员工'},
        visible:{default: false},
    },
    data(){
        return{
            value: "",
            setting: {
                check: {
                    enable: true
                },
                data: {
                    simpleData: {
                        enable: true,
                        pIdKey: "pId"
                    }
                },
                view: {
                    expandSpeed: false,
                }
            },
            tree: [],
            expand: false,
            show: true
        }
    },
    mounted(){
        this.getData()
    },
    methods:{
        // method(name){
        //     return this.$refs.tree[name]
        // },
        query(){
            this.$refs.tree.setCheckedKeys([])
            this.$refs.tree.filter(this.value)
        },
        // queryMethod(value, data, node){
        //     return !value || data.name.includes(value) || value.includes(data.name)
        // },
        getData(){
            this.$axios.get("/admin/im/people_help_json",{dataLevel: "api"}).then(data=>{
                // let  arr=[]
                // arr= this.goon(data)
                // console.log(arr)
                // this.tree= arr
                this.tree= data
                // console.log(this.tree)
            })
        },
        // goon( l){
        //     while(true){
        //         let i1= null
        //         if(l[0].ischecked) break
        //         i1= l.shift()
        //         i1.label= i1.name
        //         i1.ischecked= true
        //         if(i1.pId){
        //             if( !this.match( i1, l) ){
        //                 l.push(i1)
        //             }
        //         }else{
        //             l.push(i1)
        //         }
        //     }
        //     return l
        // },
        // match(it, l){
        //     let match= false
        //     for(let i in l){
        //         if(it.pId=== l[i].id){
        //             l[i].children? l[i].children.push(it): l[i].children= [it]
        //             match= true
        //         }else if(l[i].children){
        //             if(this.match( it, l[i].children)){
        //                 match= true
        //             }
        //         }
        //     }
        //     return match
        // },
        reset(expand){
            if(this.expand== expand) return
            this.expand= expand

            let tree=this.$refs.tree
            console.log(tree)
                // , checked= tree.getCheckedKeys(true)
            tree.ztreeObj.expandAll(expand)


            // this.show= false
            // this.$nextTick(() => {
            //     this.show= true
            //     this.$nextTick(() => {
            //         let tree=this.$refs.tree
            //         tree.setCheckedKeys(checked)
            //     })
            // })
        },
        ok(){
            let tree=this.$refs.tree
            this.$emit("ok", tree.getCheckedKeys(true), tree.getCheckedNodes(true))
            // console.log(tree.getCheckedNodes(true))
            this.$emit("close")
        },
        close(){
            this.reset(true)
            this.$emit("close")
        }
    }
}
</script>

<style scoped lang="scss">
.staff-select{
    .content{
        padding: 10px 20px;
        /deep/ .tree{
            margin-top: 10px;
            padding-top: 10px;
            border-top: 1px solid #DCDFE6;
            max-height: 400px;
            overflow: auto;
            /*.fa-folder{*/
            /*    color: #e0e000;*/
            /*}*/
            /*.el-tree-node > .el-tree-node__children{*/
            /*    transition: none!important;*/
            /*}*/
            .button.chk:after{
                top: 0;
                left: 3px;
            }
        }
    }
}
</style>