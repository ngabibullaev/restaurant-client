import React, { FC, useState, useEffect } from "react";

interface LoaderProps {
  n: number;
  f: number;
}

export const Main = () => {

  const [updateTime, setUpdateTime] = useState(87)
  const [checkTime, setCheckTime] = useState(true)

  useEffect(() => {
    const timeout = setInterval(() => {
      setCheckTime((prevState) => !prevState)
    }, 1000);

    if (checkTime) {
      setUpdateTime((prevState) => prevState + 7)
    } else {
      setUpdateTime((prevState) => prevState - 7)
    }

    return () => {
      clearInterval(timeout)
    }
  }, [checkTime])

  const Loader: FC<LoaderProps> = ({ n, f }) => {
    const loaderStyle: React.CSSProperties = {
      // @ts-ignore
      "--n": n,
      "--f": f,
      "--p": updateTime,
    };

    return (
      <div className="loader" style={loaderStyle}>
        <h1 className="progress-number">93%</h1>
      </div>
    );
  };

  return (
    <div className="progress-flex">
      <Loader n={16} f={0.25} />
      <div className="progress-text">
        <h4 className="text-dark">Довольных клиентов</h4>
        <p className="text-secondary">Приготовим быстро и вкусно</p>
      </div>
    </div>
  );
};
