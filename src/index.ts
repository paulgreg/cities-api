import express from 'npm:express@4.18.2'
import { distance } from 'npm:fastest-levenshtein@1.0.16'
import data from './cities.json' assert { type: 'json' }

const PORT = Deno.env.get('PORT') || 8000

type City = {
    country: string
    name: string
    lat: number
    lng: number
}

const cities = data as Array<City>

const app = express()

const clean = (str = '') => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

app.get('/suggest/', (req, res) => {
    const { query } = req
    const { q } = query
    if (!q) {
        res.status(404).end()
    } else {
        const term = clean(q.toLowerCase())
        const candidates = cities
            .filter(({ name }) => name.toLowerCase().includes(term))
            .sort(
                (cityA, cityB) =>
                    distance(cityA.name, term) - distance(cityB.name, term)
            )
            .slice(0, 5)
        res.json(candidates)
    }
})

app.listen(PORT)
console.log(`Listening on port ${PORT}`)
