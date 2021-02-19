export interface CypherInterface {
    create: string,
    update: string,
    delete: string,
    has1Rel: string,
    has2CommonRel: string,
    search: string,
}

export const myCypher: CypherInterface = {
    create: 'CREATE (:User { username: $username, email: $email})',
    
    update: 
    'MATCH (req:User {email: $request}) ' + 
    'MATCH (res:User {email: $response}) ' + 
    'CREATE (req)-[rel1:FRIENDSHIP {createdAt: date()}]->(res) ' + 
    'CREATE (res)-[rel2:FRIENDSHIP {createdAt: date()}]->(req)',
    
    delete: 
    'MATCH (req:User {email: $request})-[from:FRIENDSHIP]->(res:User {email:$response}) ' + 
    'MATCH (res:User {email: $response})-[to:FRIENDSHIP]->(req:User {email: $request}) ' + 
    'DETACH DELETE from, to',
    
    has1Rel: 
    'MATCH (:User {email: $email})-[:FRIENDSHIP]->(target:User) ' + 
    'RETURN target',
    
    has2CommonRel: 'MATCH path=(username:User {email: $email})-[RELATED_TO*2]->(target:User) ' + 
    'WHERE target <> username ' + 
    'WITH username, target, count(path) as cf ' + 
    'WITH target WHERE cf >= 2 ' + 
    'RETURN target',

    search: 'MATCH (target:User { username: $username }) RETURN target',
}