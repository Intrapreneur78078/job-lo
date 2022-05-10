import { useState, useEffect } from "react"
import { Alert, FormRow, Logo } from "../components"
import Wrapper from "../assets/wrappers/RegisterPage"
import { useAppContext } from "../context/appContext"
import { useNavigate } from "react-router-dom"

const initialState = {
  name:"",
  email:"",
  password:"",
  isMember:true,
}

const Register = () => {
  const { user, isLoading, showAlert, displayAlert,
    //  registerUser, loginUser ,
      setupUser } = useAppContext()
  const navigate = useNavigate()
  useEffect(()=>{
    if(user){
      setTimeout(()=>{
        navigate("/")
      },2000)
    }
  },[user,navigate])
  const [values,setValues] = useState(initialState)
  const handleChange = (e) => {
    setValues({...values,[e.target.name]:e.target.value})
}
  const handleSubmit = (e) => {
    e.preventDefault()
    const {name, email, password, isMember } = values ;
    if(!email || !password || (!isMember && !name)){
      displayAlert()
      return 
    }
    const currentUser = { name, email, password} 
    if(isMember){
      setupUser({currentUser,endPoint:"login",alertText:"Login Successful! Redirecting..."})
    }else{setupUser({currentUser,endPoint:"register",alertText:"User created! Redirecting..."})}
  }
  const toggleMember = () => {
    setValues({...values,isMember:!values.isMember})
  }
  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={handleSubmit}>
        <Logo/>
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        {showAlert && <Alert/>}
        {!values.isMember && <FormRow type="text" name="name" value={values.name} handleChange={handleChange} labelText="name" />}
        <FormRow type="email" name="email" value={values.email} handleChange={handleChange} labelText="email" />
        <FormRow type="password" name="password" value={values.password} handleChange={handleChange} labelText="password" />
        <button className="btn btn-block" type="submit" disabled={isLoading}>submit</button>
        <p>
          {values.isMember ? "Not a member yet?" : "Already a member? "}
          <button className="member-btn" onClick={toggleMember} type="button">
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  )
}

export default Register