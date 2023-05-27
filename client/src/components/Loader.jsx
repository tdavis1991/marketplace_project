import React from 'react';
import ClipLoader from "react-spinners/ClipLoader";

const Loader = ({ loading }) => {
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  return (
      <ClipLoader
        color='#05BFDB'
        loading={loading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
  )
}

export default Loader;