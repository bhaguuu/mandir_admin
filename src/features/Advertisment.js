import React, { useEffect, useState } from 'react'
import TitleCard from "../components/Cards/TitleCard";
import { useDispatch } from 'react-redux';
import { MODAL_BODY_TYPES } from '../utils/globalConstantUtil';
import { openModal } from './common/modalSlice';
import { API_REQUEST } from '../api';
import { URSL } from '../constants/URLS';
import { USER_CONFIG } from '../constants/User';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TopSecondButton = () => {

    const dispatch = useDispatch()

    const openAddNewLeadModal = () => {
        dispatch(openModal({title : "Add Advertisment", bodyType : MODAL_BODY_TYPES.ADD_ADVERTISMENT}))
    }

    return(
        <div className="inline-block float-right" style={{marginLeft: 10,}}>
            <button className="btn px-6 btn-sm normal-case btn-primary" onClick={() => openAddNewLeadModal()}>Add Advertisment</button>
        </div>
    )
}

const Advertisment = () => {
    const [ads,setAds]=useState([]);
    const dispatch=useDispatch();
    

    useEffect(()=>{
        getAds()
    },[]);

    const getAds=async()=>{
        try {
            const token=localStorage.getItem(USER_CONFIG.TOKEN_DETAIL)
            const newsRespone=await API_REQUEST.getData(URSL.GET_ADS,token);
            if(newsRespone.data.status!==200)
                throw newsRespone
            setAds(newsRespone.data.data)
            console.log(newsRespone.data.data);
        } catch (error) {
            console.log(error);
        }
    }
    const deleteAds=async(item,selectedIndex)=>{
        try {
            const token=localStorage.getItem(USER_CONFIG.TOKEN_DETAIL);
            const response=await API_REQUEST.postData(URSL.DELETE_ADS,{id:item.id},token)
            if(response.data.status !== 200)
                throw response
            setAds(items =>
                items.map((value, index) => {
                    if (index === selectedIndex) {
                        value.is_delete =  value.is_delete?0:1;
                    } 
                    return value;
                }),
            );
            toast(`Delete Status Updated Successfully`)
        } catch (error) {
            toast("User not deleted")
            console.log(error);
        }
    }
    const updateuserActiveStatus=async(item,selectedIndex)=>{
        try {
            const token=localStorage.getItem(USER_CONFIG.TOKEN_DETAIL);
            const response=await API_REQUEST.postData(URSL.UPDATE_ADS_STATUS,{id:item.id},token)
            if(response.data.status !== 200)
                throw response
            setAds(items =>
                items.map((value, index) => {
                    if (index === selectedIndex) {
                        value.is_active =  value.is_active?0:1;
                    } 
                    return value;
                }),
            );
            toast("User Active Status Changed")
        } catch (error) {
            toast("User Active Status not Changes")
            console.log(error);
        }
    }
    return (
        <>
        <TitleCard title="Advertisment" topMargin="mt-2" TopSideButtons={<>
                <TopSecondButton/>    
            </>}>
                <div className="overflow-x-auto w-full">

                    <table className="table w-full">

                    <thead>
                        <tr>
                            <th>S.no.</th>
                            <th>Screen Name</th>
                            <th>Ad</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Activity</th>
                            <th>Delete Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            ads.map((l, k) => {
                                return(
                                    <tr key={k}>
                                        <td>{l.id}</td>
                                        <td>{l.screen}</td>
                                        <div className="flex items-center space-x-3" style={{marginTop:20}} >
                                            <div className="avatar">
                                                <div className="mask w-10 h-10">
                                                    <img src={l.file.split(".")[1]==="jpg" || l.file.split(".")[1]==="png" || l.file.split(".")[1]==="jpeg"?'https://th.bing.com/th/id/OIP.JIo_erHjGUXp0-Z86gJAqAHaHa?w=203&h=203&c=7&r=0&o=5&dpr=1.3&pid=1.7':"data:image/jpeg;base64,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"} alt="Avatar" />
                                                </div>
                                            </div>
                                            {/* <div >{l.file}</div> */}
                                        </div>
                                        <td>{l.title}</td>
                                        <td>{l.mobile}</td>
                                        <td>
                                            <button className="btn btn-square btn-ghost" onClick={() => updateuserActiveStatus(l,k)}>
                                                <td style={{color:l.is_active?"green":"red"}}>{l.is_active?"ACTIVE":"InActive"}</td>
                                            </button>
                                        </td>
                                        <td>
                                            <button className="btn btn-square btn-ghost" onClick={() => deleteAds(l,k)}>
                                                <td style={{color:l.is_delete?"green":"red"}}>{l.is_delete?"DELETED":"DELETE"}</td>
                                            </button>
                                        </td>
                                        <td>
                                            <button className="btn btn-square btn-ghost" onClick={() => dispatch(openModal({title : "Edit Advertisment", bodyType : MODAL_BODY_TYPES.EDIT_ADS_MODAL,extraObject:l}))}>
                                                <td style={{color:"green"}}>Edit</td>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                    </table>
                </div>
                </TitleCard>  
                <ToastContainer />  
        </>
    )
}

export default Advertisment
