const utils = module.exports = {};
utils.renderIf = (test, component) => test ? component : undefined;
utils.renderIfElse = (test, component, elseComponent) => test ? component : elseComponent;
