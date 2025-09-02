'use client';

import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [text, setText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const countCharacters = () => {
    setCharacterCount(text.length);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      if (e.shiftKey) {
        // Shift + Enter の場合は改行を許可（デフォルト動作）
        return;
      } else {
        // Enter のみの場合は文字数計測
        e.preventDefault();
        countCharacters();
      }
    }
  };

  const focusTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  useEffect(() => {
    // アプリマウント時にテキストエリアにフォーカス
    focusTextarea();

    // ウィンドウフォーカスイベントリスナー
    const handleWindowFocus = () => {
      focusTextarea();
    };

    window.addEventListener('focus', handleWindowFocus);

    return () => {
      window.removeEventListener('focus', handleWindowFocus);
    };
  }, []);

  const clearText = () => {
    setText('');
    setCharacterCount(0);
  };

  return (
    <main className="container">
      <div className="app">
        <h1 className="title">文字数カウンター</h1>
        
        <div className="input-section">
          <textarea
            ref={textareaRef}
            className="text-area"
            placeholder="ここにテキストを入力してください..."
            value={text}
            onChange={handleTextChange}
            onKeyDown={handleKeyDown}
          />
        </div>

        <div className="button-section">
          <button 
            className="count-button"
            onClick={countCharacters}
          >
            文字数を計測
          </button>
          <button 
            className="clear-button"
            onClick={clearText}
          >
            クリア
          </button>
        </div>

        <div className="result-section">
          <div className="character-count">
            文字数: <span className="count-number">{characterCount}</span>
          </div>
        </div>

        <div className="shortcut-info">
          <small>ショートカットキー: Cmd + Shift + Space でアプリを開く</small>
          <small>Enterキーで文字数を計測、Shift + Enterで改行できます</small>
        </div>
      </div>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .app {
          background: white;
          border-radius: 20px;
          padding: 40px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 500px;
        }

        .title {
          text-align: center;
          color: #333;
          margin-bottom: 30px;
          font-size: 2rem;
          font-weight: 700;
        }

        .input-section {
          margin-bottom: 20px;
        }

        .text-area {
          width: 100%;
          height: 150px;
          padding: 15px;
          border: 2px solid #e1e5e9;
          border-radius: 12px;
          font-size: 16px;
          font-family: inherit;
          resize: vertical;
          outline: none;
          transition: border-color 0.3s ease;
        }

        .text-area:focus {
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .button-section {
          display: flex;
          gap: 10px;
          margin-bottom: 30px;
        }

        .count-button,
        .clear-button {
          flex: 1;
          padding: 12px 24px;
          border: none;
          border-radius: 10px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .count-button {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .count-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
        }

        .clear-button {
          background: #f8f9fa;
          color: #666;
          border: 2px solid #e1e5e9;
        }

        .clear-button:hover {
          background: #e9ecef;
          transform: translateY(-1px);
        }

        .result-section {
          text-align: center;
          margin-bottom: 20px;
        }

        .character-count {
          font-size: 1.5rem;
          color: #333;
          font-weight: 600;
        }

        .count-number {
          color: #667eea;
          font-size: 2rem;
          font-weight: 700;
        }

        .shortcut-info {
          text-align: center;
          color: #888;
          font-size: 0.9rem;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        @media (max-width: 600px) {
          .container {
            padding: 10px;
          }
          
          .app {
            padding: 20px;
          }
          
          .title {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </main>
  );
} 