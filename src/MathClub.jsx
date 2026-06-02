import { useState, useEffect, useRef, useCallback } from "react";

// ========== IMAGE IMPORTS ==========
import heroImg from "./img/6.webp";
import programTopImg from "./img/1.webp";
import teamImg1 from "./img/2.webp";
import teamImg2 from "./img/3.webp";
import teamImg3 from "./img/5.jpg";
import teamImg4 from "./img/4.jpg";
import teamImg5 from "./img/8.jpg";
import teamImg6 from "./img/5.webp";

// ============================================================
// COMPLETE CSS (injected via <style> tag) — unchanged
// ============================================================
const css = `
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Inter',sans-serif;background:#f7f7f5;overflow-x:hidden;color:#111;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
html{scroll-behavior:smooth}

.noise-overlay{position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9997;opacity:0.038;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 220 220' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='nf'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23nf)'/%3E%3C/svg%3E");background-repeat:repeat;background-size:220px 220px}

.scroll-progress-bar{position:fixed;top:0;left:0;height:3px;background:linear-gradient(90deg,#d3ea55,#a8c92a,#d3ea55);background-size:200% 100%;z-index:9999;width:0%;transition:width 0.08s linear;border-radius:0 2px 2px 0;box-shadow:0 0 12px rgba(211,234,85,0.5)}

.mouse-dot{position:fixed;pointer-events:none;z-index:9996;border-radius:50%;background:#d3ea55;will-change:transform;transition:width 0.3s,height 0.3s,background 0.3s}

.loader{position:fixed;inset:0;background:linear-gradient(to right,rgba(0,0,0,0.05) 1px,transparent 1px),linear-gradient(to bottom,rgba(0,0,0,0.05) 1px,transparent 1px);background-size:120px 120px;background-color:#f8f8f6;z-index:10000;display:flex;align-items:center;justify-content:center;flex-direction:column;transition:opacity 0.7s cubic-bezier(0.4,0,0.2,1),visibility 0.7s;overflow:hidden}
.loader.hidden{opacity:0;visibility:hidden;pointer-events:none}

.loader-symbols-container{position:relative;width:320px;height:320px;display:flex;align-items:center;justify-content:center}
.loader-symbol{position:absolute;font-family:'Inter','Georgia',serif;font-weight:700;color:#111;opacity:0;animation:symbolAppear 2.2s cubic-bezier(0.22,0.61,0.36,1) forwards;user-select:none;text-shadow:none}
.loader-symbol.green{color:#d3ea55;text-shadow:0 0 10px rgba(0,0,0,0.08)}

.loader-symbol:nth-child(1){font-size:38px;top:18%;left:12%;animation-delay:0.05s}
.loader-symbol:nth-child(2){font-size:52px;top:8%;left:48%;animation-delay:0.15s}
.loader-symbol:nth-child(3){font-size:34px;top:22%;right:10%;animation-delay:0.25s}
.loader-symbol:nth-child(4){font-size:46px;top:42%;left:5%;animation-delay:0.35s}
.loader-symbol:nth-child(5){font-size:60px;top:38%;left:44%;animation-delay:0.45s}
.loader-symbol:nth-child(6){font-size:40px;top:44%;right:6%;animation-delay:0.55s}
.loader-symbol:nth-child(7){font-size:48px;bottom:20%;left:16%;animation-delay:0.65s}
.loader-symbol:nth-child(8){font-size:36px;bottom:14%;left:50%;animation-delay:0.75s}
.loader-symbol:nth-child(9){font-size:50px;bottom:18%;right:14%;animation-delay:0.85s}

@keyframes symbolAppear{0%{opacity:0;transform:translateY(18px) scale(0.4) rotate(-15deg);filter:blur(6px)}35%{opacity:1;transform:translateY(-4px) scale(1.08) rotate(3deg);filter:blur(0)}55%{opacity:0.9;transform:translateY(0) scale(1) rotate(0);filter:blur(0)}80%{opacity:0.7;transform:translateY(2px) scale(0.96) rotate(-1deg)}100%{opacity:0.55;transform:translateY(0) scale(1) rotate(0)}}

.loader-center-text{position:relative;z-index:2;font-size:13px;letter-spacing:6px;text-transform:uppercase;color:#111;margin-top:-10px;opacity:0;animation:fadeInCenter 0.7s 1.1s ease forwards;font-weight:500}
@keyframes fadeInCenter{to{opacity:1}}

.loader-progress-track{position:absolute;bottom:60px;left:50%;transform:translateX(-50%);width:180px;height:2px;background:rgba(0,0,0,0.1);border-radius:2px;overflow:hidden}
.loader-progress-fill{height:100%;background:#d3ea55;border-radius:2px;width:0%;animation:fillProgress 2.1s 0.2s cubic-bezier(0.4,0,0.2,1) forwards;box-shadow:0 0 8px rgba(211,234,85,0.5)}
@keyframes fillProgress{0%{width:0%}60%{width:75%}90%{width:94%}100%{width:100%}}

.grid-bg{background:linear-gradient(to right,rgba(0,0,0,0.07) 1px,transparent 1px),linear-gradient(to bottom,rgba(0,0,0,0.07) 1px,transparent 1px);background-size:120px 120px;background-color:#f8f8f6}

.floating-dot{width:18px;height:18px;border-radius:50%;background:#d3ea55;position:absolute;z-index:2;animation:dotPulse 3.5s ease-in-out infinite;box-shadow:0 0 14px rgba(211,234,85,0.45)}
@keyframes dotPulse{0%,100%{transform:scale(1);box-shadow:0 0 14px rgba(211,234,85,0.45)}50%{transform:scale(1.35);box-shadow:0 0 26px rgba(211,234,85,0.7)}}

.hero{width:100%;min-height:100vh;position:relative;overflow:hidden}
.navbar{width:100%;padding:40px 60px;display:flex;justify-content:space-between;align-items:flex-start;position:relative;z-index:10}
.nav-links{list-style:none}
.nav-links li{margin-bottom:12px;font-size:14px;color:#111;letter-spacing:1px;position:relative;padding-left:18px;cursor:pointer;transition:color 0.25s,transform 0.25s}
.nav-links li:hover{color:#555;transform:translateX(3px)}
.nav-links li::before{content:"";width:8px;height:8px;border-radius:50%;background:#d3ea55;position:absolute;left:0;top:6px;transition:transform 0.25s,box-shadow 0.25s}
.nav-links li:hover::before{transform:scale(1.5);box-shadow:0 0 10px rgba(211,234,85,0.6)}
.nav-buttons{display:flex;gap:30px;align-items:center}
.join-btn{font-size:14px;text-decoration:none;color:#111;border-bottom:1px solid #111;padding-bottom:3px;letter-spacing:1px;transition:all 0.25s;cursor:pointer;background:none;border-top:none;border-left:none;border-right:none;font-family:'Inter',sans-serif}
.join-btn:hover{color:#d3ea55;border-bottom-color:#d3ea55;letter-spacing:2px}
.login-trigger{font-size:14px;text-decoration:none;color:#111;border-bottom:1px solid #111;padding-bottom:3px;letter-spacing:1px;transition:all 0.25s;cursor:pointer;background:none;border-top:none;border-left:none;border-right:none;font-family:'Inter',sans-serif}
.login-trigger:hover{color:#d3ea55;border-bottom-color:#d3ea55;letter-spacing:2px}

.big-text{position:absolute;left:6%;top:50%;transform:translateY(-50%);z-index:5}
.big-text h1{font-size:clamp(60px,11vw,170px);line-height:0.88;font-weight:900;color:#000;letter-spacing:-6px;text-transform:uppercase;text-shadow:0 1px 0 rgba(0,0,0,0.05),0 4px 12px rgba(0,0,0,0.04)}

.math-image{position:absolute;left:50%;top:55%;transform:translate(-50%,-50%);width:min(32vw,480px);z-index:3;filter:grayscale(100%);transition:transform 0.15s ease-out;will-change:transform}
.math-image img{width:100%;display:block;object-fit:contain;border-radius:4px}

.equations{position:absolute;right:12%;top:50%;transform:translateY(-50%);z-index:5;color:#111}
.equations div{margin-bottom:24px;font-size:clamp(24px,2vw,42px);font-weight:500;animation:floatEq 4.5s ease-in-out infinite}
.equations div:nth-child(1){animation-delay:0s}
.equations div:nth-child(2){animation-delay:1.2s}
.equations div:nth-child(3){animation-delay:2.4s}
.equations .small{font-size:clamp(20px,1.8vw,32px)}
@keyframes floatEq{0%,100%{transform:translateY(0)}30%{transform:translateY(-10px)}60%{transform:translateY(4px)}85%{transform:translateY(-3px)}}

.description{position:absolute;right:7%;bottom:10%;width:min(320px,80%);font-size:clamp(14px,1vw,20px);line-height:1.6;text-transform:uppercase;color:#111;z-index:5}
.scroll{position:absolute;left:7%;bottom:8%;z-index:5;cursor:pointer}
.scroll-arrow{font-size:clamp(55px,5vw,90px);line-height:1;animation:bounceDown 2s infinite;display:inline-block}
@keyframes bounceDown{0%,100%{transform:translateY(0)}40%{transform:translateY(16px)}60%{transform:translateY(4px)}}
.scroll p{margin-top:10px;letter-spacing:3px;font-size:12px}

.dot1{top:40px;left:140px;animation-delay:0s}
.dot2{top:42%;right:25%;animation-delay:1.5s}

.programs{width:100%;min-height:100vh;padding:80px 0;position:relative}
.top-content{width:90%;margin:auto;display:flex;justify-content:space-between;align-items:flex-start;gap:40px}
.main-title h1{font-size:clamp(60px,8vw,130px);line-height:0.88;font-weight:900;color:#000;letter-spacing:-5px;text-transform:uppercase}
.program-image{width:400px;height:470px;overflow:hidden;position:relative;flex-shrink:0;border-radius:2px;box-shadow:0 8px 30px rgba(0,0,0,0.08)}
.program-image img{width:100%;height:100%;object-fit:cover;filter:grayscale(100%);transition:filter 0.5s,transform 0.5s}
.program-image:hover img{filter:grayscale(40%);transform:scale(1.04)}
.green-dot-centered{width:22px;height:22px;border-radius:50%;background:#d3ea55;position:absolute;top:45%;left:50%;transform:translate(-50%,-50%);animation:dotPulse 3.5s ease-in-out infinite;box-shadow:0 0 16px rgba(211,234,85,0.5);z-index:4}

.info-box{width:90%;margin:50px auto 80px;display:flex;align-items:flex-start;gap:16px}
.small-dot{width:10px;height:10px;border-radius:50%;background:#d3ea55;margin-top:8px;flex-shrink:0}
.info-box p{max-width:450px;font-size:15px;line-height:1.6;letter-spacing:1px;text-transform:uppercase}

.program-list{width:90%;margin:auto;border-top:2px solid #111}
.program-row{min-height:110px;display:grid;grid-template-columns:1.2fr 240px 1fr 90px;align-items:center;border-bottom:2px solid #111;transition:background 0.35s,box-shadow 0.35s;cursor:pointer}
.program-row:hover{background:#f0f0e8;box-shadow:inset 0 0 0 1px rgba(0,0,0,0.04)}
.program-row.active{background:#d3ea55;box-shadow:0 2px 16px rgba(211,234,85,0.3)}
.program-row.active:hover{background:#c8df40}
.program-name{padding-left:20px}
.program-name h2{font-size:clamp(35px,4vw,70px);font-weight:400;letter-spacing:-2px;text-transform:uppercase}
.small-image{width:100%;height:110px;overflow:hidden;border-radius:2px}
.small-image img{width:100%;height:100%;object-fit:cover;filter:grayscale(100%);transition:filter 0.4s,transform 0.4s}
.program-row:hover .small-image img{filter:grayscale(50%);transform:scale(1.05)}
.program-desc{padding:0 20px}
.program-desc p{font-size:13px;line-height:1.6;text-transform:uppercase}
.arrow{display:flex;justify-content:center;align-items:center}
.arrow-btn{width:42px;height:42px;border-radius:50%;background:#d3ea55;display:flex;justify-content:center;align-items:center;font-size:20px;font-weight:700;transition:all 0.3s;box-shadow:0 2px 8px rgba(0,0,0,0.06)}
.arrow-btn:hover{background:#111;color:#fff;transform:scale(1.1);box-shadow:0 6px 20px rgba(0,0,0,0.2)}
.dark-btn{background:#111;color:#fff}
.dark-btn:hover{background:#d3ea55;color:#111;box-shadow:0 6px 20px rgba(211,234,85,0.4)}

.about{width:100%;min-height:100vh;padding:80px 0;position:relative;display:flex;align-items:center}
.about-inner{width:90%;margin:auto;display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center}
.about-image-wrap{position:relative;width:100%;height:520px;overflow:hidden;border-radius:2px;box-shadow:0 10px 40px rgba(0,0,0,0.1)}
.about-image-wrap img{width:100%;height:100%;object-fit:cover;filter:grayscale(100%);transition:filter 0.5s,transform 0.5s}
.about-image-wrap:hover img{filter:grayscale(30%);transform:scale(1.03)}
.about-dot-1{top:-10px;left:-10px;width:28px;height:28px;border-radius:50%;background:#d3ea55;position:absolute;z-index:4;animation:dotPulse 3.5s ease-in-out infinite;box-shadow:0 0 18px rgba(211,234,85,0.5)}
.about-dot-2{bottom:-10px;right:-10px;width:28px;height:28px;border-radius:50%;background:#d3ea55;position:absolute;z-index:4;animation:dotPulse 3.5s ease-in-out 1.8s infinite;box-shadow:0 0 18px rgba(211,234,85,0.5)}
.about-text h2{font-size:clamp(42px,5vw,80px);font-weight:900;letter-spacing:-3px;text-transform:uppercase;line-height:0.9;margin-bottom:30px;color:#000}
.about-text .sub-label{font-size:12px;letter-spacing:4px;text-transform:uppercase;margin-bottom:18px;display:flex;align-items:center;gap:12px}
.sub-label .dot-indicator{width:8px;height:8px;border-radius:50%;background:#d3ea55;flex-shrink:0;animation:dotPulse 2.5s ease-in-out infinite}
.about-text p{font-size:15px;line-height:1.7;letter-spacing:1px;text-transform:uppercase;max-width:460px;margin-bottom:18px}
.stat-row{display:flex;gap:50px;margin-top:36px;border-top:2px solid #111;padding-top:28px}
.stat-item h3{font-size:clamp(38px,4vw,60px);font-weight:900;letter-spacing:-2px;color:#000;transition:color 0.3s}
.stat-item:hover h3{color:#6b8a0e}
.stat-item span{font-size:12px;letter-spacing:3px;text-transform:uppercase;display:block;margin-top:4px}

.schedule{width:100%;min-height:100vh;padding:80px 0;position:relative}
.schedule-header{width:90%;margin:0 auto 50px;display:flex;align-items:flex-end;gap:20px}
.schedule-header h2{font-size:clamp(48px,7vw,100px);font-weight:900;letter-spacing:-4px;text-transform:uppercase;line-height:0.9;color:#000}
.schedule-header .tag{font-size:12px;letter-spacing:4px;text-transform:uppercase;padding-bottom:10px}
.timeline{width:90%;margin:auto;border-top:2px solid #111}
.timeline-row{display:grid;grid-template-columns:140px 1fr 1fr 60px;align-items:center;border-bottom:2px solid #111;min-height:90px;transition:background 0.35s,box-shadow 0.35s;cursor:pointer}
.timeline-row:hover{background:#f0f0e8;box-shadow:inset 0 0 0 1px rgba(0,0,0,0.04)}
.timeline-row .day{padding-left:20px;font-size:14px;letter-spacing:4px;text-transform:uppercase;font-weight:700}
.timeline-row .time{font-size:clamp(18px,2vw,28px);font-weight:500;letter-spacing:-1px;padding:0 20px}
.timeline-row .topic{font-size:14px;text-transform:uppercase;letter-spacing:2px;padding:0 20px}
.timeline-row .circle-indicator{display:flex;justify-content:center;align-items:center}
.circle-indicator span{width:14px;height:14px;border-radius:50%;background:#d3ea55;display:block;transition:all 0.3s}
.timeline-row.active-row{background:#d3ea55;box-shadow:0 2px 16px rgba(211,234,85,0.3)}
.timeline-row.active-row .circle-indicator span{background:#111;box-shadow:0 0 10px rgba(0,0,0,0.3)}

.team{width:100%;min-height:100vh;padding:80px 0;position:relative}
.team-top{width:90%;margin:0 auto 40px;display:flex;justify-content:space-between;align-items:flex-end;gap:30px;flex-wrap:wrap}
.team-top h2{font-size:clamp(48px,7vw,100px);font-weight:900;letter-spacing:-4px;text-transform:uppercase;line-height:0.9;color:#000}
.team-top p{max-width:280px;font-size:13px;letter-spacing:2px;text-transform:uppercase;line-height:1.6;padding-bottom:8px}
.team-grid{width:90%;margin:auto;display:grid;grid-template-columns:repeat(3,1fr);gap:0;border-top:2px solid #111;border-left:2px solid #111}
.team-card{border-right:2px solid #111;border-bottom:2px solid #111;position:relative;cursor:pointer;transition:background 0.35s,box-shadow 0.35s}
.team-card:hover{background:#f0f0e8;box-shadow:0 8px 30px rgba(0,0,0,0.1);z-index:2}
.team-card .card-img{width:100%;height:340px;overflow:hidden}
.team-card .card-img img{width:100%;height:100%;object-fit:cover;filter:grayscale(100%);transition:filter 0.5s,transform 0.5s}
.team-card:hover .card-img img{filter:grayscale(20%);transform:scale(1.05)}
.team-card .card-info{padding:20px 24px 24px}
.team-card .card-info h3{font-size:clamp(18px,2vw,26px);font-weight:700;letter-spacing:-1px;text-transform:uppercase}
.team-card .card-info span{font-size:11px;letter-spacing:3px;text-transform:uppercase;display:block;margin-top:4px}
.team-dot-deco{width:20px;height:20px;border-radius:50%;background:#d3ea55;position:absolute;top:-10px;right:-10px;z-index:3;animation:dotPulse 3.5s ease-in-out infinite;box-shadow:0 0 14px rgba(211,234,85,0.5)}

.contact{width:100%;min-height:90vh;padding:80px 0;position:relative;display:flex;align-items:center}
.contact-inner{width:90%;margin:auto;display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:start}
.contact-left h2{font-size:clamp(48px,7vw,90px);font-weight:900;letter-spacing:-4px;text-transform:uppercase;line-height:0.9;color:#000;margin-bottom:20px}
.contact-left .email-link{font-size:clamp(18px,2.5vw,28px);text-decoration:none;color:#111;border-bottom:2px solid #d3ea55;padding-bottom:4px;letter-spacing:-1px;transition:all 0.3s;display:inline-block;margin-bottom:30px}
.contact-left .email-link:hover{border-bottom-color:#111;color:#000;letter-spacing:0}
.contact-left .address-block{font-size:13px;letter-spacing:2px;text-transform:uppercase;line-height:1.7}
.contact-right .form-group{margin-bottom:20px}
.contact-right label{font-size:11px;letter-spacing:3px;text-transform:uppercase;display:block;margin-bottom:6px;transition:color 0.3s}
.contact-right input,.contact-right textarea{width:100%;padding:14px 16px;border:2px solid #111;background:transparent;font-family:'Inter',sans-serif;font-size:15px;letter-spacing:1px;resize:vertical;transition:border-color 0.3s,box-shadow 0.3s;outline:none;border-radius:2px}
.contact-right input:focus,.contact-right textarea:focus{border-color:#d3ea55;box-shadow:0 0 0 4px rgba(211,234,85,0.12)}
.contact-right textarea{min-height:120px}
.submit-btn{width:100%;padding:16px;background:#d3ea55;border:2px solid #111;font-family:'Inter',sans-serif;font-size:15px;font-weight:700;letter-spacing:3px;text-transform:uppercase;cursor:pointer;transition:all 0.3s;color:#111;border-radius:2px;box-shadow:0 4px 12px rgba(0,0,0,0.06)}
.submit-btn:hover{background:#111;color:#fff;box-shadow:0 8px 24px rgba(0,0,0,0.2);letter-spacing:5px}
.submit-btn:active{transform:scale(0.97)}

.footer{width:100%;padding:40px 0;border-top:2px solid #111;background:#f8f8f6}
.footer-inner{width:90%;margin:auto;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:20px}
.footer-inner .footer-logo{font-size:22px;font-weight:900;letter-spacing:-1px;text-transform:uppercase;color:#000}
.footer-inner .footer-links{display:flex;gap:30px;list-style:none}
.footer-inner .footer-links li{font-size:12px;letter-spacing:2px;text-transform:uppercase;cursor:pointer;transition:color 0.3s,transform 0.3s}
.footer-inner .footer-links li:hover{color:#555;transform:translateY(-2px)}
.footer-inner .copyright{font-size:11px;letter-spacing:2px;text-transform:uppercase}

.modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.7);z-index:20000;display:flex;align-items:center;justify-content:center;opacity:0;visibility:hidden;transition:opacity 0.35s ease,visibility 0.35s}
.modal-overlay.active{opacity:1;visibility:visible}
.modal{background:#f8f8f6;width:90%;max-width:460px;border-radius:2px;padding:40px 32px;position:relative;box-shadow:0 25px 50px rgba(0,0,0,0.25);border:2px solid #111}
.modal-close{position:absolute;top:12px;right:18px;font-size:28px;cursor:pointer;color:#111;background:none;border:none;line-height:1;transition:transform 0.2s}
.modal-close:hover{transform:rotate(90deg);color:#d3ea55}
.modal-tabs{display:flex;gap:0;margin-bottom:30px;border-bottom:2px solid #111}
.modal-tab{flex:1;text-align:center;padding:12px 8px;font-size:13px;letter-spacing:3px;text-transform:uppercase;cursor:pointer;background:transparent;border:none;font-weight:600;color:#111;transition:all 0.25s;border-bottom:2px solid transparent;margin-bottom:-2px}
.modal-tab.active{border-bottom-color:#d3ea55;color:#000;background:#d3ea55}
.modal-form{display:none;flex-direction:column;gap:20px}
.modal-form.active{display:flex}
.modal-form label{font-size:11px;letter-spacing:2px;text-transform:uppercase;display:block;margin-bottom:6px}
.modal-form input{width:100%;padding:12px 14px;border:2px solid #111;background:transparent;font-family:'Inter',sans-serif;font-size:15px;letter-spacing:1px;outline:none;border-radius:2px;transition:border-color 0.2s}
.modal-form input:focus{border-color:#d3ea55;box-shadow:0 0 0 3px rgba(211,234,85,0.1)}
.modal-submit{width:100%;padding:14px;background:#d3ea55;border:2px solid #111;font-family:'Inter',sans-serif;font-size:15px;font-weight:700;letter-spacing:3px;text-transform:uppercase;cursor:pointer;transition:all 0.3s;color:#111;border-radius:2px;margin-top:8px}
.modal-submit:hover{background:#111;color:#fff;letter-spacing:5px}

@media(max-width:1100px){.grid-bg{background-size:90px 90px}.math-image{width:340px;top:58%}.equations{right:5%}.program-row{grid-template-columns:1fr}.small-image{height:220px}.program-desc{padding:25px 20px}.arrow{padding-bottom:20px}.about-inner{grid-template-columns:1fr;gap:40px}.about-image-wrap{height:380px}.team-grid{grid-template-columns:repeat(2,1fr)}.contact-inner{grid-template-columns:1fr;gap:40px}.timeline-row{grid-template-columns:100px 1fr 1fr 40px}.loader-symbols-container{width:260px;height:260px}}

@media(max-width:768px){.grid-bg{background-size:70px 70px}.hero{height:auto;min-height:100vh;padding-bottom:80px}.navbar{padding:25px 20px;flex-direction:row;flex-wrap:wrap;gap:15px;align-items:center}.nav-links{display:flex;flex-wrap:wrap;gap:12px;list-style:none}.nav-links li{margin-bottom:0;font-size:12px;padding-left:14px}.nav-links li::before{width:6px;height:6px;top:5px}.nav-buttons{gap:16px;flex-wrap:wrap}.join-btn,.login-trigger{font-size:12px}.big-text{position:relative;top:auto;left:auto;transform:none;padding:30px 20px 0}.big-text h1{font-size:68px;line-height:0.9;letter-spacing:-3px}.math-image{position:relative;width:85%;top:auto;left:auto;transform:none;margin:20px auto}.equations{position:relative;top:auto;right:auto;transform:none;padding:10px 20px;display:flex;flex-wrap:wrap;gap:18px;justify-content:center}.equations div{margin-bottom:0}.description{position:relative;right:auto;bottom:auto;width:100%;padding:10px 20px;margin-top:10px}.scroll{position:relative;left:auto;bottom:auto;padding:20px;margin-top:10px}.dot1{left:30px}.dot2{right:30px}.programs{padding:60px 0}.top-content{flex-direction:column}.program-image{width:100%;height:320px}.main-title h1{font-size:60px;letter-spacing:-3px}.program-name h2{font-size:42px}.about{padding:60px 0}.about-image-wrap{height:300px}.stat-row{gap:30px;flex-wrap:wrap}.team-grid{grid-template-columns:1fr}.team-card .card-img{height:260px}.schedule{padding:60px 0}.timeline-row{grid-template-columns:1fr;padding:15px 20px;gap:4px}.timeline-row .day{padding-left:0}.timeline-row .circle-indicator{justify-content:flex-start;padding:5px 0}.contact{padding:60px 0}.footer-inner{flex-direction:column;text-align:center;gap:15px}.footer-inner .footer-links{gap:16px;flex-wrap:wrap;justify-content:center}.loader-symbols-container{width:220px;height:220px}.loader-progress-track{width:140px;bottom:45px}.mouse-dot{display:none}.modal{padding:28px 20px}}

@media(max-width:480px){.grid-bg{background-size:55px 55px}.hero{padding-bottom:50px}.navbar{padding:18px 14px;flex-direction:column;gap:14px;align-items:flex-start}.nav-links{gap:8px}.nav-links li{font-size:11px;padding-left:12px}.nav-buttons{gap:14px}.join-btn,.login-trigger{font-size:11px}.big-text h1{font-size:48px;letter-spacing:-2px;line-height:0.92}.math-image{width:92%;margin:10px auto}.equations{padding:6px 14px;gap:12px}.equations div{font-size:20px}.equations .small{font-size:17px}.description{font-size:11px;padding:8px 14px}.scroll{padding:14px}.scroll-arrow{font-size:46px}.scroll p{font-size:10px;letter-spacing:2px}.main-title h1{font-size:42px;letter-spacing:-2px}.program-name h2{font-size:28px}.program-image{height:240px}.small-image{height:180px}.about-text h2{font-size:36px;letter-spacing:-2px}.about-image-wrap{height:240px}.stat-row{gap:18px;flex-wrap:wrap}.stat-item h3{font-size:32px}.stat-item span{font-size:10px}.team-top h2{font-size:38px;letter-spacing:-2px}.team-card .card-img{height:220px}.team-card .card-info{padding:14px 16px 18px}.team-card .card-info h3{font-size:17px}.schedule-header h2{font-size:36px;letter-spacing:-2px}.schedule-header .tag{font-size:10px;letter-spacing:2px}.timeline-row .time{font-size:16px}.timeline-row .topic{font-size:11px;letter-spacing:1px}.contact-left h2{font-size:38px;letter-spacing:-2px}.contact-right input,.contact-right textarea{padding:12px 14px;font-size:13px}.submit-btn{padding:14px;font-size:13px;letter-spacing:2px}.footer-inner .footer-logo{font-size:18px}.footer-inner .footer-links li{font-size:10px;letter-spacing:1px}.footer-inner .copyright{font-size:9px}.loader-symbols-container{width:160px;height:160px}.loader-symbol:nth-child(1){font-size:24px}.loader-symbol:nth-child(2){font-size:32px}.loader-symbol:nth-child(3){font-size:22px}.loader-symbol:nth-child(4){font-size:28px}.loader-symbol:nth-child(5){font-size:38px}.loader-symbol:nth-child(6){font-size:26px}.loader-symbol:nth-child(7){font-size:30px}.loader-symbol:nth-child(8){font-size:24px}.loader-symbol:nth-child(9){font-size:34px}.loader-center-text{font-size:10px;letter-spacing:4px;margin-top:-6px}.loader-progress-track{width:120px;bottom:35px}.modal{padding:24px 16px}}

@media(max-width:360px){.big-text h1{font-size:40px;letter-spacing:-1px}.main-title h1{font-size:34px}.program-name h2{font-size:24px}.about-text h2{font-size:30px}.team-top h2{font-size:32px}.schedule-header h2{font-size:30px}.contact-left h2{font-size:32px}.loader-symbols-container{width:140px;height:140px}.loader-symbol:nth-child(1){font-size:20px}.loader-symbol:nth-child(2){font-size:26px}.loader-symbol:nth-child(3){font-size:18px}.loader-symbol:nth-child(4){font-size:24px}.loader-symbol:nth-child(5){font-size:32px}.loader-symbol:nth-child(6){font-size:22px}.loader-symbol:nth-child(7){font-size:26px}.loader-symbol:nth-child(8){font-size:20px}.loader-symbol:nth-child(9){font-size:28px}.loader-progress-track{width:100px;bottom:28px}}
`;

// ============================================================
// LOADER SYMBOLS DATA
// ============================================================
const loaderSymbols = [
  { char: "∑", green: true },
  { char: "∫", green: false },
  { char: "π", green: true },
  { char: "∞", green: false },
  { char: "√", green: true },
  { char: "Δ", green: false },
  { char: "θ", green: true },
  { char: "λ", green: false },
  { char: "Ω", green: true },
];

// ============================================================
// TEAM MEMBERS DATA (using imported images)
// ============================================================
const teamMembers = [
  {
    name: "Dr. Alex Karimov",
    role: "Algebra & Number Theory",
    img: teamImg1,   // was "/img/2.webp"
    dot: true,
    dotStyle: {},
  },
  {
    name: "Prof. Maria Santos",
    role: "Geometry & Topology",
    img: teamImg2,   // was "/img/3.webp"
    dot: false,
    dotStyle: {},
  },
  {
    name: "Dr. James Chen",
    role: "Calculus & Analysis",
    img: teamImg3,   // was "/img/5.jpg"
    dot: true,
    dotStyle: { top: "auto", bottom: "-10px", right: "-10px" },
  },
  {
    name: "Elena Volkova",
    role: "Olympiad Training",
    img: teamImg4,   // was "/img/4.jpg"
    dot: false,
    dotStyle: {},
  },
  {
    name: "Omar Hassan",
    role: "Applied Mathematics",
    img: teamImg5,   // was "/img/8.jpg"
    dot: true,
    dotStyle: { top: "-10px", left: "-10px", right: "auto" },
  },
  {
    name: "Dr. Sarah Kim",
    role: "Statistics & Probability",
    img: teamImg6,   // was "/img/5.webp"
    dot: false,
    dotStyle: {},
  },
];

// ============================================================
// PROGRAM DATA (keep Unsplash URLs unchanged)
// ============================================================
const programsData = [
  {
    name: "CHILDREN",
    desc: "WE TRAIN CHILDREN FROM THE AGE OF 5",
    img: "https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1200&auto=format&fit=crop",
    active: false,
  },
  {
    name: "ADULTS",
    desc: "ADVANCED MATH TRAINING FOR ADULT LEARNERS",
    img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop",
    active: true,
  },
  {
    name: "ADVANCED",
    desc: "THEORY, EQUATIONS & OLYMPIAD LEVEL PROBLEMS",
    img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200&auto=format&fit=crop",
    active: false,
  },
];


// ============================================================
// SCHEDULE DATA
// ============================================================
const scheduleData = [
  { day: "MON", time: "16:00 – 17:30", topic: "FOUNDATIONS · ARITHMETIC & LOGIC", active: false },
  { day: "TUE", time: "18:00 – 19:30", topic: "ALGEBRA · EQUATIONS & FUNCTIONS", active: true },
  { day: "WED", time: "16:00 – 17:30", topic: "GEOMETRY · SHAPES & PROOFS", active: false },
  { day: "THU", time: "18:00 – 19:30", topic: "CALCULUS · LIMITS & DERIVATIVES", active: false },
  { day: "FRI", time: "17:00 – 18:30", topic: "OLYMPIAD · PROBLEM SOLVING", active: false },
  { day: "SAT", time: "10:00 – 12:00", topic: "OPEN LAB · FREE EXPLORATION", active: false },
];

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function MathClub() {
  // ---- State ----
  const [loading, setLoading] = useState(true);
  const [loaderHidden, setLoaderHidden] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState("login");
  const [activeProgram, setActiveProgram] = useState(1); // index of active program
  const [activeTimeline, setActiveTimeline] = useState(1); // index of active timeline row
  const [showMouseDots, setShowMouseDots] = useState(false);

  // Contact form state
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });

  // Auth form state
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({ name: "", email: "", password: "" });

  // ---- Refs ----
  const scrollProgressRef = useRef(null);
  const heroImageRef = useRef(null);
  const heroSectionRef = useRef(null);
  const programsSectionRef = useRef(null);
  const mouseDotsRef = useRef([]);
  const mouseStateRef = useRef({
    mouseX: typeof window !== "undefined" ? window.innerWidth / 2 : 0,
    mouseY: typeof window !== "undefined" ? window.innerHeight / 2 : 0,
    isMouseOnPage: false,
    dots: [],
  });
  const animationFrameRef = useRef(null);
  const sectionRefs = useRef([]);

  // ---- Loading screen effect ----
  useEffect(() => {
    const minLoadTime = 2400;
    const startTime = Date.now();

    const hideLoader = () => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, minLoadTime - elapsed);
      setTimeout(() => {
        setLoaderHidden(true);
        setTimeout(() => {
          setLoading(false);
          window.dispatchEvent(new Event("scroll"));
        }, 750);
      }, remaining);
    };

    if (document.readyState === "complete") {
      hideLoader();
    } else {
      window.addEventListener("load", hideLoader);
      return () => window.removeEventListener("load", hideLoader);
    }
  }, []);

  // ---- Scroll progress bar ----
  useEffect(() => {
    const updateProgress = () => {
      if (!scrollProgressRef.current) return;
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        scrollProgressRef.current.style.width = "0%";
        return;
      }
      const progress = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100));
      scrollProgressRef.current.style.width = progress + "%";
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress, { passive: true });
    updateProgress();
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  // ---- Mouse-follow dots (desktop only) ----
  useEffect(() => {
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    const isMobile = /Android|iPhone|iPad|iPod|webOS/i.test(navigator.userAgent) || window.innerWidth < 768;
    if (!hasFinePointer || isMobile) return;

    setShowMouseDots(true);
    const numDots = 7;
    const dotsConfig = [];
    for (let i = 0; i < numDots; i++) {
      dotsConfig.push({
        size: 10 - i * 0.8,
        opacity: 0.7 - i * 0.08,
        x: mouseStateRef.current.mouseX,
        y: mouseStateRef.current.mouseY,
      });
    }
    mouseStateRef.current.dots = dotsConfig;

    const handleMouseMove = (e) => {
      mouseStateRef.current.mouseX = e.clientX;
      mouseStateRef.current.mouseY = e.clientY;
      mouseStateRef.current.isMouseOnPage = true;
    };
    const handleMouseLeave = () => {
      mouseStateRef.current.isMouseOnPage = false;
    };
    const handleMouseEnter = (e) => {
      mouseStateRef.current.mouseX = e.clientX;
      mouseStateRef.current.mouseY = e.clientY;
      mouseStateRef.current.isMouseOnPage = true;
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    const animateDots = () => {
      const state = mouseStateRef.current;
      let prevX = state.mouseX;
      let prevY = state.mouseY;

      state.dots.forEach((dot, i) => {
        const factor = 0.12 + i * 0.045;
        dot.x += (prevX - dot.x) * factor;
        dot.y += (prevY - dot.y) * factor;

        const el = mouseDotsRef.current[i];
        if (el) {
          const halfSize = dot.size / 2;
          el.style.transform = `translate(${dot.x - halfSize}px, ${dot.y - halfSize}px)`;
          if (!state.isMouseOnPage) {
            el.style.opacity = Math.max(0, parseFloat(el.style.opacity || dot.opacity) - 0.04);
          } else {
            el.style.opacity = dot.opacity;
          }
        }
        prevX = dot.x;
        prevY = dot.y;
      });
      animationFrameRef.current = requestAnimationFrame(animateDots);
    };
    animationFrameRef.current = requestAnimationFrame(animateDots);

    // Interactive element hover effects
    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive = target.closest(
        "a, button, .program-row, .timeline-row, .team-card, input, textarea, .nav-links li, .footer-links li, .arrow-btn, .submit-btn"
      );
      if (isInteractive) {
        state.dots.forEach((dot) => {
          const el = mouseDotsRef.current[state.dots.indexOf(dot)];
          if (el) {
            el.style.width = dot.size + 4 + "px";
            el.style.height = dot.size + 4 + "px";
            el.style.background = "#fff";
            el.style.boxShadow = "0 0 16px rgba(211,234,85,0.8)";
          }
        });
      }
    };
    const handleMouseOut = (e) => {
      const target = e.target;
      const isInteractive = target.closest(
        "a, button, .program-row, .timeline-row, .team-card, input, textarea, .nav-links li, .footer-links li, .arrow-btn, .submit-btn"
      );
      if (isInteractive) {
        state.dots.forEach((dot) => {
          const el = mouseDotsRef.current[state.dots.indexOf(dot)];
          if (el) {
            el.style.width = dot.size + "px";
            el.style.height = dot.size + "px";
            el.style.background = "#d3ea55";
            el.style.boxShadow = "none";
          }
        });
      }
    };
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  // ---- Hero image parallax ----
  useEffect(() => {
    const heroImage = heroImageRef.current;
    const hero = heroSectionRef.current;
    if (!heroImage || !hero) return;
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!hasFinePointer) return;

    const handleMouseMove = (e) => {
      const rect = hero.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) / rect.width;
      const deltaY = (e.clientY - centerY) / rect.height;
      const moveX = deltaX * 20;
      const moveY = deltaY * 16;
      heroImage.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`;
    };
    const handleMouseLeave = () => {
      heroImage.style.transform = "translate(-50%, -50%)";
    };

    hero.addEventListener("mousemove", handleMouseMove);
    hero.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      hero.removeEventListener("mousemove", handleMouseMove);
      hero.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // ---- Intersection Observer for section reveal ----
  useEffect(() => {
    const sections = sectionRefs.current.filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    sections.forEach((sec) => {
      sec.style.opacity = "0";
      sec.style.transform = "translateY(40px)";
      sec.style.transition = "0.8s cubic-bezier(0.22, 0.61, 0.36, 1)";
      observer.observe(sec);
    });

    // Trigger scroll after loader
    const checkAfterLoader = () => {
      if (!loading) {
        window.dispatchEvent(new Event("scroll"));
      } else {
        requestAnimationFrame(checkAfterLoader);
      }
    };
    const timeoutId = setTimeout(() => requestAnimationFrame(checkAfterLoader), 2600);

    return () => {
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, [loading]);

  // ---- Handlers ----
  const handleScrollClick = useCallback(() => {
    const el = programsSectionRef.current;
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleModalOpen = useCallback(() => setModalOpen(true), []);
  const handleModalClose = useCallback(() => setModalOpen(false), []);
  const handleOverlayClick = useCallback((e) => {
    if (e.target === e.currentTarget) setModalOpen(false);
  }, []);

  const handleProgramClick = useCallback((index) => setActiveProgram(index), []);
  const handleTimelineClick = useCallback((index) => setActiveTimeline(index), []);

  const handleContactSubmit = useCallback(
    (e) => {
      e.preventDefault();
      alert(`Message sent! Thank you, ${contactForm.name || "friend"}!`);
      setContactForm({ name: "", email: "", message: "" });
    },
    [contactForm]
  );

  const handleLoginSubmit = useCallback((e) => {
    e.preventDefault();
    alert("Login functionality would be implemented here.");
  }, []);

  const handleRegisterSubmit = useCallback((e) => {
    e.preventDefault();
    alert("Registration functionality would be implemented here.");
  }, []);

  // ---- Mouse dots config for rendering ----
  const mouseDotsConfig = mouseStateRef.current.dots;

  // ---- JSX ----
  return (
    <>
      {/* Injected CSS */}
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {/* ========== NOISE OVERLAY ========== */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* ========== SCROLL PROGRESS BAR ========== */}
      <div className="scroll-progress-bar" id="scrollProgress" ref={scrollProgressRef} aria-hidden="true" />

      {/* ========== MOUSE-FOLLOW DOTS (desktop only) ========== */}
      {showMouseDots &&
        mouseDotsConfig.map((dot, i) => (
          <div
            key={i}
            className="mouse-dot"
            ref={(el) => (mouseDotsRef.current[i] = el)}
            style={{
              width: dot.size,
              height: dot.size,
              opacity: dot.opacity,
              top: "-30px",
              left: "-30px",
            }}
          />
        ))}

      {/* ========== LOADING SCREEN ========== */}
      {loading && (
        <div className={`loader${loaderHidden ? " hidden" : ""}`} id="loader" aria-hidden="true">
          <div className="loader-symbols-container">
            {loaderSymbols.map((sym, i) => (
              <span key={i} className={`loader-symbol${sym.green ? " green" : ""}`}>
                {sym.char}
              </span>
            ))}
          </div>
          <div className="loader-center-text">Loading</div>
          <div className="loader-progress-track">
            <div className="loader-progress-fill" />
          </div>
        </div>
      )}

      {/* ========== LOGIN/REGISTER MODAL ========== */}
      <div className={`modal-overlay${modalOpen ? " active" : ""}`} id="authModal" onClick={handleOverlayClick}>
        <div className="modal">
          <button className="modal-close" onClick={handleModalClose}>
            &times;
          </button>
          <div className="modal-tabs">
            <button
              className={`modal-tab${modalTab === "login" ? " active" : ""}`}
              onClick={() => setModalTab("login")}
            >
              Login
            </button>
            <button
              className={`modal-tab${modalTab === "register" ? " active" : ""}`}
              onClick={() => setModalTab("register")}
            >
              Register
            </button>
          </div>
          <form
            className={`modal-form${modalTab === "login" ? " active" : ""}`}
            onSubmit={handleLoginSubmit}
          >
            <div>
              <label htmlFor="loginEmail">Email</label>
              <input
                id="loginEmail"
                type="email"
                placeholder="you@example.com"
                required
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="loginPassword">Password</label>
              <input
                id="loginPassword"
                type="password"
                placeholder="••••••••"
                required
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
              />
            </div>
            <button type="submit" className="modal-submit">
              Log In
            </button>
          </form>
          <form
            className={`modal-form${modalTab === "register" ? " active" : ""}`}
            onSubmit={handleRegisterSubmit}
          >
            <div>
              <label htmlFor="regName">Full Name</label>
              <input
                id="regName"
                type="text"
                placeholder="Your name"
                required
                value={registerForm.name}
                onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="regEmail">Email</label>
              <input
                id="regEmail"
                type="email"
                placeholder="you@example.com"
                required
                value={registerForm.email}
                onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="regPassword">Password</label>
              <input
                id="regPassword"
                type="password"
                placeholder="••••••••"
                required
                value={registerForm.password}
                onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
              />
            </div>
            <button type="submit" className="modal-submit">
              Create Account
            </button>
          </form>
        </div>
      </div>

      {/* ========== HERO SECTION ========== */}
      <section className="hero grid-bg" id="hero" ref={heroSectionRef}>
        <div className="floating-dot dot1" />
        <div className="floating-dot dot2" />

        <div className="navbar">
          <ul className="nav-links">
            <li>ABOUT</li>
            <li>PROGRAMS</li>
            <li>SCHEDULE</li>
            <li>CONTACTS</li>
          </ul>
          <div className="nav-buttons">
            <a href="#" className="join-btn">
              JOIN US →
            </a>
            <button className="login-trigger" onClick={handleModalOpen}>
              LOGIN
            </button>
          </div>
        </div>

        <div className="big-text">
          <h1>
            MATH
            <br />
            CLUB
          </h1>
        </div>

        <div className="math-image" id="heroImage" ref={heroImageRef}>
          <img src="/img/6.webp" alt="Math abstract" />
        </div>

        <div className="equations">
          <div>y = x²</div>
          <div className="small">a² + b² = c²</div>
          <div>∑ 1/n² = π²/6</div>
        </div>

        <div className="description">
          THE CLUB FOR CURIOUS MINDS WHO LOVE MATH AND SOLVING PROBLEMS
        </div>

        <div className="scroll" onClick={handleScrollClick}>
          <div className="scroll-arrow">↲</div>
          <p>SCROLL DOWN</p>
        </div>
      </section>

      {/* ========== PROGRAMS SECTION ========== */}
      <section
        className="programs grid-bg"
        id="programs"
        ref={(el) => (sectionRefs.current[0] = el)}
      >
        <div className="top-content">
          <div className="main-title">
            <h1>
              TRAINING
              <br />
              PROGRAMS
            </h1>
          </div>
          <div className="program-image">
            <img src="/img/1.webp" alt="Math training" />
            <div className="green-dot-centered" />
          </div>
        </div>

        <div className="info-box">
          <div className="small-dot" />
          <p>WE SELECT AN INDIVIDUAL PROGRAM OF LESSONS TAKING INTO ACCOUNT AGE AND BACKGROUND</p>
        </div>

        <div className="program-list">
          {programsData.map((prog, i) => (
            <div
              key={i}
              className={`program-row${activeProgram === i ? " active" : ""}`}
              onClick={() => handleProgramClick(i)}
            >
              <div className="program-name">
                <h2>{prog.name}</h2>
              </div>
              <div className="small-image">
                <img src={prog.img} alt={`${prog.name} learning math`} />
              </div>
              <div className="program-desc">
                <p>{prog.desc}</p>
              </div>
              <div className="arrow">
                <div className={`arrow-btn${activeProgram === i ? " dark-btn" : ""}`}>→</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========== ABOUT / PHILOSOPHY SECTION ========== */}
      <section
        className="about grid-bg"
        id="about"
        ref={(el) => (sectionRefs.current[1] = el)}
      >
        <div className="floating-dot" style={{ top: "60px", right: "12%", width: "24px", height: "24px" }} />

        <div className="about-inner">
          <div className="about-image-wrap">
            <div className="about-dot-1" />
            <div className="about-dot-2" />
            <img
              src="https://images.unsplash.com/photo-1596495578065-6e0763fa1178?q=80&w=1200&auto=format&fit=crop"
              alt="Math philosophy"
            />
          </div>

          <div className="about-text">
            <div className="sub-label">
              <span className="dot-indicator" /> OUR PHILOSOPHY
            </div>
            <h2>
              MATH IS
              <br />
              EVERYWHERE
            </h2>
            <p>
              We believe mathematics is not just about numbers — it's a language
              that describes the universe. Our club brings together enthusiasts
              of all levels to explore, learn, and create.
            </p>
            <p>
              From foundational concepts to cutting-edge theories, we make math
              accessible, exciting, and deeply rewarding.
            </p>
            <div className="stat-row">
              <div className="stat-item">
                <h3>12+</h3>
                <span>Years Active</span>
              </div>
              <div className="stat-item">
                <h3>800+</h3>
                <span>Members</span>
              </div>
              <div className="stat-item">
                <h3>45</h3>
                <span>Events / Year</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SCHEDULE / TIMELINE SECTION ========== */}
      <section
        className="schedule grid-bg"
        id="schedule"
        ref={(el) => (sectionRefs.current[2] = el)}
      >
        <div className="floating-dot" style={{ top: "30px", left: "50%", width: "14px", height: "14px" }} />

        <div className="schedule-header">
          <h2>
            WEEKLY
            <br />
            SCHEDULE
          </h2>
          <span className="tag">— FALL 2026</span>
        </div>

        <div className="timeline">
          {scheduleData.map((item, i) => (
            <div
              key={i}
              className={`timeline-row${activeTimeline === i ? " active-row" : ""}`}
              onClick={() => handleTimelineClick(i)}
            >
              <div className="day">{item.day}</div>
              <div className="time">{item.time}</div>
              <div className="topic">{item.topic}</div>
              <div className="circle-indicator">
                <span />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========== TEAM / TEACHERS SECTION ========== */}
      <section
        className="team grid-bg"
        id="team"
        ref={(el) => (sectionRefs.current[3] = el)}
      >
        <div className="floating-dot" style={{ bottom: "80px", left: "8%", width: "20px", height: "20px" }} />

        <div className="team-top">
          <h2>
            OUR
            <br />
            TEACHERS
          </h2>
          <p>PASSIONATE EDUCATORS WITH DEEP EXPERTISE IN MATHEMATICS AND A LOVE FOR TEACHING</p>
        </div>

        <div className="team-grid">
          {teamMembers.map((member, i) => (
            <div className="team-card" key={i}>
              {member.dot && (
                <div className="team-dot-deco" style={member.dotStyle} />
              )}
              <div className="card-img">
                <img src={member.img} alt={member.name} />
              </div>
              <div className="card-info">
                <h3>{member.name}</h3>
                <span>{member.role}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========== CONTACT / CTA SECTION ========== */}
      <section
        className="contact grid-bg"
        id="contact"
        ref={(el) => (sectionRefs.current[4] = el)}
      >
        <div className="floating-dot" style={{ top: "40px", right: "20%", width: "16px", height: "16px" }} />
        <div className="floating-dot" style={{ bottom: "60px", left: "15%", width: "22px", height: "22px" }} />

        <div className="contact-inner">
          <div className="contact-left">
            <h2>
              GET IN
              <br />
              TOUCH
            </h2>
            <a href="mailto:hello@mathclub.edu" className="email-link">
              hello@mathclub.edu
            </a>
            <div className="address-block">
              <p>
                42 EULER STREET
                <br />
                MATHEMATICS BUILDING, ROOM 314
                <br />
                NEW YORK, NY 10001
              </p>
              <p style={{ marginTop: "14px" }}>+1 (212) 555–0199</p>
            </div>
          </div>

          <div className="contact-right">
            <form onSubmit={handleContactSubmit}>
              <div className="form-group">
                <label htmlFor="contactName">Full Name</label>
                <input
                  id="contactName"
                  type="text"
                  placeholder="Your name"
                  required
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="contactEmail">Email Address</label>
                <input
                  id="contactEmail"
                  type="email"
                  placeholder="you@example.com"
                  required
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="contactMessage">Message</label>
                <textarea
                  id="contactMessage"
                  placeholder="Tell us about your interest in math..."
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                />
              </div>
              <button type="submit" className="submit-btn">
                Send Message →
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-logo">MATH CLUB</div>
          <ul className="footer-links">
            <li>About</li>
            <li>Programs</li>
            <li>Schedule</li>
            <li>Team</li>
            <li>Contact</li>
          </ul>
          <div className="copyright">© 2026 MATH CLUB · ALL RIGHTS RESERVED</div>
        </div>
      </footer>
    </>
  );
}