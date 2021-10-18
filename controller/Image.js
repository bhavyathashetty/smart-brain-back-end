const clarifai = require('clarifai');

const app = new clarifai.App({
    apiKey: '1f3b0a65340e4f2ca6421ff87faf0f91'
});
const handleapicall = (req, res) => {
    app.models
    .predict(
        clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data);
    }).catch(err => res.status(400).json('unable to fetch api'))
}

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
    handleImage,
    handleapicall
}