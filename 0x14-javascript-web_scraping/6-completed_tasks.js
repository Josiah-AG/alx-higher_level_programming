#!/usr/bin/node

const request = require('request');

const apiUrl = process.argv[2];

request(apiUrl, function (error, response, body) {
  if (error) {
    console.error('Error:', error);
  } else if (response.statusCode !== 200) {
    console.error('Error:', response.statusCode, response.statusMessage);
  } else {
    try {
      const todos = JSON.parse(body);
      const usersWithCompletedTasks = todos.reduce((acc, todo) => {
        if (todo.completed) {
          if (!acc[todo.userId]) {
            acc[todo.userId] = 1;
          } else {
            acc[todo.userId]++;
          }
        }
        return acc;
      }, {});
      console.log(usersWithCompletedTasks);
    } catch (e) {
      console.error('Error parsing the response body:', e);
    }
  }
});
