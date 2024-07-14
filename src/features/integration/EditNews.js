import { useRef, useState } from "react"
import { useDispatch } from "react-redux"
import InputText from '../../components/Input/InputText'
import ErrorText from '../../components/Typography/ErrorText'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { URSL } from "../../constants/URLS"
import { USER_CONFIG } from "../../constants/User";
import { API_REQUEST } from "../../api";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../leads/components/file.css'
const INITIAL_EVENT_OBJ = {
    name : "",
    file:{},
}

function NewsEditModal({closeModal,extraObject}){
    const form=useRef();
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [leadObj, setLeadObj] = useState({
        name : extraObject.title,
        file:extraObject.image,
        content:extraObject.content
    });


    const SAveNews = async () => {
        try {
            const formdata=new FormData(form.current);
            if(leadObj.name.trim() === "")  throw {message:"Name is required!"};
            else if(leadObj.content === "")  throw {message:"Address is required!"};
            else if(leadObj.file === "{}")  throw {message:"File is required!"};
            else{
                setLoading(true)
                formdata.append('id',extraObject.id)
                formdata.append('title',leadObj.name)
                formdata.append('content',leadObj.content)
                formdata.append('file',leadObj.file)
                console.log(leadObj);
                const token=localStorage.getItem(USER_CONFIG.TOKEN_DETAIL)
            const newsRespone=await API_REQUEST.postData(URSL.EDIT_NEWS,formdata,token,'multipart/form-data');
                if(newsRespone.data.status!==200)
                    throw newsRespone.data
                console.log(newsRespone,"ee")
                toast("News Update Successfully")
                closeModal()
            }
        } catch (error) {
            toast(error.message);
            console.log(error);
        }finally{
            setLoading(false)
        }
    }

    const updateFormValue = ({updateType, value}) => {
        setErrorMessage("")
        setLeadObj({...leadObj, [updateType] : value})
    }
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setLeadObj({...leadObj,file:file});
    };
    return(
        <>

            <form ref={form}>
                <InputText type="text" defaultValue={leadObj.name} updateType="name" containerStyle="mt-4" labelTitle="Name" updateFormValue={updateFormValue}/>
                <section>
                    <label className="label">
                        <span className={"label-text text-base-content "}>Content</span>
                    </label>
                <ReactQuill style={{height:150,marginBottom:50,borderRadius:50,borderColor:"grey"}} theme="snow" value={leadObj.content} onChange={(value)=>updateFormValue("content",value)} />
                </section>
                {/* <InputText type="file" defaultValue={leadObj.file} updateType="file" containerStyle="mt-4" labelTitle="Upload File" updateFormValue={updateFormValue}/> */}
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
                <button  className={"btn btn-primary px-6" + (loading ? " loading" : "")} onClick={() => SAveNews()}>Save</button>
            </div>
            {/* <ToastContainer /> */}
        </>
    )
}

export default NewsEditModal