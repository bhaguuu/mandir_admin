import moment from "moment"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import TitleCard from "../../components/Cards/TitleCard"
import { RECENT_TRANSACTIONS } from "../../utils/dummyData"
import TrashIcon from "@heroicons/react/24/outline/TrashIcon"
import { API_REQUEST } from "../../api"
import { USER_CONFIG } from "../../constants/User"
import { URSL } from "../../constants/URLS"
import { openModal } from "../common/modalSlice"
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from '../../utils/globalConstantUtil'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../leads/paginate.css'
import ReactPaginate from "react-paginate"
import SearchBar from "../../components/SearchBar"


const TopSideButtons = () => {

    const dispatch = useDispatch()
    const [searchedUser,serDearchedUser]=useState([]);

    const openAddNewLeadModal = () => {
        dispatch(openModal({title : "Add New Event", bodyType : MODAL_BODY_TYPES.EVENT_ADD_NEW}))
    }

    return(
        <div className="inline-block float-right">
            <button className="btn px-6 btn-sm normal-case btn-primary" onClick={() => openAddNewLeadModal()}>Add New</button>
        </div>
    )
}
let PageSize = 0;

function Transactions(){
    const dispatch=useDispatch();
    const [searchedUser,serDearchedUser]=useState([]);

    const [events, setEvents] = useState(RECENT_TRANSACTIONS);
    const [page,setPage]=useState(1)

    const [postsPerPage] = useState(10);

    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    // const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);
  

    useEffect(()=>{
        getAllEvents()
    },[]);
    const paginate = ({ selected }) => {
        setCurrentPage(selected + 1);
        getAllEvents(selected+1)
    };

    const getAllEvents=async(page)=>{
        try {
            const token=localStorage.getItem(USER_CONFIG.TOKEN_DETAIL);
            const eventsApi=await API_REQUEST.getData(URSL.GET_EVENTS,token,{page:page});
            if(eventsApi.data.status != 200)
                throw eventsApi
            setEvents(eventsApi.data.data.events);
            PageSize=eventsApi?.data.data.pagination.totalPages
            setCurrentPage(eventsApi?.data.data.pagination.page)
        } catch (error) {
            toast("Cannot fetch events");
            console.log(error);
        }
    }
    const deletEvent=async(item,selectedIndex)=>{
        try {
            const token=localStorage.getItem(USER_CONFIG.TOKEN_DETAIL);
            const response=await API_REQUEST.postData(URSL.DELETE_STATUS_EVENT,{id:item.id},token)
            if(response.data.status !== 200)
                throw response

            setEvents(items =>
                items.map((value, index) => {
                    if (index === selectedIndex) {
                        value.is_delete =  value.is_delete?0:1;
                    } 
                    return value;
                }),
            );
            toast(`Delete Status Updated Successfully`)
        } catch (error) {
            toast("Event not deleted")
            console.log(error);
        }
    }
    const udpateEventAcivity=async(item,selectedIndex)=>{
        try {
            const token=localStorage.getItem(USER_CONFIG.TOKEN_DETAIL);
            const response=await API_REQUEST.postData(URSL.UPDATE_ACTIVE_STATUS_EVENT,{id:item.id},token)
            if(response.data.status !== 200)
                throw response
            setEvents(items =>
                items.map((value, index) => {
                    if (index === selectedIndex) {
                        value.is_active =  value.is_active?0:1;
                    } 
                    return value;
                }),
            );
            toast("Event Status Changed")
        } catch (error) {
            toast("Event Status not Changes")
            console.log(error);
        }
    }
    console.log(events);
    return(
        <>
            

            <TitleCard title="All Events" topMargin="mt-2" TopSideButtons={<TopSideButtons />}>
            <SearchBar url={URSL.SEARHC_EVENT} results={(value)=>serDearchedUser(value)} />
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Event Type</th>
                        <th>Activity</th>
                        <th>Delete Status</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            (searchedUser.length==0?events:searchedUser).length>0 &&
                            (searchedUser.length==0?events:searchedUser).map((item, index) => {
                                return(
                                    <tr key={index}>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            {/* <div className="avatar">
                                                <div className="mask mask-circle w-12 h-12">
                                                    <img src={l.avatar} alt="Avatar" />
                                                </div>
                                            </div>
                                            <div> */}
                                                <div className="font-bold">{item.name}</div>
                                            {/* </div> */}
                                        </div>
                                    </td>
                                    <td>{item.start_date}</td>
                                    <td>{item.end_date}</td>
                                    <td>{item.type==0?"LIVE":"ON-SITE"}</td>
                                    <td>
                                        <button className="btn btn-square btn-ghost" onClick={() => udpateEventAcivity(item,index)}>
                                            <td style={{color:item.is_active?"green":"red"}}>{item.is_active?"ACTIVE":"InActive"}</td>
                                        </button>
                                    </td>
                                    <td>
                                        <button className="btn btn-square btn-ghost" onClick={() => deletEvent(item,index)}>
                                            <td style={{color:item.is_delete?"green":"red"}}>{item.is_delete?"DELETED":"DELETE"}</td>
                                        </button>
                                    </td>
                                    <td>
                                        <button className="btn btn-square btn-ghost" onClick={() => dispatch(openModal({title : "Edit Event", bodyType : MODAL_BODY_TYPES.EDIT_EVENT_MODAL,extraObject:item}))}>
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


export default Transactions