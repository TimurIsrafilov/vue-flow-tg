# Telegram nini app and Web app of the company structure on Vue Flow

## Project description:

Программа для просмотра сотрудников компании

## The app can be started at Telegram by the bot direct link:

[https://t.me/vueflowbot/VueChart/](https://t.me/vueflowbot/VueChart/)

## The app is deployed at GitHub Pages by the following link:

[https://github.com/TimurIsrafilov/vue-flow-tg/](https://github.com/TimurIsrafilov/vue-flow-tg/)

## Build commands:

clone repository

```bash
git clone https://github.com/TimurIsrafilov/vue-flow-tg.git
```

go to project folder

```bash
cd vue-flow-tg
```

install dependencies

```bash
npm i
```

## Commands for app run:

run dev mode

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

run prod mode

```bash
npm run build
```

## Stack of technologies used:

- <img src="https://github.com/devicons/devicon/blob/master/icons/vuejs/vuejs-original.svg" title="vuejs" alt="vuejs" width="20" height="20"/> - **Vue3** - JavaScript library [https://vuejs.org/](https://vuejs.org/)

## Implemented functionality:

- штатная структура построена на основе моковых данных
- можно скрыть и показать сотрудников
- приложение можно запустить как в телеграмме так и в веб приложении

## What can be improved:

- применить интеграцию с данными от Telegram API

## С какими трудностями столкнулся при реализации:

- в библиотеке vue-flow функционал скрытия показа реализован через hide опцию, но сложности были с добавление ее функционала
