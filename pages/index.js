import userIcon from '../assets/user-icon.jpg'
import gptIcon from '../assets/chatgptLogo.svg'
import styles from '../styles/Home.module.css'
import sendIcon from '../assets/send.svg'
import Image from 'next/image'

import { sendMsgToOpenAI } from '../api/openai'
import { useState } from 'react'
import { getPages } from '../api/serper.js'

export default function Home() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])

  const handleSend = async (event) => {
    event.preventDefault()
    if (input !== '') {
      try {
        //serper
        const response = await getPages(input)
        const knowledgeGraph = response.data.organic
          .slice(0, 10)
          .map((obj) => obj.snippet)
        const tenSnippets = knowledgeGraph.join(';')


        const res = await sendMsgToOpenAI(
          `Here is some context for the question: ${tenSnippets} Based on the context, answer the question: ${input}`
        )

        setMessages([...messages, input, res])
        console.log('res', res)
      } catch (err) {
        console.error(err)
      }
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.chats}>
        {messages.map((msg, idx) => (
          <div className={styles.chat}>
            <Image src={idx % 2 == 1 ? gptIcon : userIcon} alt="icon" />
            <p>{msg}</p>
          </div>
        ))}
      </div>
      <div className={styles.chatFooter}>
        <form className={styles.inp} onSubmit={handleSend}>
          <input
            type="text"
            placeholder="Send a message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit">
            <Image src={sendIcon} />
          </button>
        </form>
      </div>
    </div>
  )
}
