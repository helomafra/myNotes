import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Container, Form, Background } from "./styles"

import { api } from "../../services/api"

import { FiMail, FiLock, FiUser } from "react-icons/fi"
import { Input } from "../../components/Input"
import { Button } from "../../components/Button"

import Logo from "../../assets/logo.svg"

export function SignUp() {
  const [name, setName] = useState(" ")
  const [email, setEmail] = useState(" ")
  const [password, setPassword] = useState(" ")

  const navigate = useNavigate()

  function handleSignUp() {
    if (!name || !email || !password) {
      return alert("Preencha todos os campos!")
    }

    api
      .post("/users", { name, email, password })
      .then(() => {
        alert("Usuário cadastrado com sucesso!")
        navigate("/")
      })
      .catch((error) => {
        if (error.response) {
          alert(error.response.data.message)
        } else {
          alert("Não foi possível cadastrar usuário.")
        }
      })
  }

  return (
    <Container>
      <Form>
        <img src={Logo} alt="myNotes" />
        <p>Application to save and manage your useful links</p>
        <h2>Sign Up</h2>

        <Input
          placeholder="Name"
          type="text"
          icon={FiUser}
          onChange={(e) => setName(e.target.value)}
        />

        <Input
          placeholder="Email"
          type="text"
          icon={FiMail}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          placeholder="Password"
          type="password"
          icon={FiLock}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button title="Register" onClick={handleSignUp} />

        <Link to="/">Back to sign in</Link>
      </Form>
      <Background />
    </Container>
  )
}
