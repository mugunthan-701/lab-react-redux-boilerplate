import React, { useState, useEffect } from 'react';
import { createStore } from 'redux';
import reducer from './Reducer';
import { decrementLike, incrementLike } from './Action';

const store = createStore(reducer);

function LikeCounter() {
  const [localLike, setLocalLike] = useState(0);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setLocalLike(store.getState().likeCount);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleIncrement = () => {
    store.dispatch(incrementLike());
  };

  const handleDecrement = () => {
    store.dispatch(decrementLike());
  };

  return (
    <div>
      <h1>Likes: {localLike}</h1>
      <button onClick={handleIncrement}>Like</button>
      <button onClick={handleDecrement}>UnLike</button>
    </div>
  );
}

export default LikeCounter;
