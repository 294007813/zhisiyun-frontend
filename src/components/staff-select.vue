<template>
<el-dialog
    :visible="visible" :before-close="close"
    custom-class="staff-select" width="600px">
    <p slot="title" class="title">{{title}}</p>
    <div class="content">
        <el-button size="small" @click="toexpand(true)">展开全部</el-button>
        <el-button size="small" style="margin-right: 10px" @click="toexpand(false)">折叠全部</el-button>
        <el-input size="small" style="width: 300px" placeholder="搜索"
                  v-model="value" @change="query">
            <el-button slot="append" icon="el-icon-search" @click="query"></el-button>
        </el-input>

        <g-tree class="tree" ref="tree" v-show="treeShow"
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
let tree=[]
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
            querytree: [],
            expand: false,
            treeShow: true,
        }
    },
    computed:{

    },
    mounted(){
        this.getData()
    },
    methods:{
        // method(name){
        //     return this.$refs.tree[name]
        // },
        query(val){
            this.treeShow=false
            this.tree= JSON.parse(tree)
            console.log("tree", tree)
            console.log("query(val)", val)
            // console.log("this.$refs.tree", this.$refs.tree)
            if(val){
                let fun=this.$refs.tree.ztreeObj
                setTimeout(()=>{
                    this.tree= fun.getNodesByParamFuzzy("name", val)
                    this.treeShow= true
                })
            }else{
                this.treeShow= true
            }

        },
        // queryMethod(value, data, node){
        //     return !value || data.name.includes(value) || value.includes(data.name)
        // },
        getData(){
            this.$axios.get("/admin/im/people_help_json?p_limit=true",{dataLevel: "api"}).then(data=>{
                // let  arr=[]
                // arr= this.goon(data)
                // console.log(arr)
                // this.tree= arr
                tree= JSON.stringify(data)
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
        toexpand(expand){
            let tree=this.$refs.tree.ztreeObj
            tree.expandAll(expand)
        },
        reset(){
            this.tree= JSON.parse(tree)
        },
        ok(){
            let fun=this.$refs.tree.ztreeObj
            let res= _.filter(fun.getCheckedNodes(), (it)=> it.type=="p")
            // console.log("res", res)
            this.$emit("ok", res)
            // console.log(tree.getCheckedNodes(true))
            this.close()
        },
        close(){
            this.reset()
            this.$emit("close")
        }
    }
}
</script>

<style scoped lang="scss">
.staff-select{
    .content{
        padding: 10px 20px;
        min-height: 300px;
        /deep/ .tree{
            min-height: 200px;
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
            .checkbox_true_part:after, .checkbox_true_part_focus:after{
                top: 4px;
                left: 1px;
            }
            .checkbox_true_full:after, .checkbox_true_full_focus:after{
                top: 0;
                left: 3px;
            }
        }
    }
}
</style>