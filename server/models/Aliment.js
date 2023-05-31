import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const AlimentSchema = new Schema({
  alimGrpCode: {
    type: Number,
  },
  alimSgrpCode: {
    type: Number,
  },
  alimSSgrpCode: {
    type: Number,
  },
  alimGrpNom: {
    type: String,
  },
  alimSgrpNom: {
    type: String,
  },
  alimSSgrpNom: {
    type: String,
  },
  alimCode: {
    type: Number,
  },
  alimNom: {
    type: String,
  },
  energieKcal: {
    type: Number,
  },
  eauG: {
    type: Number,
  },
  proteinesG: {
    type: Number,
  },
  glucidesG: {
    type: Number,
  },
  lipidesG: {
    type: Number,
  },
  sucresG: {
    type: Number,
  },
  fructoseG: {
    type: Number,
  },
  galactoseG: {
    type: Number,
  },
  glucoseG: {
    type: Number,
  },
  lactoseG: {
    type: Number,
  },
  maltoseG: {
    type: Number,
  },
  saccharoseG: {
    type: Number,
  },
  amidonG: {
    type: Number,
  },
  fibresAlimentairesG: {
    type: Number,
  },
  polyolsTotauxG: {
    type: Number,
  },
  alcoolG: {
    type: Number,
  },
  acidesOrganiquesG: {
    type: Number,
  },
  agSaturesG: {
    type: Number,
  },
  agMonoinsaturésG: {
    type: Number,
  },
  agPolyinsaturésG: {
    type: Number,
  },
  agButyriqueG: {
    type: Number,
  },
  agCaproiqueG: {
    type: Number,
  },
  agCapryliqueG: {
    type: Number,
  },
  agCapriqueG: {
    type: Number,
  },
  agLauriqueG: {
    type: Number,
  },
  agMyristiqueG: {
    type: Number,
  },
  agPalmitiqueG: {
    type: Number,
  },
  agSteariqueG: {
    type: Number,
  },
  agOleiqueG: {
    type: Number,
  },
  agLinoleiqueG: {
    type: Number,
  },
  agAlphalinoleniqueG: {
    type: Number,
  },
  agArachidoniqueG: {
    type: Number,
  },
  agEpaG: {
    type: Number,
  },
  agDhaG: {
    type: Number,
  },
  cholesterolMg: {
    type: Number,
  },
  selChlorureDeSodiumG: {
    type: Number,
  },
  calciumMg: {
    type: Number,
  },
  chlorureMg: {
    type: Number,
  },
  cuivreMg: {
    type: Number,
  },
  ferMg: {
    type: Number,
  },
  iodeµg: {
    type: Number,
  },
  magnesiumMg: {
    type: Number,
  },
  manganeseMg: {
    type: Number,
  },
  phosphoreMg: {
    type: Number,
  },
  potassiumMg: {
    type: Number,
  },
  seleniumµg: {
    type: Number,
  },
  sodiumMg: {
    type: Number,
  },
  zincMg: {
    type: Number,
  },
  retinolµg: {
    type: Number,
  },
  betaCaroteneµg: {
    type: Number,
  },
  vitamineDµg: {
    type: Number,
  },
  vitamineEmg: {
    type: Number,
  },
  vitamineK1µg: {
    type: Number,
  },
  vitamineK2µg: {
    type: Number,
  },
  vitamineCmg: {
    type: Number,
  },
  vitamineB1ThiamineMg: {
    type: Number,
  },
  vitamineB2RiboflavineMg: {
    type: Number,
  },
  vitamineB3PpNiacineMg: {
    type: Number,
  },
  vitamineB5AcidePantotheniqueMg: {
    type: Number,
  },
  vitamineB6Mg: {
    type: Number,
  },
  vitamineB9FolatesTotauxµg: {
    type: Number,
  },
  vitamineB12µg: {
    type: Number,
  },
  iG: {
    type: Number,
  },
});

const Aliment = mongoose.model('aliment', AlimentSchema);
export default Aliment;
