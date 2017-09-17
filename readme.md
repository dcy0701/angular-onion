### exapmle
```
import { Inject, Mixin, Observable, Component } from 'angular-onion'

import auto from './mixin.js'
import justTestHtml from './just-test.html'

@Component({
    selector: 'just-test',
    props: {
        type: '@'
    },
    template: justTestHtml
})

@Inject('Validators')

@Mixin(auto)
class justTestController {
    constructor () {
       // constructor
       this.user = 'onion'
    }
    
    @Observable(() => this.user, true)
    watchUser (newVal) {
       // Observable callback
    }

    $onInit () {
       // lifecycle
    }

```

### install


`yarn add angular-onion`
`#or npm i angular-onion`


### License

`MIT`
