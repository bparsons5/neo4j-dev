$(function() {
    // create session
    // const neo4j = require('neo4j-driver')

    const uri = 'bolt+s://d6f7bace81a72fc0a0bf035a10c9e561.neo4jsandbox.com:7687'
    const user = 'neo4j'
    const password = 'eye-pennant-stores' 

    const driver = neo4j.driver(uri, neo4j.auth.basic(user, password))
    const session = driver.session()

    let i = 1

    // Run a Cypher statement, reading the result in a streaming manner as records arrive:
    session
        .run('MATCH (a:Movie) RETURN a, rand() as r ORDER BY r LIMIT 3')
        .subscribe({
            onKeys: keys => {
                // console.log(keys)
            },
            onNext: record => {
                data = record.get('a')
                console.log(data)

                // assign values to html
                document.getElementById('movie-' + i).innerHTML = data.properties.title
                i++
            },
            onCompleted: () => {
                session.close() // returns a Promise
            },
            onError: error => {
                console.log(error)
            }
        })

    // create query call

    // assign values to html

});