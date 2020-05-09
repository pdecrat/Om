const Blocks = {
  _components: {},
  register(name, component) {
    if (!this._components[name])
      this._components[name] = component;
  },
  get(name) {
    if (this._components[name])
      return this._components[name];
  },
  getAll() {
    return Object.keys(this._components);
  }
}
export default Blocks;
