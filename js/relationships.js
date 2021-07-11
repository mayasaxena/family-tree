const languageGraphs = {
  [Languages.hindi]: hindi_relations_graph,
  [Languages.english]: english_relations_graph
}

const definitions = {
  [Languages.hindi]: hindi_def,
  [Languages.english]: english_def
}

function getRelationships(dataByID, adjList, startID, language) {
  var nodes = {}
  var marked = {}

  var stack = []
  stack.push(startID)
  const startData = dataByID[startID]
  const startMetadata = getMetadata(startData, language)

  nodes[startID] = {
    id: startID,
    path: "your",
    path_last: "your",
    key: "your",
    gen_gap: 0,
    metadata: startMetadata
  }

  marked[startID] = true

  while (stack.length > 0) {
    var sourceID = stack.pop()
    const source = nodes[sourceID]

    adjList[sourceID].forEach(destID => {
      if (!marked[destID]) {
        stack.push(destID)
        nodes[destID] = getNextNode(source, destID, dataByID, Object.keys(startMetadata), languageGraphs[language])
        marked[destID] = true
      }
    });
  }
  return nodes
}

function getNextNode(fromNode, toID, dataByID, actions, relationsGraph) {
  const from = dataByID[fromNode.id]
  const to = dataByID[toID]
  const step = getStep(from, toID, to)

  var metadataKeys = []
  var metadata = {}
  actions.forEach(action => {
    const metadataResult = metadataActions[action](fromNode, to, step)
    if (metadataResult.key) {
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
    key = key[metadataKeys[index]]
    index += 1
  }

  const nextNode = {
    id: toID,
    path: fromNode.path + '-' + step.relation,
    path_last: step.relation,
    key: key ?? fromNode.key,
    fallback: key === null ? step.relation : null,
    gen_gap: fromNode.gen_gap + step.gen_gap,
    metadata: metadata
  }

  return nextNode
}

function getStep(from, toID, to) {
  var relation
  var genGap

  if (from.parents.includes(toID)) {
    genGap = -1
    if (to.gender == 'Male') {
      relation = 'father'
    } else if (to.gender == 'Female') {
      relation = 'mother'
    } else {
      relation = 'parent'
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
    relation = '?'
  }

  return { gen_gap: genGap, relation: relation }
}

function isObject(value) {
  return typeof value === 'object' && value !== null
}
