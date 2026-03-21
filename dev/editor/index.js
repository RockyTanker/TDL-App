// Variables
const mapList = document.querySelector("#mapList")
const entryTemplate = document.querySelector("#entryTemplate")
const cover = document.querySelector("#cover")
const editorContainer = document.querySelector("#editorContainer")
const dialog = document.querySelector("#dialog")
const popup = document.querySelector("#popup")
var currentlyViewing

// Get youtube URL
function extractVideoId(url) {
    var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);

    if (match && match[2].length == 11) {
        return match[2];
    } else {
        return null;
    }
}

// Entry user behavior
function hoverEntry(entry) {
  entry.querySelector(".backgroundContainer").style.filter = "brightness(0.4)"
}

function hoverExit(entry) {
  entry.querySelector(".backgroundContainer").style.filter = "brightness(0.5)"
}

function mouseDown(entry) {
  entry.querySelector(".backgroundContainer").style.filter = "brightness(0.3)"
}

function mouseUp(entry) {
  entry.querySelector(".backgroundContainer").style.filter = "brightness(0.4)"
}

// View entry
function viewEntry(entry) {
  data = entry.querySelector("#metadata")

  // Hide previous arrow
  if (currentlyViewing) {
    currentlyViewing.querySelector(".arrowIcon").querySelector("img").style.display = "none"
  }

  currentlyViewing = entry

  // Show arrow
  entry.querySelector(".arrowIcon").querySelector("img").style.display = "block"

  // Link and cover (The cover is gathered from the MapList cover lol)
  cover.querySelector("#link").value = data.querySelector("#link").innerText
  cover.querySelector("#coverContainer").style.backgroundImage = entry.querySelector(".backgroundContainer").style.backgroundImage

  // Replace Main [Top Left]
  editorContainer.querySelector("#rating").value = data.querySelector("#rating").innerText
  editorContainer.querySelector("#name").value = data.querySelector("#name").innerText
  editorContainer.querySelector("#id").value = data.querySelector("#id").innerText
  editorContainer.querySelector("#creators").value = data.querySelector("#creators").innerText

  // Replace Technical
  editorContainer.querySelector("#published").value = data.querySelector("#published").innerText
  editorContainer.querySelector("#music").value = data.querySelector("#music").innerText
  editorContainer.querySelector("#length").value = data.querySelector("#length").innerText
  editorContainer.querySelector("#instances").value = data.querySelector("#instances").innerText
  editorContainer.querySelector("#buttons").value = data.querySelector("#buttons").innerText

  // Replace Selection: Skills
  if (data.querySelector("#hasWalljumps").innerText == "#") {editorContainer.querySelector("#walljumps").style.opacity = "100%"} else {editorContainer.querySelector("#walljumps").style.opacity = "50%"}
  if (data.querySelector("#hasWallruns").innerText == "#") {editorContainer.querySelector("#wallruns").style.opacity = "100%"} else {editorContainer.querySelector("#wallruns").style.opacity = "50%"}
  if (data.querySelector("#hasDive").innerText == "#") {editorContainer.querySelector("#diving").style.opacity = "100%"} else {editorContainer.querySelector("#diving").style.opacity = "50%"}
  if (data.querySelector("#hasLinear").innerText == "#") {editorContainer.querySelector("#linearSliding").style.opacity = "100%"} else {editorContainer.querySelector("#linearSliding").style.opacity = "50%"}
  if (data.querySelector("#hasMomentum").innerText == "#") {editorContainer.querySelector("#momentumSliding").style.opacity = "100%"} else {editorContainer.querySelector("#momentumSliding").style.opacity = "50%"}
  if (data.querySelector("#hasOrbs").innerText == "#") {editorContainer.querySelector("#orbs").style.opacity = "100%"} else {editorContainer.querySelector("#orbs").style.opacity = "50%"}

  // Replace Selection: Medal
  if (data.querySelector("#hasMedal").innerText == "#") {
    editorContainer.querySelector("#noMedal").style.opacity = "50%"
    editorContainer.querySelector("#hasMedal").style.opacity = "100%"
  } else {
    editorContainer.querySelector("#noMedal").style.opacity = "100%"
    editorContainer.querySelector("#hasMedal").style.opacity = "50%"
  }

  // Replace Selection: Awards
if (data.querySelector("#isFeatured").innerText == "#") {
  editorContainer.querySelector("#verified").style.opacity = "50%"
  editorContainer.querySelector("#featured").style.opacity = "100%"
  editorContainer.querySelector("#revolutionary").style.opacity = "50%"
} else if (data.querySelector("#isRevolutionary").innerText == "#") {
  editorContainer.querySelector("#verified").style.opacity = "50%"
  editorContainer.querySelector("#featured").style.opacity = "50%"
  editorContainer.querySelector("#revolutionary").style.opacity = "100%"
} else {
  editorContainer.querySelector("#verified").style.opacity = "100%"
  editorContainer.querySelector("#featured").style.opacity = "50%"
  editorContainer.querySelector("#revolutionary").style.opacity = "50%"
}

  // Replace Description
  editorContainer.querySelector("#description").value = data.querySelector("#description").innerText

  // Open editor, if closed
  cover.style.display = "grid"
  editorContainer.style.display = "flex"
}

// Search maps
function searchMaps(field) {
  let searchEntry = field.value
  let entries = document.querySelector("#mapList").getElementsByClassName("entry")

  for (let i = 0; i < entries.length; i++) {
    var entry = entries[i];
    var name = entry.querySelector("#name").innerText

    if (name.substring(0, searchEntry.length).toUpperCase() == searchEntry.toUpperCase() && entry.id != "entryTemplate") {
      entry.style.display = "grid";
    } else {
      entry.style.display = "none";
    }
  }
}

// Edit entry (For text fields)
function editEntry(field) {
  let data = currentlyViewing.querySelector("#metadata")
  data.querySelector("#" + field.id).innerText = field.value

  switch (field.id) {
    case "name":
      currentlyViewing.querySelector(".entryName").innerText = field.value
      break;
    case "rating":
      currentlyViewing.querySelector(".entryRating").innerText = "[" + field.value + "]"
      break;
  }
}

// Edit cover (Specifically for YouTube link thumbnail gathering)
function updateCover() {
  let coverLink = extractVideoId(currentlyViewing.querySelector("#link").innerText)
  cover.querySelector("#coverContainer").style.backgroundImage = "url(https://img.youtube.com/vi/" + coverLink + "/hqdefault.jpg)"
  currentlyViewing.querySelector(".backgroundContainer").style.backgroundImage = "url(https://img.youtube.com/vi/" + coverLink + "/hqdefault.jpg)"
  cover.querySelector("#link").style.backgroundColor = "#05920080"
  setTimeout(() => {
    cover.querySelector("#link").style.backgroundColor = "#00000080"
  }, 500);
}

// Edit entry (For multiple choice fields)
function editSelection(field) {
  let data = currentlyViewing.querySelector("#metadata")
  switch (field.id) {
    // Medal
    case "hasMedal":
      data.querySelector("#hasMedal").innerText = "#"
      editorContainer.querySelector("#hasMedal").style.opacity = "100%"
      editorContainer.querySelector("#noMedal").style.opacity = "50%"
      break;
    case "noMedal":
      data.querySelector("#hasMedal").innerText = ""
      editorContainer.querySelector("#hasMedal").style.opacity = "50%"
      editorContainer.querySelector("#noMedal").style.opacity = "100%"
      break;
    // Awards
    case "verified":
      data.querySelector("#isFeatured").innerText = ""
      data.querySelector("#isRevolutionary").innerText = ""
      editorContainer.querySelector("#verified").style.opacity = "100%"
      editorContainer.querySelector("#featured").style.opacity = "50%"
      editorContainer.querySelector("#revolutionary").style.opacity = "50%"
      break;
    case "featured":
      data.querySelector("#isFeatured").innerText = "#"
      data.querySelector("#isRevolutionary").innerText = ""
      editorContainer.querySelector("#verified").style.opacity = "50%"
      editorContainer.querySelector("#featured").style.opacity = "100%"
      editorContainer.querySelector("#revolutionary").style.opacity = "50%"
      break;
    case "revolutionary":
      data.querySelector("#isFeatured").innerText = ""
      data.querySelector("#isRevolutionary").innerText = "#"
      editorContainer.querySelector("#verified").style.opacity = "50%"
      editorContainer.querySelector("#featured").style.opacity = "50%"
      editorContainer.querySelector("#revolutionary").style.opacity = "100%"
      break;
    // Skills
    case "walljumps":
      if (field.style.opacity == "0.5") {
        data.querySelector("#hasWalljumps").innerText = "#"
        field.style.opacity = "100%"
      } else {
        data.querySelector("#hasWalljumps").innerText = ""
        field.style.opacity = "50%"
      }
      break;
    case "wallruns":
      if (field.style.opacity == "0.5") {
        data.querySelector("#hasWalljumps").innerText = "#"
        field.style.opacity = "100%"
      } else {
        data.querySelector("#hasWalljumps").innerText = ""
        field.style.opacity = "50%"
      }
      break;
    case "diving":
      if (field.style.opacity == "0.5") {
        data.querySelector("#hasDive").innerText = "#"
        field.style.opacity = "100%"
      } else {
        data.querySelector("#hasDive").innerText = ""
        field.style.opacity = "50%"
      }
      break;
    case "linearSliding":
      if (field.style.opacity == "0.5") {
        data.querySelector("#hasLinear").innerText = "#"
        field.style.opacity = "100%"
      } else {
        data.querySelector("#hasLinear").innerText = ""
        field.style.opacity = "50%"
      }
      break;
    case "momentumSliding":
      if (field.style.opacity == "0.5") {
        data.querySelector("#hasMomentum").innerText = "#"
        field.style.opacity = "100%"
      } else {
        data.querySelector("#hasMomentum").innerText = ""
        field.style.opacity = "50%"
      }
      break;
    case "orbs":
      if (field.style.opacity == "0.5") {
        data.querySelector("#hasOrbs").innerText = "#"
        field.style.opacity = "100%"
      } else {
        data.querySelector("#hasOrbs").innerText = ""
        field.style.opacity = "50%"
      }
      break;
  }
}

// Create new entry
function createEntry() {
  let newEntry = entryTemplate.cloneNode(true)
  newEntry.style.display = "grid"
  newEntry.id = ""

  mapList.appendChild(newEntry)
  return newEntry
}

// Delete entry
function deleteEntry() {
  if (currentlyViewing) {
    currentlyViewing.remove()
    hideEditor()
  }
}

// Hide editor
function hideEditor() {
  document.querySelector("#cover").style.display = "none"
  document.querySelector("#editorContainer").style.display = "none"
}

// Prompt popout
function promptPopup(span) {
    popup.style.display = "flex"
    popup.querySelector("b").innerHTML = span
}

function closePopup() {
  popup.style.display = "none"
}

// Prompt dialog
function prompt(message) {
  dialog.style.display = "flex"
  dialog.querySelector("b").innerText = message

  return new Promise((resolve) => {
    dialog.querySelector("#yes").addEventListener("click", function() {
      dialog.style.display = "none"
      resolve(true)
    })
    dialog.querySelector("#no").addEventListener("click", function() {
      dialog.style.display = "none"
      resolve(false)
    })
  })
}

// Prompt new file
async function newFile() {
  var result = await prompt("This will overwrite any work you currently have. Are you sure?")

  if (result == true) {
    let entries = document.querySelector("#mapList").getElementsByClassName("entry")
    const count = entries.length

    for (let i = count; i > 0; i--) {
      var entry = entries[i - 1];

      if (entry.id == "") {
        entry.remove()
        currentlyViewing = ""
        hideEditor()
      }
    }
  }
}

// Verify data (ensures that data fed works lmao)
function verifyData(data) {
  var cluster = []

  try {
    var separated = data.split('\n')
    var iteration

    // Get valid lines
    for (let i = 0; i < separated.length; i++) {
        iteration = separated[i]
        if (iteration[0] + iteration[1] == "//") {
            var newArray = {
                Overview: {
                    Rating: "",
                    Name: "",
                    Creators: "",
                    ID: "",
                    Video: ""
                },
                Meta: {
                    SkillCode: "",
                    HasAwards: "",
                    HasMedal: "",
                    MapLength: "",
                    Instances: "",
                    Buttons: "",
                    Music: "",
                    Date: ""
                },
                Description: "",
                Victors: ""
            }

            // GET: Overview
            var rating = iteration.match(/[\d.]+[^\]]/g)
            newArray.Overview.Rating = rating[rating.length - 1]

            newArray.Overview.Creators = separated[i + 2].substring(10)
            newArray.Overview.Creators[0] = newArray.Overview.Creators[0].substring(10)
            
            newArray.Overview.ID = separated[i + 1].substring(4)
            newArray.Overview.Video = extractVideoId(separated[i + 3].substring(6))
            newArray.Overview.Name = iteration.match(/[^// ]+[^\[\d.\d\]]/g)[0]

            // GET: Technical
            newArray.Meta.Date = separated[i + 6].substring(11)
            newArray.Meta.Music = separated[i + 7].substring(7)
            newArray.Meta.MapLength = separated[i + 8].substring(8)
            newArray.Meta.Instances = separated[i + 9].substring(11)
            newArray.Meta.Buttons = separated[i + 10].substring(9)

            // GET: Select
            var skillCode = ""
            var awards = 0

            if (separated[i + 14].substring(3, 4) == "#") {skillCode = skillCode + "0"}
            if (separated[i + 15].substring(3, 4) == "#") {skillCode = skillCode + "1"}
            if (separated[i + 16].substring(3, 4) == "#") {skillCode = skillCode + "2"}
            if (separated[i + 17].substring(3, 4) == "#") {skillCode = skillCode + "3"}
            if (separated[i + 18].substring(3, 4) == "#") {skillCode = skillCode + "4"}
            if (separated[i + 19].substring(3, 4) == "#") {skillCode = skillCode + "5"}
            
            if (separated[i + 21].substring(3, 4) == "#") {awards = 1}
            if (separated[i + 22].substring(3, 4) == "#") {awards = 2}

            if (separated[i + 24].substring(3, 4) == "#") {newArray.Meta.HasMedal = "Yes"}
            else {newArray.Meta.HasMedal = "No"}

            newArray.Meta.SkillCode = skillCode
            newArray.Meta.HasAwards = awards

            // GET: Description
            newArray.Description = separated[i + 27]

            cluster.push(newArray)
        }
    }

  } catch (error) {
    console.log(error)
    return false
  } return cluster
}

// Import Data
function importEvent() { // why does it have to be this complicated man
  var input = document.createElement('input');
  input.type = 'file';

  return new Promise((resolve) => {
    input.addEventListener("change", function(){

      var reader = new FileReader();
      reader.readAsText(input.files[0],'UTF-8');
      reader.onload = readerEvent => {
          var content = readerEvent.target.result;
          content = content.replace(/\r/g, '')
          resolve(content)
      }
    })

    input.click();
  })
}

async function importData() {
  let imported = await importEvent()
  var data = verifyData(imported)
  
  if (data == false) {
    promptPopup("This file has an invalid format and cannot be imported.")
  return}

  // prompt
  var result = await prompt("This will overwrite the current data. Are you sure?")
  if (result == false) {return}
  
  // delete all existing entries
  let entries = document.querySelector("#mapList").getElementsByClassName("entry")
  const count = entries.length

  for (let i = count; i > 0; i--) {
    var entry = entries[i - 1];

    if (entry.id == "") {
      entry.remove()
      currentlyViewing = ""
      hideEditor()
    }
  }

  // main import function. lord have mercy please help
  for (let i = 0; i < data.length; i++) {
    const entry = data[i];
    const entryNode = createEntry()
    const metadata = entryNode.querySelector("#metadata")

    // Overwrite Meta Phase 1
    // Overview
    metadata.querySelector("#name").innerText = entry.Overview.Name
    metadata.querySelector("#rating").innerText = entry.Overview.Rating
    metadata.querySelector("#id").innerText = entry.Overview.ID
    metadata.querySelector("#link").innerText = "https://www.youtube.com/watch?v=" + entry.Overview.Video 
    metadata.querySelector("#creators").innerText = entry.Overview.Creators

    // Meta
    metadata.querySelector("#buttons").innerText = entry.Meta.Buttons
    metadata.querySelector("#published").innerText = entry.Meta.Date
    metadata.querySelector("#instances").innerText = entry.Meta.Instances
    metadata.querySelector("#length").innerText = entry.Meta.MapLength
    metadata.querySelector("#music").innerText = entry.Meta.Music
    metadata.querySelector("#description").innerText = entry.Description

    // Skillcode
    for (let i = 0; i < entry.Meta.SkillCode.length; i++) {
      var skillID = entry.Meta.SkillCode[i]

      switch (skillID) {
        case "0":
          metadata.querySelector("#hasWalljumps").innerText = "#"
          break;
        case "1":
          metadata.querySelector("#hasWallruns").innerText = "#"
          break;
        case "2":
          metadata.querySelector("#hasDive").innerText = "#"
          break;
        case "3":
          metadata.querySelector("#hasLinear").innerText = "#"
          break;
        case "4":
          metadata.querySelector("#hasMomentum").innerText = "#"
          break;
        case "5":
          metadata.querySelector("#hasOrbs").innerText = "#"
          break;
      }
    }

    // Medal
    if (entry.Meta.HasMedal == "Yes") {
      metadata.querySelector("#hasMedal").innerText = "#"
    }

    switch (entry.Meta.HasAwards) {
      case 1:
        metadata.querySelector("#isFeatured").innerText = "#"
        break;
      case 2:
        metadata.querySelector("#isRevolutionary").innerText = "#"
        break;
    }

    // Update visual card
    entryNode.querySelector(".entryRating").innerText = "[" + entry.Overview.Rating + "]"
    entryNode.querySelector(".entryName").innerText = entry.Overview.Name

    // Thumbnail
    entryNode.querySelector(".backgroundContainer").style.backgroundImage = "url(https://img.youtube.com/vi/" + entry.Overview.Video + "/hqdefault.jpg)"
  }
}

// Save data
function saveData() {
  // PHASE 1: Compile all data into table
  let entries = document.querySelector("#mapList").getElementsByClassName("entry")
  let arrayed = []

  for (let i = 0; i < entries.length; i++) {
    var entry = entries[i];
    var metadata = entry.querySelector("#metadata")
    
    if (entry.id == "") {
      var selection = [Number(metadata.querySelector("#rating").innerText), "// " + metadata.querySelector("#name").innerText + " [" + metadata.querySelector("#rating").innerText + "]\nID: " + metadata.querySelector("#id").innerText + "\nCreators: " + metadata.querySelector("#creators").innerText + "\nLink: " + metadata.querySelector("#link").innerText + "\n\n|| TECHNICAL ||\nPublished: " + metadata.querySelector("#published").innerText + "\nMusic: " + metadata.querySelector("#music").innerText + "\nLength: " + metadata.querySelector("#length").innerText + "\nInstances: " + metadata.querySelector("#instances").innerText + "\nButtons: " + metadata.querySelector("#buttons").innerText + "\n\n|| SELECT ||\nSkills:\n  [" + metadata.querySelector("#hasWalljumps").innerText + "] Walljumps\n  [" + metadata.querySelector("#hasWallruns").innerText + "] Wallruns \n  [" + metadata.querySelector("#hasDive").innerText + "] Dive \n  [" + metadata.querySelector("#hasLinear").innerText + "] Linear Sliding\n  [" + metadata.querySelector("#hasMomentum").innerText + "] Momentum Sliding\n  [" + metadata.querySelector("#hasOrbs").innerText + "] Orbs\nAwards:\n  [" + metadata.querySelector("#isFeatured").innerText + "] Featured\n  [" + metadata.querySelector("#isRevolutionary").innerText + "] Revolutionary\nHas Medal:\n  [" + metadata.querySelector("#hasMedal").innerText + "] Yes\n\n|| DESCRIPTION ||\n" + metadata.querySelector("#description").innerText + "\n\n|| VICTORS || "]

      arrayed.push(selection)
    }
  }

  // sort by value
  arrayed.sort((b, a) => a[0] - b[0]);

  // concatenate into one
  let concatenated = "DIFFICULTY LIST"

  for (let i = 0; i < arrayed.length; i++) {
    const entry = arrayed[i];
    concatenated = concatenated + "\n\n---\n\n" + entry[1]
  }

  // idk what this does / save as text file
  var link = document.createElement('a');
  link.download = 'data.txt';
  var blob = new Blob([concatenated], {type: 'text/plain'});
  link.href = window.URL.createObjectURL(blob);
  link.click();

  console.log(concatenated)
}

// Get About on Request
function getAbout() {
  promptPopup("<style> #popup b {display: flex; flex-direction: column; align-items: center;} #githubButton, #siteButton, #discordButton {color: #ffffff; text-decoration: none; background-color: #49494980; padding: 6px; margin-left: 5px; margin-right: 5px; user-select: none;} #githubButton:hover, #siteButton:hover, #discordButton:hover {color: #6e6e6e} #githubButton:active, #siteButton:active, #discordButton:active {color: #414141}</style><div><img src='../assets/other/ExtendedLogo.png' style='height: 150px;'></div><b style='opacity: 50%; font-style: italic; font-weight: lighter; font-size: 15px;'>alpha_1.0 Demo Build</b>I'm SORRY? DID HE JUST SAY HIS LAST NAME IS BURGER?<div style='display: flex; flex-direction: row; margin-top: 10px;'><a id='githubButton' onclick='click(this)'>GitHub</a><a id='siteButton' onclick=press(this)>Site</a><a id='discordButton' onclick='press(this)'>Discord</a></div>")
}

// Random Quote
const quotes = [
  "You should try playing Moonview",
  "Noodles and bacon"
]

const quote = quotes[Math.floor(Math.random() * quotes.length)];
document.querySelector("#quote").querySelector("em").innerText = quote

// Links
function press(item) {
  switch (item.id) {
    case "githubButton":
      nw.Shell.openExternal('https://github.com/Ethan76167/TRIA.OS-Difficulty-List')
      break;
    case "siteButton":
      nw.Shell.openExternal('https://tria.cametized.xyz/tdl')
      break;
    case "discordButton":
      nw.Shell.openExternal('https://discord.gg/gzY665w2K2')
      break;
  }
}