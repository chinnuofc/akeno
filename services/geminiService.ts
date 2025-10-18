import { GoogleGenAI, Chat } from "@google/genai";
import { Message, Role } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const getBotResponse = async (
    newMessage: string,
    history: Message[],
    systemInstruction: string
) => {
    try {
        const chat: Chat = ai.chats.create({
            model: 'gemini-2.5-flash',
            history: history.map(msg => ({
                role: msg.role,
                parts: [{ text: msg.content }]
            })),
            config: {
                systemInstruction: systemInstruction,
            },
        });
        
        const responseStream = await chat.sendMessageStream({ message: newMessage });
        return responseStream;

    } catch (error) {
        console.error("Gemini API error:", error);
        throw error;
    }
};