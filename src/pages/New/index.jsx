import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { Container, Form } from "./styles"
import { Header } from "../../components/Header"
import { Input } from "../../components/Input"
import { Textarea } from "../../components/TextArea"
import { NoteItem } from "../../components/NoteItem"
import { Section } from "../../components/Section"
import { Button } from "../../components/Button"
import { ButtonText } from "../../components/ButtonText/index"
import { FiArrowLeft } from "react-icons/fi"

import { api } from "../../services/api"

export function New() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const [links, setLinks] = useState([]) //guarda todos os links
  const [newLink, setNewLink] = useState("")

  const [tags, setTags] = useState([]) //guarda todos os links
  const [newTag, setNewTag] = useState("") //armazena o link a ser adicionado

  const navigate = useNavigate()

  function handleBackPage() {
    navigate(-1)
  }

  function handleKeyPressLink(event) {
    if (event.key === "Enter") {
      handleAddLink()
    }
  }

  function handleAddLink() {
    setLinks((prevState) => [...prevState, newLink])
    setNewLink("")
  }

  function handleRemoveLink(deleted) {
    setLinks((prevState) => prevState.filter((link) => link !== deleted))
  }

  function handleKeyPressTag(event) {
    if (event.key === "Enter") {
      handleAddTag()
    }
  }

  function handleAddTag() {
    setTags((prevState) => [...prevState, newTag])
    setNewTag("") //serve para limpar o input
  }

  function handleRemoveTag(deleted) {
    setTags((prevState) => prevState.filter((tag) => tag !== deleted))
  }

  async function handleNewNote() {
    if (!title) {
      return alert("Enter the note title!")
    }

    if (newLink) {
      return alert(
        "You left a link field filled without adding. Click to add or leave the field empty."
      )
    }

    if (newTag) {
      return alert(
        "You left a tag field filled without adding. Click to add or leave the field empty."
      )
    }

    await api.post("/notes", {
      title,
      description,
      tags,
      links,
    })

    alert("Note created successfully!")
    navigate(-1)
  }

  return (
    <Container>
      <Header />

      <main>
        <Form>
          <header>
            <ButtonText
              title="Back"
              onClick={handleBackPage}
              icon={FiArrowLeft}
            />
            <h1>New note</h1>
          </header>

          <Input
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
          />

          <Section title="Useful links">
            {links.map((link, index) => (
              <NoteItem
                key={String(index)}
                value={link}
                onClick={() => handleRemoveLink(link)}
              />
            ))}
            <NoteItem
              isNew
              placeholder="New link"
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
              onClick={handleAddLink}
              onKeyPress={handleKeyPressLink}
            />
          </Section>

          <Section title="Tags">
            <div className="tags">
              {tags.map((tag, index) => (
                <NoteItem
                  key={String(index)}
                  value={tag}
                  onClick={() => handleRemoveTag(tag)}
                />
              ))}

              <NoteItem
                isNew
                placeholder="New tag"
                onChange={(e) => setNewTag(e.target.value)}
                value={newTag}
                onClick={handleAddTag}
                onKeyPress={handleKeyPressTag}
              />
            </div>
          </Section>

          <Button title="Save" onClick={handleNewNote}></Button>
        </Form>
      </main>
    </Container>
  )
}
