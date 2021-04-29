# Various json files I have collected 😝

## base_elements.json

A JSON file of periodic elements including

Example:

```
    {
        "name": "Hydrogen",
        "number": 1,
        "symbol": "H",
        "row": 1,
        "col": 1
    },
```

Thanks to [Andrew Blakey](https://github.com/ablakey) for this file

---

## emojis.json 👨‍🎤

A JSON list of all the emojis which includes

Example:

```
   {
      "slug":"grinning-face",
      "character":"\ud83d\ude00",
      "unicodeName":"grinning face",
      "codePoint":"1F600",
      "group":"smileys-emotion",
      "subGroup":"face-smiling"
   },
   {
```

Thanks to [https://emoji-api.com/](https://emoji-api.com/) for providing the list of emojis

------

## emoji-en-US.json

A JSON file containing info for an emoji keyword library which inludes

Example:

```
 "😀": [
    "grinning_face",
    "face",
    "smile",
    "happy",
    "joy",
    ":D",
    "grin"
  ],
```  

Thanks to [muan](https://muan.co) for providing this list

---

## react-emojis.json 👨‍🎤

A JSON list of emojis which includes

Example:

```
  {
    "title": "100",
    "symbol": "💯",
    "keywords":
      "hundred points symbol symbol wow wow win win perfect perfect parties parties"
  },
```

Thanks to [Brayden W](https://braydentw.github.io) for putting this list together

---
## gradients.json 👨‍🎤

A JSON list of gradient colors for use in tailwindcss, which includes

Example:

```
    {
      "title": "Hyper",
      "theme": "Warm",
      "colors": "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"
    },
```

Thanks to [Jordi Hales](https://jordihales.co.uk) and [Mark Mead](https://mead.im) for creating these colors

---

## gradient-colors.json 👨‍🎤

A JSON list of user generated gradient colors which includes

Example:

```
  {
    "id": 0,
    "githubUsername": "saviomartin",
    "colors": [
      "#3CA55C",
      "#B5AC49"
    ]
  },
```

Thanks to [Savio Martin](https://github.com/saviomartin) who first created this file for his [Gradient King](https://gradient-king.netlify.app)

---

## groupblocks.json

A small JSON file of the periodic table elements grouped into respective metal groupings

---

## periodic-table-data.json

A JSON file of periodic elements with some correlationg data for each element including

Example:

```
{"atomicNumber":1,"symbol":"H","name":"Hydrogen","atomicMass":"1.00794(4)","cpkHexColor":"FFFFFF","electronicConfiguration":"1s1","electronegativity":2.2,"atomicRadius":37,"ionRadius":"","vanDelWaalsRadius":120,"ionizationEnergy":1312,"electronAffinity":-73,"oxidationStates":"-1, 1","standardState":"gas","bondingType":"diatomic","meltingPoint":14,"boilingPoint":20,"density":0.0000899,"groupBlock":"nonmetal","yearDiscovered":1766},
```

Thanks to [Chris Andrejewski](https://jew.ski) for putting this data together

---

## periodicinfo.json

A great JSON file of periodic elements with each elements relevant data including

Example of Hydrogen:

```json
  "1": {
    "name": "Hydrogen",
    "symbol": "H",
    "atomicMass": 1.00794,
    "electronicConfiguration": [
      {
        "shell": 1,
        "subshellType": "s",
        "electrons": 1
      }
    ],
    "electronegativity": 2.2,
    "atomicRadius": 37,
    "vanDelWaalsRadius": 120,
    "electronAffinity": -73,
    "oxidationStates": [
      -1,
      1
    ],
    "phase": "gas",
    "bondingType": "diatomic",
    "meltingPoint": 14,
    "boilingPoint": 20,
    "density": 0.0000899,
    "groupBlock": "nonMetal",
    "yearDiscovered": 1766,
    "appearance": "colorless gas",
    "discoveredBy": "Henry Cavendish",
    "molarHeat": 28.836,
    "namedBy": "Antoine Lavoisier",
    "summary": "Hydrogen is a chemical element with chemical symbol H and atomic number 1. With an atomic weight of 1.00794 u, hydrogen is the lightest element on the periodic table. Its monatomic form (H) is the most abundant chemical substance in the Universe, constituting roughly 75% of all baryonic mass.",
    "y": 1,
    "x": 1
```

Thanks to [Reuben](https://reuben.science) for this collected data   

---

## periodicinfolg.json

A great JSON file of all periodic elements with extensive data for each elemenet including

Example of Hydrogen:

```json
 "1": {
      "atomicMass": 1.0079,
      "atomicNumber": 1,
      "ionizationEnergy": 13.5984,
      "atomicRay": "25",
      "boilingPoint": {
        "C": -252.879
      },
      "criticalPoint": 32.938,
      "group": "1",
      "density": 0.08988,
      "discoveryAuthor": "Henry Cavendish",
      "electronConfiguration": ["1s"],
      "electronegativity": 2.20,
      "electronsPerShell": [1],
      "elementGroup": "non-metal",
      "heatOfFusion": 0.117,
      "heatOfVaporization": 0.3904,
      "ionisationEnergy": 13.598443,
      "meltingPoint": {
        "C": -259.16
      },
      "molarHeatCapacity": 28.836,
      "name": "Hydrogen",
      "period": 1,
      "phase": "gas",
      "symbol": "H",
      "triplePoint": 13.8033,
      "discoveryDate": 1766,
      "context": "Hydrogen gas was first artificially produced in the early 16th century by the reaction of acids on metals. In 1766–81, Henry Cavendish was the first to recognize that hydrogen gas was a discrete substance, and that it produces water when burned, the property for which it was later named: in Greek, hydrogen means \"water-former\"."
    },
```

Thanks to [Pulsar](https://github.com/pulsardev) for this data

---

## periodictablejson.json

A great comprehensive JSON file of periodic table elements including

Example of Hydrogen:

```json
{
	"elements" : [{
		"name": "Hydrogen",
		"symbol": "H",
		"number": 1,
		"period": 1,
		"category": "diatomic nonmetal ",
		"atomic_mass": 1.008,
		"color": null,
		"appearance": "colorless gas",
		"phase": "Gas",
		"melt": 13.99,
		"boil": 20.271,
		"density": 0.08988,
		"discovered_by": "Henry Cavendish",
		"molar_heat": 28.836,
		"source":"https://en.wikipedia.org/wiki/Hydrogen",
		"named_by": "Antoine Lavoisier",
		"spectral_img": "https://en.wikipedia.org/wiki/File:Hydrogen_Spectra.jpg",
		"summary": "Hydrogen is a chemical element with chemical symbol H and atomic number 1. With an atomic weight of 1.00794 u, hydrogen is the lightest element on the periodic table. Its monatomic form (H) is the most abundant chemical substance in the Universe, constituting roughly 75% of all baryonic mass.",
		"ypos": 1,
		"xpos": 1,
		"shells": [
			1
		],
		"electron_configuration": "1s1",
		"electron_configuration_semantic": "1s1", 
		"electron_affinity": 72.769,
		"electronegativity_pauling": 2.20,
		"ionization_energies": [
			1312.0
		],
		"cpk-hex": "ffffff"
	}]
}
```

Thanks to [Bowserinator](https://github.com/Bowserinator) for compiling this data

---

## quotes-stoicism.json 👨‍🎤

A JSON list of over 1000 quotes from philosophers related to stoicism including

Example:

```
  {
    "quote": "What decides whether a sum of money is good? The money is not going to tell you; it must be the faculty that makes use of such impressions – reason.",
    "author": "Epictetus",
    "source": "Discourses I, 1.5",
    "tweetable": true
  },
```

Thanks to [David Wells](https://davidwells.io) for putting this data together

---
  
## quotes.json 👨‍🎤

A JSON list of over 1000 quotes which includes

Example:

```
	{
		"quoteText": "Genius is one percent inspiration and ninety-nine percent perspiration.",
		"quoteAuthor": "Thomas Edison"
	},
```

---

## countries folder

29 different JSON files for countries and corresponding data, including

- Countries
- Religon
- Flag
- Capitol
- Language
- Population
- Governement
- Much more.....

Thanks to [samayo](https://github.com/samayo) for much of this collected data.

----

## fifa-2018 folder

A JSON file of 2018 FIFA collected data including

- Teams
- Stadiums
- Groups
- Winners
- Losers
- Tv Networks
- And more..

Thanks to [Broen Westberg](https://github.com/broeneatsdinner) for accumulating this info.
