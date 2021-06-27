patgrandchildren = {
  "daughter" : "poti (poe-tee)",
  "son" : "pota (poe-tah)",
}

matgrandchildren = {
  "daughter" : "natin (nah-tin), navasi (nuh-vah-see)",
  "son" : "nati (nah-tee), navasa (nuh-vah-saw)",
}

sisterchildren = {
  "daughter" : {
    "": "bhanji",
    ...patgrandchildren
  },
  "son" : {
    "": "bhanja",
    ...patgrandchildren
  }
}

brotherchildren = {
  "daughter" : {
    "": "bhatiji",
    ...matgrandchildren
  },
  "son" : {
    "" : "bhatija",
    ...matgrandchildren
  }
}

fathersister = {
  "older" : {
    "": "(badi) bua",
    "husband" : "(bade) phupa, phupaji",
  },
  "younger" : {
    "": "bua",
    "husband" : "phupa, phupaji",
  },
  "": "bua",
  "husband" : "phupa, phupaji",
}

fatherbrother = {
  "younger" : {
    "": "chacha",
    "wife" : "chachi",
    "husband" : ""
  },
  "older" : {
      "": "tau, tauji",
    "wife" : "tai, taima",
    "husband" : "",
  }
}

husbandsister = {
  "": "nanand",
  "husband" : "nandoi",
  "wife" : "",
  ...sisterchildren
}

siblings = {
  "daughter" : {
    "older" : {
      "": "didi, jiji",
      "wife": "jiji",
      "husband" : "jija, jijaji",
      ...sisterchildren
    },
    "younger" : {
      "": "behen",
      "wife" : "bhabhi",
      "husband" : "behnoi/bhai",
      ...sisterchildren
    },
  },
  "son" : {
    "older" : {
      "" : "bhaiyya",
      "wife": "bhabhi",
      "husband" : "",
      ...brotherchildren
    },
    "younger" : {
      "" : "bhai",
      "wife" : "bhayo/bhabhi",
      "husband" : "",
      ...brotherchildren
    },
  }
}

wifesister = {
   "": "saali",
    "husband" : "sadhu",
    "wife" : "",
    ...sisterchildren
}

wifesiblings = {
  "daughter" : {
    "younger": {
      ...wifesister,
    },
    "older": {
      ...wifesister
    }
  },
  "son" : {
    "older" : {
      "" : "bhai saheb",
      "wife": "salaj",
      "husband" : "",
      ...brotherchildren
    },
    "younger" : {
      "" : "sala",
      "wife" : "salaj",
      "husband" : "",
      ...brotherchildren
    },
  }
}

husbandsiblings = {
  "daughter" : {
    "younger" : {
      ...husbandsister
    }, 
    "older" : {
      ...husbandsister
    }
  },
  "son" : {
    "older" : {
      "" : "jeth",
      "wife": "jethani",
      "husband" : "",
      ...brotherchildren
    },
    "younger" : {
      "" : "devar",
      "wife" : "devarani",
      "husband" : "",
      ...brotherchildren
    },
  },
}

mothersiblings = {
  "daughter" : {
    "": "mausi",
    "husband" : "mausa",
    "wife" : ""
  },
  "son" : {
    "older" : {
      "": "(bade) mama",
      "wife" : "(bade) mami, mai",
      "husband" : "",
    },
    "younger" : {
      "": "mama",
      "wife" : "mami, mai",
      "husband" : "",
    },
  },
}

fathersiblings = {
  "daughter" : {
    ...fathersister
  },
  "son" : {
    ...fatherbrother
  }
}

matgrandmother = {
  "mother" : {
    "": "nani (nah-nee)",
    "husband": "nana (nah-nah)",
    ...mothersiblings
  }
}

matgrandfather = {
  "father" : {
    "": "nana (nah-nah)",
    "wife": "nani (nah-nee)",
    ...mothersiblings
  }
}

patgrandfather = {
  "father" : {
    "": "dada (dah-dah), dadaji",
    "wife": "dadi",
    ...fathersiblings
  },
}

patgreats = {
  "son" : {
    "older" : patgrandfather.father,
    "younger" : patgrandfather.father
  },
  "daughter" : {
    "": "dadi (dah-dee)",
    ...fathersiblings
  }
}

patgrandmother = {
  "mother" : {
    "": "dadi (dah-dee), dadima",
    ...fathersiblings,
  }
}

mother = {
  "mother" : {
    "": "ma, mummy",
    ...siblings,
    ...matgrandmother,
    ...matgrandfather,
  }
}

father = {
  "father" : {
    "": "papa",
    ...siblings,
    ...patgrandmother,
    ...patgrandfather,
  }
}

relations = {
  "Hindi" : {
    "you": {
      "" : "you",
      "wife" : {
        "" : "bibi (bee-bee), patni (putt-knee)",
        "mother" : {
          "": "saas (sahss)",
          ...wifesiblings,
          ...matgrandmother,
          ...matgrandfather
        },
        "father" : {
          "": "sasur (suss-oor)",
          ...wifesiblings,
          ...patgrandmother,
          ...patgrandfather,
        },
      },

      "husband" : {
        "" : "miah (mee-ah), pati (puh-tee)",
        "mother" : {
          "": "saas (sahss)",
          ...husbandsiblings,
          ...matgrandmother,
          ...matgrandfather
        },
        "father" : {
          "": "sasur (suss-oor)",
          ...husbandsiblings,
          ...patgrandfather,
          ...patgrandmother
        },
      },
  
      "child" : {
        "": "beta (bay-tah)",
        "wife" : "bahu (buh-who)",
        "husband" : "damad (dah-mahd), jamai (juh-mah-ee)",
        "daughter" : "",
        "son" : "",
        "mother" : "bete ki maa",
        "father" : "bete ke baap",
      },

      "daughter" : {
        "" : "beti (bay-tee)",
        "wife" : "bahu (buh-who)",
        "husband" : "damad (dah-mahd), jamai (juh-mah-ee)",
        ...matgrandchildren,
        "mother" : "beti ki maa",
        "father" : "beti ke baap",
      },

      "son" : {
        "" : "beta (bay-tah)",
        "wife" : "bahu (buh-who)",
        "husband" : "damad (dah-mad), jamai (juh-mah-ee)",
        ...patgrandchildren,
        "mother" : "bete ki maa",
        "father" : "bete ke baap",
      },
  
      ...mother,
          
      "father" : {
        "": "papa",
        ...siblings,
        "mother" : {
          "": "dadi (dah-dee), dadima",
          ...fathersiblings,
          "mother" : {
            "": "pardadi",
            ...patgreats
          },
          "father" : {
            "": "pardada",
            ...patgreats
          }
        },
        ...patgrandfather
      }
    }
  }
}    

    
