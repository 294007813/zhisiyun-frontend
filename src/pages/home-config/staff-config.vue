<template>
<div class="home-config">
    <div class="head">
        <h2>员工首页PC端布局及设置</h2>
        <div class="button">
            <el-button type="primary" size="small" @click="save">保存</el-button>
        </div>
    </div>
    <div class="main">
        <config-pc :conf="conf" ref="pchome"></config-pc>
    </div>
</div>
</template>

<script>
import ConfigPc from './ConfigPC.vue'
import conf from "pa/home-config/config/config-pc";
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
            // console.log("moment", moment)
            // this.conf= conf.home
            // this.$axios.post("/api/feishu_index_page/homePageConfControl/add_home_page_configuration_client",{
            //     "flag":"PC",
            //     datas: conf
            // })

            async.parallel({
                user: (callback)=> {
                    this.$axios.get("/api/feishu_index_page/homePageConfControl/get_home_page_configuration_people?flag=PC").then(data=>{
                        let list= data.conf.home
                        let rule= data.modules.contract_modules
                        this.mapMod(list, rule)
                        // this.conf= list
                        callback(null, list);
                    })
                },
                admin: (callback)=> {
                    this.$axios.get("/api/feishu_index_page/homePageConfControl/get_home_page_configuration_client?flag=PC").then(data=>{
                        callback(null, data.conf.home);
                    })
                }
            }, (err, res)=> {
                console.log(res)
                let {user, admin} = res, distr="", my={}
                _.mapObject(admin.disable,(it, key)=>{
                    distr+= "-"+it.code
                })

                my={
                    show: user.show,
                    hide: [user.hide[0].concat( user.disable[0])],
                    disable: [[]],
                }
                dis(my, 'show')
                dis(my, 'hide')

                function dis(d, name) {
                    let ms= d[name]
                    for(let i=ms.length-1; i>=0; i--){
                        for(let j=ms[i].length-1; j>=0; j--){
                            if(distr.includes(ms[i][j].code)){
                                d.disable[0].push(ms[i][j])
                                ms[i].splice(j, 1)
                            }
                        }
                        if(!ms[i].length){
                            ms.splice(i, 1)
                        }
                    }
                    if(!ms.length) ms.push([])
                }

                let ais= _.flatten(admin.show)
                ais.forEach((ai)=>{
                    _.mapObject(my,(mb)=>{
                        mb.forEach((row)=>{
                            row.forEach((it)=>{
                                if(it.code== ai.code){
                                    _.mapObject(ai.pages, (ap, apk)=>{
                                        it.pages[apk].able= ap.able
                                        it.fields= {...it.fields, ...it.disableFields}
                                        it.disableFields= {}
                                        _.mapObject(ap.disableFields, (apf, apfk)=>{
                                            it.disableFields[apfk]= it.fields[apfk]
                                            delete it.fields[apfk]
                                        })
                                    })
                                }
                            })
                        })
                    })
                })

                // console.log(JSON.stringify(my))

                this.conf= my
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
                        _.mapObject(rule,(ru, key)=>{
                            if(mod.code==key && !ru){
                                mod.access=false
                                noaccess.push(mod)
                                ind.shift(i)
                            }else{
                                mod.access=true
                            }
                        })
                    })
                    ind.forEach((i)=>{
                        it.splice(i, 1)
                    })
                })
                return noaccess
            }
        },

        save(){
            this.$msgbox.confirm( "",{
                title: "确定保存？",
                callback:(action)=>{
                    if(action=="confirm"){
                        this.$axios.post("/api/feishu_index_page/homePageConfControl/add_home_page_configuration_client",{
                            "flag":"PC",
                            datas: {home: this.$refs.pchome.list},
                            // datas: conf,
                        },{dataKey: "msg"}).then(data=>{
                            this.$msg({message: data});
                        })
                    }
                }
            })
        }
    }
}
</script>

<style scoped lang="scss">
@import "./home-config.scss";
</style>