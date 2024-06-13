import { driver, auth }  from "neo4j-driver"

const neoDriver = driver(
    process.env.NEO4J_URI,
    auth.basic(
        process.env.NEO4J_USER,
        process.env.NEO4J_PASSWORD
    )
)


export default neoDriver
