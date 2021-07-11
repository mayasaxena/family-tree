const Languages = {
  hindi: "hindi",
  english: "english"
}

const languageGraphs = {
  [Languages.hindi]: hindi_relations_graph,
  [Languages.english] : english_relations_graph
}

const definitions = {
  [Languages.hindi]: hindi_def,
  [Languages.english] : english_def
}

function getMetadata(source, language) {
  switch (language) {
    case Languages.hindi: 
      return { [Metadata.reference_age]: [source.birthDate] }
  }
}