class Parser {
  constructor (grammar) {
    this.grammar = this.compile(grammar);
  }
  compile (grammar) {
    return grammar;
  }
  tokenize (phrase) {
    return phrase;
  }
}

class World {
  constructor (title) {
    this.title = title;
    document.getElementById("title").textContent = this.title;
    this.nodes = [];
  }
  addNode (node) {
    this.nodes.append(node);
  }
  removeNode (node) {
    this.nodes.splice(this.nodes.indexOf(node), 1);
  }
}

class Node {
  constructor (name, description="Nothing of interest.", contents=[], ...properties) {
    this.property = {
      "name": name,
      "description": description,
      "light": 0,
      "contents": (contents || []),
      "takeable": true,
      "droppable": true,
      "weight": -1,
      "volume": -1
    };
    this.lockedProperties = ["name", "description", "light", "contents"];
    for prop in properties.keys() {
      this.property[prop] = properties[prop];
    }
  }
  lockProperty(key) {
    if !(key in this.lockedProperties) {
      this.lockedProperties.append(key);
    }
  }
  unlockProperty(key) {
    if (key in this.lockedProperties) {
      this.lockedProperties.splice(this.lockedProperties.indexOf(key), 1);
    }
  }
  expectProperty (key, value) {
    if (this.property[key] === value) {
      return true;
    } else {
      return false;
    }
  }
  safeSetProperty (key, value) 
    if (key in this.lockedProperties) {
      throw "Tried to modify a protected property.";
    } else {
      if !(key in this.property) {
        this.property[key] = value;
      }
    }
  }
  getProperty (key) {
    return this.property[key];
  }
  setProperty (key, value, override=false) {
    if (key in this.lockedProperties && override !== true) {
      throw "Tried to modify a protected property.";
    } else {
      this.property[key] = value;
    }
  }
  describe (override) {
    var outputParagraph = document.createElement("p");
    if (override) {
      var outputContent = document.createTextNode(override);
    } else {
      var outputContent = document.createTextNode(this.getProperty("description"));
    }
    outputParagraph.appendChild(outputContent);
    document.getElementById("paragraphs").appendChild(outputParagraph);
  }
  listContents () {
    var outputParagraph = document.createElement("p");
  }
}

class Room extends Node {
  constructor (name, description="A nondescript room.", contents=[], exits={}, properties...) {
    properties["exits"] = exits;
    super(name, description, contents, properties));
  }
}

class Item extends Node {
  constructor (name, alias, description="
}
