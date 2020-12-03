<p align="center"><a href="https://github.com/raftheunis87/tradingview-to-telegram-webhook-bot" target="_blank"><img src="https://i.imgur.com/bbIFgsc.png"></a></p>

<p align="center">
    <a href="https://nodejs.org/en/download/"><img src="https://img.shields.io/badge/node-%3E%3D%206.0.0-brightgreen?style=plastic" alt="NodeJS version"></a>
    <img src="https://img.shields.io/github/workflow/status/raftheunis87/tradingview-to-telegram-webhook-bot/Node.js%20CI/main?style=plastic">
    <a href="https://github.com/raftheunis87/tradingview-to-telegram-webhook-bot/issues"><img src="https://img.shields.io/github/issues/raftheunis87/tradingview-to-telegram-webhook-bot?style=plastic" alt="GitHub issues"></a>
    <a href="https://github.com/raftheunis87/tradingview-to-telegram-webhook-bot/pulls"><img src="https://img.shields.io/github/issues-pr/raftheunis87/tradingview-to-telegram-webhook-bot?style=plastic" alt="GitHub pull requests"></a>
    <br /><a href="https://github.com/raftheunis87/tradingview-to-telegram-webhook-bot/stargazers"><img src="https://img.shields.io/github/stars/raftheunis87/tradingview-to-telegram-webhook-bot?style=social" alt="GitHub stars"></a>
    <a href="https://github.com/raftheunis87/tradingview-to-telegram-webhook-bot/network/members"><img src="https://img.shields.io/github/forks/raftheunis87/tradingview-to-telegram-webhook-bot?style=social" alt="GitHub forks"></a>
    <a href="https://github.com/raftheunis87/tradingview-to-telegram-webhook-bot/watchers"><img src="https://img.shields.io/github/watchers/raftheunis87/tradingview-to-telegram-webhook-bot?style=social" alt="GitHub watchers"></a>
</p>

<p align="center">
  <a href="#about">About</a>
  •
  <a href="#features">Features</a>
  •
  <a href="#installation">Installation</a>
  •
  <a href="#images">Images</a>
  •
  <a href="#how-can-i-help">Help</a>
</p>

## About
The **TradingView To Telegram Webhook Bot** listens to [TradingView](https://tradingview.com) alerts via [webhooks](https://www.tradingview.com/support/solutions/43000529348-i-want-to-know-more-about-webhooks/) using [NestJS](https://nestjs.com/).
All alerts can be instantly sent to Telegram.

## Features
- Telegram Support using the [NestJS Telegram](https://github.com/jmcdo29/nestjs-telegram) libary
- TradingView `{{exchange}}`, `{{ticker}}` etc. variables support. Read more [here](https://www.tradingview.com/blog/en/introducing-variables-in-alerts-14880/)
- Swagger documentation

> 💡 Got a feature idea? Open an [issue](https://github.com/raftheunis87/tradingview-to-telegram-webhook-bot/issues/new) and I might implement it.

## Installation
> ⚠️ Best to run the bot on a VPS. I can recommend [VirMach](https://virmach.com/).
1. Install [NodeJS](https://nodejs.org/en/download/)
1. Clone this repository `git clone https://github.com/raftheunis87/tradingview-to-telegram-webhook-bot.git`
1. Install all requirements `npm install`
1. Set the required environment variables
    - `TELEGRAM_BOT_TOKEN` is the token you receive after creating a bot with the BotFather
    - `TELEGRAM_CHAT_ID` is the id of the telegram group or channel in which the bot will give the TradingView alerts. 

    More information on how to set environment variables for you specific os can be found [here](https://www.twilio.com/blog/2017/01/how-to-set-environment-variables.html)
1. Setup TradingView alerts as shown [here](https://i.imgur.com/Yl4Q9Ht.png)
    - TradingViews variables like `{{exchange}}`, `{{ticker}}` etc. work as well. More can be found [here](https://www.tradingview.com/blog/en/introducing-variables-in-alerts-14880/)
    - Your webhook url would be `http://<YOUR-IP>/bot/v1/alerts`
1. If you use a firewall be sure to open port the corresponding port
1. Run the bot `npm run build && npm run start:prod`
1. You can access the Swagger documentation on `http://localhost:4000/api/`

Currently, you can only use the following alert message in your TradingView alert:

```
{
    "exchange": {{exchange}},
    "ticker": {{ticker},
    "action": "BUY" or "SELL"
}
```

This will result in the following outcome on Telegram:
```
Received a SELL alert for BTCUSDT on BINANCE!
```

If the message has other fields, the request will not be accepted by the webhook bot.

*This application will run at port 4000 by default. It is then necessary to forward port 80 to 4000. If you want to run this on a different port, you can set a `PORT` environment variable with the port number of your own choice.*