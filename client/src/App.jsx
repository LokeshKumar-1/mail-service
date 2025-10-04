import {useEffect, useState} from 'react'
import './App.css'
import {toast} from "react-toastify";
import {VITE_END_POINT} from "./config/env.js";
import {sendMailService} from "./api/services/dash.service.js";


function formFieldsGenerator (selectedMode) {
    if (selectedMode === "send") {
        return [
            { id: "mail-to-send", name: "emailToSend", label: "Email to send*", type: "email", placeholder: "Enter email address.." },
            { id: "about-for-mail", name: "aboutSection", label: "About Section*", type: "text", placeholder: "Enter Your About Here.." },
            { id: "body-for-mail", name: "bodySection", label: "Body Section*", type: "textarea", placeholder: "Enter Your Body Here..." },
        ]
    }
        return [
            { id: "mail-of-sender", name: "emailFrom", label: "Email*", type: "email", placeholder: "Enter your email.." },
            { id: "purpose-for-mail", name: "purposeOfEmail", label: "Purpose for writing*", type: "text", placeholder: "Purpose of writing" },
            { id: "tell-me-more", name: "tellMeMore", label: "Tell me more*", type: "textarea", placeholder: "Tell me more..." },
        ];
}


function App() {

    const [selectedMode, setSelectedMode] = useState('send')
    const [formFields, setFormFields] = useState([])
    const [inputValues, setInputValues] = useState({})
    const [isFormValid, setIsFormValid] = useState(false)
    console.log(VITE_END_POINT, "isFormValid")

    useEffect(() => {
        setFormFields(formFieldsGenerator(selectedMode))
        setIsFormValid(false)

    }, [selectedMode]);

    useEffect(() => {
        validateForm()
    }, [inputValues])

    function validateForm() {
        const {emailToSend, aboutSection, bodySection, emailFrom, purposeOfEmail, tellMeMore} = inputValues
        if (selectedMode === "send") {
            if (emailToSend && aboutSection && bodySection) {
                setIsFormValid(true)
            }
        } else {
            if (emailFrom && purposeOfEmail && tellMeMore) {
                setIsFormValid(true)
            }
        }
    }

    const updateInputValues = (e) => {
        setInputValues(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const submitEventHandler = async(e) => {
        e.preventDefault()
        if (isFormValid) {
            const bodyContentForSend = {
                to: inputValues?.emailToSend || "",
                subject: inputValues?.aboutSection || "",
                message: inputValues?.bodySection || ""
            }

            const bodyContentForReceive = {
                from: inputValues.emailFrom || "",
                to: "lokeshkumarfpa@gmail.com",
                subject: inputValues.purposeOfEmail || "",
                message: inputValues.tellMeMore || ""
            }

            const postResponse = await sendMailService(selectedMode === "send" ? bodyContentForSend : bodyContentForReceive)
            console.log(postResponse, "postResponse")

        }


    }

  return (
   <main className="parent-container">
       <section className="card-container">
           <nav className="button-container">
               <button type={"button"} className="section-btn"
                       style={{backgroundColor: selectedMode === "send" ? "#2980b9" : null}}
                       onClick={() => setSelectedMode("send")}>Send Mail</button>
               <button type={"button"} className="section-btn"
                       style={{backgroundColor: selectedMode !== "send" ? "#2980b9" : null}}
                       onClick={() => setSelectedMode("receive")}>Receive Mail</button>
           </nav>
           <form className="card-form" onSubmit={submitEventHandler}>
               {formFields.map((field) => (
                   <div key={field.id} className="input-cont">
                       <label htmlFor={field.id}>{field.label}</label>
                       {field.type === "textarea" ? (
                           <textarea id={field.id} name={field.name} className="textarea-ele" value={inputValues[field.name] || ""} placeholder={field.placeholder} onChange={(e) => updateInputValues(e)} />
                       ) : (
                           <input type={field.type} name={field.name} id={field.id} className="input-ele" value={inputValues[field.name] || ""} placeholder={field.placeholder} onChange={(e) => updateInputValues(e)} />
                       )}
                   </div>
               ))}
               <button type="submit" className="send-button">Send</button>
           </form>
       </section>
   </main>
  )
}

export default App
