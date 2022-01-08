import React from 'react';
import s from './Button.module.scss';

// import scrollIntoView from 'scroll-into-view-if-needed';

export default function Button({ pageDown }) {
  // const node = document.getElementById('AddButton');

  // scrollIntoView(node, {
  //   behavior: 'smooth',
  //   scrollMode: 'if-needed',
  // });
  return (
    <button
      className={s.button}
      type="button"
      id="AddButton"
      onClick={pageDown}
    >
      Load more
    </button>
  );
}
