CodeMirror.defineSimpleMode("magma", {
  meta: {
    lineComment: "//",
    blockCommentStart: "/*",
    blockCommentEnd: "*/",
    electricInput: /\b(end|else|elif|catch|until)(\s|;|\n)$/,
    closeBrackets: "()[]<>{}\"\"''",
  },

  // top level state
  start: [
    // single line comments
    {regex: /\/\/.*/, token: "comment"},
    // block comments
    {regex: /\/\*/, token: "comment", push: "comment"},
    // intrinsic docstring
    // at the moment, we assume that if this is the only thing on the line then it is a docstring (and not a set)
    {regex: /\s*\{([^\}\\]|\\.)*\}\s*$/, sol:true, token: "comment"},
    // type annotations
    {regex: /::/, push: "type"},
    {regex: /(\))(\s*)(->)/, token: ["bracket", null, null], push: "type"},
    // constants
    {regex: /\b(false|true)\b/, token: "atom"},
    // numbers
    {regex: /[+-]?0x[0-9a-fA-F]+/, token: "number"},
    {regex: /[+-]?[0-9]+(\.[0-9]+)?([eE][+-]?[0-9]+)?([pP][0-9]+)?/, token: "number"},
    // strings
    {regex: /"/, token: "string", push: "string"},
    // foo<...> things
    {regex: /\b(car|case|comp|cop|elt|ext|func|hom|ideal|iso|lideal|loc|map|ncl|pmap|proc|quo|recformat|rec|rideal|sub)\s*(\<)/, token: ["keyword", "bracket"]},
    {regex: /\b(AbelianFPGroup|AbelianGroup|FPGroup|Group|MatrixGroup|Monoid|PermutationGroup|PolycyclicGroup|Semigroup)\s*(\<)/, token: ["keyword", "bracket"]},
    {regex: /\b(AffineAlgebra|Algebra|AssociativeAlgebra|FPAlgebra|GroupAlgebra|LieAlgebra|MatrixAlgebra|QuaternionAlgebra)\s*(\<)/, token: ["keyword", "bracket"]},
    {regex: /\b(FiniteProjectivePlane|FiniteAffinePlane|IncidenceStructure|NearLinearSpace|LinearSpace|Design|Graph|Digraph|MultiGraph|MultiDigraph|Network|LinearCode|AdditiveCode)\s*(\<)/, token: ["keyword", "bracket"]},
    // brackets
    {regex: /\{\!|\!\}|\[\!|\!\]|\\\[|\{\[|\}\]|\{@|@\}|\{\*|\*\}|\[\*|\*\]|[\(\)\[\]\<\>\{\}]/, token: "bracket"},
    // reductions
    {regex: /\&(\+|\*|(and|cat|join|meet|or)\b)/, token: "operator"},
    // assignment
    {regex: /(\b(join|meet|diff|sdiff|cat|div|mod|and|or|xor)|\*|\+|\-|\/|\^|)(:=)/, token: "operator"},
    // operators
    {regex: /\!\!|\!|\#|\*|\+|->|-|\/|\^|@@|@|\.\.|\.|``|`|~|:->/, token: "operator"},
    // keywords that indent and dedent
    {regex: /\b(elif|else|catch)\b/, token: "keyword", indent: true, dedent: true},
    // function/procedure/intrinsic definition
    {regex: /\b(function|procedure|intrinsic)(\s+)([_a-zA-Z][_a-zA-Z0-9]*|'[^']*')(\s*)(\()/, token: ["keyword", null, "def", null, "bracket"], indent: true},
    // keywords that indent
    {regex: /\b(case|for|function|if|intrinsic|procedure|repeat|try|while)\b/, token: "keyword", indent: true},
    // keywords that dedent
    {regex: /\b(end(\s+(case|for|function|if|intrinsic|procedure|repeat|try|while))?|until)\b/, token: "keyword", dedent: true},
    // declare
    {regex: /\bdeclare\s+(type|attributes|verbose)\b/, token: "keyword", push: "type"},
    // keywords
    {regex: /\b(_|adj|and|assert|asssert2|assert3|assigned|break|by|cat|clear|cmpeq|cmpne|continue|declare|default|delete|diff|div|do|eq|error|eval|exists|exit|forall|forward|fprintf|freeze|ge|gt|iload|import|in|is|join|le|load|local|lt|meet|mod|ne|not|notadj|notin|notsubset|or|print|printf|quit|random|read|readi|rep|require|requirege|requirerange|restore|return|save|sdiff|select|subset|then|time|to|vprint|vprintf|vtime|when|where|xor)\b/, token:"keyword"},
    // identifiers
    {regex: /(\b[_a-zA-Z][_a-zA-Z0-9]*\b|'[^']')/, token: "variable"},
    // symbols
  ],
  comment: [
    {regex: /\*\//, token: "comment", pop: true},
    {regex: /./, token:"comment"},
  ],
  string: [
    {regex: /"/, token: "string", pop: true},
    {regex: /\\.?/, token: "string"},
    {regex: /[^"\\]/, token: "string"},
  ],
  type: [
    {regex: /(\b[_a-zA-Z][_a-zA-Z0-9]*\b|'[^']')(\s*)(\[)/, token: "type", next: "type_inner"},
    {regex: /(\b[_a-zA-Z][_a-zA-Z0-9]*\b|'[^']')/, token: "type", pop: true},
    {regex: /\./, token: "type", pop: true},
    {regex: /\[|\{\@|\{\*|\{/, token: "type", next: "type_inner"},
  ],
  type_inner: [
    {regex: /\]|\@\}|\*\}|\}/, token: "type", pop: true},
    {regex: /(\b[_a-zA-Z][_a-zA-Z0-9]*\b|'[^']')/, token: "type"},
    {regex: /\./, token: "type"},
    {regex: /\[|\{\@|\{\*|\{/, token: "type", push: "type_inner"},
  ]
});

CodeMirror.defineMIME("text/x-magma", "magma");
