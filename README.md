# Chain sequential Http requests with RxJS

_By [Kadir Damene](https://github.com/loursbourg)_

This example demonstrates how to chain multiple Http requests efficiently using RxJS and axios without causing a 
[ heavy bombardment ](https://en.wikipedia.org/wiki/Late_Heavy_Bombardment) to the server.

### See it your self
Clone the repo and run:
- ```yarn```
- ```yarn run start```

or if you are only interested in [the code behind](../blob/master/src/App.js)

### Operators Used

- catchError
- concatMap
- delay
- map
- mergeMap
- take (optional)


## License

[MIT](https://github.com/rollup/rollup/blob/master/LICENSE.md)
