import { useState } from "react"
import { Container, Form, Avatar } from "./styles"
import { useNavigate } from "react-router-dom"

import { useAuth } from "../../hooks/auth"

import { api } from "../../services/api.js"
import avatarPlaceholder from "../../assets/avatar_placeholder.svg"

import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera } from "react-icons/fi"

import { Input } from "../../components/Input"
import { Button } from "../../components/Button"
import { ButtonText } from "../../components/ButtonText/index"

export function Profile() {
  const { user, updateProfile } = useAuth()

  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [passwordOld, setPasswordOld] = useState()
  const [passwordNew, setPasswordNew] = useState()

  const navigate = useNavigate()

  function handleBackPage() {
    navigate(-1)
  }

  const avatarURL = user.avatar
    ? ` ${api.defaults.baseURL}/files/${user.avatar} `
    : avatarPlaceholder
  const [avatar, setAvatar] = useState(avatarURL) //exibir o avatar
  const [avatarFile, setAvatarFile] = useState(null) //guardar o arquivo

  async function handleUpdate() {
    const updated = {
      name,
      email,
      password: passwordNew,
      old_password: passwordOld,
    }

    const userUpdated = Object.assign(user, updated)

    await updateProfile({ user: userUpdated, avatarFile })
  }

  function handleChangeAvatar(event) {
    const file = event.target.files[0]

    setAvatarFile(file)

    const imagePreview = URL.createObjectURL(file)
    setAvatar(imagePreview)
  }

  return (
    <Container>
      <header>
        <button type="button" onClick={handleBackPage}>
          <FiArrowLeft size={24} />
        </button>
      </header>

      <Form>
        <Avatar>
          <img src={avatar} alt="User profile picture" />

          <label htmlFor="avatar">
            <FiCamera />
            <input id="avatar" type="file" onChange={handleChangeAvatar} />
          </label>
        </Avatar>

        <Input
          placeholder="Name"
          type="text"
          icon={FiUser}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Input
          placeholder="Email"
          type="text"
          icon={FiMail}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          placeholder="Current password"
          type="password"
          icon={FiLock}
          onChange={(e) => setPasswordOld(e.target.value)}
        />

        <Input
          placeholder="New password"
          type="password"
          icon={FiLock}
          onChange={(e) => setPasswordNew(e.target.value)}
        />

        <Button title="Save" onClick={handleUpdate} />
      </Form>
    </Container>
  )
}
