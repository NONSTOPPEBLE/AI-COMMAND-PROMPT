
# 🤖 AI Command Prompt

**AI Command Prompt** is an AI-powered chatbot built with OpenAI's GPT models, supporting 22 Indian languages. It allows users to interact with the AI through a user-friendly interface, featuring editable messages, settings to adjust model parameters, and more. 

This project is developed by **Vatsal Gavit**, a student from Dang, Gujarat, India.

---

## 🌟 Features

- 🧠 Powered by **OpenAI GPT** models (`gpt-3.5-turbo`, `gpt-4`, `text-davinci-003`)
- 🌐 Understands **22 Indian languages** (text-based input and output)
- ✍️ **Edit** or 🗑️ **delete** chat messages
- ⚙️ Customizable settings:
  - API Key input
  - Select model engine (GPT-3.5, GPT-4, Davinci)
  - Max token limit adjustment
- 🎨 Responsive UI with **Lucide Icons** and **Google Fonts**

---

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript
- **AI Model**: OpenAI GPT API
- **Icons**: Lucide Icons
- **Fonts**: Google Fonts (Inter)
- **Data Storage**: LocalStorage for saving settings

---

## 🔐 API Key Usage

To interact with the AI, you need an **OpenAI API key**. 

### Demo Mode

- The **live demo** uses a public API key (limited access).
- You can test it on the demo website.
- ⚠️ Please note that the public API key is **rate-limited**.

### Use Your Own API Key

1. **Go to [OpenAI API Keys](https://platform.openai.com/account/api-keys)**
2. Log in or create an account.
3. Click **Create new secret key** and copy the key.
4. **Paste the key** into the **Settings panel** in the app.

---

## 📁 Project Structure

```
ai-command-prompt/
├── index.html          # Main HTML file
├── style.css           # Custom styles
├── splash-screen.css   # Splash screen styling
├── vatsal.js           # Main JavaScript logic for chat and settings
├── screenscriptbyvatsal.js  # Additional JavaScript (if any)
├── README.md           # Project documentation
└── screenshots/        # Folder for optional screenshots
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/ai-command-prompt.git
cd ai-command-prompt
```

### 2. Open in a Browser

To run the app locally, open the `index.html` file in any modern browser:

```bash
start index.html
```

### 3. Add Your OpenAI API Key

- Click the ⚙️ **Settings** button.
- Enter your **OpenAI API key**.
- Select your preferred **GPT model** and adjust the **max token** if needed.

---

## 🌍 Live Demo

Try the live demo at:  
🔗 **[https://your-username.github.io/ai-command-prompt/](https://your-username.github.io/ai-command-prompt/)**

> ⚠️ The demo uses a **public API key** for testing, and it might have some rate limits.

---

## 🖼️ Screenshots

| Chat Interface | Settings Panel |
|----------------|----------------|
| ![Chat](screenshots/chat-ui.png) | ![Settings](screenshots/settings.png) |

> *(Upload your screenshots to the `screenshots/` folder if you'd like)*

---

## 💻 How It Works

1. **Chat Interface**: 
    - Users type in the input field, and the AI responds based on the selected GPT model.
    - The chat interface allows for **message editing** and **deleting**.

2. **Settings Panel**: 
    - Users can input their API key, select a model, and adjust settings for tokens.
    - Settings are stored in **localStorage**, so they persist across sessions.

3. **API Integration**: 
    - The app communicates with the **OpenAI API** to fetch responses based on user input.
    - You can configure the app to use different models like `gpt-3.5-turbo`, `gpt-4`, or `text-davinci-003`.

---

## 🔮 Roadmap

- 🎤 **Voice input and output** integration (e.g., using Whisper or Vosk)
- 🔊 **Text-to-speech** for better interaction
- 🌑 **Dark mode** support
- 📶 **Offline mode** with FAQ-like responses
- 📱 **PWA (Progressive Web App)** support for mobile devices

---

## 🙏 Credits

- [OpenAI API](https://platform.openai.com/)
- [Lucide Icons](https://lucide.dev/)
- [Google Fonts - Inter](https://fonts.google.com/specimen/Inter)

---

## 👤 Author

**Vatsal Gavit**  
📍 Dang, Gujarat, India  
📧 Email: `vatsalgame28@gmail.com`  
🔗 LinkedIn: [@VATSAL-GAVIT](https://linkedin.com/in/vatsal-gavit-787608274)  
🐙 GitHub: [@AI-COMMAND-PROMPT](https://github.com/NONSTOPPEBLE/AI-COMMAND-PROMPT)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).  
Feel free to use, modify, and share with credit.

---

> ⭐ If you like this project, give it a ⭐ on GitHub and share it with friends!

1. **GitHub Links**: Replace `your-username` with your GitHub username.
2. **Contact Info**: Add your email and LinkedIn links.
3. **Screenshots**: Optionally, upload your screenshots in the `screenshots/` folder and update the table above.
4. **Live Demo URL**: If you're hosting it, update the demo link to your own hosted version.

---

This `README.md` will be helpful for both users and developers, providing clear instructions and context on the project, its setup, and usage. Let me know if you need any further adjustments!
