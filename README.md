# [bleep.live](https://bleep.live) [![GitHub license](https://img.shields.io/badge/license-GPL-blue.svg)](https://github.com/alek/bleep/blob/master/LICENSE) 
A MIDI-driven Vector Graphics Livecoding Framework

![alt text](https://raw.githubusercontent.com/alek/bleep/master/bleep.jpg)

## Getting Started

Getting started should be fairly straightforward. The only dependency is on [node.js](https://nodejs.org/en/download/) (version 8.0 or higher). 

After installing node, you can use npm to download all the necessary dependencies:

```
npm install
```
and the system should be ready to use. Bleep.live works best with a MIDI controller, but the easiest way to get started is by running it in the "virtual midi" mode:

```
node bin/www --virtualmidi
```

Once the server is up and running, you can access it from your browser of choice at:

```
http://localhost:3000/
```

You will see a master controller window with a preloaded sample graphics:

![alt text](https://raw.githubusercontent.com/alek/bleep/master/doc/img/sample.png)

By using qwerty/asdfgh keyboard keys you can simulate sending MIDI CC signals and observe changes to the rendered object.

Alternatively, you can run Bleep environment using the built-in Elektron app:

```
cd elektron
npm install
npm run piksel
```
Which will simultaneously instantiate both controller and client screens, side-by-side.

*Note: you still need to keep the main server process running when using the Elektron app.*

## Architecture

TBD

## MIDI Setup

TBD

## Writing Modules

TBD

## Contributing

TBD

