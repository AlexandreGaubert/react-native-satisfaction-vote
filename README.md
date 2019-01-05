# react-native-satisfaction-vote
Satisfaction vote app made for retirement home

# Overview
Made with React Native, NodeJS and MongoDB.

Designed to fit android tablet, we place it at the end of an animation or a lunch. Like this, every resident can vote as their satisfaction of the event. At vote initiation, a new object is created in database with the name and type of the event. Each vote is instantly saved in DB via socket.

The results are retrieved in an other web application that list them all and made an average of the month.

# Usage
 - open one terminal, cd in the repo and run <code>node server/server.js -db \<your mongoDB path> -port \<any port you want></code>
 - connect your device or run emulator then in a second terminal run <code>react-native run-android</code> for android and <code>react-native run-ios</code> for ios

# Comments
Never tested it on iPad or any ios device, feel free to commit changes

# Credits
react-native-circle-percentage by JackPu https://github.com/JackPu/react-native-percentage-circle
