import {
  decrement,
  increment,
  incrementAsync,
} from '@/_redux/features/counter';
import { useAppDispatch, useAppSelector } from '@/_redux/hooks';

function Counter() {
  const counter = useAppSelector((state: any) => state.counter.value);

  const dispatch = useAppDispatch();

  // const increaseAfter1Second = () => {
  //   setTimeout(() => {
  //     store.dispatch(increment());
  //   }, 1000);
  // };

  return (
    <div>
      Counter: {counter}
      <br />
      <button onClick={() => dispatch(increment())}>Increase Value</button>
      <button onClick={() => dispatch(decrement())}>Decrease Value</button>
      <button onClick={() => dispatch(incrementAsync())}>
        Increase After 1 second
      </button>
    </div>
  );
}

export default Counter;
