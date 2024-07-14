import { useState } from "react"
import { useDispatch } from "react-redux"
import InputText from '../../../components/Input/InputText'
import ErrorText from '../../../components/Typography/ErrorText'
import { showNotification } from "../../common/headerSlice"
import { addNewLead } from "../leadSlice"
import { API_REQUEST } from "../../../api"
import { URSL } from "../../../constants/URLS"
import { USER_CONFIG } from "../../../constants/User"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EmailValidate from "../../../utils/validateEmail"
import './file.css'

const INITIAL_LEAD_OBJ = {
    file: {},
}

function AddExcelFile({closeModal}){
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ)
    const [selectedName, setSelectedName] = useState("");


    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setLeadObj(file);
        setSelectedName(file.name);
    };
    
    const uploadExcel = async () => {
        try {
            if(leadObj.file === "{}")  throw "File is required!";
            else{
                setLoading(true)
                const data=new FormData();
                data.append('file',leadObj);
                console.log(leadObj)
                const token=localStorage.getItem(USER_CONFIG.TOKEN_DETAIL)
                console.log(data.get('file'))
                const adeFileRes=await API_REQUEST.postData(URSL.EXCEL_UPLOAD,data,token,'multipart/form-data')
                if(adeFileRes.data.status !==200)
                    throw adeFileRes
                toast("File uploaded Succeddfully");
                closeModal()
            }
        } catch (error) {
            toast(error.data.message);
        }finally{
            setLoading(false)
        }
    }

    const updateFormValue = ({updateType, value}) => {
        setErrorMessage("")
        setLeadObj({...leadObj, 'file' : value})
    }

    return(
        <>

            {/* <InputText type="file" defaultValue={leadObj.file} updateType="file" containerStyle="mt-4" labelTitle="File" updateFormValue={updateFormValue}/> */}
            <div className="parent">
                <div className="file-upload">
                    <h3> {selectedName || "Click box to upload file"}</h3>
                    <input type="file" onChange={handleFileChange} />
                </div>
            </div>

            <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
            <div className="modal-action">
                <button  className="btn btn-ghost" onClick={() => closeModal()}>Cancel</button>
                <button  className={"btn btn-primary px-6" + (loading ? " loading" : "")} onClick={() => uploadExcel()}>Save</button>
            </div>
            
        </>
    )
}

export default AddExcelFile