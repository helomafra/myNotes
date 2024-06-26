import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

import { Container, Links, Content } from "./styles"
import { Header } from "../../components/Header"
import { Button } from "../../components/Button"
import { Section } from "../../components/Section"
import { Tag } from "../../components/Tag"
import { ButtonText } from "../../components/ButtonText"
import { api } from "../../services/api"

import { FiArrowLeft, FiTrash2 } from "react-icons/fi"

export function Details() {
  const [data, setData] = useState(null)

  const params = useParams()
  const navigate = useNavigate()

  async function handleRemoveNote() {
    const confirm = window.confirm("Do you really want to delete the note?")

    if (confirm) {
      await api.delete(`/notes/${params.id}`)
      navigate(-1)
    }
  }

  function handleBackPage() {
    navigate(-1)
  }

  useEffect(() => {
    async function fetchNote() {
      const response = await api.get(`/notes/${params.id}`)

      setData(response.data)
    }

    fetchNote()
  }, [])

  return (
    <Container>
      <Header />
      {data && (
        <main>
          <Content>
            <header>
              <ButtonText
                title="Back"
                onClick={handleBackPage}
                icon={FiArrowLeft}
              />
            </header>

            <div className="content">
              <h1>{data.title}</h1>
              <p>{data.description}</p>

              {data.links && (
                <Section title="Useful links">
                  <Links>
                    {data.links.map((link) => (
                      <li key={String(link.id)}>
                        <a href={link.url} target="_blank">
                          {link.url}
                        </a>
                      </li>
                    ))}
                  </Links>
                </Section>
              )}

              {data.tags && (
                <Section title="Tags">
                  {data.tags.map((tag) => (
                    <Tag key={String(tag.id)} title={tag.name} />
                  ))}
                </Section>
              )}
            </div>

            <ButtonText
              title="Delete note"
              onClick={handleRemoveNote}
              icon={FiTrash2}
            />
          </Content>
        </main>
      )}
    </Container>
  )
}
