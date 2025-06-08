# 🐾 GOOK GOOK Web

ยินดีต้อนรับสู่ **GOOK GOOK** — a platform 🐶🐱

---

## ✨ Features

- 🛍️ **เรียกดูดีล**
  ผู้ใช้งานสามารถเรียกดูดีลทั้งหมดที่ร้านค้าพาร์ทเนอร์นำเสนอ

- 📄 **ดูรายละเอียดดีล**
  แสดงข้อมูลครบถ้วน เช่น รายละเอียด และเงื่อนไข

- 🎟️ **รับสิทธิ์คูปอง**
  ผู้ใช้งานสามารถแลกรับดีลผ่านแอปได้ทันที

- 🐾 **เน้นบริการสัตว์เลี้ยง**
  ครอบคลุมทั้งอาหาร อุปกรณ์ และบริการสำหรับสัตว์เลี้ยง

---

## 🧱 Tech Stack

* **Framework**: [Next.js 15](https://nextjs.org/)
* **Language**: TypeScript
* **Styling**: Tailwind CSS
* **State & UI**: React 19, clsx, react-hot-toast
* **HTTP**: Axios
* **Utils**: dayjs, js-cookie
* **Slider**: Swiper.js

---

## 🗂️ Project Structure

📦 root  
├── 📁 .vscode               # การตั้งค่า VS Code เฉพาะโปรเจกต์นี้  
├── 📁 assets                # ไฟล์ภาพ/ไอคอน/สื่อประกอบ  
├── 📁 public                # โฟลเดอร์ static assets (เช่น favicon, รูป, etc.)  
├── 📁 src                   # โฟลเดอร์หลักของ source code  
│   ├── 📁 app               # 🔁 Next.js App Router และหน้าเพจทั้งหมด  
│   ├── 📁 components        # 🧩 ส่วนประกอบ UI ที่นำกลับมาใช้ซ้ำได้  
│   ├── 📁 contexts          # 🌐 React Context (เช่น loading, auth)  
│   ├── 📁 hooks             # 🪝 React Custom Hooks  
│   ├── 📁 libs              # 📚 ไลบรารี/ฟังก์ชันเฉพาะทาง เช่น axios wrapper  
│   ├── 📁 models            # 🧾 TypeScript Interface หรือ Model  
│   ├── 📁 services          # 📡 ฟังก์ชันเรียก API  
│   └── 📁 utils             # 🔧 ฟังก์ชันช่วยเหลือทั่วไป  
├── 🛠️ .env.local            # ตัวแปรสภาพแวดล้อม  
├── 🧹 .gitignore            # รายการไฟล์ที่ไม่ต้องการ track ใน Git  
├── 📏 eslint.config.mjs     # การตั้งค่า Lint  
├── ⚙️ next.config.ts        # การตั้งค่า Next.js  
├── 📦 package.json          # รายการ dependencies และ script  
├── 🔐 postcss.config.mjs    # การตั้งค่า PostCSS  
├── 📚 README.md             # เอกสารแนะนำโปรเจกต์  
└── 🧱 tsconfig.json         # การตั้งค่า TypeScript  