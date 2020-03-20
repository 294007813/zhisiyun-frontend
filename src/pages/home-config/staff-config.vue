<template>
<div class="home-config">
    <div class="head">
        <h2>{{$t("index.employee_cnf")}}</h2>
        <div class="button">
            <el-button size="small" @click="back">{{$t("index.return")}}</el-button>
            <el-button type="primary" size="small" @click="save">{{$t("index.save")}}</el-button>
        </div>
    </div>
    <div class="main">
        <config-pc :conf="conf" ref="pchome"></config-pc>
    </div>
</div>
</template>

<script>
import ConfigPc from './ConfigPC.vue'
// import conf from "pa/home-config/config/config-pc";
// import {accessPc} from "./fun"
export default {
    name: 'home-config-staff',
    components: {ConfigPc},
    data(){
        return{
            // conf: conf.home,
            conf: {
                show: [],
                hide: [[]],
                disable: [[]],
            },
        }
    },
    mounted() {
        this.getData()
    },
    methods:{
        getData(){
            async.parallel({
                userc: (callback)=> {
                    this.$axios.get("/api/feishu_index_page/homePageConfControl/get_home_page_configuration_people",{
                        params:{
                            flag: "PC",
                            tp: new Date().getTime(),
                        }
                    }).then(data=>{
                        let list= data.conf.home
                        let rule= data.modules.contract_modules
                        // this.mapMod(list, rule)
                        // this.conf= list
                        callback(null, {list, rule});
                    })
                },
                admin: (callback)=> {
                    this.$axios.get("/api/feishu_index_page/homePageConfControl/get_home_page_configuration_client",{
                        params:{
                            flag: "PC",
                            tp: new Date().getTime(),
                        }
                    }).then(data=>{
                        callback(null, data.conf.home);
                    })
                }
            }, (err, res)=> {
                // console.log(res)
                let {userc, admin} = res, distr="", my={}
                let user= userc.list, rule= userc.rule
                let u= {
                    sl: [], hl: user.hide[0], dl: user.disable[0]
                }
                let msl={}, del=[], rel={sl:[],hl:[],dl:[]};
                user.show.forEach((row, i)=>{
                    row.forEach((it, j)=>{
                        u.sl.push({
                            i,j,
                            ...it
                        })
                    })
                })

                admin.show.forEach((row, i)=>{
                    row.forEach((it, j)=>{
                        msl[it.name]= it
                    })
                })

                function move( f, t, haveAdmin= true, judgeAccess, hasAccess){
                    let todo= [], undo=[]
                    u[f].forEach( (si, i)=> {
                        let flag= msl.hasOwnProperty(si.name)
                        if( !si.fixed &&
                            ((( haveAdmin? flag: !flag) && !judgeAccess) ||
                            (!si.source || (hasAccess? rule[si.code] : !rule[si.code])))){
                            if( haveAdmin){
                                _.mapObject(si.pages, (pit, pk)=>{
                                    pit.able= msl[si.name] && msl[si.name].hasOwnProperty(pk)? msl[si.name][pk].able: false
                                    for( let fk in pit.fields){
                                        pit.fields[fk]= false
                                    }
                                })
                            }
                            rel[t].push( si)
                            todo.push( si.name)
                        } else{
                            undo.push( si.name)
                        }
                    })
                    return {todo, undo}
                }

                let showns= move("sl", "dl", false, true, false).undo.join("-")
                move("hl", "dl", false)
                let disns=move("dl", "hl", true, true, true).undo.join("-")

                for(let i= u.dl.length-1; i>=0; i--){
                    if(disns.includes(u.dl[i].name)){
                        rel.dl.unshift(u.dl[i])
                    }
                }

                user.show.forEach(row=>{
                    let arr=[]
                    row.forEach(it=>{
                        let itn= it.name
                        if(showns.includes(itn)){
                            _.mapObject(it.pages, (pit, pk)=>{
                                if(msl[it.name] && msl[it.name].hasOwnProperty(pk) && !msl[it.name][pk].able){

                                }
                                pit.able= msl[it.name] && msl[it.name].hasOwnProperty(pk) ? msl[it.name][pk].able: false
                                for( let fk in pit.fields){
                                    pit.fields[fk]= false
                                }
                            })
                            arr.push(it)
                        }
                    })
                    if(arr.length){
                        rel.sl.push(arr)
                    }
                })

                this.conf= {
                    show: rel.sl,
                    hide: [rel.hl],
                    disable: [rel.dl],
                }
                console.log(rel)
            });
        },
        mapMod(list, rule){
            let l1= list.show
            let l2= list.hide
            let l3= list.disable
            let a1= access(l1, rule)
            let a2= access(l2, rule)
            list.hide[0]= list.hide[0].concat(a1, a2)
            function  access(list, rule){
                let noaccess= [], ind=[];
                list.forEach((it)=>{
                    ind= []
                    it.forEach((mod, i)=>{
                        if(rule.hasOwnProperty(mod.code) && !rule[mod.code]){
                            mod.access=false
                            noaccess.push(mod)
                            ind.unshift(i)
                        }else{
                            mod.access=true
                        }
                    })
                    ind.forEach((i)=>{
                        it.splice(i, 1)
                    })
                })
                return noaccess
            }
        },

        save(){
            // this.$msgbox.confirm( "",{
            //     title: "确定保存？",
            //     callback:(action)=>{
            //         if(action=="confirm"){
                        this.$axios.post("/api/feishu_index_page/homePageConfControl/add_home_page_configuration_people",{
                            "flag":"PC",
                            datas: {home: this.$refs.pchome.list},
                            // datas: conf,
                        },{dataKey: "msg"}).then(data=>{
                            this.$msg({message: data, type: "success"});
                        })
            //         }
            //     }
            // })
        },
        back(){
            window.history.go(-1)
        }
    }
}
</script>

<style scoped lang="scss">
@import "./home-config.scss";
</style>