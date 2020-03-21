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
                let {userc, admin} = res
                let user= userc.list, rule= userc.rule
                let u= {
                    sl: [], hl: user.hide[0], dl: user.disable[0]
                }
                let msl={},mal={}, del=[], rel={sl:[],hl:[],dl:[]}, usls="";
                user.show.forEach((row, i)=>{
                    row.forEach((it, j)=>{
                        u.sl.push({
                            // i,j,
                            ...it
                        })
                        usls+= (it.name+ "-")
                    })
                })

                //管理员开放模块
                admin.show.forEach((row, i)=>{
                    row.forEach((it, j)=>{
                        msl[it.name]= it
                        mal[it.name]= it
                    })
                })
                admin.hide[0].forEach((it, i)=>{
                    mal[it.name]= it
                })
                admin.disable[0].forEach((it, i)=>{
                    mal[it.name]= it
                })
                // console.log(mal)

                let showns= move("sl", "dl").undo.join("-")
                let hides= move("hl", "dl").undo.join("-")
                let disas= move("dl", "hl", true).undo.join("-")

                function move( f, t, hasaccgo){
                    let todo= [], undo=[]
                    u[f].forEach( (si, i)=> {
                        let mshow= msl.hasOwnProperty(si.name) //管理员开放的模块
                        let togo= false
                        if( !si.fixed){
                            let hasaccess= (!si.source || (si.source && rule[si.code])) && mshow
                            if( hasaccgo? !hasaccess: hasaccess){
                                togo= false
                            }else{
                                togo= true
                            }
                            setpageitem(si)
                        }
                        if(togo){
                            rel[t].push( si)
                            todo.push( si.name)
                        } else{
                            undo.push( si.name)
                        }
                    })
                    return {todo, undo}
                }
                u.dl.forEach(it=>{
                    if(disas.includes(it.name)){
                        rel.dl.push(it)
                    }
                })
                u.hl.forEach(it=>{
                    if(hides.includes(it.name)){
                        // it.noaccess= true
                        rel.hl.push(it)
                    }
                })
                user.show.forEach(row=>{
                    let arr=[]
                    row.forEach(it=>{
                        let itn= it.name
                        if(showns.includes(itn)){
                            setpageitem(it)
                            if(usls.includes(itn)){
                                arr.push(it)
                            }else{
                                rel.hl.push(it)
                            }
                        }
                    })
                    if(arr.length){
                        rel.sl.push(arr)
                    }
                })

                function setpageitem(it) {
                    let itn= it.name
                    _.mapObject(it.pages, (pit, pk)=>{
                        let mpage= mal[itn].pages[pk]
                        it.able= mpage.able
                        let tf= pit.fields
                        pit.fields= {}
                        pit.disableFields= mpage.disableFields
                        for( let fk in mpage.fields){
                            pit.fields[fk]= !!tf[fk]
                        }
                    })

                }

                this.conf= {
                    show: rel.sl,
                    hide: [rel.hl],
                    disable: [rel.dl],
                }
                console.log(rel)
            });
        },

        // mapMod(list, rule){
        //     let l1= list.show
        //     let l2= list.hide
        //     let l3= list.disable
        //     let a1= access(l1, rule)
        //     let a2= access(l2, rule)
        //     list.hide[0]= list.hide[0].concat(a1, a2)
        //     function  access(list, rule){
        //         let noaccess= [], ind=[];
        //         list.forEach((it)=>{
        //             ind= []
        //             it.forEach((mod, i)=>{
        //                 if(rule.hasOwnProperty(mod.code) && !rule[mod.code]){
        //                     mod.access=false
        //                     noaccess.push(mod)
        //                     ind.unshift(i)
        //                 }else{
        //                     mod.access=true
        //                 }
        //             })
        //             ind.forEach((i)=>{
        //                 it.splice(i, 1)
        //             })
        //         })
        //         return noaccess
        //     }
        // },
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