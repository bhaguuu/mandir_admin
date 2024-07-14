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
    file:{},
}
function EditAdsModalBody({closeModal,extraObject}){
    const form=useRef();
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [leadObj, setLeadObj] = useState({
        id: extraObject.id, 
        screen: extraObject.screen, 
        file: extraObject.file
    })


    const saveNewEvent = async () => {
        try {
            const formdata=new FormData();
            if(leadObj.screen === "")  throw {message:"Name is required!"};
            else if(leadObj.file === '{}' || leadObj.file==='')  throw {message:"File is required!"};
            else{
                setLoading(true)
                formdata.append("id",leadObj.id)
                formdata.append('section',leadObj.screen)
                {typeof(leadObj.file)!='string' && formdata.append('file',leadObj.file)}
                const token=localStorage.getItem(USER_CONFIG.TOKEN_DETAIL)
                const eventRespone=await API_REQUEST.postData(URSL.EDIT_ADS,formdata,token,'multipart/form-data');
                if(eventRespone.data.status!==200){
                    throw eventRespone.data
                }   
                console.log(eventRespone)
                closeModal()
                toast("Advertisment Updated")
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
                <InputText type="text" defaultValue={leadObj.screen} updateType="screen" containerStyle="mt-4" labelTitle="screen" updateFormValue={updateFormValue}/>
                <div className="parent">
                    <div className="file-upload">
                        <h3> {typeof(leadObj.file)==='string'?leadObj.file:leadObj.file?.name || "Click box to upload file"}</h3>
                        <input type="file" onChange={handleFileChange} />
                    </div>
                </div>
            </form>

            <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
            <div className="modal-action">
                <button  className="btn btn-ghost" onClick={() => closeModal()}>Cancel</button>
                <button  className={"btn btn-primary px-6" + (loading ? " loading" : "")} onClick={() => saveNewEvent()}>Save</button>
            </div>
        </>
    )
}

export default EditAdsModalBody