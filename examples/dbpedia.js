const rdfFetch = require('..')

async function main () {
  try {
    const res = await rdfFetch('http://dbpedia.org/resource/Eiffel_Tower', {
      headers: {
        accept: 'application/n-triples'
      }
    })

    const dataset = await res.dataset()

    for (const quad of dataset) {
      console.log(quad.subject.value + ' ' + quad.predicate.value + ' ' + quad.object.value)
    }
  } catch (err) {
    console.error(err)
  }
}

main()
