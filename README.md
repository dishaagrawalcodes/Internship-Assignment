# Internship-Assignment# React UI Library – Internship Assignment

This project is a **mini component library** built with **React, TypeScript, TailwindCSS, and Storybook**.  
It includes reusable UI components such as **InputField** with multiple states, variants, and sizes.  
Storybook is used for interactive documentation and preview.

---

## 🚀 Features
- ⚛️ Built with React + TypeScript
- 🎨 Styled using TailwindCSS
- 📖 Component documentation with Storybook
- 🧩 Example components:
  - **InputField** (with validation states, variants, sizes)
  - **[Your second component here]**
- 🌙 Light & Dark theme support (optional)
- 🔄 Deployable on Vercel or Chromatic

---

## 📂 Folder Structure
react-ui-lib/
├── .storybook/ # Storybook configuration
├── src/
│ ├── components/ # Reusable components
│ └── stories/ # Storybook stories
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts


---

## 🛠️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>/react-ui-lib

2. Install Dependencies
npm install

3. Run Storybook Locally
npm run storybook


Storybook will start at http://localhost:6006
.

4. Build Storybook
npm run build-storybook


This generates a static site inside the storybook-static/ folder.

🌍 Deployment
Deploy on Vercel

Push your code to GitHub.

Go to Vercel
, create a new project, and import your repo.

Set project settings:

Root Directory: react-ui-lib

Build Command: npm run build-storybook

Output Directory: storybook-static

Click Deploy 🎉

Deploy on Chromatic

Alternatively, you can publish Storybook via Chromatic:

npm install --save-dev chromatic
npx chromatic --project-token <your-token>


You’ll get a live Storybook link to share.

📖 Example Usage
import { InputField } from "./components/InputField";

export default function App() {
  return (
    <div className="p-4">
      <InputField
        label="Username"
        placeholder="Enter your username"
        helperText="This will be visible on your profile"
        variant="outlined"
        size="md"
      />
    </div>
  );
}





📝 Approach

Built flexible, reusable UI components.

Used React + TypeScript for type-safety.

Styled with TailwindCSS for fast and consistent styling.

Documented and tested all states with Storybook.

Deployment handled via Vercel (for preview) and Chromatic (optional).



---------
📸 Screenshots / GIFs
<img width="1489" height="892" alt="Screenshot 2025-09-02 231846" src="https://github.com/user-attachments/assets/88033c91-3661-4f3e-a49b-41ac380bfc2b" />
<img width="1288" height="795" alt="image" src="https://github.com/user-attachments/assets/e1b2f9be-97b8-4887-95d9-7b22c51f7649" />
