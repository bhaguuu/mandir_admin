import moment from "moment"
import { useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import TitleCard from "../../components/Cards/TitleCard"
import { openModal } from "../common/modalSlice"
import { deleteLead, getLeadsContent } from "./leadSlice"
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from '../../utils/globalConstantUtil'
import TrashIcon from '@heroicons/react/24/outline/TrashIcon'
import { showNotification } from '../common/headerSlice'
import { API_REQUEST } from "../../api"
import { URSL } from "../../constants/URLS"
import { useState } from "react"
import { USER_CONFIG } from "../../constants/User"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Pagination from "../../components/pagination/pagination"
import ReactPaginate from "react-paginate"
import './paginate.css'
import SearchBar from "../../components/SearchBar"
const TopSideButtons = () => {

    const dispatch = useDispatch()

    const openAddNewLeadModal = () => {
        dispatch(openModal({title : "Add New User", bodyType : MODAL_BODY_TYPES.LEAD_ADD_NEW}))
    }

    return(
        <div className="inline-block float-right">
            <button className="btn px-6 btn-sm normal-case btn-primary" onClick={() => openAddNewLeadModal()}>Add New</button>
        </div>
    )
}
const TopSecondButton = () => {

    const dispatch = useDispatch()

    const openAddNewLeadModal = () => {
        dispatch(openModal({title : "Add Excel File", bodyType : MODAL_BODY_TYPES.MODAL_EXCEL_ADD}))
    }

    return(
        <div className="inline-block float-right" style={{marginLeft: 10,}}>
            <button className="btn px-6 btn-sm normal-case btn-primary" onClick={() => openAddNewLeadModal()}>Add Excel File</button>
        </div>
    )
}
let PageSize = 0;

function Leads(){
    const dispatch=useDispatch()
    const [allUsers,setAllUsers]=useState([]);
    const [searchedUser,serDearchedUser]=useState([]);
    const [page,setPage]=useState(1)
    const [currentPage, setCurrentPage] = useState(1);
    const paginate = ({ selected }) => {
       setCurrentPage(selected + 1);
       getAllUsers(selected+1)
    };

    
    useEffect(()=>{
        getAllUsers(page)
    },[])
    
    const getAllUsers=async(page)=>{
        try {
        const token=localStorage.getItem(USER_CONFIG.TOKEN_DETAIL)
            const usersList=await API_REQUEST.getData(URSL.GET_USER,token,{page:page});
            if(usersList.data.status==200){
                console.log(usersList.data.data)
                setAllUsers(usersList?.data?.data.users)
                PageSize=usersList?.data.data.pagination.totalPages
                setCurrentPage(usersList?.data.data.pagination.page)
            }else{
                throw usersList
            }
        } catch (error) {
            console.log(error);
        }
    }
    const deleteUser=async(item,selectedIndex)=>{
        try {
            const token=localStorage.getItem(USER_CONFIG.TOKEN_DETAIL);
            const response=await API_REQUEST.postData(URSL.DELETE_USER,{id:item.id},token)
            if(response.data.status !== 200)
                throw response

            setAllUsers(items =>
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
            const response=await API_REQUEST.postData(URSL.UPDATE_STAUS_USER,{id:item.id},token)
            if(response.data.status !== 200)
                throw response
            setAllUsers(items =>
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
    return(
        <>
            
            <TitleCard title="Current Users" topMargin="mt-2" TopSideButtons={<>
                <TopSecondButton />
                <TopSideButtons />
            </>}>

                {/* Leads List in table format loaded from slice after api call */}

            <SearchBar url={URSL.SEARHC_USER} results={(value)=>serDearchedUser(value)} />
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email Id</th>
                        <th>Phone</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Occupation</th>
                        <th>Gotra</th>
                        <th>Activity</th>
                        <th>Delete Status</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            (searchedUser.length==0?allUsers:searchedUser).length>0 &&
                            (searchedUser.length==0?allUsers:searchedUser).map((l, k) => {
                                return(
                                    <tr key={k}>
                                        <td>
                                            <div className="flex items-center space-x-3">
                                                {/* <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={l.avatar} alt="Avatar" />
                                                    </div>
                                                </div> */}
                                                <div>
                                                    <div className="font-bold">{l.full_name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{l.email}</td>
                                        <td>{l.phone}</td>
                                        <td>{l.age}</td>
                                        <td>{l.gender}</td>
                                        <td>{l.occupation}</td>
                                        <td>{l.gotra}</td>
                                        <td>
                                            <button className="btn btn-square btn-ghost" onClick={() => updateuserActiveStatus(l,k)}>
                                                <td style={{color:l.is_active?"green":"red"}}>{l.is_active?"ACTIVE":"InActive"}</td>
                                            </button>
                                        </td>
                                        <td>
                                            <button className="btn btn-square btn-ghost" onClick={() => deleteUser(l,k)}>
                                                <td style={{color:l.is_delete?"green":"red"}}>{l.is_delete?"DELETED":"DELETE"}</td>
                                            </button>
                                        </td>
                                        <td>
                                            <button className="btn btn-square btn-ghost" onClick={() => dispatch(openModal({title : "Edit User", bodyType : MODAL_BODY_TYPES.EDIT_LEAD_MODAL,extraObject:l}))}>
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
            {
                searchedUser.length==0 &&
                <ReactPaginate
                    onPageChange={paginate}
                    pageCount={PageSize}
                    previousLabel={'Prev'}
                    nextLabel={'Next'}
                    containerClassName={'pagination'}
                    pageLinkClassName={'page-number'}
                    previousLinkClassName={'page-number'}
                    nextLinkClassName={'page-number'}
                    activeLinkClassName={'active'}
                />
            }
            <ToastContainer />
        </>
    )
}


export default Leads