<template>
<el-dialog
    :visible="visible"
    custom-class="staff-select"
    width="600px">
    <p slot="title" class="title">{{title}}</p>
    <div class="content">
        <el-button size="small">展开全部</el-button>
        <el-button size="small" style="margin-right: 10px">折叠全部</el-button>
        <el-input size="small" style="width: 300px"
                  v-model="query" placeholder="搜索">
            <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-tree
                class="tree"
                :data="tree"
                show-checkbox
                >
        </el-tree>
    </div>
    <p slot="footer" class="footer">
        <el-button plain size="small">取消</el-button>
        <el-button type="primary" size="small">确认</el-button>
    </p>
</el-dialog>
</template>

<script>
export default {
    name: "staff-select",
    props:{
        title:{default: ''},
        visible:{default: ''},

        cc:[
            {
            label: '一级 1',
            children: [{
                label: '二级 1-1',
                children: [{
                    label: '三级 1-1-1'
                }]
            }]
        }, {
            label: '一级 2',
            children: [{
                label: '二级 2-1',
                children: [{
                    label: '三级 2-1-1'
                }]
            }, {
                label: '二级 2-2',
                children: [{
                    label: '三级 2-2-1'
                }]
            }]
        }, {
            label: '一级 3',
            children: [{
                label: '二级 3-1',
                children: [{
                    label: '三级 3-1-1'
                }]
            }, {
                label: '二级 3-2',
                children: [{
                    label: '三级 3-2-1'
                }]
            }]
        }]
    },
    data(){
        return{
            query: "",
            tree: []
        }
    },
    mounted(){
        this.getData()
    },
    methods:{
        getData(){
            // let arr= [1,2,3,4,5,6,7,8,9,10]
            //
            // arr.map((v,i)=>{
            //     console.log("arr", v)
            //     if(i==5){
            //         arr.splice(5,1)
            //     }
            // })
            // console.log(arr)



            this.$axios.get("/admin/im/people_help_json",{dataLevel: "api"}).then(data=>{
                this.tree= this.ergo(data)
                console.log(this.tree)
            })
        },
        ergo(data){
            let it= data[0],len= data.length, match= false, nofound= true
            it.label= it.name
            if(!it.pId){
                let hasid= data.some(i=>{return i.pId})
                if(hasid){
                    data.shift()
                    data.push(it)
                    return this.ergo(data)
                }else{
                    return data
                }
            }
            for(let i in data){
                if(i== 0){
                    continue
                }else{
                    if(it.pId== data[i].id){
                        data[i].children? data[i].children.push(it): data[i].children= [it]
                        match= true
                    }else if(data[i].children){
                        if(this.match(data[i].children, it)){
                            match= true
                        }
                    }
                    if(match){
                        data.shift()
                        return this.ergo(data)
                        break
                    }
                }
            }
            if(!match){
                data.shift()
                return this.ergo(data)
            }
        },
        match(l, it){
            let match= false
            for(let i in l){
                if(it.pId== l[i].id){
                    l[i].children? l[i].children.push(it): l[i].children= [it]
                    match= true
                }else if(l[i].children){
                    if(this.match(l[i].children, it)){
                        match= true
                    }
                }
            }
            return match
        }

    }
}
</script>

<style scoped lang="scss">
.staff-select{
    .content{
        padding: 10px 20px;
        .tree{
            margin-top: 10px;
            padding-top: 10px;
            border-top: 1px solid #DCDFE6;
        }
    }
}
</style>