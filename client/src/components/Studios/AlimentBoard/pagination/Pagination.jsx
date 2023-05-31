/* eslint-disable react-hooks/exhaustive-deps */
import './pagination.css';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getAliment } from '../../../../redux/actions/aliments.js';
import { connect } from 'react-redux';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

function Pagination({
  getAliment,
  alimentName,
  aliments: { pagesNumber, total, pageLimit },
  sortCount,
  saveFilters,
  nutrimentSelected,
  handleInputSearchOnChange,
}) {
  const [currentPage, setCurrentPage] = useState(0);
  const [limitPerPage, setLimitPerPAge] = useState(10);
  const pages = new Array(pagesNumber)
    .fill(null)
    .map((unGrandHommageAmrBelmondoJeanPaul, i) => i);

  // HERE IS AN EXERCICE I KEPT
  //  const allIndexRef = useRef(null);
  // const [positionLeftParent, setPositionLeftParent] = useState('');
  // const [positionRightParent, setPositionRightParent] = useState('');
  // const [leftPos, setLeftPos] = useState('');
  // const [loaded, setLoaded] = useState(false);

  // useEffect(() => {
  //   let position = () => {
  //     let right = allIndexRef.current.getBoundingClientRect().right;
  //     let left = allIndexRef.current.getBoundingClientRect().left;
  //     console.log(left);
  //     setPositionRightParent(right);
  //     setPositionLeftParent(left);
  //     const leftP = allIndexRef.current.getBoundingClientRect().left;
  //     setLeftPos(leftP);
  //   };
  //   window.addEventListener('mousemove', position);
  // }, [allIndexRef]);
  // console.log(
  //   positionRightParent,
  //   'RIGHT',
  //   positionLeftParent,
  //   'LEFT',
  //   leftPos,
  //   'L'
  // );
  // const loadedContent = () => {
  //   setLoaded(!loaded);
  // };

  useEffect(() => {
    let tab = ['Asc', 'Dsc', 'Def'];
    getAliment(
      alimentName,
      tab[sortCount],
      nutrimentSelected,
      currentPage + 1,
      limitPerPage,
      saveFilters
    );
  }, [currentPage, limitPerPage]);

  useEffect(() => {
    let tab = ['Asc', 'Dsc', 'Def'];
    setCurrentPage(0);
    getAliment(
      alimentName,
      tab[sortCount],
      nutrimentSelected,
      currentPage + 1,
      limitPerPage,
      saveFilters
    );
  }, [sortCount, saveFilters]);
  useEffect(() => {
    setCurrentPage(0);
  }, [alimentName]);

  const previousPage = () => {
    setCurrentPage(Math.max(0, currentPage - 1));
  };
  const nextPage = () => {
    setCurrentPage(Math.min(pagesNumber - 1, currentPage + 1));
  };

  const handleInputOnChange = (e) => {
    setLimitPerPAge(e.target.value);
    setCurrentPage(0);
  };

  const selectThisPage = (pageIndex, e) => {
    setCurrentPage(pageIndex);
  };

  return (
    <div className='Pagination'>
      <label htmlFor='limit'>
        Limit/Page
        <input
          type='number'
          id='limit'
          name='limit'
          min='0'
          onChange={handleInputOnChange}
          placeholder={limitPerPage}></input>
        Total Match: {total}
      </label>
      {/* ______________________       THIS IS TO GET THE TOTAL OF ALIMENTS FOR EACH REQUEST     __________________________ */}

      <div className='paginationNav'>
        <button onClick={previousPage}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'>
            <path d='M0 12c0 6.627 5.373 12 12 12s12-5.373 12-12-5.373-12-12-12-12 5.373-12 12zm7.58 0l5.988-5.995 1.414 1.416-4.574 4.579 4.574 4.59-1.414 1.416-5.988-6.006z' />
          </svg>
        </button>

        <div className='allIndex'>
          {pages.map((pageIndex) => (
            <div
              className={
                (pageIndex === currentPage - 1 ? 'pageIndexPrevious' : '') +
                (pageIndex === currentPage - 2
                  ? 'pageIndexNotDisplayedLeft'
                  : '') +
                (pageIndex === currentPage + 1 ? 'pageIndexNext' : '') +
                (pageIndex === currentPage + 2
                  ? 'pageIndexNotDisplayedRight'
                  : '') +
                (pageIndex === currentPage ? 'pageIndexCurrent' : '') +
                (pageIndex > currentPage + 2 || pageIndex < currentPage - 2
                  ? 'pageIndexNotDisplayed'
                  : '')
              }
              key={pageIndex}
              title={pageIndex}
              onClick={(e) => {
                selectThisPage(pageIndex, e);
              }}>
              <h4>{pageIndex + 1}</h4>
              {pageIndex === currentPage ? (
                <h5>{`of: ${pagesNumber}`}</h5>
              ) : null}
            </div>
          ))}
        </div>
        <button onClick={nextPage}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'>
            <path d='M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.218 19l-1.782-1.75 5.25-5.25-5.25-5.25 1.782-1.75 6.968 7-6.968 7z' />
          </svg>
          {/* <FontAwesomeIcon icon={faArrowRight} /> */}
        </button>
      </div>
    </div>
  );
}

Pagination.propTypes = {
  aliments: PropTypes.object.isRequired,
  getAliment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  aliments: state.allAliments,
});

export default connect(mapStateToProps, { getAliment })(Pagination);
