'use client'

import { useEffect, useState } from "react";

const sentences = [
  "我的爱好",
  "我有一只狗, ",
  "我经常带它去散步。",
  "散步的时候，",
  "我喜欢和其他养狗的人聊天。",
  "我有一台游戏机。",
  "我喜欢玩赛车游戏",
  "我也喜欢读书",
  "但是最近没有太多时间",
  "现在我在看一本关于民主资本主义危机的书。",
  "另外，学习中文也是我的爱好之一。",
];

export default function ChineseReader() {
  const [chineseVoice, setChineseVoice] = useState(null);

  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      const zhVoice = voices.find(v => v.lang.startsWith("zh"));
      if (zhVoice) {
        setChineseVoice(zhVoice);
      }
    };

    // Load voices immediately if available
    loadVoices();

    // Also listen to the voiceschanged event (important for iOS)
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const speak = (text) => {
    if (!chineseVoice) {
      alert("No Chinese voice available on this device.");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = chineseVoice;
    utterance.lang = chineseVoice.lang;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div style={{ padding: "1rem", fontFamily: "sans-serif" }}>
      <h2>我的爱好</h2>
      {sentences.map((sentence, index) => (
        <div key={index} style={{ marginBottom: "1rem", fontSize: "2.5rem" }}>
          {sentence.split("").map((char, charIndex) => (
            <span
              key={charIndex}
              onClick={() => speak(char)}
              style={{
                cursor: "pointer",
                padding: "0 4px",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "#ffe58f";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "transparent";
              }}
            >
              {char}
            </span>
          ))}
          <button
            onClick={() => speak(sentence)}
            style={{ marginLeft: "1rem", fontSize: "1.5rem" }}
          >
            🔊
          </button>
        </div>
      ))}
    </div>
  );
}