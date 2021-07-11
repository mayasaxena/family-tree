const Languages = {
  hindi: "hindi"
}

function getMetadata(source, language) {
  switch (language) {
    case Languages.hindi: 
      return { [Metadata.reference_age]: [source.birthDate] }
  }
}