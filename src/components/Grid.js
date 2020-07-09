import React from 'react';

import styles from './Grid.module.scss';

const Grid = () => (
  <div className={styles.grid}>
    <div className={styles.square1}>One</div>
    <div className={styles.square2}>Two</div>
    <div className={styles.square3}>Three</div>
    <div className={styles.square4}>Four</div>
  </div>
)

export default Grid;