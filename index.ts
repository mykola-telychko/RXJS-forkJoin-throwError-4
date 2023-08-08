import { delay, catchError } from 'rxjs/operators';
import { forkJoin, of, throwError } from 'rxjs';

// https://www.learnrxjs.io/learn-rxjs/operators/combination/forkjoin
/*
  If any inner observables error, the error result
  will be emitted by catchError.
*/

const timeToError = 6000;

const arrJoin = forkJoin({
  // emit 'Hello' immediately
  sourceOne: of('Hello'),
  // emit 'World' after 1 second
  // sourceTwo: of('World'),
  sourceT: of('World').pipe(delay(timeToError)), // +++
  // throw error
  sourceThree: throwError('This will error'),
}).pipe(catchError((error) => of(error)));

// output: 'This will Error'
const subscribe = arrJoin.subscribe((val) => console.log(val));
