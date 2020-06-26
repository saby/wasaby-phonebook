import { Control, IControlOptions, TemplateFunction } from 'UI/Base';
import * as template from 'wml!PhoneBook-demo/Index';

export default class Index extends Control<IControlOptions> {
    protected _template: TemplateFunction = template;
}
