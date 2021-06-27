sisterchildren = {
  "daughter" : "bhanji",
  "son" : "bhanja",
}

brotherchildren = {
  "daughter" : "bhatiji",
  "son" : "bhatija",
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
      "wife" : "",
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

wifesiblings = {
  "daughter" : {
    "": "saali",
    "husband" : "sadhu",
    "wife" : "",
    ...sisterchildren
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
    "": "nanand",
    "husband" : "nandoi",
    "wife" : "",
    ...sisterchildren
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
    "": "mama",
    "wife" : "mami",
    "husband" : "",
  },
}

fathersiblings = {
  "daughter" : {
    "": "bua",
    "husband" : "phupa, phupaji",
  },
  "son" : {
    "younger" : {
      "": "chacha",
      "wife" : "chachi",
      "husband" : ""
    },
    "older" : {
        "": "tau, tauji",
      "wife" : "tai, taima",
      "husband" : "",
    },
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
          ...wifesiblings
        },
        "father" : {
          "": "sasur (suss-oor)",
          ...wifesiblings
        },
      },

      "husband" : {
        "" : "miah (mee-ah), pati (puh-tee)",
        "mother" : {
          "": "saas (sahss)",
          ...husbandsiblings
        },
        "father" : {
          "": "sasur (suss-oor)",
          ...husbandsiblings
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
        "daughter" : "natin (nah-tin), navasi (nuh-vah-see)",
        "son" : "nati (nah-tee), navasa (nuh-vah-saw)",
        "mother" : "beti ki maa",
        "father" : "beti ke baap",
      },

      "son" : {
        "" : "beta (bay-tah)",
        "wife" : "bahu (buh-who)",
        "husband" : "damad (dah-mad), jamai (juh-mah-ee)",
        "daughter" : "poti (poe-tee)",
        "son" : "pota (poe-tah)",
        "mother" : "bete ki maa",
        "father" : "bete ke baap",
      },
  
      "mother" : {
        "": "ma, mummy",
        ...siblings,
        "mother" : {
          "": "nani (nah-nee)",
          ...mothersiblings
        },
        "father" : {
          "": "nana (nah-nah)",
          ...mothersiblings
        },
      },
          
      "father" : {
        "": "papa",
        ...siblings,
        "mother" : {
          "": "dadi (dah-dee), dadima",
          ...fathersiblings
        },
        "father" : {
          "": "dada (dah-dah), dadaji",
          ...fathersiblings
        },
      }
    }
  }
}    

    
