### exapmle
```
import { Inject, Mixin, Observable, Component } from 'angular-onion'

import auto from './mixin.js'
import justTestHtml from './just-test.html'

@Component({
    selector: 'just-test',
    props: {
        lastname: '@'
    },
    template: justTestHtml
})

// Auto Inject
@Inject('$resource')

@Mixin(auto)
class justTestController {
    user = 'onion'

    firstName = 'xi'

    partName = this.user + this.lastname;

    // event callback
    @Output('event from anywhere')
    subscribe (data) {

    }

    // Observable callback
    @Observable('$ctrl.user', true)
    watchUser (newVal) {

    }

    // computed
    get fullName () {
        return this.firstName + this.partName;
    }

    // lifecycle
    $onInit () {
        console.log(this.fullName)
    }

    // ....
}

```

### polyfill

must rewrite `moduleInstance.extend() ` for register `service`, `component`, `controller` if you want to use these decorators.

### install


`yarn add angular-onion`

`#or npm i angular-onion`


### License

`MIT`
