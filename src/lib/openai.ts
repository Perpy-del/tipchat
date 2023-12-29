import { Configuration, OpenAIApi } from 'openai-edge'

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(config)

export async function generateImagePrompt(name: string) {
   try {
    const response = await openai.createChatCompletion({
        model: 'gpt-3.4-turbo',
        messages: [
            {
                role: 'system',
                content: 'You are a creative and helpful AI assistant capable of generating interesting thumbnail description for my notes. Your output will be fetched into the DALLE API to generate a thumbnail. The description should be minimalist and flat-styled'
            },
            {
                role: 'user',
                content: `Please generate a thumbnail desctiption for my notebook title ${name}`
            }
        ]
    })
    const data = await response.json();
    const image_description = data.choices[0].message.content
    return image_description as string;
   } catch (error) {
     console.log(error);
     throw error;
   }
}

export async function generateImage() {
    
}