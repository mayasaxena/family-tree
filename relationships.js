var ageRefData;

function getRelationships(data, adjList, start) {  
  var level = {}
  var marked = {}

  ageRefData = data.find(element => element.id == start)

  var queue = []
  queue.push(start)
  level[start] = "you"
  marked[start] = true

  while (queue.length > 0) {
    var source = queue.pop()

    adjList[source].forEach(destination => {
      if (!marked[destination]) {
        queue.push(destination)
        const last = level[source]
        result = relationship(last, source, destination, data)
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

function isSpouse (prev) {
  return strEndsWith(prev, 'husband') || strEndsWith(prev, 'wife')
}

function relationship(prev, source, dest, data) {
  var relationship = ""
  var ageDiff = null
  
  const sourceData = data.find(element => element.id == source)
  const destData = data.find(element => element.id == dest)

  if (sourceData.parents.includes(dest)) {
    if (isParent(prev) || isSpouse(prev)) {
      console.log('age ref changed from ' + ageRefData.name + ' to parent ' + sourceData.name)
      ageRefData = sourceData
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
