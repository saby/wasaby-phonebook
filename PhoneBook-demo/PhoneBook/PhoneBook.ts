import { Control, IControlOptions, TemplateFunction } from 'UI/Base';
import * as template from 'wml!PhoneBook-demo/PhoneBook/PhoneBook';

export default class PhoneBook extends Control<IControlOptions> {
    protected _template: TemplateFunction = template;
}
