function getRelationships(data, adjList, start) {  
  var level = {}
  var marked = {}

  var stack = []
  stack.push(start)
  const you = data.find(element => element.id == start)
  level[start] = { rel: "you", genGap: 0, ageRefStack: [you.birthDate] }
  marked[start] = true

  while (stack.length > 0) {
    var source = stack.pop()
    const last = level[source]

    adjList[source].forEach(neighbor => {
      if (!marked[neighbor]) {
        stack.push(neighbor)
        result = relationship(last, source, neighbor, data)
        level[neighbor] = {
          rel: last.rel + result.rel + (isParent(last.rel) ? result.ageDiff ?? '' : ''),
          genGap: last.genGap + result.genGap,
          ageRefStack: result.ageRefStack
        }
        marked[neighbor] = true
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

function relationship(last, source, dest, data) {
  var relationship = ""
  var ageDiff = null
  var genGap = 0
  
  const sourceData = data.find(element => element.id == source)
  const destData = data.find(element => element.id == dest)

  var ageRefStack = last.ageRefStack.slice()

  if (sourceData.parents.includes(dest)) {
    ageRefStack.push(destData.birthDate)
    genGap = -1
    
    if (destData.gender == "Male") {
      relationship = "father"
    } else if (destData.gender == 'Female') {
      relationship = "mother"
    } else {
      relationship = "parent"
    }
    // console.log(last.rel, relationship, dest, ageRefStack)
  } else if (sourceData.children.includes(dest)) {
    ageRefStack.pop()
    genGap = 1
    
    if (destData.gender == 'Male') {
      relationship = 'son'
    } else if (destData.gender == 'Female') {
      relationship = 'daughter'
    } else {
      relationship = 'child'
    }

    const ageRef = ageRefStack[ageRefStack.length - 1]
    // console.log("comparing ", ageRef, destData.birthDate)
    ageDiff = ageRef > destData.birthDate ? '-older' : '-younger'

  } else if (sourceData.partners.includes(dest)) {
    ageRefStack.push(destData.birthDate)

    if (destData.gender == 'Male') {
      relationship = 'husband'
    } else if (destData.gender == 'Female') {
      relationship = 'wife'
    } else {
      relationship = 'spouse'
    }
    // console.log(last.rel, relationship, dest, ageRefStack)
  } else {
    relationship = "?"
  }

  return {rel: `-${relationship}`, ageDiff: ageDiff, genGap: genGap, ageRefStack: ageRefStack}
}

function relationName (tree, relationship, relative, you) {
  var components = relationship.rel.split('-')

  while (components.length >= 0) {
    var component = ""
    if (components.length > 0) {
      var component = components[0]
      components.shift()
    }

    if (tree[component] == undefined) {
      if (relationship.genGap >= 0) {
        var ageDiff = you.birthDate > relative.birthDate ? 'older' : 'younger'
        var remaining = `${component}-${ageDiff}` + (components.length > 0 ? "-" + components.join("-") : "")
        return relationName(siblings, {rel: remaining, genGap: relationship.genGap - 1 }, relative, you)
      } else {
        console.log("what???", component);
        return relationship.genGap
      }
    } else if (typeof tree[component] == "string") {
      return tree[component]
    } else {
      tree = tree[component]
    }
  }
}
