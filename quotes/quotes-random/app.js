const express = require("express");
const { readFile } = require("fs/promises");

const app = express();

const getRandomColor = () => {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

app.get("/", async (req, res) => {
  const qoutes = await readFile("./quotes.json", "utf-8");
  const qoutesArray = JSON.parse(qoutes);
  const randomQoute =
    qoutesArray[Math.floor(Math.random() * qoutesArray.length)];
  res.send(`
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${randomQoute.author}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Patrick+Hand&display=swap" rel="stylesheet">
<style>
body {
    font-family: "Patrick Hand", cursive;
    font-size: 30px;
    line-height: 1.42857143;
    color: #333;
    margin-top: 15%
  }
  .container {
    width: 50%;
    margin: 0 auto;
  }
  .text1 {
      color: ${getRandomColor()}; 
}
</style>
</head>
<body>
<div class="container">
<h2 class="text1">${randomQoute.text}</h2>
<h2 class="text2"> - ${randomQoute.author}</h2>
</div>
    
</body>
</html>
     
    `);
});

app.all("/*", async (req, res) => {
  const qoutes = await readFile("./quotes-notfound.json", "utf-8");
  const qoutesArray = JSON.parse(qoutes);
  const randomQoute =
    qoutesArray[Math.floor(Math.random() * qoutesArray.length)];
  res.send(`
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${randomQoute.author}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Patrick+Hand&display=swap" rel="stylesheet">
<style>
body {
  font-family: "Patrick Hand", cursive;
  font-size: 30px;
  line-height: 1.42857143;
  color: #333;
  margin-top: 15%
}
.container {
  width: 50%;
  margin: 0 auto;
}
.text1 {
    color: ${getRandomColor()}; 
}
</style>
</head>
<body>
<div class="container">
<h2 class="text1">${randomQoute.text}</h2>
<h2 class="text2"> - ${randomQoute.author}</h2>
</div>
  
</body>
</html>
   
  `);
});
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));
