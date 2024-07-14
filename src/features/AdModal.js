import { useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './leads/components/file.css'
import { API_REQUEST } from "../api";
import { URSL } from "../constants/URLS";
import { USER_CONFIG } from "../constants/User";
import InputText from '../components/Input/InputText'
import ErrorText from '../components/Typography/ErrorText'

const INITIAL_EVENT_OBJ = {
    screenName : "",
    name : "",
    phone : "",
    file:{},
}
function AddAdsModalBody({closeModal}){
    const form=useRef();
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [leadObj, setLeadObj] = useState(INITIAL_EVENT_OBJ)


    const saveNewEvent = async () => {
        try {
            const formdata=new FormData();
            if(leadObj.screenName.trim() === "")  throw {message:"Screen name is required!"};
            if(leadObj.name.trim() === "")  throw {message:"Name is required!"};
            if(leadObj.phone.trim() === "")  throw {message:"Phone is required!"};
            else if(leadObj.file === '{}')  throw {message:"File is required!"};
            else{
                setLoading(true)
                formdata.append('screen',leadObj.screenName)
                formdata.append('title',leadObj.name)
                formdata.append('mobile',leadObj.phone)
                formdata.append('file',leadObj.file)
                
                console.log(leadObj);
                const token=localStorage.getItem(USER_CONFIG.TOKEN_DETAIL)
                const eventRespone=await API_REQUEST.postData(URSL.ADD_ADVERTISMENT,formdata,token,'multipart/form-data');
                if(eventRespone.data.status!==200){
                    throw eventRespone.data
                }   
                closeModal()
                toast(eventRespone.data.message)
            }
        } catch (error) {
            toast(error.message)
            console.log(error);
        }finally{
            setLoading(false)
        }
    }
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setLeadObj({...leadObj,file:file});
    };

    const updateFormValue = ({updateType, value}) => {
        setErrorMessage("")
        setLeadObj({...leadObj, [updateType] : value})
    }
    const handleChange = (selectedOption) => {
        setLeadObj({...leadObj, 'type' : selectedOption.target.value})
    };
    return(
        <>

            <form encType="multipart/form-data" ref={form}>
                <InputText type="text" defaultValue={leadObj.screenName} updateType="screenName" containerStyle="mt-4" labelTitle="Screen name" updateFormValue={updateFormValue}/>
                <InputText type="text" defaultValue={leadObj.name} updateType="name" containerStyle="mt-4" labelTitle="Name" updateFormValue={updateFormValue}/>
                <InputText maxLength={10} type="text" defaultValue={leadObj.phone} updateType="phone" containerStyle="mt-4" labelTitle="Phone number" updateFormValue={updateFormValue}/>
                <div className="parent">
                    <div className="file-upload">
                        <h3> {leadObj.file?.name || "Click box to upload file"}</h3>
                        <input type="file" onChange={handleFileChange} />
                    </div>
                </div>
            </form>

            <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
            <div className="modal-action">
                <button  className="btn btn-ghost" onClick={() => closeModal()}>Cancel</button>
                <button  className={"btn btn-primary px-6" + (loading ? " loading" : "")} onClick={() => saveNewEvent()}>Save</button>
            </div>
            <ToastContainer />
        </>
    )
}

export default AddAdsModalBody