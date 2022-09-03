const fs = require('fs')


const data = JSON.parse(fs.readFileSync('./data.json'))
const output = []
const VISMAP = {
    "Data Processing4VIS": "Data Processing4VIS",
    "Data-VIS Mapping": "Data-VIS Mapping",
    "Insight Communication": "Insight Communication",
    "Style Imitation": "Style Imitation",
    "VIS Reading": "VIS Reading",
    "User Profiling": "User Profiling",
    "VIS Interaction": "VIS Interaction",
}

const MLMAP = {
    "Clustering": "Clustering",
    "Dimension Reduction": "Dimension Reduction",
    "Generative": "Generative",
    "Classification": "Classification",
    "Regression": "Regression",
    "semi-supervised": "Semi Supervised",
    "Reinforcement": "Reinforcement"
}

for (const item of data) {
    const VIS = Object.keys(VISMAP).filter(k => item[k]).map(k => VISMAP[k])
    const ML = Object.keys(MLMAP).filter(k => item[k]).map(k => MLMAP[k])
    output.push({
        name: item['paper name'],
        venue: item.venue,
        year: item.year,
        VIS,
        ML
    })
}

fs.writeFileSync('papers.json', JSON.stringify(output), { encoding: 'utf-8' })
