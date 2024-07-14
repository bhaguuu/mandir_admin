import moment from "moment"
import { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TitleCard from "../components/Cards/TitleCard";
import { setPageTitle } from "./common/headerSlice";
import ReactQuill from "react-quill";
import { URSL } from "../constants/URLS";
import { USER_CONFIG } from "../constants/User";
import { API_REQUEST } from "../api";

function About(){
    const [value, setValue] = useState('');
    const [loading,setLoading]=useState(false)
    const dispatch=useDispatch();
    useEffect(() => {
        dispatch(setPageTitle({ title : "About Us"}))
    }, []);

    useEffect(()=>{
        getAbout()
    },[]);

    const getAbout=async()=>{
        try {
            const token=localStorage.getItem(USER_CONFIG.TOKEN_DETAIL)
            const newsRespone=await API_REQUEST.getData(URSL.GET_ABOUT,token);
            if(newsRespone.data.status!==200)
                throw newsRespone
            setValue(newsRespone.data.data[0].text)
        } catch (error) {
            console.log(error);
        }
    }

    const saveAbout = async () => {
        try {
            console.log(value)
            if(value.trim() === "")  throw {message:"About is required!"};
            else{
                setLoading(true)
                const token=localStorage.getItem(USER_CONFIG.TOKEN_DETAIL)
                const newsRespone=await API_REQUEST.postData(URSL.ADD_ABOUT,{ text:value,id:1 },token);
                if(newsRespone.data.status!==200)
                    throw newsRespone
                console.log(newsRespone,"ee")
                toast("About Us Updated")
            }
        } catch (error) {
            toast("About not updated");
            console.log(error);
        }finally{
            setLoading(false)
        }
    }

    return(
        <>
            
            <TitleCard title="About" topMargin="mt-2" TopSideButtons={<>
                <div className="inline-block float-right">
                    <button className="btn px-6 btn-sm normal-case btn-primary" onClick={saveAbout}>Update</button>
                </div>
            </>}>

                <div className="overflow-x-auto w-full">
                    <ReactQuill style={{height:250,marginBottom:50,borderRadius:50,borderColor:"grey"}} theme="snow" value={value} onChange={setValue} />
                </div>
            </TitleCard>
            <ToastContainer />
        </>
    )
}


export default About