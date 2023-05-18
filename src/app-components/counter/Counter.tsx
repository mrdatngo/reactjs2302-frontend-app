import { decrement, increment } from '@/_redux/features/counter';
import store from '@/_redux/store';
import { useSelector } from 'react-redux';

function Counter() {
  const counter = useSelector((state: any) => state.counter.value);

  return (
    <div>
      Counter: {counter}
      <br />
      <button onClick={() => store.dispatch(increment())}>
        Increase Value
      </button>
      <button onClick={() => store.dispatch(decrement())}>
        Decrease Value
      </button>
    </div>
  );
}

export default Counter;
