import { UPLOAD_PATH, app, upload } from './server';
import { Hotels } from './hotels'
import path from 'path'
import fs from 'fs'
import del from 'del'
 

app.post('/hotels', upload.single('image'), (req, res, next) => {
   
    let newHotels = new Hotels()
    newHotels.filename = req.file.filename
    newHotels.originalName = req.file.originalname
    newHotels.name = req.body.name
    newHotels.stars = req.body.stars
    newHotels.price = req.body.price
    newHotels.save(err => {
        if (err) {
            return res.sendStatus(400)
        }
        res.status(201).send({ newHotels })
    })
})
 

app.get('/hotels', (req, res, next) => {
   
    Hotels.find({}, '-__v').lean().exec((err, images) => {
        if (err) {
            res.sendStatus(400)
        }
 
        for (let i = 0; i < images.length; i++) {
            var img = images[i]
            img.url = req.protocol + '://' + req.get('host') + '/hotels/' + img._id
        }
        res.json(images)
    })
})


app.get('/hotels/:id', (req, res, next) => {
    let imgId = req.params.id
 
    Hotels.findById(imgId, (err, image) => {
        if (err) {
            res.sendStatus(400)
        }
   
        res.setHeader('Content-Type', 'image/jpeg')
        fs.createReadStream(path.join(UPLOAD_PATH, image.filename)).pipe(res)
    })
})


app.delete('/hotels/:id', (req, res, next) => {
    let imgId = req.params.id
 
    Hotels.findByIdAndRemove(imgId, (err, image) => {
        if (err && image) {
            res.sendStatus(400)
        }
 
        del([path.join(UPLOAD_PATH, image.filename)]).then(deleted => {
            res.sendStatus(200)
        })
    })
})
