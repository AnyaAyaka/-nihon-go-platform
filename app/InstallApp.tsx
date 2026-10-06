'use client'

import { useEffect, useState } from "react";

// ホーム画面に追加できるようにする。
// Androidは案内を出す。iPhoneは共有ボタンからなので、文章で伝える。
export default function InstallApp() {
  const [prompt, setPrompt] = useState<any>(null);
  const [ios, setIos] = useState(false);
  const [hide, setHide] = useState(true);

  useEffect(() => {
    if (typeof navigator !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true;
    if (standalone) return;

    let dismissed = false;
    try { dismissed = localStorage.getItem("ng-install-hidden") === "1"; } catch (e) {}
    if (dismissed) return;

    const onLearnerPage = location.pathname.startsWith("/my");
    if (!onLearnerPage) return;

    const isIos = /iphone|ipad|ipod/i.test(navigator.userAgent);
    if (isIos) { setIos(true); setHide(false); return; }

    const h = (e: any) => { e.preventDefault(); setPrompt(e); setHide(false); };
    window.addEventListener("beforeinstallprompt", h);
    return () => window.removeEventListener("beforeinstallprompt", h);
  }, []);

  function close() {
    setHide(true);
    try { localStorage.setItem("ng-install-hidden", "1"); } catch (e) {}
  }

  if (hide) return null;

  return (
    <div style={{
      position: "fixed", left: 12, right: 12, bottom: 12, zIndex: 9999, margin: "0 auto",
      maxWidth: 420, background: "#FFFFFF", border: "1px solid #D9DEDB",
      borderTop: "3px solid #1C2226", borderRadius: 10, padding: "14px 16px",
      boxShadow: "0 10px 30px rgba(20,30,40,.18)", fontSize: 14, lineHeight: 1.7,
      fontFamily: '"Zen Kaku Gothic New","Hiragino Sans",system-ui,sans-serif', color: "#1C2226",
    }}>
      <button onClick={close} aria-label="閉じる" style={{
        float: "right", border: 0, background: "none", cursor: "pointer", color: "#5D6970", fontSize: 12,
      }}>閉じる</button>
      <strong style={{ display: "block", marginBottom: 4 }}>ホーム画面に追加できます</strong>
      {ios ? (
        <span>下の共有ボタンから「ホーム画面に追加」を選ぶと、アプリのように開けます。</span>
      ) : (
        <>
          <span>アイコンから、すぐ開けるようになります。</span>
          <div style={{ marginTop: 10 }}>
            <button onClick={async () => { await prompt?.prompt?.(); close(); }} style={{
              font: "inherit", fontWeight: 700, background: "#1C2226", color: "#fff",
              border: 0, borderRadius: 6, padding: "9px 18px", cursor: "pointer",
            }}>追加する</button>
          </div>
        </>
      )}
    </div>
  );
}
