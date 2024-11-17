'use client'
import { useEffect } from 'react'

export default function HeygenAvatar() {
  useEffect(() => {
    const script = document.createElement('script')
    script.text = `!function(window){const host="https://labs.heygen.com",url=host+"/guest/streaming-embed?share=eyJxdWFsaXR5IjoiaGlnaCIsImF2YXRhck5hbWUiOiJlZjA4MDM5YTQxMzU0ZWQ1YTIwNTY1ZGI4%0D%0AOTkzNzNmMyIsInByZXZpZXdJbWciOiJodHRwczovL2ZpbGVzMi5oZXlnZW4uYWkvYXZhdGFyL3Yz%0D%0AL2VmMDgwMzlhNDEzNTRlZDVhMjA1NjVkYjg5OTM3M2YzL2Z1bGwvMi4yL3ByZXZpZXdfdGFyZ2V0%0D%0ALndlYnAiLCJuZWVkUmVtb3ZlQmFja2dyb3VuZCI6ZmFsc2UsImtub3dsZWRnZUJhc2VJZCI6IjVm%0D%0AZTU5M2Q2YTgyMjQzYTNiYWRmNmM3ZTlkOTA1OTFmIiwidXNlcm5hbWUiOiI0YjhmYzJlN2NlNDM0%0D%0ANjdmODUxNGY0MGRlNmQxYWVjMCJ9&inIFrame=1",clientWidth=document.body.clientWidth,wrapDiv=document.createElement("div");wrapDiv.id="heygen-streaming-embed";const container=document.createElement("div");container.id="heygen-streaming-container";const stylesheet=document.createElement("style");stylesheet.innerHTML=\`
      #heygen-streaming-embed {
        z-index: 9999;
        position: fixed;
        left: 20px;
        bottom: 20px;
        width: 80px;
        height: 80px;
        border-radius: 50%;
        border: 2px solid #16a34a;
        box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
        overflow: hidden;
        opacity: 0;
        visibility: hidden;
        cursor: pointer;
      }
      #heygen-streaming-embed.show {
        opacity: 1;
        visibility: visible;
      }
      #heygen-streaming-embed.expand {
        \${clientWidth<540?
          "width: 90%; height: 300px; left: 5%; border-radius: 16px;" :
          "width: 400px; height: 500px; border-radius: 16px;"
        }
      }
      #heygen-streaming-embed:not(.expand):hover {
        transform: scale(1.1);
        box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.15);
      }
      #heygen-streaming-container {
        width: 100%;
        height: 100%;
      }
      #heygen-streaming-container iframe {
        width: 100%;
        height: 100%;
        border: 0;
      }
      #heygen-streaming-embed:not(.expand)::after {
        content: "Fragen?";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        font-size: 12px;
        font-weight: bold;
        text-shadow: 0 1px 2px rgba(0,0,0,0.3);
        pointer-events: none;
      }
      #heygen-streaming-embed:not(.expand)::before {
        content: "";
        position: absolute;
        inset: 0;
        background: rgba(22, 163, 74, 0.1);
        pointer-events: none;
      }
    \`;const iframe=document.createElement("iframe");iframe.allowFullscreen=!1,iframe.title="AI Assistant",iframe.role="dialog",iframe.allow="microphone",iframe.src=url;let visible=!1,initial=!1;window.addEventListener("message",(e=>{e.origin===host&&e.data&&e.data.type&&"streaming-embed"===e.data.type&&("init"===e.data.action?(initial=!0,wrapDiv.classList.toggle("show",initial)):"show"===e.data.action?(visible=!0,wrapDiv.classList.toggle("expand",visible)):"hide"===e.data.action&&(visible=!1,wrapDiv.classList.toggle("expand",visible)))})),container.appendChild(iframe),wrapDiv.appendChild(stylesheet),wrapDiv.appendChild(container),document.body.appendChild(wrapDiv)}(window);`
    document.body.appendChild(script)

    return () => {
      const embedElement = document.getElementById('heygen-streaming-embed')
      if (embedElement) {
        embedElement.remove()
      }
      script.remove()
    }
  }, [])

  return null
} 