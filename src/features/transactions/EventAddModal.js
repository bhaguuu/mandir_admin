import { useRef, useState } from "react"
import { useDispatch } from "react-redux"
import InputText from '../../components/Input/InputText'
import ErrorText from '../../components/Typography/ErrorText'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { URSL } from "../../constants/URLS"
import { USER_CONFIG } from "../../constants/User";
import { API_REQUEST } from "../../api";
import '../leads/components/file.css'
import '../leads/components/radio.css'
const INITIAL_EVENT_OBJ = {
    name : "",
    start_date : "",
    end_date:"",
    description:"",
    type:"",
    address:"",
    file:{},
}
function AddEventModalBody({closeModal}){
    const form=useRef();
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [leadObj, setLeadObj] = useState(INITIAL_EVENT_OBJ)


    const saveNewEvent = async () => {
        try {
            const formdata=new FormData();
            if(leadObj.name.trim() === "")  throw {message:"Name is required!"};
            else if(leadObj.start_date.trim() === "")  throw {message:"Start date is required!"};
            else if(leadObj.end_date.trim() === "")  throw {message:"End date is required!"};
            else if(leadObj.description.trim() === "")  throw {message:"Description is required!"};
            else if(leadObj.type.trim() === "")  throw {message:"Type is required!"};
            else if(leadObj.address.trim() === "" && leadObj.type == 1)  throw {message:"Address is required!"};
            else if(leadObj.file === '{}')  throw {message:"File is required!"};
            else{
                setLoading(true)
                formdata.append('name',leadObj.name)
                formdata.append('start_date',leadObj.start_date)
                formdata.append('end_date',leadObj.end_date)
                formdata.append('description',leadObj.description)
                formdata.append('type',leadObj.type)
                formdata.append('address',leadObj.address)
                formdata.append('file',leadObj.file)
                
                // console.log(leadObj);
                const token=localStorage.getItem(USER_CONFIG.TOKEN_DETAIL)
                const eventRespone=await API_REQUEST.postData(URSL.ADD_EVENTS,formdata,token,'multipart/form-data');
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
                <InputText type="text" defaultValue={leadObj.name} updateType="name" containerStyle="mt-4" labelTitle="Name" updateFormValue={updateFormValue}/>
                <InputText type="date" defaultValue={leadObj.start_date} updateType="start_date" containerStyle="mt-4" labelTitle="Start Date" updateFormValue={updateFormValue}/>
                <InputText type="date" defaultValue={leadObj.end_date} updateType="end_date" containerStyle="mt-4" labelTitle="End Date" updateFormValue={updateFormValue}/>
                <InputText type="text" defaultValue={leadObj.description} updateType="description" containerStyle="mt-4" labelTitle="Description" updateFormValue={updateFormValue}/>
                
                <div className="custom-select">
                    <select onChange={handleChange}>
                        <option value="">Select Event Type</option>
                        <option value={0}>Live</option>
                        <option value={1}>Onsite</option>
                    </select>
                </div>
                {/* <InputText type="text" defaultValue={leadObj.type} updateType="type" containerStyle="mt-4" labelTitle="Event Type" updateFormValue={updateFormValue}/> */}
                
                <InputText type="text" defaultValue={leadObj.address} updateType="address" containerStyle="mt-4" labelTitle="Address" updateFormValue={updateFormValue}/>
                {/* <InputText type="file" defaultValue={leadObj.file?.name} updateType="file" containerStyle="mt-4" labelTitle="Upload File" updateFormValue={updateFormValue}/> */}
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
            {/* <ToastContainer /> */}
        </>
    )
}

export default AddEventModalBody