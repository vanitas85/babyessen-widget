// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: cyan; icon-glyph: cookie-bite;
// share-sheet-inputs: plain-text;

// This script shows a random Scriptable API in a widget. The script is meant to be used with a widget configured on the Home Screen.
// You can run the script in the app to preview the widget or you can go to the Home Screen, add a new Scriptable widget and configure the widget to run this script.
// You can also try creating a shortcut that runs this script. Running the shortcut will show widget.
let api = await randomAPI()
let widget = await createWidget(api)


if (config.runsInWidget) {
  // The script runs inside a widget, so we pass our instance of ListWidget to be shown inside the widget on the Home Screen.
  Script.setWidget(widget)
} else {
  // The script runs inside the app, so we preview the widget.
  widget.presentSmall()
}
// Calling Script.complete() signals to Scriptable that the script have finished running.
// This can speed up the execution, in particular when running the script from Shortcuts or using Siri.
Script.complete()

async function createWidget(api) {
  let widget = new ListWidget()
  // Add background gradient
  let gradient = new LinearGradient()
  gradient.locations = [0, 1]
  gradient.colors = [
    new Color("98ceda"),
    new Color("92c8d5")
  ]

  widget.backgroundGradient = gradient
  // Show app icon and title
  let titleStack = widget.addStack()
  titleStack.addSpacer(0)

  //Milch 
  let milchText = ""
  milchText += (api.milch) 
  milchText += "ml"
  let milchElement = widget.addText(milchText)
  //let milchElement = widget.addText(api.milch)
  milchElement.minimumScaleFactor = 0.5
  milchElement.textColor = Color.white()
  milchElement.font = Font.boldSystemFont(38) 
  milchElement.centerAlignText()
  widget.addSpacer()

  let row = widget.addStack()
  row.layoutHorizontally() 
  
  //zpm  
  let zpmElement = row.addText("🦷☀️")  
  zpmElement = row.addText(api.zpm)
  zpmElement.minimumScaleFactor = 0.5
  zpmElement.textColor = Color.white()
  zpmElement.font = Font.systemFont(16)  
  
  //row.addSpacer()
  //Tablette
  let tabletteElement = row.addText("💊") 
  tabletteElement = row.addText(api.tablette)
  tabletteElement.minimumScaleFactor = 0.5
  tabletteElement.textColor = Color.white()
  tabletteElement.font = Font.systemFont(16) 
 
 let row2 = widget.addStack()
 row2.layoutHorizontally()

  //zpm  
  let zpaElement = row2.addText("🦷🌙")
  zpaElement = row2.addText(api.zpa)
  zpaElement.minimumScaleFactor = 0.5
  zpaElement.textColor = Color.white()
  zpaElement.font = Font.systemFont(16)
 
  //Windel  
  let windelElement = row2.addText("💩")
  windelElement = row2.addText(api.windel)
  windelElement.minimumScaleFactor = 0.5
  windelElement.textColor = Color.white()
  windelElement.font = Font.systemFont(16)
  
  let trennerElement
  trennerElement = widget.addText("___________")
  trennerElement.textColor = Color.white()
  trennerElement.centerAlignText()

  //Uhr  
  let uhrElement
  uhrElement = widget.addText(api.uhr)
  uhrElement.minimumScaleFactor = 0.5
  uhrElement.centerAlignText()
  uhrElement.textColor = Color.white()
  uhrElement.font = Font.systemFont(18)  
  // UI presented in Siri ans Shortcut is non-interactive, so we only show the footer when not running the script from Siri.
  return widget
}

async function randomAPI() {
  let docs = await loadDocs()
  let apiNames = Object.keys(docs)
  let apiName = apiNames[1]
  let api = docs[apiName]
  return {
    uhr: api["!uhr"], 
    milch: api["!milch"], 
    brei: api["!brei"],
    tablette: api["!tablette"],
    zpm: api["!zpm"],
    zpa: api["!zpa"],
    windel: api["!windel"]
  }
}

async function loadDocs() {
  let url = "https://essen.website.de/json"
  let req = new Request(url)
  return await req.loadJSON()
}
