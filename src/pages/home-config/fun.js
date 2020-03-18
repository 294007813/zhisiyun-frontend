export const accessPc= (data)=>{
    let d= data.conf.home, m= data.modules.contract_modules,
        res={
            show: [],
            hide: [[]],
            disable: [[]],
        };
    for(let i = d.show.length - 1; i >= 0; i--){
        let r= d.show[i], row=[]
        for(let j = r.length - 1; j >= 0; j--){
            let it= r[j]
            if(it.source && !m[it.code]){
                res.disable[0].push(it)
            }else{
                row.unshift(it)
            }
        }
        if(row.length){
            res.show.unshift(row)
        }
    }
    for(let i = d.hide[0].length - 1; i >= 0; i--){
        let it= d.hide[0][i]
        if(it.source && !m[it.code]){
            res.disable[0].push(it)
        }else{
            res.hide[0].unshift(it)
        }
    }
    return res
}
