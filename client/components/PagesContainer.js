import BasePager from '../base/components/BasePager'

export default class PagesContainer extends BasePager {
  update() {
    if (this.components.newComponent) this.components.newComponent.update()
    if (this.components.oldComponent) this.components.oldComponent.update()
  }
  resize() {
    if (this.components.newComponent) this.components.newComponent.resize()
  }
}
