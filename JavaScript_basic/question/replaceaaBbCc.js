// aaBbCC => aa_bb_cc

let str = "aaBbCc"

function transfer(str) {
  
  if(typeof str === 'string') {
    return str.replace(/[A-Z]/g, (word) => { return "_" + word.toLocaleLowerCase() })
  }
  
  return ''
}

console.log(transfer(str))