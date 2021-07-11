const brother = {
  "older": "brother_older", 
  "younger": "brother_younger"
}

const sister = {
  "older": "sister_older", 
  "younger": "sister_younger"
}

const maternal_uncle = {
  "older": "maternal_uncle_older",
  "younger": "maternal_uncle_younger"
}

const paternal_uncle = {
  "older": "paternal_uncle_older",
  "younger": "paternal_uncle_younger"
}

const husband_brother = {
  "older": "husband_brother_older",
  "younger": "husband_brother_younger"
}

const wife_brother = {
  "older": "wife_brother_older",
  "younger": "wife_brother_younger"
}

const hindi_relations_graph = {
  "your" : {
    "father": "father",
    "mother": "mother",
    "husband": "husband",
    "wife": "wife",
    "son": "son",
    "daughter": "daughter"
  }, 
  "mother" : {
    "father": "maternal_grandfather",
    "mother": "maternal_grandmother",
    "husband": "father",
    "wife": null,
    "son": brother,
    "daughter": sister
  }, 
  "father" : {
    "father": "paternal_grandfather",
    "mother": "paternal_grandmother",
    "husband": null,
    "wife": "mother",
    "son": brother,
    "daughter": sister
  }, 
  "paternal_grandfather" : {
    "father": "paternal_greatgrandfather",
    "mother": "paternal_greatgrandmother",
    "husband": null,
    "wife": "paternal_grandmother",
    "son": paternal_uncle,
    "daughter": "paternal_aunt"
  }, 
  "paternal_grandmother" : {
    "father": "paternal_greatgrandfather",
    "mother": "paternal_greatgrandmother",
    "husband": "paternal_grandfather",
    "wife": null,
    "son": paternal_uncle,
    "daughter": "paternal_aunt"
  }, 
  "maternal_grandfather" : {
    "father": "maternal_greatgrandfather",
    "mother": "maternal_greatgrandmother",
    "husband": null,
    "wife": "mm",
    "son": maternal_uncle,
    "daughter": "maternal_aunt"
  }, 
  "maternal_grandmother" : {
    "father": "maternal_greatgrandfather",
    "mother": "maternal_greatgrandmother",
    "husband": "maternal_grandfather",
    "wife": null,
    "son": maternal_uncle,
    "daughter": "maternal_aunt"
  }, 
  "maternal_uncle_older" : {
    "father": "maternal_grandfather",
    "mother": "maternal_grandmother",
    "husband": null,
    "wife": "maternal_uncle_older_wife",
    "son": brother,
    "daughter": sister
  }, 
  "maternal_uncle_older_wife" : {
    "father": null,
    "mother": null,
    "husband": "maternal_uncle_older",
    "wife": null,
    "son": brother,
    "daughter": sister
  }, 
    "maternal_uncle_younger" : {
    "father": "maternal_grandfather",
    "mother": "maternal_grandmother",
    "husband": null,
    "wife": "maternal_uncle_younger_wife",
    "son": brother,
    "daughter": sister
  }, 
  "maternal_uncle_younger_wife" : {
    "father": null,
    "mother": null,
    "husband": "maternal_uncle_younger",
    "wife": null,
    "son": brother,
    "daughter": sister
  }, 
  "maternal_aunt" : {
    "father": "maternal_grandfather",
    "mother": "maternal_grandmother",
    "husband": "maternal_aunt_husband",
    "wife": null,
    "son": brother,
    "daughter": sister
  }, 
  "maternal_aunt_husband" : {
    "father": null,
    "mother": null,
    "husband": null,
    "wife": "maternal_aunt",
    "son": brother,
    "daughter": sister
  }, 
  "paternal_uncle_older" : {
    "father": "paternal_grandfather",
    "mother": "paternal_grandmother",
    "husband": null,
    "wife": "paternal_uncle_older_wife",
    "son": brother,
    "daughter": sister
  }, 
  "paternal_uncle_older_wife" : {
    "father": null,
    "mother": null,
    "husband": "paternal_uncle",
    "wife": null,
    "son": brother,
    "daughter": sister
  }, 
  "paternal_uncle_younger" : {
    "father": "paternal_grandfather",
    "mother": "paternal_grandmother",
    "husband": null,
    "wife": "paternal_uncle_younger_wife",
    "son": brother,
    "daughter": sister
  }, 
  "paternal_uncle_younger_wife" : {
    "father": null,
    "mother": null,
    "husband": "paternal_uncle_younger",
    "wife": null,
    "son": brother,
    "daughter": sister
  }, 
  "paternal_aunt" : {
    "father": "paternal_grandfather",
    "mother": "paternal_grandmother",
    "husband": "paternal_aunt_husband",
    "wife": null,
    "son": brother,
    "daughter": sister
  }, 
  "paternal_aunt_husband" : {
    "father": null,
    "mother": null,
    "husband": null,
    "wife": "paternal_aunt",
    "son": brother,
    "daughter": sister
  }, 
  "sister_older" : {
    "father": null,
    "mother": null,
    "husband": "sister_older_husband",
    "wife": null,
    "son": "sister_son",
    "daughter": "sister_daughter"
  }, 
  "sister_older_husband" : {
    "father": null,
    "mother": null,
    "husband": null,
    "wife": "sister_older",
    "son": "sister_son",
    "daughter": "sister_daughter"
  }, 
  "sister_younger" : {
    "father": null,
    "mother": null,
    "husband": "sister_younger_husband",
    "wife": null,
    "son": "sister_son",
    "daughter": "sister_daughter"
  }, 
  "sister_younger_husband" : {
    "father": null,
    "mother": null,
    "husband": null,
    "wife": "sister_younger",
    "son": "sister_son",
    "daughter": "sister_son"
  }, 
  "sister_son" : {
    "father": null,
    "mother": null,
    "husband": null,
    "wife": null,
    "son": "son_son",
    "daughter": "son_daughter"
  }, 
  "sister_daughter" : {
    "father": null,
    "mother": null,
    "husband": null,
    "wife": null,
    "son": "daughter_son",
    "daughter": "daughter_daughter"
  },
  "brother_older" : {
    "father": null,
    "mother": null,
    "husband": null,
    "wife": "brother_older_wife",
    "son": "brother_son",
    "daughter": "brother_daughter"
  }, 
  "brother_older_wife" : {
    "father": null,
    "mother": null,
    "husband": "brother_older",
    "wife": null,
    "son": "brother_son",
    "daughter": "brother_daughter"
  }, 
  "brother_younger" : {
    "father": null,
    "mother": null,
    "husband": null,
    "wife": "brother_younger_wife",
    "son": "brother_son",
    "daughter": "brother_daughter"
  }, 
  "brother_younger_wife" : {
    "father": null,
    "mother": null,
    "husband": "brother_younger",
    "wife": null,
    "son": "brother_son",
    "daughter": "brother_daughter"
  }, 
  "brother_daughter" : {
    "father": null,
    "mother": null,
    "husband": null,
    "wife": null,
    "son": "daughter_son",
    "daughter": "daughter_daughter"
  }, 
  "brother_son" : {
    "father": null,
    "mother": null,
    "husband": null,
    "wife": null,
    "son": "son_son",
    "daughter": "son_daughter"
  }, 
  "husband" : {
    "father": "husband_father",
    "mother": "husband_mother",
    "husband": null,
    "wife": null,
    "son": "son",
    "daughter": "daughter"
  }, 
  "husband_brother_older" : {
    "father": "husband_father",
    "mother": "husband_mother",
    "husband": null,
    "wife": "husband_brother_older_wife",
    "son": "brother_son",
    "daughter": "brother_daughter"
  }, 
  "husband_brother_older_wife" : {
    "father": null,
    "mother": null,
    "husband": "husband_brother_older",
    "wife": null,
    "son": "brother_son",
    "daughter": "brother_daughter"
  }, 
  "husband_sister" : {
    "father": "husband_father",
    "mother": "husband_mother",
    "husband": "husband_sister_husband",
    "wife": null,
    "son": "sister_son",
    "daughter": "sister_daughter"
  }, 
  "husband_sister_husband" : {
    "father": null,
    "mother": null,
    "husband": null,
    "wife": "husband_sister_husband",
    "son": "sister_son",
    "daughter": "sister_daughter"
  }, 
  "husband_brother_younger" : {
    "father": "husband_father",
    "mother": "husband_mother",
    "husband": null,
    "wife": "husband_brother_younger_wife",
    "son": "brother_son",
    "daughter": "brother_daughter"
  }, 
  "husband_brother_younger_wife" : {
    "father": null,
    "mother": null,
    "husband": "husband_brother_younger",
    "wife": null,
    "son": "brother_son",
    "daughter": "brother_daughter"
  }, 
  "wife" : {
    "father": "wife_father",
    "mother": "wife_mother",
    "husband": null,
    "wife": null,
    "son": "son",
    "daughter": "son"
  }, 
  "wife_brother_older" : {
    "father": "wife_father",
    "mother": "wife_mother",
    "husband": null,
    "wife": "wife_brother_wife",
    "son": "brother_son",
    "daughter": "brother_daughter"
  }, 
  "wife_brother_younger" : {
    "father": "wife_father",
    "mother": "wife_mother",
    "husband": null,
    "wife": "wife_brother_wife",
    "son": "brother_son",
    "daughter": "brother_daughter"
  }, 
  "wife_brother_wife" : {
    "father": null,
    "mother": null,
    "husband": null,
    "wife": null,
    "son": "brother_son",
    "daughter": "brother_daughter"
  }, 
  "wife_sister" : {
    "father": "wife_father",
    "mother": "wife_mother",
    "husband": "wife_sister_husband",
    "wife": null,
    "son": "sister_son",
    "daughter": "sister_daughter"
  }, 
  "wife_sister_husband" : {
    "father": null,
    "mother": null,
    "husband": null,
    "wife": "wife_sister",
    "son": "sister_son",
    "daughter": "sister_daughter"
  }, 
  "son" : {
    "father": null,
    "mother": null,
    "husband": "child_husband",
    "wife": "child_wife",
    "son": "son_son",
    "daughter": "son_daughter"
  }, 
  "daughter" : {
    "father": null,
    "mother": null,
    "husband": "child_husband",
    "wife": "child_wife",
    "son": "daughter_son",
    "daughter": "daughter_daughter"
  }, 
  "daughter_daughter" : {
    "father": null,
    "mother": null,
    "husband": null,
    "wife": null,
    "son": null,
    "daughter": null
  }, 
  "daughter_son" : {
    "father": null,
    "mother": null,
    "husband": null,
    "wife": null,
    "son": null,
    "daughter": null
  }, 
  "son_daughter" : {
    "father": null,
    "mother": null,
    "husband": null,
    "wife": null,
    "son": null,
    "daughter": null
  }, 
  "son_son" : {
    "father": null,
    "mother": null,
    "husband": null,
    "wife": null,
    "son": null,
    "daughter": null
  }, 
  "child_wife" : {
    "father": "child_spouse_father",
    "mother": "child_spouse_mother",
    "husband": null,
    "wife": null,
    "son": null,
    "daughter": null
  }, 
  "child_husband" : {
    "father": "child_spouse_father",
    "mother": "child_spouse_mother",
    "husband": null,
    "wife": null,
    "son": null,
    "daughter": null
  }, 
  "wife_mother" : {
    "father": "maternal_grandfather",
    "mother": "maternal_grandmother",
    "husband": "wife_father",
    "wife": null,
    "son": wife_brother,
    "daughter": "wife_sister"
  }, 
  "wife_father" : {
    "father": "paternal_grandfather",
    "mother": "paternal_grandmother",
    "husband": null,
    "wife": "wife_mother",
    "son": wife_brother,
    "daughter": "wife_sister"
  }, 
  "husband_mother" : {
    "father": "maternal_grandfather",
    "mother": "maternal_grandmother",
    "husband": "husband_father",
    "wife": null,
    "son": husband_brother,
    "daughter": "husband_sister"
  }, 
  "husband_father" : {
    "father": "paternal_grandfather",
    "mother": "paternal_grandmother",
    "husband": null,
    "wife": "husband_mother",
    "son": husband_brother,
    "daughter": "husband_sister"
  }, 
  "child_spouse_father" : {
    "father": null,
    "mother": null,
    "husband": null,
    "wife": "child_spouse_mother",
    "son": "child_husband",
    "daughter": "child_wife"
  },
  "child_spouse_mother" : {
    "father": null,
    "mother": null,
    "husband": "child_spouse_father",
    "wife": null,
    "son": "child_husband",
    "daughter": "child_wife"
  },
  "paternal_greatgrandmother" : {
    "father": null,
    "mother": null,
    "husband": "paternal_greatgrandfather",
    "wife": null,
    "son": "paternal_grandfather",
    "daughter": "paternal_grandmother"
  },
  "paternal_greatgrandfather" : {
    "father": null,
    "mother": null,
    "husband": null,
    "wife": "paternal_greatgrandmother",
    "son": "paternal_grandfather",
    "daughter": "paternal_grandmother"
  },
    "maternal_greatgrandmother" : {
    "father": null,
    "mother": null,
    "husband": "maternal_greatgrandfather",
    "wife": null,
    "son": "maternal_grandfather",
    "daughter": "maternal_grandmother"
  },
  "maternal_greatgrandfather" : {
    "father": null,
    "mother": null,
    "husband": null,
    "wife": "maternal_greatgrandmother",
    "son": "maternal_grandfather",
    "daughter": "maternal_grandmother"
  },
}

const hindi_def = {
  "your" : "you", 
  "mother" : "ma", 
  "father" : "papa", 
  "paternal_grandfather" : "dada", 
  "paternal_grandmother" : "dadi", 
  "maternal_grandfather" : "nana", 
  "maternal_grandmother" : "nani", 
  "maternal_uncle_older" : "bade mama", 
  "maternal_uncle_older_wife" : "badi mami", 
  "maternal_uncle_younger" : "mama", 
  "maternal_uncle_younger_wife" : "mami", 
  "maternal_aunt" : "mausi", 
  "maternal_aunt_husband" : "mausa", 
  "paternal_uncle_older" : "tau", 
  "paternal_uncle_older_wife" : "tai", 
  "paternal_uncle_younger" : "chacha", 
  "paternal_uncle_younger_wife" : "chachi", 
  "paternal_aunt" : "bua", 
  "paternal_aunt_husband" : "phupa", 
  "sister_older" : "didi", 
  "sister_older_husband" : "jija", 
  "sister_younger" : "behen", 
  "sister_younger_husband" : "behnoi", 
  "sister_son" : "bhanja", 
  "sister_daughter" : "bhanji",
  "brother_older" : "bhaiyya", 
  "brother_older_wife" : "bhabhi", 
  "brother_younger" : "bhai", 
  "brother_younger_wife" : "bhayo", 
  "brother_daughter" : "bhatiji", 
  "brother_son" : "bhatija", 
  "husband" : "pati", 
  "husband_brother_older" : "jeth", 
  "husband_brother_older_wife" : "jethani", 
  "husband_sister" : "nanand", 
  "husband_sister_husband" : "nandoi", 
  "husband_brother_younger" : "deconst", 
  "husband_brother_younger_wife" : "deconstani", 
  "wife" : "patni", 
  "wife_brother_older" : "bhai saheb", 
  "wife_brother_younger" : "saala", 
  "wife_brother_wife" : "salhaj", 
  "wife_sister" : "saali", 
  "wife_sister_husband" : "sadhu", 
  "son" : "beta", 
  "daughter" : "beti", 
  "daughter_daughter" : "natin, navasi", 
  "daughter_son" : "nati, navasa", 
  "son_daughter" : "poti", 
  "son_son" : "pota", 
  "child_wife" : "bahu", 
  "child_husband" : "damad", 
  "wife_mother" : "saas", 
  "wife_father" : "sasur", 
  "husband_mother" : "saas", 
  "husband_father" : "sasur", 
  "child_spouse_father" : "samdhi",
  "child_spouse_mother" : "samdhan",
  "paternal_greatgrandfather": "pardada",
  "paternal_greatgrandmother": "pardadi",
  "maternal_greatgrandfather": "parnana",
  "maternal_greatgrandmother": "parnani",
}