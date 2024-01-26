const createCheckBoxDiv = (div, eClass, eName) => {
  const input = document.createElement('input')
  input.type = 'checkbox'
  input.name = eName
  input.value = eName
  input.id = eName
  input.checked  = false
  input.classList.add(eClass)

  const label = document.createElement('label')
  const labelText = eName.slice(0,1).toUpperCase() + eName.slice(1, eName.length)
  label.appendChild(document.createTextNode(`${labelText}`))
  label.htmlFor = eName

  const checkBox = div.appendChild(input)
  div.appendChild(label)

  return checkBox
}

const handleMaterialSupplyClick = (materialSupplyElements) => {
  for (let i = 0; i < materialSupplyElements.length; i++) {
    materialSupplyElements[i].addEventListener('click', function(e) {
      [...materialSupplyElements].map(elem => {
        if(elem.id !== e.target.id){
          elem.checked = false
        }else {
          elem.checked = true
          materialSupplyValue = e.target.name
        }
      })
    })
  }
}

const handleMaterialTypeClick = (materialTypeElements) => {
  for (let i = 0; i < materialTypeElements.length; i++) {
    materialTypeElements[i].addEventListener('click', function(e) {
      [...materialTypeElements].map(elem => {
        if(elem.id !== e.target.id){
          elem.checked = false
        }else {
          elem.checked = true
          materialTypeValue = e.target.name
        }
      })
    })
  }
}

const handleCreateNewMaterialBtnClick = materialProperties => {
  const errors = []

  for (const key in materialProperties) {
    if (!materialProperties[key]) {
      errors.push(key)
    }
  }

  if(errors.length === 0) {
    const table = document.querySelector('#material-table')
    const row = table.insertRow(-1)

    let rowPosition = 0

    for (const key in materialProperties) {
      const cell = row.insertCell(rowPosition)
      cell.innerHTML = materialProperties[key]
      rowPosition ++
    }

    materialSupplyElements.map(e => e.checked = false)
    materialTypeElements.map(e => e.checked = false)
  }else {
    alert(slabErrorMsgGenerator(errors))
  }
}

const slabErrorMsgGenerator = errors => {
  let msg = ''

  for (let i = 0; i < errors.length; i++) {
    switch (errors[i]) {
      case 'name':
        msg += 'please add name \n'
        break;
      case 'stNumber':
        msg += 'please add st- number \n'
        break;
      case 'materialSupply':
        msg += 'please add supply method \n'
        break;
      case 'materialType':
        msg += 'please add material type \n'
        break;
      case 'qty':
        msg += 'please add qty \n'
        break;
      case 'cost':
        msg += 'please add material cost \n'
        break;
      case 'location':
        msg += 'please add location \n'
        break;
      case 'markUp':
        msg += 'please add markup \n'
        break;
      default:
        break;
    }
  }

  return msg
}

// create slabs checkboxes

const slabsDiv = document.querySelector('#material-supply')
let materialSupplyValue = undefined

const materialSupplyElements = [
  createCheckBoxDiv(slabsDiv, 'material-supply', 'supply-and-pick-up'),
  createCheckBoxDiv(slabsDiv, 'material-supply', 'supply-Only')
]

handleMaterialSupplyClick(materialSupplyElements)

// create material type checkboxes

const materialTypeDiv = document.querySelector('#material-type')
let materialTypeValue = undefined

const materialTypeElements = [
  createCheckBoxDiv(materialTypeDiv, 'material-type', 'engineered-stone'),
  createCheckBoxDiv(materialTypeDiv, 'material-type', 'marble'),
  createCheckBoxDiv(materialTypeDiv, 'material-type', 'granite'),
  createCheckBoxDiv(materialTypeDiv, 'material-type', 'hard-quartzite'),
  createCheckBoxDiv(materialTypeDiv, 'material-type', 'soft-quartzite'),
  createCheckBoxDiv(materialTypeDiv, 'material-type', 'porcelain-6mm'),
  createCheckBoxDiv(materialTypeDiv, 'material-type', 'porcelain-12mm'),
  createCheckBoxDiv(materialTypeDiv, 'material-type', 'porcelain-20mm')
]

handleMaterialTypeClick(materialTypeElements)

// st-number


// create new material button

const createNewMaterialBtn = document.querySelector('#create-new-material')

createNewMaterialBtn.addEventListener('click', () => {
  const newMaterial = {   // name, stNumber, materialSupply , materialType, qty, cost, location, markUp
    name: 'name',
    stNumber: 'st-01',
    materialSupply: materialSupplyValue,
    materialType: materialTypeValue,
    qty: `${3}`,
    cost: `$${2500}`,
    location: 'Bankstown',
    markUp: `${20}%`
  }

  handleCreateNewMaterialBtnClick(newMaterial)
})