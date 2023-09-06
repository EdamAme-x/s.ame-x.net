const express = require('express');
const app = express();

app.get('/*', (req, res) => {
    const url = req.rawHeaders[1].replace("https://", "").replace("http://", "").replace("<", "").replace(">", "").replace("?", "").split(".")[0];
    console.log("Access: " + url);

    if (!/.{6}\..*/.test(url)) {
        return res.send("Not found Support: @amex2189");
    }

    return res.redirect('https://rinu.cf/' + url.split("").reverse().join(""));
});

app.listen(3333, () => {
    console.log('Server started on port 3333');
});