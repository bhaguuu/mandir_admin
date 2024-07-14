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

const INITIAL_LEAD_OBJ = {
    name : "",
    phone : "",
    age:"",
    gotra:"",
    addres:"",
    occupation:"",
    gender:"",
    email:""
}

function AddUserModalBody({closeModal}){
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ)


    const saveNewUser = async () => {
        try {
            if(leadObj.name.trim() === "")  throw {message:"Name is required!"};
            else if(leadObj.phone.trim() === "")  throw {message:"phone is required!"};
            else if(leadObj.age.trim() === "")  throw {message:"age is required!"};
            else if(leadObj.gotra.trim() === "")  throw {message:"gotra is required!"};
            else if(leadObj.addres.trim() === "")  throw {message:"Address is required!"};
            else if(leadObj.occupation.trim() === "")  throw {message:"Occupation is required!"};
            else if(leadObj.gender.trim() === "")  throw {message:"Gender is required!"};
            else if(leadObj.email.trim() === "")  throw {message:"Email is required!"};
            else if(!EmailValidate(leadObj.email)) throw {message:"Please enter valid email"};
            else{
                setLoading(true)
                const newLeadObj = {
                    "full_name": leadObj.name,
                    "phone": leadObj.phone,
                    "email": leadObj.email,
                    "address": leadObj.addres,
                    "gotra": leadObj.gotra,
                    "occupation": leadObj.occupation,
                    "age": parseInt(leadObj.age),
                    "gender": leadObj.gender
                }
                const token=localStorage.getItem(USER_CONFIG.TOKEN_DETAIL)
                const addNewUser=await API_REQUEST.postData(URSL.ADD_NEW_USER,newLeadObj,token)
                if(addNewUser.data.status !==201)
                    throw addNewUser.data
                toast("New User Created");
                console.log(token)
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
    const handleChange = (selectedOption) => {
        setLeadObj({...leadObj, 'gender' : selectedOption.target.value})
    };
    return(
        <>

            <InputText type="text" defaultValue={leadObj.name} updateType="name" containerStyle="mt-4" labelTitle="Name" updateFormValue={updateFormValue}/>
            <InputText type="text" defaultValue={leadObj.phone} updateType="phone" containerStyle="mt-4" labelTitle="Phone" updateFormValue={updateFormValue}/>
            <InputText type="text" defaultValue={leadObj.age} updateType="age" containerStyle="mt-4" labelTitle="Age" updateFormValue={updateFormValue}/>
            <InputText type="text" defaultValue={leadObj.gotra} updateType="gotra" containerStyle="mt-4" labelTitle="Gotra" updateFormValue={updateFormValue}/>
            <InputText type="text" defaultValue={leadObj.addres} updateType="addres" containerStyle="mt-4" labelTitle="Address" updateFormValue={updateFormValue}/>
            <InputText type="text" defaultValue={leadObj.email} updateType="email" containerStyle="mt-4" labelTitle="Email" updateFormValue={updateFormValue}/>
            <InputText type="text" defaultValue={leadObj.occupation} updateType="occupation" containerStyle="mt-4" labelTitle="Occupation" updateFormValue={updateFormValue}/>
            {/* <InputText type="text" defaultValue={leadObj.gender} updateType="gender" containerStyle="mt-4" labelTitle="Gender" updateFormValue={updateFormValue}/> */}
            <div className="custom-select">
                <select onChange={handleChange}>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
            </div>
            <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
            <div className="modal-action">
                <button  className="btn btn-ghost" onClick={() => closeModal()}>Cancel</button>
                <button  className={"btn btn-primary px-6" + (loading ? " loading" : "")} onClick={() => saveNewUser()}>Save</button>
            </div>
            
        </>
    )
}

export default AddUserModalBody