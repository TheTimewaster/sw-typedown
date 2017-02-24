# Application Driven Schema Deisgn

## Motivation
* Klassische Normalisierung in relationalen DBs <-> Modell in dokumentenbasierten Datenbanken
* Vermeidung von Redundanz
* JOINs und Foreign Keys nicht nutzbar
* Atomicity = Operation wird als Ganzes ausgeführt
* abhängig von der Storage Engine
  * Wired Tiger
    * normalerweise Lock auf Collection
    * Lock auf Document-Level
  * Abfragen der Storage Engine
  
  ```javascript
  db.serverStatus()
  ```
* Design

```json
{
    _id:
    title:
    body:
    author:
    date:
}
```

## **1:1** Relations
*employee-resume*
```json
{
    _id: 20,
    name:"",
    resume: 9
}
```
## **1:many** relations
```json
{
    _id:20,
    name:"",
    people:[]
}
```
people verlinkt auf neue *person* collection
## **many:many** relations
* books as array inside authors
* 2 separate collections with mutual foreign keys
* array von Foreign-Keys halten
* jeweils ineinander einbetten
## Performance
* Embedding kann bessere Performance bringen, da sequentiell gelesen wird, anstatt an verschieden Speicherstellen
## Representing Trees
* Each element holds key to parent
* List all children