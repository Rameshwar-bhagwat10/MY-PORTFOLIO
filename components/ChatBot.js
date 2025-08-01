import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import styles from '../styles/ChatBot.module.css';
import { FaPaperPlane, FaSun, FaMoon, FaRedo, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';

const BOT_AVATAR = '/assets/profile.png';
const USER_AVATAR = '/assets/profile.png';
const QUICK_REPLIES = [
  'Show my skills',
  'Contact info',
  'Show projects',
  'Tell me a joke',
  'Show experience',
  'Show resume'
];
const EMOJI_REACTIONS = ['👍', '❤️', '👏', '😂', '🔥'];

function saveHistory(messages) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('chatbot_history', JSON.stringify(messages));
  }
}
function loadHistory() {
  if (typeof window !== 'undefined') {
    try {
      return JSON.parse(localStorage.getItem('chatbot_history')) || [];
    } catch {
      return [];
    }
  }
  return [];
}

export default function ChatBot({ closeChat }) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState(loadHistory());
  const [typing, setTyping] = useState(false);
  const [mute, setMute] = useState(false);
  const [theme, setTheme] = useState(typeof window !== 'undefined' ? (localStorage.getItem('chatbot_theme') || 'light') : 'light');
  const messagesEndRef = useRef(null);
  const synth = typeof window !== 'undefined' ? window.speechSynthesis : null;

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.setAttribute('data-theme', theme);
      localStorage.setItem('chatbot_theme', theme);
    }
  }, [theme]);

  useEffect(() => {
    if (messages.length === 0) {
      const hour = new Date().getHours();
      const greeting =
        hour < 12
          ? 'Good Morning 🌞 Ram is here!'
          : hour < 18
          ? 'Good Afternoon ☀️ Ram is here!'
          : 'Good Evening 🌙 Ram is here!';
      const botMessage = { text: greeting, sender: 'bot', time: new Date(), reactions: [] };
      setMessages([botMessage]);
      if (!mute && synth) {
        const utterance = new window.SpeechSynthesisUtterance(greeting);
        synth.speak(utterance);
      }
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    saveHistory(messages);
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const sendMessage = async (overrideText) => {
    const finalMessage = (overrideText !== undefined ? overrideText : input).trim();
    if (!finalMessage) return;
    const userMessage = { text: finalMessage, sender: 'user', time: new Date(), reactions: [] };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setTyping(true);
    try {
      const res = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: finalMessage }),
      });
      const data = await res.json();
      const botMessage = { text: data.reply, sender: 'bot', time: new Date(), reactions: [] };
      setMessages((prev) => [...prev, botMessage]);
      setTyping(false);
      if (!mute && synth) {
        const utterance = new window.SpeechSynthesisUtterance(data.reply);
        synth.speak(utterance);
      }
    } catch {
      const errorMessage = { text: 'Error: Failed to respond.', sender: 'bot', time: new Date(), reactions: [] };
      setMessages((prev) => [...prev, errorMessage]);
      setTyping(false);
    }
  };

  const handleQuickReply = (txt) => sendMessage(txt);
  const handleReaction = (msgIdx, emojiIdx) => {
    setMessages(prev =>
      prev.map((msg, i) =>
        i === msgIdx
          ? {
              ...msg,
              reactions: msg.reactions
                ? msg.reactions.includes(emojiIdx)
                  ? msg.reactions.filter(r => r !== emojiIdx)
                  : [...msg.reactions, emojiIdx]
                : [emojiIdx]
            }
          : msg
      )
    );
  };
  const handleClearChat = () => {
    setMessages([]);
    saveHistory([]);
  };

  return (
    <div className={styles.chatPopup} data-theme={theme} aria-label="Chatbot window" role="dialog">
      <div className={styles.header}>
        <Image src={BOT_AVATAR} alt="Bot" className={styles.headerAvatar} width={40} height={40} />
        <div className={styles.headerInfo}>
          <div className={styles.headerTitleRow}>
            RamBot
            <span className={styles.statusDot}></span>
          </div>
          <div className={styles.headerSubtitle}>Your personal assistant</div>
          <div className={styles.headerStatus}>
            <span className={styles.statusDot}></span>
            Online
          </div>
        </div>
        <div className={styles.headerButtons}>
          <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} title={theme === 'dark' ? 'Light mode' : 'Dark mode'} aria-label="Toggle theme">
            {theme === 'dark' ? <FaSun /> : <FaMoon />}
          </button>
          <button onClick={handleClearChat} title="Clear chat" aria-label="Clear chat">
            <FaRedo />
          </button>
          <button onClick={() => setMute(!mute)} title={mute ? 'Unmute' : 'Mute'} aria-label={mute ? 'Unmute' : 'Mute'}>
            {mute ? <FaVolumeMute /> : <FaVolumeUp />}
          </button>
          <button className={styles.closeBtn} onClick={closeChat} aria-label="Close chat">✖</button>
        </div>
      </div>
      <div className={styles.messages} tabIndex={0} aria-live="polite">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`${styles.message} ${msg.sender === 'user' ? styles.user : styles.bot}`}
            tabIndex={0}
            aria-label={msg.sender === 'user' ? 'Your message' : 'Bot message'}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Image src={msg.sender === 'user' ? USER_AVATAR : BOT_AVATAR} alt={msg.sender === 'user' ? 'You' : 'Bot'} width={28} height={28} style={{ borderRadius: '50%' }} />
              <span>{msg.text}</span>
            </div>
            <div className={styles.time}>{new Date(msg.time).toLocaleTimeString()}</div>
            <div className={styles.messageReactions}>
              {EMOJI_REACTIONS.map((emoji, eIdx) => (
                <span
                  key={eIdx}
                  style={{
                    cursor: 'pointer',
                    opacity: msg.reactions && msg.reactions.includes(eIdx) ? 1 : 0.5,
                    fontWeight: msg.reactions && msg.reactions.includes(eIdx) ? 700 : 400
                  }}
                  onClick={() => handleReaction(index, eIdx)}
                  title="React"
                  tabIndex={0}
                  aria-label={`React with ${emoji}`}
                >
                  {emoji}
                </span>
              ))}
            </div>
            {msg.sender === 'bot' && index === messages.length - 1 && (
              <div className={styles.quickReplies}>
                {QUICK_REPLIES.map((qr, qIdx) => (
                  <button
                    key={qIdx}
                    className={styles.quickReplyBtn}
                    onClick={() => handleQuickReply(qr)}
                    aria-label={`Quick reply: ${qr}`}
                  >
                    {qr}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
        {typing && (
          <div className={`${styles.message} ${styles.bot}`}>
            <div className={styles.typing}>
              <span></span><span></span><span></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className={styles.inputArea}>
        <input
          type="text"
          className={styles.inputField}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."
          aria-label="Chat input"
          onKeyDown={e => { if (e.key === 'Enter') sendMessage(); }}
        />
        <button className={styles.sendBtn} onClick={() => sendMessage()} aria-label="Send message"><FaPaperPlane /></button>
      </div>
    </div>
  );
}