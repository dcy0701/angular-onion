### exapmle
```
import { Inject, Watch, Mixin, Observable } from 'angular-onion';
import autoBd from 'common/mixin/autoBd/index.js';

@Inject('$routeParams', '$resource', 'htdialogs', 'Validators')
@Mixin(autoBd)
class doorLockController {
    ...
```


```
@Observable(() => this.abc, true)
watchLock (newVal) {
    console.log(newVal);
    }
...
```
### install


`yarn add angular-onion`


### License

`MIT`
