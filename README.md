# DJI_TELLO_WEB

[![built with Vue](https://img.shields.io/badge/built%20with-vue-brightgreen.svg)](https://vuejs.org/) [![built with node](https://img.shields.io/badge/built-node-brightgreen.svg)](https://nodejs.org/en/)

## Project Description

DJI TELLO WEB is a web app that allows you to connect and control your DJI Tello drone using a user-friendly interface. Built with Node.js and Vue 2, the app provides real-time video feed, screenshot capture, and video recording capabilities. All captured photos and videos are saved to IndexedDB for seamless offline storage.

## Features

- Connect to your DJI Tello drone via Wi-Fi
- Real-time video feed from the drone's camera
- Intuitive UI for controlling drone movement and actions
- Capture screenshots from the live video feed
- Record videos during flight
- Save captured photos and videos to IndexedDB for offline access

## Prerequisites

- NodeJS v19
- NPM v8

## Getting started

### Installation

1.  Clone the repository: `git clone git@github.com:Maksym-Mytiuk/DJI_TELLO_WEB.git`
2.  Run `npm install` _ONLY_ in the root directory
3.  Run `npm start`
4.  Open in browser url `http://localhost:5173/`

### Usage

1. Connect your computer to the drone's Wi-Fi network.
2. Launch the DJI_TELLO_WEB web app.
3. Use keyboard or UI to send commands to the drone.

| Key                   | Action                              |
| --------------------- | ----------------------------------- |
| `Enter`               | `Start connection`                  |
| `Shift`               | `Take off the drone`                |
| `Esc`                 | `Emergency stop"`                   |
| `Delete or Backspace` | `Land the drone`                    |
| `B`                   | `Start videostream`                 |
| `N`                   | `Stop videostream`                  |
| `Arrow Up`            | `Fly top to x cm`                   |
| `Arrow Down`          | `Fly down to x cm`                  |
| `Arrow Left`          | `Fly left to x cm`                  |
| `Arrow Right`         | `Fly right to x cm`                 |
| `W`                   | `Fly forward to x cm`               |
| `S`                   | `Fly back to x cm`                  |
| `Q`                   | `Rotate x degree  clockwise`        |
| `E`                   | `Rotate x degree counter clockwise` |

## Available commands

| Command                 | Description                                              |
| ----------------------- | -------------------------------------------------------- |
| `npm install `          | install modules for client and server                    |
| `npm install:server `   | install modules for client                               |
| `npm install:client`    | install modules for server                               |
| `npm run start `        | starts the development client and server                 |
| `npm run start:client ` | starts the development client with hot reloading enabled |
| `npm run start:server ` | starts the development server                            |
