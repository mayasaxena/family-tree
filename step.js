function getNextNode(fromNode, toID, dataByID, actions, relationsGraph) {
  const from = dataByID[fromNode.id]
  const to = dataByID[toID]
  const step = getStep(from, toID, to)

  var metadataKeys = []
  var metadata = {}
  actions.forEach(action => {
    const metadataResult = metadataActions[action](fromNode, to, step)
    if (metadataResult.key) {
      console.log(metadataResult.key);
      metadataKeys.push(metadataResult.key)
    }

    if (metadataResult.metadata) {
      metadata[action] = metadataResult.metadata
    }
  })

  const fromNexts = relationsGraph[fromNode.key]
  var key = fromNexts[step.relation]

  var index = 0
  while (isObject(key) && index < metadataKeys.length) {
    console.log("parse");
    key = key[metadataKeys[index]]
    index += 1
  }

  const nextNode = {
    id: toID,
    path: fromNode.path + "-" + step.relation,
    path_last: step.relation,
    key: key ?? fromNode.key,
    fallback: key === null ? step.relation : null,
    gen_gap: fromNode.gen_gap + step.gen_gap,
    metadata: metadata
  }

  return nextNode
}

var metadataActions = { // (fromNode, to, step)
  reference_age: referenceAge
}

function getStep(from, toID, to) {
  var relation;
  var genGap

  if (from.parents.includes(toID)) {
    genGap = -1
    if (to.gender == "Male") {
      relation = "father"
    } else if (to.gender == 'Female') {
      relation = "mother"
    } else {
      relation = "parent"
    }
  } else if (from.children.includes(toID)) {
    genGap = 1
    if (to.gender == 'Male') {
      relation = 'son'
    } else if (to.gender == 'Female') {
      relation = 'daughter'
    } else {
      relation = 'child'
    }
  } else if (from.partners.includes(toID)) {
    genGap = 0
    if (to.gender == 'Male') {
      relation = 'husband'
    } else if (to.gender == 'Female') {
      relation = 'wife'
    } else {
      relation = 'spouse'
    }
  } else {
    genGap = null
    relation = "?"
  }

  return { gen_gap: genGap, relation: relation }
}

function referenceAge(fromNode, to, step) {
  var ageRefStack = fromNode.metadata.reference_age.slice()
  var ageDiff = null
  if (step.gen_gap == 0) {
    ageRefStack.push(to.birthDate)
  } else if (step.gen_gap == 1) {
    ageRefStack.pop()
    ageDiff = ageRefStack[ageRefStack.length - 1] > to.birthDate ? 'older' : 'younger'
  } else if (step.gen_gap == -1) {
    ageRefStack.push(to.birthDate)
  }

  return {
    metadata: ageRefStack,
    key: ageDiff
  }
}

function isObject(value) {
  return typeof value === 'object' && value !== null
}
