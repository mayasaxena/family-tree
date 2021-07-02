function getRelationships(dataByID, adjList, startID) {
  var relationships = {}
  var marked = {}

  var stack = []
  stack.push(startID)
  const startData = dataByID[startID]

  relationships[startID] = {
    relationship: "your",
    curr: "your",
    titleInfo: {
      key: "your",
      modifier: null
    },
    genGap: 0, 
    ageRefStack: [startData.birthDate] 
  }
  marked[startID] = true

  while (stack.length > 0) {
    var sourceID = stack.pop()
    const source = relationships[sourceID]

    adjList[sourceID].forEach(destID => {
      if (!marked[destID]) {
        stack.push(destID)
        destination = relationship(source, sourceID, destID, dataByID)
        ageModifier = isParent(source.relationship) && destination.ageDiff ? `-${destination.ageDiff}` : ""
        relationships[destID] = {
          relationship: `${source.relationship}-${destination.relationship}${ageModifier}`,
          curr: source.relationship,
          titleInfo: getTitleInfo(source.titleInfo.key, destination.relationship, destination.ageDiff),
          genGap: source.genGap + destination.genGap,
          ageRefStack: destination.ageRefStack
        }
        marked[destID] = true
      }
    });
  }
  return relationships
}

function strEndsWith(str, suffix) {
  return str.indexOf(suffix, str.length - suffix.length) !== -1
}

function isParent(prev) {
  return strEndsWith(prev, "father") || strEndsWith(prev, 'mother')
}

function relationship(source, sourceID, destID, dataByID) {
  var relationship = null
  var ageDiff = null
  var genGap = null
  
  const sourceData = dataByID[sourceID]
  const destData = dataByID[destID]

  var ageRefStack = source.ageRefStack.slice()

  if (sourceData.parents.includes(destID)) {
    ageRefStack.push(destData.birthDate)
    genGap = -1
    
    if (destData.gender == "Male") {
      relationship = "father"
    } else if (destData.gender == 'Female') {
      relationship = "mother"
    } else {
      relationship = "parent"
    }
  } else if (sourceData.children.includes(destID)) {
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
    ageDiff = ageRef > destData.birthDate ? 'older' : 'younger'

  } else if (sourceData.partners.includes(destID)) {
    ageRefStack.push(destData.birthDate)

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

  return {
    relationship: relationship,
    ageDiff: ageDiff, 
    genGap: genGap, 
    ageRefStack: ageRefStack
  }
}

function getTitleInfo(current, relation, ageDiff) {
  var from = relationsGraph[current]
  const to = from[relation]
  var key = null
  if (typeof to === 'object' && to !== null) {
    key = to[ageDiff]
  } else {
    key = to
  }

  return {
    key: key ?? current,
    modifier: key === null ? relation : null
  }
}