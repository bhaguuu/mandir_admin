import React, { useState } from 'react'
import { USER_CONFIG } from '../constants/User'
import { API_REQUEST } from '../api';
import './search.css'
export default function SearchBar({url,results,isNoData}) {
    const [search, setSearch] = useState('')

    const searchData=async()=>{
        try {
            console.log(url,"uel");
            if(!search)
                return
            const token=localStorage.getItem(USER_CONFIG.TOKEN_DETAIL);
            const result=await API_REQUEST.postData(url,{query:search},token);
            if(result.error)
                throw result
            results(result.data.data);
        } catch (error) {
            results([]);
        }
    }

    return (
        <div style={{padding:10,marginBottom:10,borderRadius:5,borderWidth:1,borderColor:"grey",display:"flex",justifyContent:"space-between"}} >
            <input 
                className='searchInput'
                type="text" 
                placeholder="Search name" 
                value={search}
                onChange={(e) => {
                    if(e.target.value==="")
                        results([])
                    setSearch(e.target.value)
                }}
                style={{width:'80%',paddingLeft:20,fontWeight:"500",borderStyle:"none",border:0}}
            />
            <button className="btn px-6 btn-sm normal-case btn-primary" onClick={searchData}>
                Search
            </button>
        </div>
    )
}
