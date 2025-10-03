import {useEffect, useState} from 'react'
import './App.css'


function formFieldsGenerator (selectedMode) {
    if (selectedMode === "send") {
        return [
            { id: "mail-to-send", label: "Email to send*", type: "email", placeholder: "Enter email address.." },
            { id: "about-for-mail", label: "About Section*", type: "text", placeholder: "Enter Your About Here.." },
            { id: "body-for-mail", label: "Body Section*", type: "textarea", placeholder: "Enter Your Body Here..." },
        ]
    }
        return [
            { id: "mail-of-sender", label: "Email*", type: "email", placeholder: "Enter your email.." },
            { id: "purpose-for-mail", label: "Purpose for writing*", type: "text", placeholder: "Purpose of writing" },
            { id: "tell-me-more", label: "Tell me more*", type: "textarea", placeholder: "Tell me more..." },
        ];
}


function App() {

    const [selectedMode, setSelectedMode] = useState('send')
    const [formFields, setFormFields] = useState([])

    useEffect(() => {
        setFormFields(formFieldsGenerator(selectedMode))
    }, [selectedMode]);

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
           <form className="card-form">
               {formFields.map((field) => (
                   <div key={field.id} className="input-cont">
                       <label htmlFor={field.id}>{field.label}</label>
                       {field.type === "textarea" ? (
                           <textarea id={field.id} className="textarea-ele" placeholder={field.placeholder} />
                       ) : (
                           <input type={field.type} id={field.id} className="input-ele" placeholder={field.placeholder} />
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
