import { useState, useRef, useEffect } from 'react';
import styles from '../styles/devPlayground.module.css';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-markup'; // HTML
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-tomorrow.css'; // VS Code dark style
import { FiCopy, FiCheck, FiSun, FiMoon, FiRotateCcw, FiRotateCw, FiDownload, FiTrash2 } from 'react-icons/fi';

const DEFAULT_HTML = '<h1>Welcome To PortFolio</h1>';
const DEFAULT_CSS = 'h1 { color: purple; text-align: center; }';
const DEFAULT_JS = 'document.body.style.background = "#f9f9f9";';

const LANGUAGES = [
  { key: 'html', label: 'HTML', prism: 'html' },
  { key: 'css', label: 'CSS', prism: 'css' },
  { key: 'js', label: 'JS', prism: 'javascript' }
];

export default function DevPlayground() {
  const [code, setCode] = useState({
    html: DEFAULT_HTML,
    css: DEFAULT_CSS,
    js: DEFAULT_JS
  });
  const [activeTab, setActiveTab] = useState('html');
  const [theme, setTheme] = useState('dark');
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState([]);
  const [future, setFuture] = useState([]);
  const [statusMsg, setStatusMsg] = useState('');
  const iframeRef = useRef();

  const updateIframe = () => {
    if (iframeRef.current) {
      iframeRef.current.srcdoc = generateHTML(code);
    }
  };

  const generateHTML = (codeObj) => `
    <html>
      <head>
        <style>${codeObj.css}</style>
      </head>
      <body>
        ${codeObj.html}
        <script>${codeObj.js}<\/script>
      </body>
    </html>
  `;

  useEffect(() => {
    updateIframe();
    // eslint-disable-next-line
  }, [code]);

  const handleCopy = () => {
    const allCode = `<!-- HTML -->\n${code.html}\n\n<style>\n${code.css}\n</style>\n\n<script>\n${code.js}\n</script>`;
    navigator.clipboard.writeText(allCode);
    setCopied(true);
    setStatusMsg('Copied!');
    setTimeout(() => {
      setCopied(false);
      setStatusMsg('');
    }, 2000);
  };

  const handleUndo = () => {
    if (history.length > 0) {
      const previous = history[history.length - 1];
      setFuture([code, ...future]);
      setCode(previous);
      setHistory(history.slice(0, -1));
      setStatusMsg('Undo');
      setTimeout(() => setStatusMsg(''), 1000);
    }
  };

  const handleRedo = () => {
    if (future.length > 0) {
      const next = future[0];
      setHistory([...history, code]);
      setCode(next);
      setFuture(future.slice(1));
      setStatusMsg('Redo');
      setTimeout(() => setStatusMsg(''), 1000);
    }
  };

  const handleChange = (newCode) => {
    setHistory([...history, code]);
    setFuture([]);
    setCode({ ...code, [activeTab]: newCode });
  };

  const handleTabChange = (tab) => setActiveTab(tab);

  const handleReset = () => {
    setHistory([...history, code]);
    setCode({
      html: DEFAULT_HTML,
      css: DEFAULT_CSS,
      js: DEFAULT_JS
    });
    setStatusMsg('Reset');
    setTimeout(() => setStatusMsg(''), 1000);
  };

  const handleDownload = () => {
    const blob = new Blob([generateHTML(code)], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'playground.html';
    a.click();
    URL.revokeObjectURL(url);
    setStatusMsg('Downloaded');
    setTimeout(() => setStatusMsg(''), 1000);
  };

  const highlightCode = (codeStr) => {
    const lang = LANGUAGES.find(l => l.key === activeTab)?.prism || 'html';
    return Prism.highlight(codeStr, Prism.languages[lang], lang);
  };

  // Line numbers
  const getLineNumbers = (codeStr) => {
    const lines = codeStr.split('\n').length;
    return Array.from({ length: lines }, (_, i) => i + 1).join('\n');
  };

  // Editor accessibility
  const editorAriaLabel = `Code editor for ${activeTab.toUpperCase()}`;

  return (
    <section id="dev-showcase" className={styles.devPlaygroundSection} data-theme={theme}>
      <h2 className={styles.title}>🛠 Dev Playground</h2>

      <div className={styles.editorWrapper}>
        <div className={styles.editorHeader}>
          <div className={styles.btnGroup}>
            <button onClick={handleUndo} title="Undo" aria-label="Undo"><FiRotateCcw /></button>
            <button onClick={handleRedo} title="Redo" aria-label="Redo"><FiRotateCw /></button>
            <button onClick={handleCopy} title="Copy Code" aria-label="Copy Code">
              {copied ? <FiCheck color="green" /> : <FiCopy />}
            </button>
            <button onClick={handleDownload} title="Download HTML" aria-label="Download HTML"><FiDownload /></button>
            <button onClick={handleReset} title="Reset Code" aria-label="Reset Code"><FiTrash2 /></button>
          </div>
          <div className={styles.tabGroup} role="tablist">
            {LANGUAGES.map(lang => (
              <button
                key={lang.key}
                className={`${styles.tabBtn} ${activeTab === lang.key ? styles.activeTab : ''}`}
                onClick={() => handleTabChange(lang.key)}
                aria-selected={activeTab === lang.key}
                role="tab"
                tabIndex={activeTab === lang.key ? 0 : -1}
              >
                {lang.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            title="Toggle Theme"
            aria-label="Toggle Theme"
            className={styles.themeBtn}
          >
            {theme === 'dark' ? <FiSun /> : <FiMoon />}
          </button>
        </div>

        <div className={styles.editorArea}>
          <pre className={styles.lineNumbers} aria-hidden="true">
            {getLineNumbers(code[activeTab])}
          </pre>
          <Editor
            value={code[activeTab]}
            onValueChange={handleChange}
            highlight={highlightCode}
            padding={20}
            className={`${styles.editor} ${styles[theme]}`}
            aria-label={editorAriaLabel}
            style={{
              fontFamily: '"Fira Code", monospace',
              fontSize: 14,
              backgroundColor: theme === 'dark' ? '#1e1e1e' : '#f5f5f5',
              color: theme === 'dark' ? '#d4d4d4' : '#1e1e1e',
              borderRadius: '0 0 8px 8px',
              outline: 'none'
            }}
          />
        </div>

        <div className={styles.statusBar}>
          <span>{activeTab.toUpperCase()} | {code[activeTab].length} chars | {code[activeTab].split('\n').length} lines</span>
          <span>{statusMsg}</span>
        </div>

        <div className={styles.previewContainer}>
          <iframe
            title="Preview"
            className={styles.preview}
            ref={iframeRef}
            sandbox="allow-scripts allow-same-origin"
            tabIndex={0}
          />
        </div>
      </div>
    </section>
  );
}
