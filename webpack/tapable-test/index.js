const {
  SyncHook
} = require('tapable')

const hook = new SyncHook(['arg1', 'arg2', 'arg3'])

hook.tap('hook1', (arg1, arg2, arg3) => {
  console.log(arg1, arg2, arg3)
})

hook.call(1, 2, 3)

// new SyncHook => tap call
