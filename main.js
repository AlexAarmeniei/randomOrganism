// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ["A", "T", "C", "G"];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum,
    dna,
    mutate() {
      const randIndex = Math.floor(Math.random() * this.dna.length);
      let newBase = returnRandBase();
      while (this.dna[randIndex] === newBase) {
        newBase = returnRandBase();
      }
      this.dna[randIndex] = newBase;
      console.log(this.dna);
      return this.dna;
    },
    compareDNA(otherPAequor) {
      let counter = 0;
      for (dnaPart in this.dna) {
        if (this.dna[dnaPart] === otherPAequor[dnaPart]) {
          counter++;
        }
      }
      let procent = (counter / 15) * 100;
      return `Specimen #1 and specimen #2 have ${procent}% DNA in common.`;
    },
    willLikelySurvive() {
      const cOrG = this.dna.filter(
        (dnaPart) => dnaPart === "C" || dnaPart === "G"
      );
      return cOrG.length / this.dna.length >= 0.6 ? true : false;
    },
  };
};
const survivingSpecimen = [];
let idCounter = 1;

while (survivingSpecimen.length < 30) {
  let newOrg = pAequorFactory(idCounter, mockUpStrand());
  if (newOrg.willLikelySurvive()) {
    survivingSpecimen.push(newOrg);
  }
  idCounter++;
}

console.log(survivingSpecimen);
// let x = [ 'C', 'A', 'A', 'G', 'G', 'A', 'C', 'A', 'T', 'G', 'A', 'T', 'C', 'C', 'A' ];
// console.log(pAequorFactory(1, [ 'C', 'C', 'C', 'G', 'G', 'C', '', 'A', 'T', 'G', 'A', 'T', 'C', 'C', 'A' ]).willLikelySurvive())
