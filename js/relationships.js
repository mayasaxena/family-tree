function getRelationships(dataByID, adjList, startID) {
  var nodes = {}
  var marked = {}

  var stack = []
  stack.push(startID)
  const startData = dataByID[startID]

  nodes[startID] = {
    id: startID,
    path: "your",
    path_last: "your",
    key: "your",
    gen_gap: 0,
    metadata: {
      reference_age: [startData.birthDate] 
    }
  }

  marked[startID] = true

  while (stack.length > 0) {
    var sourceID = stack.pop()
    const source = nodes[sourceID]

    adjList[sourceID].forEach(destID => {
      if (!marked[destID]) {
        stack.push(destID)
        nodes[destID] = getNextNode(source, destID, dataByID, ["reference_age"], relationsGraph)
        marked[destID] = true
      }
    });
  }
  return nodes
}
