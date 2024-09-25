const express = require('express')
const morgan = require('morgan')
const { type } = require('os')
const app = express()
const port = 3000


app.use(express.json())
app.use(morgan('dev'))

// !-- Server Connection
app.listen(port, () => {
    console.log(`this port ${port} is working`)
})



// !-- Database
const events = [
    { id: 1, type: 'music', location: 'Royal Festival Hall', name: 'Mahlers' },
    { id: 2, type: 'sport', location: 'Tower Bridge', name: 'London' },
    { id: 3, type: 'film', location: 'Rio Cinema', name: 'Barbie' },
    { id: 4, type: 'sport', location: 'Barbican', name: 'Parkour' },
    { id: 5, type: 'sport', location: 'Gym Box', name: 'Powerlifting' },
    { id: 6, type: 'music', location: 'The O2', name: 'Killers' },
    { id: 7, type: 'film', location: 'Everyman Cinema', name: 'Batman' }
]




// !-- Routes
app.get('/events', (req,res) => {
    return res.send(events)
})


// !-- Show
app.get('/events/:eventID', (req,res) => {
    try {
        const numEvents = Number(req.params.eventID)
        const foundEvent = events.find((event) => {
            return event.id === numEvents
        })
        
        if(foundEvent){
            return res.send(foundEvent)
        }
        
        
    } catch(error) {
        console.log(error)
        return res.status(404).send('This isnt working chief')
    }
})





// !-- Create
app.post('/events', (req,res) => {
    try {
    req.body.id = events.length +1
    console.log(req.body)
    events.push(req.body)
    return res.send(req.body)

    } catch (error) {
        console.log(error)
        return res.send('This is an error')
    }
})





// !-- Delete
app.delete('/events/:eventid', (req,res) => {
    try {

        const eventId = Number(req.params.id)
        const eventToDelete = events.find(el => el.id === eventid)
        const index = events.indexOf(eventToDelete)

        events.splice(index, 1)





        
    } catch (error){
        res.send('error')
    }}
)



// !-- Update




// !-- 404
app.get('*', (req,res) => {
    return res.status(404).send("This Page Isn't Available You Fool")    
})