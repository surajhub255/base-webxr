'use client'
import { useState, useEffect } from 'react'
import ChatCompletionCreateParams, { OpenAI } from 'openai'
import { Hex, createPublicClient, http } from 'viem'
import { baseSepolia } from 'viem/chains'
// // import axios from 'axios'
// import { simulateContract, writeContract } from '@wagmi/core'
// import { useAccount, useChainId, useWalletClient } from 'wagmi'
// import { config } from '../../lib/wagmi'
// import { abi } from '../../lib/abi'

// const openai = new OpenAI({
//
// 	dangerouslyAllowBrowser: true,
// })

const page = () => {
	// const chainId = useChainId()
	// const { data: walletClient } = useWalletClient({ chainId })
	// const [isListening, setIsListening] = useState(false)
	// const [transcript, setTranscript] = useState('')
	// const [response, setResponse] = useState('')
	// const [messages, setMessages] = useState([
	// 	{
	// 		role: 'system',
	// 		content:
	// 			'The following conversation is centered around goats, answer anything on goats keep it short',
	// 	},
	// ])

	// const account = useAccount()

	// const walletAddress = account.address

	// const createReward = async () => {
	// 	const { request } = await simulateContract(config, {
	// 		abi,
	// 		address: '0x4b4Fd104fb1f33a508300C1196cd5893f016F81c',
	// 		functionName: 'createFanToken',
	// 		args: ['phygitalcontractAddr', 'amount', 'tokenId', 'data', '_uri'],
	// 	})
	// 	const hash = await writeContract(config, request)
	// 	console.log(hash)
	// }

	// useEffect(() => {
	// 	// Initialize speech recognition
	// 	const recognition = new (window as any).webkitSpeechRecognition()
	// 	recognition.continuous = false
	// 	recognition.interimResults = false
	// 	recognition.lang = 'en-US'

	// 	recognition.onresult = (event: any) => {
	// 		const speechToText = event.results[0][0].transcript

	// 		console.log(speechToText)
	// 		setTranscript(speechToText)
	// 		addMessage({ role: 'user', content: speechToText })
	// 		getOpenAIResponse(speechToText)
	// 	}

	// 	recognition.onend = () => {
	// 		setIsListening(false)
	// 	}

	// 	if (isListening) {
	// 		recognition.start()
	// 	} else {
	// 		recognition.stop()
	// 	}

	// 	return () => {
	// 		recognition.stop()
	// 	}
	// }, [isListening])

	// const getOpenAIResponse = async (text: string) => {
	// 	try {
	// 		const params: ChatCompletionCreateParams = {
	// 			//@ts-ignore
	// 			model: 'gpt-3.5-turbo',
	// 			messages: messages.map((msg) => ({
	// 				role: msg.role as 'user' | 'assistant' | 'system',
	// 				content: msg.content,
	// 			})),
	// 			max_tokens: 50,
	// 		}

	// 		//@ts-ignore
	// 		const response = await openai.chat.completions.create(params)
	// 		const aiResponse = response.choices?.[0]?.message?.content?.trim()
	// 		if (aiResponse) {
	// 			setResponse(aiResponse)
	// 			addMessage({ role: 'assistant', content: aiResponse })
	// 			speak(aiResponse)
	// 		} else {
	// 			console.error('Received an invalid response from OpenAI')
	// 		}
	// 	} catch (error) {
	// 		console.error('Error fetching OpenAI response:', error)
	// 	}
	// }

	// const addMessage = (message: {
	// 	role: 'user' | 'assistant'
	// 	content: string
	// }) => {
	// 	setMessages((prevMessages) => [...prevMessages, message])
	// }

	// const speak = (text: string) => {
	// 	const synth = window.speechSynthesis
	// 	const utterance = new SpeechSynthesisUtterance(text)

	// 	const voices = synth.getVoices()
	// 	const femaleVoice = voices.find(
	// 		(voice) => /female/i.test(voice.name) || /woman/i.test(voice.name)
	// 	)

	// 	if (femaleVoice) {
	// 		utterance.voice = femaleVoice
	// 	} else if (voices.length > 0) {
	// 		// Fallback to the first voice if no female voice is found
	// 		utterance.voice = voices[0]
	// 	}

	// 	synth.speak(utterance)
	// }

	// const handleListen = () => {
	// 	setIsListening((prevState) => !prevState)
	// }

	// const getvoices = () => {
	// 	const options = {
	// 		method: 'GET',
	// 		headers: { 'x-api-key': '8b48776b-d29e-4171-b6bc-fef945c7ba95' },
	// 		'Access-Control-Allow-Origin': 'http://localhost:3002',
	// 	}

	// 	fetch('https://client.camb.ai/apis/list_voices', options)
	// 		.then((response) => response.json())
	// 		.then((response) => console.log(response))
	// 		.catch((err) => console.error(err))
	// }

	return (
		<div>
			<p>voice test page</p>
			{/* <button onClick={handleListen} className='bg-green-300'>
				{isListening ? 'Stop Listening' : 'Start Listening'}
			</button>
			<p>Transcript: {transcript}</p>
			<p>Response: {response}</p>

			<button className='bg-orange-400' onClick={getvoices}>
				get voice list
			</button>
			<button className='bg-blue-400 py-4 px-8' onClick={createReward}>
				fan token
			</button> */}
		</div>
	)
}

export default page
