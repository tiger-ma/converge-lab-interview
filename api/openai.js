import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: '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',
})

const openai = new OpenAIApi(configuration)

export async function sendMsgToOpenAI(message) {
  const res = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: message,
    temperature: 0.7,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
  
  })
  return res.data.choices[0].text
}
