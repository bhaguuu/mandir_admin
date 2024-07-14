import { useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InputText from "../../components/Input/InputText"
import ErrorText from "../../components/Typography/ErrorText"
import { USER_CONFIG } from "../../constants/User";
import { URSL } from "../../constants/URLS";
import { API_REQUEST } from "../../api";
import { validateObject } from "../../validations/formValidaion";

function EditEventModalBody({closeModal,extraObject}){
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [leadObj, setLeadObj] = useState( {
        name: extraObject.name,
        start_date: extraObject.start_date,
        end_date: extraObject.end_date,
        description: extraObject.description,
        address:extraObject.address,
        type:extraObject.type,
        image:extraObject.image,
    })
    let formdata=new FormData();
    const SaveEvent = async () => {
        try {
            setLoading(true)
            formdata.append("id",extraObject.id)
            formdata.append('name',leadObj.name)
            formdata.append('start_date',leadObj.start_date)
            formdata.append('end_date',leadObj.end_date)
            formdata.append('description',leadObj.description)
            formdata.append('type',leadObj.type)
            formdata.append('address',leadObj.address)
            formdata.append('file',leadObj.image)
            console.log(leadObj);
            const token=localStorage.getItem(USER_CONFIG.TOKEN_DETAIL)
            const addNewUser=await API_REQUEST.postData(URSL.EDIT_EVENT,formdata,token,'multipart/form-data')
            if(addNewUser.data.status !==200)
                throw addNewUser.data
            toast("Event Updated");
            // console.log(addNewUser)
            closeModal()
        } catch (error) {
            console.log(error);
            toast(error.message);
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
        setLeadObj({...leadObj,image:file});
    };
    return(
        <>

            <InputText type="text" defaultValue={leadObj.name} updateType="name" containerStyle="mt-4" labelTitle="Name" updateFormValue={updateFormValue}/>
            <InputText type="date" defaultValue={leadObj.start_date} updateType="start_date" containerStyle="mt-4" labelTitle="Start Date" updateFormValue={updateFormValue}/>
            <InputText type="date" defaultValue={leadObj.end_date} updateType="end_date" containerStyle="mt-4" labelTitle="End Date" updateFormValue={updateFormValue}/>
            <InputText type="text" defaultValue={leadObj.description} updateType="description" containerStyle="mt-4" labelTitle="Description" updateFormValue={updateFormValue}/>
            <div className="custom-select">
                <select onChange={(selectedOption)=>leadObj.type=selectedOption.target.value}>
                    <option value={leadObj.type==0?"Live":"Onsite"}>Select Event Type</option>
                    <option value={0}>Live</option>
                    <option value={1}>Onsite</option>
                </select>
            </div>
            <InputText type="text" defaultValue={leadObj.address} updateType="address" containerStyle="mt-4" labelTitle="Address" updateFormValue={updateFormValue}/>
            <div className="parent">
                <div className="file-upload">
                    <h3> {leadObj.image?.name || "Click box to upload file"}</h3>
                    <input type="file" onChange={handleFileChange} />
                </div>
            </div>
            <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
            <div className="modal-action">
                <button  className="btn btn-ghost" onClick={() => closeModal()}>Cancel</button>
                <button  className={"btn btn-primary px-6" + (loading ? " loading" : "")} onClick={() => SaveEvent()}>Save</button>
            </div>
            
        </>
    )
}

export default EditEventModalBody