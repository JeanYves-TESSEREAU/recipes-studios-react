import './alimentForm.css';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  getAlimentByID,
  getAliment,
  updateAliment,
} from '../../../../redux/actions/aliments';

const AlimentForm = ({
  getAlimentByID,
  updateAliment,
  displayedAlimentForm,
  toggledisplayedFormToExport,
  alimentId,
  alimentName,
  alimentID,
}) => {
  const [formAliment, setFormAliment] = useState();

  useEffect(() => {
    getAlimentByID(alimentID);
  }, [getAlimentByID, alimentID]);

  const closeAlimentForm = () => {
    return toggledisplayedFormToExport();
  };

  const submitAlimDatas = (e) => {
    e.preventDefault();

    window.confirm('Avez vous bien vérifié vos données ?');
    updateAliment(alimentID, formAliment);
    toggledisplayedFormToExport();
    console.log(formAliment);
  };

  const onChangeDatas = () => {
    let inputsText = document.querySelectorAll('input[type=text]');
    let inputsNumber = document.querySelectorAll('input[type=number]');
    let fullDatas = { _id: alimentID };
    for (let data of inputsText) {
      fullDatas[data.name] = data.value;
    }
    for (let data of inputsNumber) {
      fullDatas[data.name] = data.value;
    }
    setFormAliment(fullDatas);
  };

  return (
    <div
      className='AlimentForm'
      style={{ display: `${displayedAlimentForm ? '' : 'none'}` }}>
      <button className='exit' onClick={closeAlimentForm}>
        x
      </button>

      <form onSubmit={submitAlimDatas} key={alimentId.alimentId._id}>
        <fieldset>
          <legend>Édition de : {alimentName}</legend>
          <label>
            Nom de L'Aliment
            <input
              type='text'
              name='alimNom'
              defaultValue={alimentId.alimentId.alimNom}
            />
          </label>
          <label>
            Groupe Code de l'Aliment
            <input
              type='number'
              name='alimGrpCode'
              defaultValue={alimentId.alimentId.alimGrpCode}
              onChange={onChangeDatas}
            />
          </label>
          <label>
            Groupe Nom de l'Aliment
            <input
              type='text'
              name='alimGrpNom'
              defaultValue={alimentId.alimentId.alimGrpNom}
            />
          </label>
          <label>
            Sous-Groupe Nom de l'Aliment
            <input
              type='text'
              name='alimSgrpNom'
              defaultValue={alimentId.alimentId.alimSgrpNom}
            />
          </label>
          <label>
            Sous-Groupe Code de l'Aliment
            <input
              type='number'
              name='alimSgrpCode'
              defaultValue={alimentId.alimentId.alimSgrpCode}
            />
          </label>
          <label>
            Sous-Sous-Groupe Nom de l'Aliment
            <input
              type='text'
              name='alimSSgrpNom'
              defaultValue={alimentId.alimentId.alimSSgrpNom}
            />
          </label>
          <label>
            Sous-Sous-Groupe Code de l'Aliment
            <input
              type='number'
              name='alimSSgrpCode'
              defaultValue={alimentId.alimentId.alimSSgrpCode}
            />
          </label>
          <label>
            Energie en Kcal
            <input
              type='number'
              name='energieKcal'
              defaultValue={alimentId.alimentId.energieKcal}
            />
          </label>
          <label>
            Fibres Alimentaires en Grammes
            <input
              type='number'
              name='fibresAlimentairesG'
              defaultValue={alimentId.alimentId.fibresAlimentairesG}
            />
          </label>
          <label>
            Alcool en Grammes
            <input
              type='number'
              name='alcoolG'
              defaultValue={alimentId.alimentId.alcoolG}
            />
          </label>
          <label>
            Acides Organiques en Grammes
            <input
              type='number'
              name='acidesOrganiquesG'
              defaultValue={alimentId.alimentId.acidesOrganiquesG}
            />
          </label>
          <label>
            Eau en Grammes
            <input
              type='number'
              name='eauG'
              defaultValue={alimentId.alimentId.eauG}
            />
          </label>
          <label>
            Index Glycémique
            <input
              type='number'
              name='iG'
              defaultValue={alimentId.alimentId.iG}
            />
          </label>
          <label>
            Protéines en Grammes
            <input
              type='number'
              name='proteinesG'
              defaultValue={alimentId.alimentId.proteinesG}
            />
          </label>
          <label>
            Glucides en Grammes
            <input
              type='number'
              name='glucidesG'
              defaultValue={alimentId.alimentId.glucidesG}
            />
          </label>
          <label>
            Lipides en Grammes
            <input
              type='number'
              name='lipidesG'
              defaultValue={alimentId.alimentId.lipidesG}
            />
          </label>
          <label>
            Sucres en Grammes
            <input
              type='number'
              name='sucresG'
              defaultValue={alimentId.alimentId.sucresG}
            />
          </label>
          <label>
            Fructose en Grammes
            <input
              type='number'
              name='fructoseG'
              defaultValue={alimentId.alimentId.fructoseG}
            />
          </label>
          <label>
            Glucose en Grammes
            <input
              type='number'
              name='glucoseG'
              defaultValue={alimentId.alimentId.glucoseG}
            />
          </label>
          <label>
            Lactose en Grammes
            <input
              type='number'
              name='lactoseG'
              defaultValue={alimentId.alimentId.lactoseG}
            />
          </label>
          <label>
            Maltose en Grammes
            <input
              type='number'
              name='maltoseG'
              defaultValue={alimentId.alimentId.maltoseG}
            />
          </label>
          <label>
            Saccharoose en Grammes
            <input
              type='number'
              name='saccharoseG'
              defaultValue={alimentId.alimentId.saccharoseG}
            />
          </label>
          <label>
            Polyols Totaux en Grammes
            <input
              type='number'
              name='polyolsTotauxG'
              defaultValue={alimentId.alimentId.polyolsTotauxG}
            />
          </label>
          <label>
            Amidon en Grammes
            <input
              type='number'
              name='amidonG'
              defaultValue={alimentId.alimentId.amidonG}
            />
          </label>
          <label>
            Galactose en Grammes
            <input
              type='number'
              name='galactoseG'
              defaultValue={alimentId.alimentId.galactoseG}
            />
          </label>
          <label>
            Acides Gras Saturés en Grammes
            <input
              type='number'
              name='agSaturesG'
              defaultValue={alimentId.alimentId.agSaturesG}
            />
          </label>
          <label>
            Acides Gras Mono-Insaturés en Grammes
            <input
              type='number'
              name='agMonoinsaturésG'
              defaultValue={alimentId.alimentId.agMonoinsaturésG}
            />
          </label>
          <label>
            Acides Gras Poly-Insaturés en Grammes
            <input
              type='number'
              name='agPolyinsaturésG'
              defaultValue={alimentId.alimentId.agPolyinsaturésG}
            />
          </label>
          <label>
            Cholesterol en MilliGrammes
            <input
              type='number'
              name='cholesterolMg'
              defaultValue={alimentId.alimentId.cholesterolMg}
            />
          </label>
          <label>
            Acides Gras Butyrique [4:0] en Grammes
            <input
              type='number'
              name='agButyriqueG'
              defaultValue={alimentId.alimentId.agButyriqueG}
            />
          </label>
          <label>
            Acides Gras Caproïque [6:0] en Grammes
            <input
              type='number'
              name='agCaproiqueG'
              defaultValue={alimentId.alimentId.agCaproiqueG}
            />
          </label>
          <label>
            Acides Gras Caprylique [8:0] en Grammes
            <input
              type='number'
              name='agCapryliqueG'
              defaultValue={alimentId.alimentId.agCapryliqueG}
            />
          </label>
          <label>
            Acides Gras Caprique [10:0] en Grammes
            <input
              type='number'
              name='agCapriqueG'
              defaultValue={alimentId.alimentId.agCapriqueG}
            />
          </label>
          <label>
            Acides Gras Laurique [12:0] en Grammes
            <input
              type='number'
              name='agLauriqueG'
              defaultValue={alimentId.alimentId.agLauriqueG}
            />
          </label>
          <label>
            Acides Gras Myristique [14:0] en Grammes
            <input
              type='number'
              name='agMyristiqueG'
              defaultValue={alimentId.alimentId.agMyristiqueG}
            />
          </label>
          <label>
            Acides Gras Palmitique [16:0] en Grammes
            <input
              type='number'
              name='agPalmitiqueG'
              defaultValue={alimentId.alimentId.agPalmitiqueG}
            />
          </label>
          <label>
            Acides Gras Stéarique [18:0] en Grammes
            <input
              type='number'
              name='agSteariqueG'
              defaultValue={alimentId.alimentId.agSteariqueG}
            />
          </label>
          <label>
            Acides Gras OleiqueG [C18:1 / ω-9] en Grammes
            <input
              type='number'
              name='agOleiqueG'
              defaultValue={alimentId.alimentId.agOleiqueG}
            />
          </label>
          <label>
            Acides Gras Linoléique [C18:2 / ω-6] en Grammes
            <input
              type='number'
              name='agLinoleiqueG'
              defaultValue={alimentId.alimentId.agLinoleiqueG}
            />
          </label>
          <label>
            Acides Gras Alphalinolénique [C18:3 / ω-3] en Grammes
            <input
              type='number'
              name='agAlphalinoleniqueG'
              defaultValue={alimentId.alimentId.agAlphalinoleniqueG}
            />
          </label>
          <label>
            Acides Gras Arachidonique [C20:4 / ω-6] en Grammes
            <input
              type='number'
              name='agArachidoniqueG'
              defaultValue={alimentId.alimentId.agArachidoniqueG}
            />
          </label>
          <label>
            EPA / Acides Gras Eicosapentaénoïque [C20:5 / ω-3] en Grammes
            <input
              type='number'
              name='agEpaG'
              defaultValue={alimentId.alimentId.agEpaG}
            />
          </label>
          <label>
            DHA / Acides Gras Docosahexaénoïque [C22:6 / ω-3] en Grammes
            <input
              type='number'
              name='agDhaG'
              defaultValue={alimentId.alimentId.agDhaG}
            />
          </label>
          <label>
            Sel / Chlorure de Sodium en Grammmes
            <input
              type='number'
              name='selChlorureDeSodiumG'
              defaultValue={alimentId.alimentId.selChlorureDeSodiumG}
            />
          </label>
          <label>
            Calcium en MilliGrammmes
            <input
              type='number'
              name='calciumMg'
              defaultValue={alimentId.alimentId.calciumMg}
            />
          </label>
          <label>
            Chlorure en MilliGrammmes
            <input
              type='number'
              name='chlorureMg'
              defaultValue={alimentId.alimentId.chlorureMg}
            />
          </label>
          <label>
            Cuivre en MilliGrammmes
            <input
              type='number'
              name='cuivreMg'
              defaultValue={alimentId.alimentId.cuivreMg}
            />
          </label>
          <label>
            Fer en MilliGrammmes
            <input
              type='number'
              name='ferMg'
              defaultValue={alimentId.alimentId.ferMg}
            />
          </label>
          <label>
            Iode en MicroGrammmes
            <input
              type='number'
              name='iodeµg'
              defaultValue={alimentId.alimentId.iodeµg}
            />
          </label>
          <label>
            Magnésium en MilliGrammmes
            <input
              type='number'
              name='magnesiumMg'
              defaultValue={alimentId.alimentId.magnesiumMg}
            />
          </label>
          <label>
            Manganèse en MilliGrammmes
            <input
              type='number'
              name='manganeseMg'
              defaultValue={alimentId.alimentId.manganeseMg}
            />
          </label>
          <label>
            Phosphore en MilliGrammmes
            <input
              type='number'
              name='phosphoreMg'
              defaultValue={alimentId.alimentId.phosphoreMg}
            />
          </label>
          <label>
            Potassium en MilliGrammmes
            <input
              type='number'
              name='potassiumMg'
              defaultValue={alimentId.alimentId.potassiumMg}
            />
          </label>
          <label>
            Sélénium en MicroGrammmes
            <input
              type='number'
              name='seleniumµg'
              defaultValue={alimentId.alimentId.seleniumµg}
            />
          </label>
          <label>
            Sodium en MilliGrammmes
            <input
              type='number'
              name='sodiumMg'
              defaultValue={alimentId.alimentId.sodiumMg}
            />
          </label>
          <label>
            Zinc en MilliGrammmes
            <input
              type='number'
              name='zincMg'
              defaultValue={alimentId.alimentId.zincMg}
            />
          </label>
          <label>
            Retinol en MicroGrammes
            <input
              type='number'
              name='retinolµg'
              defaultValue={alimentId.alimentId.retinolµg}
            />
          </label>
          <label>
            Béta-Carotène en MicroGrammes
            <input
              type='number'
              name='betaCaroteneµg'
              defaultValue={alimentId.alimentId.betaCaroteneµg}
            />
          </label>
          <label>
            Vitamine D en MicroGrammes
            <input
              type='number'
              name='vitamineDµg'
              defaultValue={alimentId.alimentId.vitamineDµg}
            />
          </label>
          <label>
            Vitamine E en MicroGrammes
            <input
              type='number'
              name='vitamineEmg'
              defaultValue={alimentId.alimentId.vitamineEmg}
            />
          </label>
          <label>
            Vitamine K1 en MicroGrammes
            <input
              type='number'
              name='vitamineK1µg'
              defaultValue={alimentId.alimentId.vitamineK1µg}
            />
          </label>
          <label>
            Vitamine K2 en MicroGrammes
            <input
              type='number'
              name='vitamineK2µg'
              defaultValue={alimentId.alimentId.vitamineK2µg}
            />
          </label>
          <label>
            Vitamine C en MilliGrammes
            <input
              type='number'
              name='vitamineCmg'
              defaultValue={alimentId.alimentId.vitamineCmg}
            />
          </label>
          <label>
            Vitamine B1 / thiamine en MilliGrammes
            <input
              type='number'
              name='vitamineB1ThiamineMg'
              defaultValue={alimentId.alimentId.vitamineB1ThiamineMg}
            />
          </label>
          <label>
            Vitamine B2 / Riboflavine en MilliGrammes
            <input
              type='number'
              name='vitamineB2RiboflavineMg'
              defaultValue={alimentId.alimentId.vitamineB2RiboflavineMg}
            />
          </label>
          <label>
            Vitamine B3/ PP/ Niacine en MilliGrammes
            <input
              type='number'
              name='vitamineB3PpNiacineMg'
              defaultValue={alimentId.alimentId.vitamineB3PpNiacineMg}
            />
          </label>
          <label>
            Vitamine B5 Acide Pantothenique en MilliGrammes
            <input
              type='number'
              name='vitamineB5AcidePantotheniqueMg'
              defaultValue={alimentId.alimentId.vitamineB5AcidePantotheniqueMg}
            />
          </label>
          <label>
            Vitamine B6 en MilliGrammes
            <input
              type='number'
              name='vitamineB6Mg'
              defaultValue={alimentId.alimentId.vitamineB6Mg}
            />
          </label>
          <label>
            Vitamine B9 Folates Totaux en MicroGrammes
            <input
              type='number'
              name='vitamineB9FolatesTotauxµg'
              defaultValue={alimentId.alimentId.vitamineB9FolatesTotauxµg}
            />
          </label>
          <label>
            Vitamine B12 en MicroGrammes
            <input
              type='number'
              name='vitamineB12µg'
              defaultValue={alimentId.alimentId.vitamineB12µg}
            />
          </label>
        </fieldset>
        <input
          className='sendNewDatasAliment'
          type='submit'
          onClick={onChangeDatas}
          value='Valider'></input>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  aliments: state.allAliments,
  alimentId: state.allAliments,
});

export default connect(mapStateToProps, {
  getAlimentByID,
  updateAliment,
  getAliment,
})(AlimentForm);
