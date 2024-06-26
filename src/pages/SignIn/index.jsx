import { useState, useEffect, useRef } from "react"
import { useAuth } from "../../hooks/auth"

import { Container, Form, Background } from "./styles"

import { Link } from "react-router-dom"

import { FiMail, FiLock } from "react-icons/fi"
import { Input } from "../../components/Input"
import { Button } from "../../components/Button"

import Logo from "../../assets/logo.svg"

export function SignIn() {
  const [email, setEmail] = useState(" ")
  const [password, setPassword] = useState(" ")

  const { signIn } = useAuth()

  function handleSignIn() {
    signIn({ email, password })
  }

  return (
    <Container>
      <Form>
        <img src={Logo} alt="myNotes" />
        <p>Application to save and manage your useful links</p>
        <h2>Sign In</h2>

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

        <Button title="Continue" onClick={handleSignIn} />

        <Link to="/register">Create account</Link>
      </Form>

      <Background />
    </Container>
  )
}
