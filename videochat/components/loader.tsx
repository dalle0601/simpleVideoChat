import React from 'react';
import { RotatingLines } from 'react-loader-spinner';

const Loader = () => {
    return (
        <div className="inset-0 flex items-center justify-center pt-5">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <RotatingLines strokeColor="black" strokeWidth="5" animationDuration="0.75" width="50" visible={true} />
        </div>
    );
};

export default Loader;
