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
import { validateObject } from "../../../validations/formValidaion"

function EditUserModalBody({closeModal,extraObject}){
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [leadObj, setLeadObj] = useState( {
        full_name: extraObject.full_name,
        phone: extraObject.phone,
        email: extraObject.email,
        address: extraObject.address,
        gotra: extraObject.gotra,
        occupation: extraObject.occupation,
        age: extraObject.age,
        gender: extraObject.gender
    })

    const saveUser = async () => {
        try {
            await validateObject({
                "full_name": leadObj.full_name,
                "phone": leadObj.phone,
                "email": leadObj.email,
                "address": leadObj.address,
                "gotra": leadObj.gotra,
                "occupation": leadObj.occupation,
                "age": parseInt(leadObj.age),
                "gender": leadObj.gender
            })
            setLoading(true)
            const newLeadObj = {
                "id":extraObject.id,
                "full_name": leadObj.full_name,
                "phone": leadObj.phone,
                "email": leadObj.email,
                "address": leadObj.address,
                "gotra": leadObj.gotra,
                "occupation": leadObj.occupation,
                "age": parseInt(leadObj.age),
                "gender": leadObj.gender
            }

            console.log(newLeadObj,"Ss")
            const token=localStorage.getItem(USER_CONFIG.TOKEN_DETAIL)
            const addNewUser=await API_REQUEST.postData(URSL.EDIT_USER,newLeadObj,token)
            if(addNewUser.data.status !==200)
                throw addNewUser.data
            toast("User Updated");
            console.log(addNewUser)
            closeModal()
        } catch (error) {
            toast(error.message);
        }finally{
            setLoading(false)
        }
    }

    const updateFormValue = ({updateType, value}) => {
        setErrorMessage("")
        setLeadObj({...leadObj, [updateType] : value})
    }
    const handleChange = (selectedOption) => {
        setLeadObj({...leadObj, 'gender' : selectedOption.target.value})
    };
    return(
        <>

            <InputText type="text" defaultValue={leadObj.full_name} updateType="full_name" containerStyle="mt-4" labelTitle="Name" updateFormValue={updateFormValue}/>
            <InputText type="text" defaultValue={leadObj.phone} updateType="phone" containerStyle="mt-4" labelTitle="Phone" updateFormValue={updateFormValue}/>
            <InputText type="text" defaultValue={leadObj.age} updateType="age" containerStyle="mt-4" labelTitle="Age" updateFormValue={updateFormValue}/>
            <InputText type="text" defaultValue={leadObj.gotra} updateType="gotra" containerStyle="mt-4" labelTitle="Gotra" updateFormValue={updateFormValue}/>
            <InputText type="text" defaultValue={leadObj.address} updateType="addres" containerStyle="mt-4" labelTitle="Address" updateFormValue={updateFormValue}/>
            <InputText type="text" defaultValue={leadObj.email} updateType="email" containerStyle="mt-4" labelTitle="Email" updateFormValue={updateFormValue}/>
            <InputText type="text" defaultValue={leadObj.occupation} updateType="occupation" containerStyle="mt-4" labelTitle="Occupation" updateFormValue={updateFormValue}/>
            <div className="custom-select">
                <select value={leadObj.gender} onChange={handleChange}>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
            </div>
            <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
            <div className="modal-action">
                <button  className="btn btn-ghost" onClick={() => closeModal()}>Cancel</button>
                <button  className={"btn btn-primary px-6" + (loading ? " loading" : "")} onClick={() => saveUser()}>Save</button>
            </div>
            
        </>
    )
}

export default EditUserModalBody