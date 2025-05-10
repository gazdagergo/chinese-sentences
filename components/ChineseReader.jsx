'use client'

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
  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "zh-CN";
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div style={{ padding: "1rem", fontFamily: "sans-serif" }}>
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
                e.target.style.background = "#ffe58f"; // light highlight
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
            style={{ marginLeft: "1rem", fontSize: "1.5rem", cursor: "pointer" }}
          >
            🔊
          </button>
        </div>
      ))}
    </div>
  );
}
