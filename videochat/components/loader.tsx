import React from 'react';
import styles from './Loader.module.scss';
import { RotatingLines, Audio } from 'react-loader-spinner';

const Loader = () => {
    return (
        <div className="fixed">
            <div className="fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
                <RotatingLines strokeColor="grey" strokeWidth="5" animationDuration="0.75" width="100" visible={true} />
                {/* <Audio
                    height="60"
                    width="60"
                    color="#FFF"
                    ariaLabel="audio-loading"
                    wrapperStyle={{}}
                    wrapperClass="wrapper-class"
                    visible={true}
                /> */}
            </div>
        </div>
    );
};

export default Loader;
