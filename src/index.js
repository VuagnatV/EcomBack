const app = require('./app');
const port = 3006

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});