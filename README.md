blog post: <http://amacfie.github.io/2017/05/20/building-JS-shell/>

vim keybindings: <https://stackoverflow.com/questions/43505223/a-node-shell-based-on-gnu-readline/43677273#43677273>

launch shortcut from `zsh`: Put the following in file called `josh` in `$PATH`.
Change the path to `index.js` and remove `-z node_complete` if not using
vim keybindings.

    #!/usr/bin/env zsh
    if [ -n "$ZSH_VERSION" ]; then
      jobs -Z josh
    fi
    rlwrap -z node_complete -e '' -c /path/to/index.js

