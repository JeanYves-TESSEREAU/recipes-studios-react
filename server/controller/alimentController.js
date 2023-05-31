import express from 'express';
import mongoose from 'mongoose';
const router = express.Router();
import Aliment from '../models/Aliment.js';

// -------------------------------------------------------------------

// FILTERING --- PAGINATION --- SORTING
class AlimentFullRequest {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  alimentFullOptions() {
    let sortBy = '';

    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 10;
    const skip = (page - 1) * limit;

    const queryElement = { ...this.queryString };

    const excludeFields = ['page', 'sort', 'limit'];
    excludeFields.forEach((val) => delete queryElement[val]);
    let queryStr = JSON.stringify(queryElement);
    queryStr = queryStr.replace(
      /\b(gte|gt|lt|lte|eq)\b/g,
      (match) => `$${match}`
    );

    if (this.queryString.sort) {
      sortBy = this.queryString.sort;
    } else {
      sortBy = 'alimNom';
    }
    this.query.find(JSON.parse(queryStr)).sort(sortBy).skip(skip).limit(limit);

    return this;
  }
}

class TotalItems {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  itemfullOptions() {
    const queryElement = { ...this.queryString };
    // console.log(queryElement);
    const excludeFields = ['page', 'sort', 'limit'];
    excludeFields.forEach((val) => delete queryElement[val]);
    let queryStr = JSON.stringify(queryElement);
    queryStr = queryStr.replace(
      /\b(gte|gt|lt|lte|eq)\b/g,
      (match) => `$${match}`
    );

    this.query.find(JSON.parse(queryStr)).countDocuments();

    return this;
  }
}

// GET ALL "ALIMENTS with allFeaturing"
export const getAliments = async (req, res) => {
  try {
    let pageNumber = 0,
      limit = 10,
      pagesNumber = 0;
    if (req.query.page) {
      pageNumber = req.query.page;
    }
    if (req.query.limit) {
      limit = req.query.limit;
    }
    const alimentTotal = new TotalItems(
      Aliment.find(),
      req.query
    ).itemfullOptions();

    const items = await alimentTotal.query;

    let total = items;
    console.log(total);

    const featuredAliment = new AlimentFullRequest(
      Aliment.find(),

      req.query
    ).alimentFullOptions();
    const aliments = await featuredAliment.query;

    let count = items;

    pagesNumber = count / limit;

    res.status(200).json({
      aliments: aliments,
      total: total,
      pagesNumber: Math.ceil(pagesNumber),
      pageNumber: pageNumber,
      limit: limit,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Sadly, server Error :(' });
  }
};

// -------------------------------------------------------------------

//GET ONE PRODUCT BY ID FROM DATABASE

export const getAlimentByID = async (req, res) => {
  const { id } = req.params;
  try {
    const alimentId = await Aliment.findById(id);

    res.status(200).json({ alimentId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Sadly, server Error :(' });
  }
};

// -----------------------------------------------

export const getAlimentByName = async (req, res) => {
  const { name } = req.params;
  try {
    let pageNumber = 0,
      limit = 10,
      pagesNumber = 0;
    if (req.query.page) {
      pageNumber = req.query.page;
    }
    if (req.query.limit) {
      limit = req.query.limit;
    }
    const alimentTotal = new TotalItems(
      Aliment.find({ alimNom: { $regex: `^${name}`, $options: 'i' } }),
      req.query
    ).itemfullOptions();

    const items = await alimentTotal.query;

    let total = items;
    console.log(total);

    const featuredAliment = new AlimentFullRequest(
      Aliment.find({ alimNom: { $regex: `^${name}`, $options: 'i' } }),

      req.query
    ).alimentFullOptions();
    const aliments = await featuredAliment.query;

    let count = items;

    pagesNumber = count / limit;

    res.status(200).json({
      aliments: aliments,
      total: total,
      pagesNumber: Math.ceil(pagesNumber),
      pageNumber: pageNumber,
      limit: limit,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Sadly, server Error :(' });
  }
};

// -------------------------------------------------------------------

// CREATE AN "ALIMENT"

export const createAliment = async (req, res) => {
  //REQ.BODY = FULL OBJETC OF AN ALIMENT WE NEED UPDATE OR CREATE
  const {
    alimGrpCode,
    alimSgrpCode,
    alimSSgrpCode,
    alimGrpNom,
    alimSgrpNom,
    alimSSgrpNom,
    alimCode,
    alimNom,
    energieKcal,
    eauG,
    proteinesG,
    glucidesG,
    lipidesG,
    sucresG,
    fructoseG,
    galactoseG,
    glucoseG,
    lactoseG,
    maltoseG,
    saccharoseG,
    amidonG,
    fibresAlimentairesG,
    polyolsTotauxG,
    alcoolG,
    acidesOrganiquesG,
    agSaturesG,
    agMonoinsaturésG,
    agPolyinsaturésG,
    agButyriqueG,
    agCaproiqueG,
    agCapryliqueG,
    agCapriqueG,
    agLauriqueG,
    agMyristiqueG,
    agPalmitiqueG,
    agSteariqueG,
    agOleiqueG,
    agLinoleiqueG,
    agAlphalinoleniqueG,
    agArachidoniqueG,
    agEpaG,
    agDhaG,
    cholesterolMg,
    selChlorureDeSodiumG,
    calciumMg,
    chlorureMg,
    cuivreMg,
    ferMg,
    iodeµg,
    magnesiumMg,
    manganeseMg,
    phosphoreMg,
    potassiumMg,
    seleniumµg,
    sodiumMg,
    zincMg,
    retinolµg,
    betaCaroteneµg,
    vitamineDµg,
    vitamineEmg,
    vitamineK1µg,
    vitamineK2µg,
    vitamineCmg,
    vitamineB1ThiamineMg,
    vitamineB2RiboflavineMg,
    vitamineB3PpNiacineMg,
    vitamineB5AcidePantotheniqueMg,
    vitamineB6Mg,
    vitamineB9FolatesTotauxµg,
    vitamineB12µg,
    iG,
  } = req.body;
  //

  const newAliment = new Aliment({
    alimGrpCode,
    alimSgrpCode,
    alimSSgrpCode,
    alimGrpNom,
    alimSgrpNom,
    alimSSgrpNom,
    alimCode,
    alimNom,
    energieKcal,
    eauG,
    proteinesG,
    glucidesG,
    lipidesG,
    sucresG,
    fructoseG,
    galactoseG,
    glucoseG,
    lactoseG,
    maltoseG,
    saccharoseG,
    amidonG,
    fibresAlimentairesG,
    polyolsTotauxG,
    alcoolG,
    acidesOrganiquesG,
    agSaturesG,
    agMonoinsaturésG,
    agPolyinsaturésG,
    agButyriqueG,
    agCaproiqueG,
    agCapryliqueG,
    agCapriqueG,
    agLauriqueG,
    agMyristiqueG,
    agPalmitiqueG,
    agSteariqueG,
    agOleiqueG,
    agLinoleiqueG,
    agAlphalinoleniqueG,
    agArachidoniqueG,
    agEpaG,
    agDhaG,
    cholesterolMg,
    selChlorureDeSodiumG,
    calciumMg,
    chlorureMg,
    cuivreMg,
    ferMg,
    iodeµg,
    magnesiumMg,
    manganeseMg,
    phosphoreMg,
    potassiumMg,
    seleniumµg,
    sodiumMg,
    zincMg,
    retinolµg,
    betaCaroteneµg,
    vitamineDµg,
    vitamineEmg,
    vitamineK1µg,
    vitamineK2µg,
    vitamineCmg,
    vitamineB1ThiamineMg,
    vitamineB2RiboflavineMg,
    vitamineB3PpNiacineMg,
    vitamineB5AcidePantotheniqueMg,
    vitamineB6Mg,
    vitamineB9FolatesTotauxµg,
    vitamineB12µg,
    iG,
  });
  try {
    await newAliment.save();

    res.status(201).json(newAliment);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// -------------------------------------------------------------------

//  UPDATE  AN "ALIMENT"

export const updateAliment = async (req, res) => {
  const { id } = req.params;
  const {
    alimGrpCode,
    alimSgrpCode,
    alimSSgrpCode,
    alimGrpNom,
    alimSgrpNom,
    alimSSgrpNom,
    alimCode,
    alimNom,
    energieKcal,
    eauG,
    proteinesG,
    glucidesG,
    lipidesG,
    sucresG,
    fructoseG,
    galactoseG,
    glucoseG,
    lactoseG,
    maltoseG,
    saccharoseG,
    amidonG,
    fibresAlimentairesG,
    polyolsTotauxG,
    alcoolG,
    acidesOrganiquesG,
    agSaturesG,
    agMonoinsaturésG,
    agPolyinsaturésG,
    agButyriqueG,
    agCaproiqueG,
    agCapryliqueG,
    agCapriqueG,
    agLauriqueG,
    agMyristiqueG,
    agPalmitiqueG,
    agSteariqueG,
    agOleiqueG,
    agLinoleiqueG,
    agAlphalinoleniqueG,
    agArachidoniqueG,
    agEpaG,
    agDhaG,
    cholesterolMg,
    selChlorureDeSodiumG,
    calciumMg,
    chlorureMg,
    cuivreMg,
    ferMg,
    iodeµg,
    magnesiumMg,
    manganeseMg,
    phosphoreMg,
    potassiumMg,
    seleniumµg,
    sodiumMg,
    zincMg,
    retinolµg,
    betaCaroteneµg,
    vitamineDµg,
    vitamineEmg,
    vitamineK1µg,
    vitamineK2µg,
    vitamineCmg,
    vitamineB1ThiamineMg,
    vitamineB2RiboflavineMg,
    vitamineB3PpNiacineMg,
    vitamineB5AcidePantotheniqueMg,
    vitamineB6Mg,
    vitamineB9FolatesTotauxµg,
    vitamineB12µg,
    iG,
  } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No Aliment with id: ${id}`);
  try {
    const updatedAliment = {
      alimGrpCode,
      alimSgrpCode,
      alimSSgrpCode,
      alimGrpNom,
      alimSgrpNom,
      alimSSgrpNom,
      alimCode,
      alimNom,
      energieKcal,
      eauG,
      proteinesG,
      glucidesG,
      lipidesG,
      sucresG,
      fructoseG,
      galactoseG,
      glucoseG,
      lactoseG,
      maltoseG,
      saccharoseG,
      amidonG,
      fibresAlimentairesG,
      polyolsTotauxG,
      alcoolG,
      acidesOrganiquesG,
      agSaturesG,
      agMonoinsaturésG,
      agPolyinsaturésG,
      agButyriqueG,
      agCaproiqueG,
      agCapryliqueG,
      agCapriqueG,
      agLauriqueG,
      agMyristiqueG,
      agPalmitiqueG,
      agSteariqueG,
      agOleiqueG,
      agLinoleiqueG,
      agAlphalinoleniqueG,
      agArachidoniqueG,
      agEpaG,
      agDhaG,
      cholesterolMg,
      selChlorureDeSodiumG,
      calciumMg,
      chlorureMg,
      cuivreMg,
      ferMg,
      iodeµg,
      magnesiumMg,
      manganeseMg,
      phosphoreMg,
      potassiumMg,
      seleniumµg,
      sodiumMg,
      zincMg,
      retinolµg,
      betaCaroteneµg,
      vitamineDµg,
      vitamineEmg,
      vitamineK1µg,
      vitamineK2µg,
      vitamineCmg,
      vitamineB1ThiamineMg,
      vitamineB2RiboflavineMg,
      vitamineB3PpNiacineMg,
      vitamineB5AcidePantotheniqueMg,
      vitamineB6Mg,
      vitamineB9FolatesTotauxµg,
      vitamineB12µg,
      iG,
    };

    await Aliment.findByIdAndUpdate(id, updatedAliment, { new: true });
    res.status(201).send(`${alimNom} à jour`);
  } catch (error) {
    res.status(500).json({ error: messages });
  }
};

export default router;
