![image](https://github.com/user-attachments/assets/8b11ecf6-13ac-404a-b53a-77d02d12d281)

# Twinkle ✨ - Your Symbol Twinkling at the Distance

**Twinkle** is your charming companion for staying updated on your favorite stocks, offering a clean, delightful, and user-friendly interface. Powered by my **Sparkle Aggregator API** ([check out the API here](https://github.com/ryanamay/sparkle)), Twinkle is a feature-rich app that lets you easily track stock prices in real-time.

> **Demo**: [twinkie-demo.ryawaa.com](https://twinkie-demo.ryawaa.com) 🌐
> 
> **Source Code**: Available here and on [**code.lgbt**](https://code.lgbt/ryanamay/twinkle)! 🏳️‍🌈

---

## 🚀 Features

- **Real-Time Stock Prices**: Keep track of the latest stock prices with real-time updates.
- **Beautiful UI**: Designed with both light and dark modes, making it comfortable for all-day use.
- **Company Information**: Get detailed insights into each company's financials, recommendations, and news.
- **Live News Feed**: Stay up-to-date with related financial and market news for your favorite stocks.
- **Recommendation Trends**: Visualize trends such as strong buy, buy, hold, sell, and strong sell for selected stocks.
- **Dark Mode**: Automatic dark mode for a more comfortable viewing experience at night or in low-light environments.
- **Source Code Available**: Open source on [**code.lgbt**](https://code.lgbt/ryanamay/twinkle) 🏳️‍⚧️!

---

## 🛠 Running Twinkle Locally (Recommended)

This project is not production-ready, but you can easily run it locally. I've prioritized feature richness over simplicity in this version, but a refactor is on the way in the `branch/refactor`.

### 1. Clone the repository:
```bash
git clone https://code.lgbt/ryanamay/twinkle
cd twinkle
```

### 2. Set up your environment

You'll need to create a `.env` file with the following content:
```env
NEXT_PUBLIC_SPARKLE_BASE_URL=https://sparkle-demo.ryawaa.com
```

### 3. Running with Docker Compose (Note: TypeScript issues may arise when building)
```bash
docker-compose up
```
For now, it's better to run the project locally without Docker until the issues are resolved.

### 4. Running Locally (Manual Setup):
```bash
npm install
npm run dev
```
This will start the application on [http://localhost:3000](http://localhost:3000).

---

## 🛠 Deployment

Though it's not yet production-ready, you can deploy Twinkle using any cloud provider that supports Docker or by running it directly on a server. Just keep in mind that the current codebase might need refinement for production environments, and the refactor branch is in progress.

---

## 📝 License

Twinkle is licensed under an open-source license. Feel free to use it, contribute, and make it better.
##### Note: The repository is also hosted on code.lgbt – a community-driven git platform for diverse developers! 🌈
