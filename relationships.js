function getRelationships(data, source, unions) {  
  unions.forEach(union => {
    union.parentIds.forEach(parentId => {
      const partners = union.parentIds.filter(element => element != parentId)
      const parent = data.find(element => element.id == parentId)
      parent.partners = parent.partners ? parent.partners.concat(partners) : partners
    })
  });
  
  var adjList = data.reduce((adjList, record) => {
    adjList[record.id] = record.parents.concat(record.children).concat(record.partners ?? [])
    return adjList
  }, {})

  return generateRelationships(adjList, source, data)
}

var originData;
var ageRefData;

function generateRelationships(adjList, start, data) {
  // array to store level of each node
  var level = {}
  var marked = {}

  originData = data.find(element => element.id == start)
  ageRefData = originData

  var queue = []
  queue.push(start)
  level[start] = "you"
  marked[start] = true

  while (queue.length > 0) {
    var source = queue[0]
    queue.shift()

    adjList[source].forEach(destination => {
      if (!marked[destination]) {
        queue.push(destination)
        result = relationship(source, destination, data)
        const last = level[source]
        level[destination] = last + result.rel + (isParent(last) ? result.ageDiff ?? "" : "")
        marked[destination] = true
      }
    });
  }
  return level
}

function strEndsWith(str, suffix) {
  return str.indexOf(suffix, str.length - suffix.length) !== -1
}

function isParent(prev) {
  return strEndsWith(prev, "father") || strEndsWith(prev, 'mother')
}

function relationship(source, dest, data) {
  var relationship = ""
  var ageDiff = null
  
  const sourceData = data.find(element => element.id == source)
  const destData = data.find(element => element.id == dest)

  if (sourceData.parents.includes(dest)) {
    if (destData.children.includes(originData.id)) {
      console.log('age ref changed from ' + ageRefData.name + ' to ' + destData.name)
      ageRefData = destData
    }
    if (destData.gender == "Male") {
      relationship = "father"
    } else if (destData.gender == 'Female') {
      relationship = "mother"
    } else {
      relationship = "parent"
    }
  } else if (sourceData.children.includes(dest)) {
    if (destData.gender == 'Male') {
      relationship = 'son'
    } else if (destData.gender == 'Female') {
      relationship = 'daughter'
    } else {
      relationship = 'child'
    }
    
    ageDiff = ageRefData.birthDate > destData.birthDate ? '-older' : '-younger'

  } else if (sourceData.partners.includes(dest)) {
    if (originData.partners.includes(destData.id)) {
      console.log('age ref changed from ' + ageRefData.name + ' to ' + destData.name)
      ageRefData = destData
    }
    if (destData.gender == 'Male') {
      relationship = 'husband'
    } else if (destData.gender == 'Female') {
      relationship = 'wife'
    } else {
      relationship = 'spouse'
    }
  } else {
    relationship = "?"
  }

  return {rel: `-${relationship}`, ageDiff: ageDiff}
}

function relationName (language, relationship) {
  var components = relationship.split('-')
  var tree = relations[language]
  console.log(relationship);

  while (components.length >= 0) {
    var component = ""
    if (components.length > 0) {
      var component = components[0]
      components.shift()
    }
    if (typeof tree[component] == "string") {
      return tree[component]
    } else {
      tree = tree[component]
    }
  }
}
