import React, { useEffect, useState } from 'react'
import TitleCard from "../components/Cards/TitleCard";
import ReactQuill from 'react-quill';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { USER_CONFIG } from '../constants/User';
import { API_REQUEST } from '../api';
import { URSL } from '../constants/URLS';

const Content = () => {
    const [abour, setAbout] = useState('');
    const [terms, setTerms] = useState({});
    const [loading,setLoading]=useState(false)
    const [Privacu, setPrivacu] = useState({});

    const [selected, setSelected] = useState("terms");
    const [selectedDataAdd,setSeletceddataAdd]=useState({})

    useEffect(()=>{
        getContent()
    },[]);

    const getContent=async()=>{
        try {
            const token=localStorage.getItem(USER_CONFIG.TOKEN_DETAIL)
            const newsRespone=await API_REQUEST.getData(URSL.GET_CONTENT,token);
            if(newsRespone.data.status!==200)
                throw newsRespone
            setAbout(newsRespone.data.data[0]);
            setTerms(newsRespone.data.data[1]);
            setPrivacu(newsRespone.data.data[2]);
            setSeletceddataAdd(newsRespone.data.data[0]);
        } catch (error) {
            console.log(error);
        }
    }

    const saveData = async () => {
        try {
            if(selected === "")  throw {message:"type is required!"};
            else if(selected == "Terms And Condition" ? terms : selected == "Privacy Policy" ? Privacu : abour  === '')  throw {message:"Content is required!"};
            else{
                setLoading(true)
                const data={
                    id:selectedDataAdd.id,
                    section:selectedDataAdd.section,
                    content:selected == "terms" ? terms.content : selected == "privacy" ? Privacu.content : abour.content 
                }
                const token=localStorage.getItem(USER_CONFIG.TOKEN_DETAIL)
                const eventRespone=await API_REQUEST.postData(URSL.ADD_CONTENT,data,token);
                if(eventRespone.data.status!==200){
                    throw eventRespone.data
                }   
                toast(eventRespone.data.message)
                getContent()
            }
        } catch (error) {
            toast(error.message)
            console.log(error);
        }finally{
            setLoading(false)
        }
    }
    const handleChange=(e)=>{
        let value=selected == "terms" ? terms : selected == "privacy" ? Privacu : abour 
        setSeletceddataAdd(value)
        selected == "terms" ? setTerms({...terms,content:e}) :
        selected == "privacy" ? 
        setPrivacu({...Privacu,content:e}) : 
        setAbout({...abour,content:e}) 
    }
    return (
        <>
            <TitleCard title="App Content" topMargin="mt-2" TopSideButtons={<>
                <div className="inline-block float-right">
                    <button className="btn px-6 btn-sm normal-case btn-primary" onClick={saveData} >Save</button>
                </div>
            </>}>
                <select value={selected} onChange={(value) => {
                    setSelected(value.target.value)
                }}>
                    <option value="terms">Terms And Condition</option>
                    <option value="privacy">Privacy Policy</option>
                    <option value="about">About Us</option>
                </select>
                {
                    <ReactQuill 
                        value={selected == "terms"?terms.content:selected == "privacy"?Privacu.content:abour.content} 
                        onChange={handleChange} 
                        style={{ marginTop: 20, height: "50vh", marginBottom: 20 }} 
                    />
                }

            </TitleCard>

            <ToastContainer />
        </>
    )
}

export default Content
