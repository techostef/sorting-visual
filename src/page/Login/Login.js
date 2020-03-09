import React from 'react'
import FormLogin from "./components/formLogin"
const Login = () => (
    <div className="w-full flex" style={{height: "100vh"}}>
        <div className="m-auto border-shadow-inner p-3" style={{width: "300px"}}>
            <FormLogin/>
        </div>
    </div>
)
export default Login