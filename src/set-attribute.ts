import {DataAttributeObserver} from 'aurelia-binding';

export class SetAttributeBindingBehavior {
  bind(binding:any, source:any) {
    binding.targetObserver = new DataAttributeObserver(binding.target, binding.targetProperty);
  }

  unbind(binding:any, source:any) {}
}