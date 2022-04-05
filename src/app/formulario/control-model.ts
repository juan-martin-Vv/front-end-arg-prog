export class ControlModel<T> {
    value: T | undefined;
    key: string;
    label: string;
    required: boolean;
    order: number;
    controlType: string;
    type: string;
    options: { key: string, value: string }[];
    //
    restricciones: { restriccion: string, valor?: string, errores?: string }[];

    constructor(options: {
        value?: T;
        key?: string;
        label?: string;
        required?: boolean;
        order?: number;
        controlType?: string;
        type?: string;
        options?: { key: string, value: string }[];
        restricciones?: { restriccion: restriccion, valor?: string, errores?: string }[]
    } = {}) {
        this.value = options.value;
        this.key = options.key || '';
        this.label = options.label || '';
        this.required = !!options.required;
        this.order = options.order === undefined ? 1 : options.order;
        this.controlType = options.controlType || '';
        this.type = options.type || '';
        this.options = options.options || [];
        this.restricciones = options.restricciones || [];
    }
}
export class EntradaTexto extends ControlModel<string> {
    override controlType = 'textbox';
}
export class ListaDlesplegable extends ControlModel<string> {
    override controlType = 'dropdown';
}
export class LabelForm extends ControlModel<string>
{
    override controlType='label';
}
export class NullFieldForm extends ControlModel<string>
{
  override controlType ='nullField'
}
export enum restriccion{
  required='required',
  maxlength='maxlength',
  minlength='minlength',
  email='email',
  pattern='pattern'
}
