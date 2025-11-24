
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from '@google/genai';
import { ChatMessage } from '../types';
import { Send, Bot, User, Loader2 } from 'lucide-react';

interface AIChatProps {
  initialContext?: string;
  onClearContext?: () => void;
}

const AIChat: React.FC<AIChatProps> = ({ initialContext, onClearContext }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "你好！我是你的 CSP-S 专属助教。我可以帮你理解算法、调试代码逻辑，或者讲解 T1-T4 的解题策略。今天想学点什么？", timestamp: Date.now() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialContext) {
      handleSend(initialContext);
      if (onClearContext) onClearContext();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialContext]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (textOverride?: string) => {
    const textToSend = textOverride || input;
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: textToSend, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const systemInstruction = `你是一位精通中国 CSP-S (Certified Software Professional - Senior Group) 竞赛的专家助教。
      请务必使用 **中文** 回答所有问题。
      
      你的知识库包括：
      - T1: 模拟、贪心、搜索、简单数学。（目标：快速准确，必须拿满分）
      - T2: 动态规划(DP)、线段树、图论基础。（目标：拉开分差的关键）
      - T3: 大模拟、高级图论、树形DP。
      - T4: 高级数学、网络流、复杂数据结构。
      
      教学风格：
      - 鼓励但严谨。
      - 代码块使用 Markdown 格式。
      - 如果用户询问解题思路，先提供“状态转移方程”或“关键思路”，不要直接给出完整 C++ 代码，除非用户明确要求。
      - 对于 DP 问题，重点解释状态定义和转移方程的推导过程。`;

      const history = messages.map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
      }));

      const chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: { systemInstruction },
        history: history
      });

      const result = await chat.sendMessage({ message: textToSend });
      const responseText = result.text;

      const botMsg: ChatMessage = { role: 'model', text: responseText, timestamp: Date.now() };
      setMessages(prev => [...prev, botMsg]);

    } catch (error) {
      console.error(error);
      const errorMsg: ChatMessage = { role: 'model', text: "连接服务器出现问题，请稍后再试。", timestamp: Date.now() };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="bg-slate-50 p-4 border-b border-slate-200 flex items-center gap-2">
         <div className="w-8 h-8 bg-brand-600 rounded-full flex items-center justify-center text-white">
            <Bot className="w-5 h-5" />
         </div>
         <div>
            <h3 className="font-bold text-slate-800">AI 助教</h3>
            <p className="text-xs text-slate-500">Powered by Gemini 2.5 Flash</p>
         </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`
              max-w-[80%] rounded-2xl p-4 text-sm leading-relaxed shadow-sm
              ${msg.role === 'user' 
                ? 'bg-brand-600 text-white rounded-tr-none' 
                : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'}
            `}>
              {msg.role === 'model' ? (
                 <div className="markdown-body" dangerouslySetInnerHTML={{ __html: formatMarkdown(msg.text) }} />
              ) : (
                 msg.text
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-slate-200 shadow-sm flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-brand-500" />
              <span className="text-xs text-slate-500">思考中...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t border-slate-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleSend()}
            placeholder="询问关于题目、算法或策略的问题..."
            className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
            disabled={isLoading}
          />
          <button 
            onClick={() => handleSend()}
            disabled={isLoading || !input.trim()}
            className="bg-brand-600 text-white p-3 rounded-xl hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Simple formatter for basic markdown-like syntax
const formatMarkdown = (text: string) => {
  let formatted = text
    .replace(/\n/g, '<br/>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/`(.*?)`/g, '<code class="bg-slate-100 text-brand-700 px-1 py-0.5 rounded text-xs font-mono">$1</code>');
  return formatted;
};

export default AIChat;
