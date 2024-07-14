import { useState } from "react"


function    InputText({labelTitle, labelStyle, type, containerStyle, defaultValue, placeholder, updateFormValue, updateType,maxLength}){

    const [value, setValue] = useState(defaultValue)
    const [fileName,setFileName]=useState('')

    const updateInputValue = (val) => {
        if(type==="file"){
            setValue('')
        }
        else setValue(val)
        updateFormValue({updateType, value : val})
    }

    return(
        <div className={`form-control w-full ${containerStyle}`}>
            <label className="label">
                <span className={"label-text text-base-content " + labelStyle}>{labelTitle}</span>
            </label>
            <input maxLength={maxLength} style={{
            }} type={type || "text"} value={type=="file"?fileName.name:value} placeholder={placeholder || ""} onChange={(e) => {
                if(type==="file"){
                    setFileName(e.target.value)
                }
                updateInputValue(type=="file"?e.target.files[0]:e.target.value)
            }}className="input  input-bordered w-full " />
        </div>
    )
}


export default InputText